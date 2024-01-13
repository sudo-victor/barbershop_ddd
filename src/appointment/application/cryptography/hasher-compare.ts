export interface HasherCompare {
  compare(value: string, hashed: string): boolean
}