import { Token } from "@/appointment/application/jwt/token";

export class TokenFaker implements Token {
  generate(payload: Record<any, any>): string {
    return "tokenizied_"+ JSON.stringify(payload)
  }
}