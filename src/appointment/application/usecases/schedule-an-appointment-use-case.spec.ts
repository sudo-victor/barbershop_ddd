import crypto from 'crypto';
import { ScheduleAnAppointmentUseCase } from './schedule-an-appointment-use-case';
import { OptionServiceRepositoryInMemory } from '@/infra/database/in-memory/option-service-repository';
import { CustomerRepositoryInMemory } from '@/infra/database/in-memory/customer-repository-in-memory';
import { OptionService } from '@/appointment/enterprise/entities/option-service';
import { DurationCalculator } from '@/appointment/enterprise/services/duration-calculator';
import { AppointmentRepositoryInMemory } from '@/infra/database/in-memory/appointment-repository-in-memory';
import { Customer } from '@/appointment/enterprise/entities/customer';
import { OutsideOfWorkingHoursError } from '@/core/usecases/errors/outside-of-working-hours-error';
import { ScheduleAlreadyExistsError } from '@/core/usecases/errors/schedule-already-exists-error';
import { CustomerFixtures } from 'test/fixtures/domain/customer-fixtures';
import { OptionServiceFixtures } from 'test/fixtures/domain/option-service-fixtures';
import { NotAllowedScheduleInLunchTimeError } from '@/core/usecases/errors/not-allowed-schedule-in-lunch-time-error';

let customerRepository: CustomerRepositoryInMemory;
let optionServiceRepository: OptionServiceRepositoryInMemory;
let appointmentRepository: AppointmentRepositoryInMemory;
let sut: ScheduleAnAppointmentUseCase;

describe('[Use Case] Schedule an appointment', () => {
	beforeEach(() => {
		customerRepository = new CustomerRepositoryInMemory();
		optionServiceRepository = new OptionServiceRepositoryInMemory();
		appointmentRepository = new AppointmentRepositoryInMemory();
		sut = new ScheduleAnAppointmentUseCase(appointmentRepository, optionServiceRepository, customerRepository);
	});

	it('should be able to schedule an appointment', async () => {
		const TWENTY_MIN_IN_SEC = 20 * 60;
		const customer = CustomerFixtures.generate();
		const optionService = OptionServiceFixtures.generate();
		optionServiceRepository.save(optionService);
		customerRepository.save(customer);
		const input = {
			customerId: customer.id.toValue(),
			optionServiceId: optionService.id.toValue(),
			scheduledAt: new Date('2023-01-10 13:30')
		};
		await sut.execute(input);
		const persistedAppointment = appointmentRepository.items[0];
		const expectedFinalDuration = TWENTY_MIN_IN_SEC + DurationCalculator.APPOINTMENT_MARGIN_DURATION_IN_SEC;
		const expectedFinishDate = new Date('2023-01-10 14:00').getTime();
		expect(persistedAppointment.id.toValue()).toBeDefined();
		expect(persistedAppointment.duration.toValue()).toEqual(expectedFinalDuration);
		expect(persistedAppointment.finishedAt.getTime()).toEqual(expectedFinishDate);
	});

	it.each([
		'2023-01-10 08:59',
		'2023-01-10 20:01',
		'2024-01-15 09:30',
	])('should not be able to schedule an appointment out of service time', async (scheduleTime) => {
		const input = {
			customerId: 'fake-id',
			optionServiceId: 'fake-id',
			scheduledAt: new Date(scheduleTime)
		};
		const callback = () => sut.execute(input);
		expect(callback).rejects.toBeInstanceOf(OutsideOfWorkingHoursError);
	});

	it.each([
		'2023-01-10 14:10',
		'2023-01-10 14:20',
		'2023-01-10 14:30',
	])('should not be able to schedule an appointment during a filled time slot', async (scheduleTime) => {
		const TWENTY_MIN_IN_SEC = 20 * 60;
		const optionService = OptionService.create({
			barberId: crypto.randomUUID(),
			description: 'Corte tesoura',
			durationInSec: TWENTY_MIN_IN_SEC,
			name: 'Corte',
			photo: '',
			price: 45
		});
		optionServiceRepository.save(optionService);
		const customer = Customer.create({
			name: 'Wagner',
			cpf: '115.598.810-89',
			email: 'wagner@email.com',
			password: '123456'
		});
		customerRepository.save(customer);
		const input = {
			customerId: customer.id.toValue(),
			optionServiceId: optionService.id.toValue(),
			scheduledAt: new Date('2023-01-10 14:00')
		};
		await sut.execute(input);
		const callback = sut.execute({ ...input, scheduledAt: new Date(scheduleTime) });
		expect(callback).rejects.toBeInstanceOf(ScheduleAlreadyExistsError);
	});

	it('should not be able to schedule an appointment during lunch time', async () => {
		const TWENTY_MIN_IN_SEC = 20 * 60;
		const optionService = OptionService.create({
			barberId: crypto.randomUUID(),
			description: 'Corte tesoura',
			durationInSec: TWENTY_MIN_IN_SEC,
			name: 'Corte',
			photo: '',
			price: 45
		});
		optionServiceRepository.save(optionService);
		const customer = Customer.create({
			name: 'Wagner',
			cpf: '115.598.810-89',
			email: 'wagner@email.com',
			password: '123456'
		});
		customerRepository.save(customer);
		const input = {
			customerId: customer.id.toValue(),
			optionServiceId: optionService.id.toValue(),
			scheduledAt: new Date('2023-01-10 12:00')
		};
		const callback = () => sut.execute(input);
		expect(callback).rejects.toBeInstanceOf(NotAllowedScheduleInLunchTimeError);
	});
});