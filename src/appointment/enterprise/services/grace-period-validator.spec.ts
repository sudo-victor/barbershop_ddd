import { GracePeriodValidator } from "./grace-period-validator"

describe("[Domain Service] Grace period validator", () => {

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2024-01-13 13:00"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it.each([
    new Date("2024-01-13 12:49"),
    new Date("2024-01-13 12:45"),
    new Date("2024-01-13 12:00"),
  ])("should be able to return true within grace period valid", (date) => {
    const result = GracePeriodValidator.validate(date)
    expect(result).toBeTruthy()
  })
  it.each([
    new Date("2024-01-13 12:50"),
    new Date("2024-01-13 13:00"),
    new Date("2024-01-13 13:10"),
  ])("should be able to return false within grace period valid", (date) => {
    const result = GracePeriodValidator.validate(date)
    expect(result).toBeFalsy()
  })
})