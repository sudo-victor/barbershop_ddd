export class OutsideOfWorkingHoursError extends Error { 
  constructor() {
    super("Outside of working hours")
  }
}