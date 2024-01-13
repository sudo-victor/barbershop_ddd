import { DurationCalculator } from "./duration-calculator"

describe("[Domain Service] Duration calculator", () => {
  it("should be able to generate a option service finish date", () => {
    const startAt = new Date("2023-01-13 14:45")
    const durationServiceOptionInSec = 30 * 60
    const result = DurationCalculator.calculateFinishDate(startAt, durationServiceOptionInSec)
    const expectedFinishDate = new Date("2023-01-13 15:25").getTime()
    expect(result.getTime()).toEqual(expectedFinishDate)
  })
})