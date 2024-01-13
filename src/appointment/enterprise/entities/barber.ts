import { Entity } from '@/core/domain/entity';
import { Cpf } from '../value-objects/cpf';
import { Password } from '../value-objects/password';
import { UniqueId } from '@/core/domain/unique-id';

export interface BarberProps {
  name: string;
  email: string;
  cpf: Cpf;
  password: Password;
}

export interface CreateBarberProps {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export class Barber extends Entity<BarberProps> {
	get cpf() {
		return this.props.cpf;
	}

	static create(props:CreateBarberProps, id?: UniqueId) {
		return new Barber({
			...props,
			cpf: new Cpf(props.cpf),
			password: new Password(props.password)
		}, id);
	} 
}
