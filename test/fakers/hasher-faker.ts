import { HasherCompare } from "@/appointment/application/cryptography/hasher-compare";
import { HasherEncrypt } from "@/appointment/application/cryptography/hasher-encrypt";

export class HasherFaker implements HasherEncrypt, HasherCompare {
  compare(value: string, hashed: string): boolean {
    return value === hashed.replace("_hashed", "")
  }
  encrypt(value: string): string {
    return value + "_hashed"
  }
}