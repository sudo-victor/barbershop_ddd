import { BarberNotFoundError } from '@/core/usecases/errors/barber-not-found-error';
import { AppointmentRepository } from '../repositories/appointment-repository';
import { BarberRepository } from '../repositories/barber-repository';
import { AppointmentNotFoundError } from '@/core/usecases/errors/appointment-not-found-error';
import { GracePeriodValidator } from '@/appointment/enterprise/services/grace-period-validator';
import { PrematureAppointmentCancellationError } from '@/core/usecases/errors/premature-appointment-cancellation-error';

export class BarberCancelAnAppointmentUseCase {
  
	constructor(
    private barberRepository: BarberRepository,
    private appointmentRepository: AppointmentRepository
	) {}
  
	async execute(input: Input) {
		const barber = await this.barberRepository.findById(input.barberId);
		if (!barber) throw new BarberNotFoundError();
		const appointment = await this.appointmentRepository.findById(input.appointmentId);
		if (!appointment) throw new AppointmentNotFoundError();
		const doesAppointmentIsWithinGracePeriod = GracePeriodValidator.validate(appointment.scheduledAt);
		if (doesAppointmentIsWithinGracePeriod) throw new PrematureAppointmentCancellationError();
		appointment.cancel();
		await this.appointmentRepository.update(appointment);
	}
}

type Input = {
  barberId: string;
  appointmentId: string
}
