import { Appointment, CreateAppointmentProps } from '@/appointment/enterprise/entities/appointment';

export class AppointmentFixtures {
	static generate(props: Partial<CreateAppointmentProps> = {}) {
		const TWENTY_MIN_IN_SEC = 20 * 60;
		return Appointment.create({
			optionServiceId: 'fake-id',
			durationOptionService: TWENTY_MIN_IN_SEC,
			scheduledAt: new Date(),
			customerId: props.customerId ?? 'fake-id',
			...props
		});
	}
}