import { BarberAlreadyExistsError } from '@/core/usecases/errors/barber-already-exists-error';
import { BarberRepository } from '../repositories/barber-repository';
import { Barber } from '@/appointment/enterprise/entities/barber';
import { HasherEncrypt } from '../cryptography/hasher-encrypt';

export class CreateBarberUseCase {
	constructor(
    private barberRepository: BarberRepository, 
    private hasher: HasherEncrypt,
	) {}

	async execute (input: Input) {
		const barberExists = await this.barberRepository.findByCpf(input.cpf);
		if (barberExists) throw new BarberAlreadyExistsError();
		const password = this.hasher.encrypt(input.password);
		const barber = Barber.create({ ...input, password });
		await this.barberRepository.save(barber);
	}
}

type Input = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
}