export class NotAllowedChangeStatusError extends Error {
	constructor() {
		super('Not allowed change status');
	}
}