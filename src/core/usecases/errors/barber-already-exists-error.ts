export class BarberAlreadyExistsError extends Error {
	constructor() {
		super('Barber already exists');
	}
}