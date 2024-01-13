import { CustomerNotFoundError } from '@/core/usecases/errors/customer-not-found-error';
import { AppointmentRepository } from '../repositories/appointment-repository';
import { CustomerRepository } from '../repositories/customer-repository';
import { AppointmentNotFoundError } from '@/core/usecases/errors/appointment-not-found-error';
import { UnauthorizedError } from '@/core/usecases/errors/unauthorized-error';

export class CustomerCancelAppointmentUseCase {

	constructor(
    private appointmentRepository: AppointmentRepository,
    private customerRepository: CustomerRepository
	) { }

	async execute(input: Input) {
		const customer = await this.customerRepository.findById(input.customerId);
		if (!customer) throw new CustomerNotFoundError();
		const appointment = await this.appointmentRepository.findById(input.appointmentId);
		if (!appointment) throw new AppointmentNotFoundError();
		if (appointment.customerId.toValue() !== input.customerId) throw new UnauthorizedError();
		appointment.cancel();
		await this.appointmentRepository.update(appointment);
	}
}

type Input = {
  customerId: string;
  appointmentId: string;
}