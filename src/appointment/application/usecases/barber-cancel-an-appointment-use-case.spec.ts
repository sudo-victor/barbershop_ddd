import { AppointmentRepositoryInMemory } from "@/infra/database/in-memory/appointment-repository-in-memory";
import { BarberCancelAnAppointmentUseCase } from "./barber-cancel-an-appointment-use-case";
import { BarberRepositoryInMemory } from "@/infra/database/in-memory/barber-repository-in-memory";
import { AppointmentFixtures } from "test/fixtures/domain/appointment-fixtures";
import { BarberFixtures } from "test/fixtures/domain/barber-fixtures";
import { BarberNotFoundError } from "@/core/usecases/errors/barber-not-found-error";
import { PrematureAppointmentCancellationError } from "@/core/usecases/errors/premature-appointment-cancellation-error";

let appointmentRepository: AppointmentRepositoryInMemory;
let barberRepository: BarberRepositoryInMemory;
let sut: BarberCancelAnAppointmentUseCase;

describe("[Use Case] Barber cancel an appointment", () => {

  beforeEach(() => {
    appointmentRepository = new AppointmentRepositoryInMemory()
    barberRepository = new BarberRepositoryInMemory()
    sut = new BarberCancelAnAppointmentUseCase(barberRepository, appointmentRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to cancel an appointment", async () => {
    const barber = BarberFixtures.generate()
    const appointment = AppointmentFixtures.generate()
    barberRepository.save(barber)
    appointmentRepository.save(appointment)
    const input = {
      barberId: barber.id.toValue(),
      appointmentId: appointment.id.toValue()
    }
    await sut.execute(input)
    const persistedStatus = appointmentRepository.items[0].status.value
    expect(persistedStatus).toBe("canceled")
  })

  it("should not be able to cancel if barber not found", async () => {
    const input = {
      barberId: "faker-id",
      appointmentId: "faker-id"
    }
    const callback = () => sut.execute(input)
    expect(callback).rejects.toBeInstanceOf(BarberNotFoundError)
  })

  it("should not be able to cancel if current date is less than scheduled date with a margin", async () => {
    const date = new Date(2024,1,13,12)
    vi.setSystemTime(date)
    const barber = BarberFixtures.generate()
    const appointment = AppointmentFixtures.generate({ scheduledAt: new Date("2024-01-13 13:00") })
    barberRepository.save(barber)
    appointmentRepository.save(appointment)
    const input = {
      barberId: barber.id.toValue(),
      appointmentId: appointment.id.toValue()
    }
    const callback = () => sut.execute(input)
    expect(callback).rejects.toBeInstanceOf(PrematureAppointmentCancellationError)
  })
})