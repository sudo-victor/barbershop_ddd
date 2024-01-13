import { AppointmentRepository } from "@/appointment/application/repositories/appointment-repository";
import { Appointment } from "@/appointment/enterprise/entities/appointment";

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  items: Appointment[] = []

  async save(appointment: Appointment): Promise<void> {
    this.items.push(appointment) 
  }

  async findAppointmentByInterval(startAt: Date, finishAt: Date): Promise<Appointment | undefined> {
    const appointmentInInterval = this.items.find((appointment) => {
      const scheduledAt = appointment.scheduledAt;
      const finishedAt = appointment.finishedAt;
      return (
        (scheduledAt >= startAt && scheduledAt <= finishAt) ||
        (finishedAt && finishedAt >= startAt && finishedAt <= finishAt)
      );
    });

    return appointmentInInterval;
  }

  async update(appointment: Appointment): Promise<void> {
    let index = this.items.findIndex((item) => item.id.isEqual(appointment.id.toValue()))
    this.items[index] = appointment
  }

  async findById(id: string): Promise<Appointment | undefined> {
    return this.items.find((appointment) => appointment.id.isEqual(id))
  }
}