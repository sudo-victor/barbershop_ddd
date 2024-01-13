import { HasherFaker } from "test/fakers/hasher-faker"
import { SigninUseCase } from "./signin-use-case"
import { CustomerRepositoryInMemory } from "@/infra/database/in-memory/customer-repository-in-memory"
import { TokenFaker } from "test/fakers/token-faker"
import { Customer } from "@/appointment/enterprise/entities/customer"
import { InvalidCredentialsError } from "@/core/usecases/errors/invalid-credentials-error"

let token: TokenFaker
let hasher: HasherFaker
let customerRepository: CustomerRepositoryInMemory
let sut: SigninUseCase

describe("[Use Case] Signin", () => {

  beforeEach(() => {
    token = new TokenFaker()
    hasher = new HasherFaker()
    customerRepository = new CustomerRepositoryInMemory()
    sut = new SigninUseCase(customerRepository, hasher, token)
  })

  it("should be able to generate a user credentials", async () => {
    customerRepository.save(Customer.create({
      name: "Wagner",
      cpf: "115.598.810-89",
      email: "wagner@email.com",
      password: hasher.encrypt("123456")
    }))
    const result = await sut.execute({ cpf: "115.598.810-89", password: "123456" })
    expect(result.token).toBeDefined()
  })

  it("should not be able to generate a user credentials if customer not found in database", async () => {
    const inputWithInvalidCpf = { cpf: "115.598.810-89", password: "123456" }
    expect(() => sut.execute(inputWithInvalidCpf)).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to generate a user credentials if password is invalid", async () => {
    customerRepository.save(Customer.create({
      name: "Wagner",
      cpf: "115.598.810-89",
      email: "wagner@email.com",
      password: hasher.encrypt("123456")
    }))
    const inputWithInvalidPassword = { cpf: "115.598.810-89", password: "otherpass" }
    expect(() => sut.execute(inputWithInvalidPassword)).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})