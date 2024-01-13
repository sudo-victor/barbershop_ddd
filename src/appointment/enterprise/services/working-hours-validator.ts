export class WorkingHoursValidator {
  static START_OF_WORKING_HOURS = 9
  static END_OF_WORKING_HOURS = 20
  static FORBIDDEN_DAY_OF_WEEK = 1

  static at(scheduleAt: Date) {
    const appointmentHour = scheduleAt.getHours();
    const appointmentDayOfWeek = scheduleAt.getDay();
    const isWithinWorkingHours = appointmentHour >= this.START_OF_WORKING_HOURS && appointmentHour < this.END_OF_WORKING_HOURS;
    const isNotMonday = appointmentDayOfWeek !== this.FORBIDDEN_DAY_OF_WEEK;
    return isWithinWorkingHours && isNotMonday;
  }
}