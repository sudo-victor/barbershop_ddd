export class PrematureAppointmentCancellationError extends Error {
	constructor() {
		super('Premature appointment cancellation');
	}
}