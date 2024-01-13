import { LunchTimeValidator } from "@/appointment/enterprise/services/lunch-time-validator";
import { AppointmentRepository } from "../repositories/appointment-repository";
import { CustomerRepository } from "../repositories/customer-repository";
import { OptionServiceRepository } from "../repositories/option-service-repository";
import { Appointment } from "@/appointment/enterprise/entities/appointment";
import { WorkingHoursValidator } from "@/appointment/enterprise/services/working-hours-validator";
import { CustomerNotFoundError } from "@/core/usecases/errors/customer-not-found-error";
import { OptionServiceNotFoundError } from "@/core/usecases/errors/option-service-not-found-error";
import { OutsideOfWorkingHoursError } from "@/core/usecases/errors/outside-of-working-hours-error";
import { ScheduleAlreadyExistsError } from "@/core/usecases/errors/schedule-already-exists-error";
import { NotAllowedScheduleInLunchTimeError } from "@/core/usecases/errors/not-allowed-schedule-in-lunch-time-error";

export class ScheduleAnAppointmentUseCase {

  constructor(
    private appointmentRepository: AppointmentRepository,
    private optionServiceRepository: OptionServiceRepository,
    private customerRepository: CustomerRepository
  ) {}

  async execute(input: Input) {
    const doesScheduleIsWithinWorkingHours = WorkingHoursValidator.at(input.scheduledAt)
    if(!doesScheduleIsWithinWorkingHours) throw new OutsideOfWorkingHoursError()
    const customer = await this.customerRepository.findById(input.customerId)
    if(!customer) throw new CustomerNotFoundError()
    const optionService = await this.optionServiceRepository.findById(input.optionServiceId)
    if(!optionService) throw new OptionServiceNotFoundError()
    const appointment = Appointment.create({ ...input, durationOptionService: optionService.duration.toValue() })
    const doesScheduleTimeWithinLunchTime = LunchTimeValidator.isItAt(appointment.scheduledAt) || LunchTimeValidator.isItAt(appointment.finishedAt)
    if (doesScheduleTimeWithinLunchTime) throw new NotAllowedScheduleInLunchTimeError()
    const doesAppointmentAlreadyScheduled = await this.appointmentRepository.findAppointmentByInterval(appointment.scheduledAt, appointment.finishedAt)
    if (doesAppointmentAlreadyScheduled) throw new ScheduleAlreadyExistsError()
    await this.appointmentRepository.save(appointment)
    return {
      id: appointment.id.toValue(),
      scheduledAt: appointment.scheduledAt
    }
  }
}

type Input = {
  customerId: string;
  optionServiceId: string;
  scheduledAt: Date;
}