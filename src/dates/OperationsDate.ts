export class OperationsDate {
	private date: string;

	private constructor(date: string) {
		this.date = date;
	}

	public static of(date: string): OperationsDate {
		return new OperationsDate(date);
	}

	public static now(): OperationsDate {
		return new OperationsDate(OperationsDate.getCurrentDateAsString());
	}

	public getDate(): string {
		return this.date;
	}

	private static getCurrentDateAsString(): string {
		const date = new Date();
		const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		return currentDate;
	}
}
