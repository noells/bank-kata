import {TransactionData} from '../balance/Transaction';

export class Line {
	private line: string;

	private constructor(line: string) {
		this.line = line;
	}

	public static of(transaction: TransactionData): Line {
		const line = `${transaction.date.getDate()} \t | ${transaction.amount} \t | ${
			transaction.runningBalance
		}`;
		return new Line(line);
	}

	public toString(): string {
		return this.line;
	}
}
