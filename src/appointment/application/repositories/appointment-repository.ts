import { Appointment } from "@/appointment/enterprise/entities/appointment";

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>
  update(appointment: Appointment): Promise<void>
  findAppointmentByInterval(startAt: Date, finishAt: Date): Promise<Appointment | undefined>
  findById(id: string): Promise<Appointment | undefined>
}