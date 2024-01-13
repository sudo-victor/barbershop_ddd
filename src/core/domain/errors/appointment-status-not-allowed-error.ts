export class AppointmentStatusNotAllowedError extends Error {
  constructor() {
    super("Appointment status not allowed")
  }
}