export class DurationCalculator {
	static APPOINTMENT_MARGIN_DURATION_IN_SEC = 10 * 60;
	static ONE_THOUSAND_MILISECONDS = 1000;

	static calculateFinishDate(startAt: Date, durationServiceInSeconds: number) {
		const startDateInMiliseconds = startAt.getTime();
		const durationServiceInMiliseconds = DurationCalculator.secToMili(durationServiceInSeconds);
		const marginInMiliseconds = this.secToMili(this.APPOINTMENT_MARGIN_DURATION_IN_SEC);
		const finishAt = startDateInMiliseconds + durationServiceInMiliseconds + marginInMiliseconds;
		return new Date(finishAt);
	}

	static secToMili(seconds: number) {
		return seconds * this.ONE_THOUSAND_MILISECONDS;
	}
}