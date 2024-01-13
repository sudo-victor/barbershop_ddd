export class ScheduleAlreadyExistsError extends Error {
	constructor() {
		super('Schedule already exists');
	}
}