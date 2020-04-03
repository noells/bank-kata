import {OperationsDate} from './OperationsDate';

export class Date {
	public static of(): Date {
		return new Date();
	}

	public getCurrentDate(): OperationsDate {
		return OperationsDate.now();
	}
}
