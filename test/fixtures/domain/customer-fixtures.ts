import { Customer } from '@/appointment/enterprise/entities/customer';

export class CustomerFixtures { 
	static generate() {
		return Customer.create({
			name: 'Wagner',
			cpf: '115.598.810-89',
			email: 'wagner@email.com',
			password: '123456'
		});
	}
}