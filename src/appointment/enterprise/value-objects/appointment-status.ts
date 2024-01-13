import { NotAllowedChangeStatusError } from '@/core/domain/errors/not-allowed-change-status-error';
import { Appointment, AppointmentStatusProps } from '../entities/appointment';
import { InvalidAppointmentStatusError } from '@/core/domain/errors/invalid-appointment-status-error';

export abstract class AppointmentStatus {
  abstract value: string;

  constructor(readonly appointment: Appointment) {}

  abstract cancel(): void;
  abstract start(): void;
}

export class ScheduleStatus extends AppointmentStatus {
	value: string;

	constructor(appointment: Appointment) {
		super(appointment);
		this.value = 'scheduled';
	}

	cancel(): void {
		this.appointment.status = new CancelStatus(this.appointment);
	}

	start(): void {
		this.appointment.status = new DoneStatus(this.appointment);
	}
  
}

export class CancelStatus extends AppointmentStatus {
	value: string;

	constructor(appointment: Appointment) {
		super(appointment);
		this.value = 'canceled';
	}

	cancel(): void {
		throw new NotAllowedChangeStatusError();
	}

	start(): void {
		throw new NotAllowedChangeStatusError();
	}
  
}

export class DoneStatus extends AppointmentStatus {
	value: string;

	constructor(appointment: Appointment) {
		super(appointment);
		this.value = 'done';
	}

	cancel(): void {
		throw new NotAllowedChangeStatusError();
	}

	start(): void {
		throw new NotAllowedChangeStatusError();
	}
  
}

export class AppointmentStatusFactory {
	static create(type: AppointmentStatusProps, appointment: Appointment) {
		switch(type) {
		case 'scheduled': 
			return new ScheduleStatus(appointment);
		case 'canceled':
			return new CancelStatus(appointment);
		case 'done':
			return new DoneStatus(appointment);
		default: 
			throw new InvalidAppointmentStatusError();
		}
	}
}