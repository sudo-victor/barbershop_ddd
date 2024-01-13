export interface Token {
  generate(payload: Record<any, any>): string
}