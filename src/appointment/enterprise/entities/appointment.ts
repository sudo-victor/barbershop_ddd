import { Entity } from "@/core/domain/entity";
import { Duration } from "../value-objects/duration";
import { UniqueId } from "@/core/domain/unique-id";
import { DurationCalculator } from "../services/duration-calculator";
import { AppointmentStatus, AppointmentStatusFactory } from "../value-objects/appointment-status";

export type AppointmentStatusProps = "scheduled" | "canceled" | "done"

export interface AppointmentProps {
  scheduledAt: Date;
  finishedAt: Date;
  status: AppointmentStatus;
  optionServiceId: UniqueId;
  duration: Duration;
  customerId: UniqueId;
}

export interface Props {
  scheduledAt: Date;
  finishedAt: Date;
  status: AppointmentStatusProps;
  optionServiceId: UniqueId;
  duration: Duration;
  customerId: UniqueId;
}

export interface CreateAppointmentProps {
  scheduledAt: Date;
  status?: AppointmentStatusProps;
  optionServiceId: string;
  durationOptionService: number;
  customerId: string;
}

export class Appointment extends Entity<AppointmentProps> {
  get scheduledAt() {
    return this.props.scheduledAt
  }

  get finishedAt() {
    return this.props.finishedAt
  }

  get duration() {
    return this.props.duration
  }

  get status() {
    return this.props.status
  }

  set status(status: AppointmentStatus) {
    this.props.status = status
  }

  get customerId() {
    return this.props.customerId
  }

  constructor(props: Props, id?: UniqueId) {
    super(props as any as AppointmentProps, id)
    this.props.status = AppointmentStatusFactory.create(props.status, this)
  }

  static create(props: CreateAppointmentProps, id?: UniqueId) {
    return new Appointment({
      ...props,
      status: props.status ?? "scheduled",
      customerId: new UniqueId(props.customerId),
      optionServiceId: new UniqueId(props.optionServiceId),
      duration: Duration.generateByServiceDuration(props.durationOptionService),
      finishedAt: DurationCalculator.calculateFinishDate(props.scheduledAt, props.durationOptionService)
    }, id)
  }

  cancel() {
    this.status.cancel()
  }
}
