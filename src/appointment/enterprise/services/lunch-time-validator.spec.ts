import { LunchTimeValidator } from './lunch-time-validator';

describe('[Domain Service] Lunch time validator', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it.each([
		new Date('2024-01-13 12:00'),
		new Date('2024-01-13 12:30'),
		new Date('2024-01-13 13:00')
	])('should be able to return true if current time is in lunch time', (date) => {
		vi.setSystemTime(date);
		const result = LunchTimeValidator.isIt();
		expect(result).toBeTruthy();
	});

	it.each([
		new Date('2024-01-13 11:00'),
		new Date('2024-01-13 14:30'),
		new Date('2024-01-13 15:00')
	])('should be able to return false if current time is not in lunch time', (date) => {
		vi.setSystemTime(date);
		const result = LunchTimeValidator.isIt();
		expect(result).toBeFalsy();
	});

	it.each([
		new Date('2024-01-13 12:00'),
		new Date('2024-01-13 12:30'),
		new Date('2024-01-13 13:00')
	])('should be able to return true if especific time is in lunch time', (date) => {
		const result = LunchTimeValidator.isItAt(date);
		expect(result).toBeTruthy();
	});

	it.each([
		new Date('2024-01-13 11:00'),
		new Date('2024-01-13 14:30'),
		new Date('2024-01-13 15:00')
	])('should be able to return false if especific time is not in lunch time', (date) => {
		const result = LunchTimeValidator.isItAt(date);
		expect(result).toBeFalsy();
	});
});