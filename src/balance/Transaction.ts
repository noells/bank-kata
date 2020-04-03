import {OperationsDate} from '../dates/OperationsDate';

export interface TransactionData {
	date: OperationsDate;
	type: TransactionType;
	amount: number;
	runningBalance: number;
}

export type TransactionType = 'DEPOSIT_OPERATION' | 'WITHDRAW_OPERATION';

export class Transaction {
	private date: OperationsDate;
	private type: TransactionType;
	private amount: number;
	private runningBalance: number;

	private constructor(
		date: OperationsDate,
		type: TransactionType,
		amount: number,
		runningBalance: number,
	) {
		this.date = date;
		this.type = type;
		this.amount = amount;
		this.runningBalance = runningBalance;
	}

	public static of(
		date: OperationsDate,
		type: TransactionType,
		amount: number,
		runningBalance: number,
	): Transaction {
		return new Transaction(date, type, amount, runningBalance);
	}

	public toObject(): TransactionData {
		return {
			date: this.date,
			type: this.type,
			amount: this.amount,
			runningBalance: this.runningBalance,
		};
	}
}
