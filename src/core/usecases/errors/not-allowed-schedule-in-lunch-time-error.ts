export class NotAllowedScheduleInLunchTimeError extends Error {
  constructor() {
    super("Not allowed schedule in lunch time")
  }
}