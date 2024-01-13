export class InvalidAppointmentStatusError extends Error {
  constructor() {
    super("Invalid appointment status")
  }
}