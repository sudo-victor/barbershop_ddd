import { DurationCalculator } from '../services/duration-calculator';

export class Duration {
	private value: number;
  
	private constructor(value: number) {
		this.value = value;
	}

	toValue() {
		return this.value;
	}

	static generateByServiceDuration(durationInSeconds: number) {
		const finalDuration = durationInSeconds + DurationCalculator.APPOINTMENT_MARGIN_DURATION_IN_SEC;
		return new Duration(finalDuration);
	}

	static generate(durationInSeconds: number) {
		return new Duration(durationInSeconds);
	}
}