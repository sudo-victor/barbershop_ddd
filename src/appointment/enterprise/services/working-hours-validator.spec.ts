import { WorkingHoursValidator } from "./working-hours-validator"

describe("[Domain Service]", () => {
  it.each([
    new Date("2024-01-13 09:00"),
    new Date("2024-01-13 13:00"),
    new Date("2024-01-13 19:59"),
  ])("should be able to return true if date is within working hours", (date) => {
    const result = WorkingHoursValidator.at(date)
    expect(result).toBeTruthy()
  })
  it.each([
    new Date("2024-01-13 08:00"),
    new Date("2024-01-13 20:00"),
    new Date("2024-01-13 00:59"),
  ])("should be able to return false if date is not within working hours", (date) => {
    const result = WorkingHoursValidator.at(date)
    expect(result).toBeFalsy()
  })
})