import { BarberRepositoryInMemory } from "@/infra/database/in-memory/barber-repository-in-memory";
import { CreateBarberUseCase } from "./create-barber-use-case";
import { HasherFaker } from "test/fakers/hasher-faker";

let hasher: HasherFaker;
let barberRepository: BarberRepositoryInMemory;
let sut: CreateBarberUseCase;

describe("[Use Case] Create barber", () => {

  beforeEach(() => {
    hasher = new HasherFaker()
    barberRepository = new BarberRepositoryInMemory()
    sut = new CreateBarberUseCase(barberRepository, hasher)
  })

  it("should be able to create a barber", async () => {
    const input = {
      name: "Crazy Dog",
      cpf: "115.598.810-89",
      email: "crazy@dog.com",
      phone: "21999999999",
      password: "123456"
    }
    await sut.execute(input)
    expect(barberRepository.items).toHaveLength(1)
  })
})