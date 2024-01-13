import { CreateOptionServiceUseCase } from "./create-option-service-use-case"
import { Duration } from "@/appointment/enterprise/value-objects/duration"
import { OptionServiceRepositoryInMemory } from "@/infra/database/in-memory/option-service-repository"
import { BarberRepositoryInMemory } from "@/infra/database/in-memory/barber-repository-in-memory"
import { Barber } from "@/appointment/enterprise/entities/barber"
import { Password } from "@/appointment/enterprise/value-objects/password"
import { Cpf } from "@/appointment/enterprise/value-objects/cpf"
import { BarberNotFoundError } from "@/core/usecases/errors/barber-not-found-error"

let barberRepository: BarberRepositoryInMemory
let optionServiceRepository: OptionServiceRepositoryInMemory
let sut: CreateOptionServiceUseCase

describe("[Use Case] Create option service", () => {

  beforeEach(() => {
    barberRepository = new BarberRepositoryInMemory()
    optionServiceRepository = new OptionServiceRepositoryInMemory()
    sut = new CreateOptionServiceUseCase(optionServiceRepository, barberRepository)
  })

  it("should be able to create an option service", async () => {
    barberRepository.save(new Barber({
      name: "Crazy dog",
      cpf: new Cpf("115.598.810-89"),
      email: "crazy@dog.com",
      password: new Password("123456"),
    }))
    const barberId = barberRepository.items[0].id
    const FORTY_MIN_IN_SEC = 40 * 60
    const input = {
      barberId: barberId.toValue(),
      durationInSec: FORTY_MIN_IN_SEC,
      name: "Corte",
      price: 45,
      photo: "asdasd",
      description: "Corte de cabelo com máquina, tesoura ou os dois"
    }
    const result = await sut.execute(input)
    expect(result.id).toBeDefined()
    expect(result.duration.toValue()).toEqual(FORTY_MIN_IN_SEC)
  })

  it("should not be able to create a service if barber not exists", async () => {
    const input = {
      barberId: "id-not-found",
      durationInSec: 600,
      name: "Corte",
      price: 45,
      photo: "asdasd",
      description: "Corte de cabelo com máquina, tesoura ou os dois"
    }
    const callback = () => sut.execute(input)
    expect(callback).rejects.toBeInstanceOf(BarberNotFoundError)
  })
})