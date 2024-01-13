import { InvalidCredentialsError } from "@/core/usecases/errors/invalid-credentials-error";
import { HasherCompare } from "../cryptography/hasher-compare";
import { CustomerRepository } from "../repositories/customer-repository";
import { Token } from "../jwt/token";

export class SigninUseCase {
  constructor(
    private customerRepository: CustomerRepository,
    private hasher: HasherCompare,
    private token: Token
  ) { }

  async execute(input: Input) {
    const customer = await this.customerRepository.findByCpf(input.cpf)
    if (!customer) throw new InvalidCredentialsError()
    const passwordIsValid = this.hasher.compare(input.password, customer.password.toValue())
    if (!passwordIsValid) throw new InvalidCredentialsError()
    const token = this.token.generate({ id: customer.id.toValue() })
    return { token }
  }
}

type Input = {
  cpf: string;
  password: string;
}