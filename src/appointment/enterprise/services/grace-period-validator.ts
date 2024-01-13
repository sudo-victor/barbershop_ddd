export class GracePeriodValidator {
  static GRACE_PERIOD_IN_MIN = 10

  static validate(schedule: Date) {
    const currentDate = new Date();
    const newDate = new Date(schedule);
    newDate.setMinutes(newDate.getMinutes() + this.GRACE_PERIOD_IN_MIN);
    return currentDate > newDate;
  }
}