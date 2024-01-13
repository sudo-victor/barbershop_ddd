import { DurationCalculator } from '../services/duration-calculator';
import { Appointment } from './appointment';

describe('[Entity] Appointment', () => {
	it('should be able to create an appointment', () => {
		const scheduledAt = new Date('2023-01-02 13:00');
		const TWENTY_MIN_IN_SEC = 20 * 60;
		const props = {
			scheduledAt: scheduledAt,
			optionServiceId: 'fake-id',
			durationOptionService: TWENTY_MIN_IN_SEC,
			customerId: 'fake-id',
		};
		const appointment = Appointment.create(props);
		const marginDurationTimeInSec = DurationCalculator.APPOINTMENT_MARGIN_DURATION_IN_SEC;
		const expectedFinishInDate = new Date(new Date('2023-01-02 13:00').getTime() + (TWENTY_MIN_IN_SEC * 1000) + (marginDurationTimeInSec * 1000));
		expect(appointment.id).toBeDefined();
		expect(appointment.finishedAt.getTime()).toBe(expectedFinishInDate.getTime());
	});
});