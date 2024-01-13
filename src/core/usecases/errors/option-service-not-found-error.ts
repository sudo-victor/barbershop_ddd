export class OptionServiceNotFoundError extends Error {
  constructor() {
    super("Option service not found")
  }
}