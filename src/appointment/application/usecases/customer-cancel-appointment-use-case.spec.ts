import { AppointmentRepositoryInMemory } from '@/infra/database/in-memory/appointment-repository-in-memory';
import { CustomerCancelAppointmentUseCase } from './customer-cancel-appointment-use-case';
import { CustomerRepositoryInMemory } from '@/infra/database/in-memory/customer-repository-in-memory';
import { CustomerFixtures } from 'test/fixtures/domain/customer-fixtures';
import { AppointmentFixtures } from 'test/fixtures/domain/appointment-fixtures';
import { AppointmentNotFoundError } from '@/core/usecases/errors/appointment-not-found-error';
import { UnauthorizedError } from '@/core/usecases/errors/unauthorized-error';
import { NotAllowedChangeStatusError } from '@/core/domain/errors/not-allowed-change-status-error';

let appointmentRepository: AppointmentRepositoryInMemory;
let customerRepository: CustomerRepositoryInMemory;
let sut: CustomerCancelAppointmentUseCase;

describe('[Use Case] Customer cancel appointment', () => {

	beforeEach(() => {
		customerRepository = new CustomerRepositoryInMemory();
		appointmentRepository = new AppointmentRepositoryInMemory();
		sut = new CustomerCancelAppointmentUseCase(appointmentRepository, customerRepository);
	});

	it('should be able to cancel an appointment', async () => {
		const customer = CustomerFixtures.generate();
		const appointment = AppointmentFixtures.generate({ customerId: customer.id.toValue() });
		customerRepository.save(customer);
		appointmentRepository.save(appointment);
		const input = {
			customerId: customer.id.toValue(),
			appointmentId: appointment.id.toValue()
		};
		await sut.execute(input);
		const canceledAppointment = appointmentRepository.items[0];
		expect(canceledAppointment.status.value).toBe('canceled');
	});

	it('should not be able to cancel an appointment if does not exists', async () => {
		const customer = CustomerFixtures.generate();
		customerRepository.save(customer);
		const input = {
			customerId: customer.id.toValue(),
			appointmentId: 'faker-id'
		};
		const callback = () => sut.execute(input);
		expect(callback).rejects.toBeInstanceOf(AppointmentNotFoundError);
	});

	it('should not be able to cancel an appointment with a diff customer id', async () => {
		const customer = CustomerFixtures.generate();
		const customer2 = CustomerFixtures.generate();
		const appointment = AppointmentFixtures.generate({ customerId: customer.id.toValue() });
		customerRepository.save(customer);
		customerRepository.save(customer2);
		appointmentRepository.save(appointment);
		const input = {
			customerId: customer2.id.toValue(),
			appointmentId: appointment.id.toValue()
		};
		const callback = () => sut.execute(input);
		expect(callback).rejects.toBeInstanceOf(UnauthorizedError);
	});

	it('should not be able to cancel an appointment when appointment has status diff of scheduled', async () => {
		const customer = CustomerFixtures.generate();
		const appointment = AppointmentFixtures.generate({ customerId: customer.id.toValue(), status: 'done' });
		customerRepository.save(customer);
		appointmentRepository.save(appointment);
		const input = {
			customerId: customer.id.toValue(),
			appointmentId: appointment.id.toValue()
		};
		const callback = () => sut.execute(input);
		expect(callback).rejects.toBeInstanceOf(NotAllowedChangeStatusError);
	});
});