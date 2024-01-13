export class LunchTimeValidator {
  static LUNCH_TIME_STARTED_AT_IN_MIN = 12 * 60
  static LUNCH_TIME_ENDED_AT_IN_MIN = 13 * 60

  static isIt() {
    const currentTimeInMin = new Date().getHours() * 60 + new Date().getMinutes();
    return currentTimeInMin >= this.LUNCH_TIME_STARTED_AT_IN_MIN && currentTimeInMin <= this.LUNCH_TIME_ENDED_AT_IN_MIN;
  }

  static isItAt(aTime: Date) {
    const dateTimeInMin = aTime.getHours() * 60 + aTime.getMinutes();
    return dateTimeInMin >= this.LUNCH_TIME_STARTED_AT_IN_MIN && dateTimeInMin <= this.LUNCH_TIME_ENDED_AT_IN_MIN;
  }
}