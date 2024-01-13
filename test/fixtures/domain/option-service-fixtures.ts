import { OptionService } from '@/appointment/enterprise/entities/option-service';
import crypto from 'crypto';

export class OptionServiceFixtures {
	static generate() {
		const TWENTY_MIN_IN_SEC = 20 * 60;
		return OptionService.create({
			barberId: crypto.randomUUID(),
			description: 'Corte tesoura',
			durationInSec: TWENTY_MIN_IN_SEC,
			name: 'Corte',
			photo: '',
			price: 45
		});
	}
}