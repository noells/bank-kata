import {OperationsDate} from '../dates/OperationsDate';
import {Transaction, TransactionData, TransactionType} from './Transaction';

export class Balance {
	private currentBalanceValue: number;
	private transactions: Transaction[];

	private constructor(initialBalanceValue: number) {
		this.currentBalanceValue = initialBalanceValue;
		this.transactions = [];
	}

	public static of(initialBalanceValue?: number): Balance {
		const value = initialBalanceValue ? initialBalanceValue : 0;
		return new Balance(value);
	}

	public makeTransaction(amount: number, date: OperationsDate, type: TransactionType): void {
		this.currentBalanceValue =
			type === 'DEPOSIT_OPERATION'
				? this.currentBalanceValue + amount
				: this.currentBalanceValue - amount;
		const transaction = Transaction.of(date, type, amount, this.currentBalanceValue);
		this.transactions.push(transaction);
	}

	public generateBalanceHistory(): TransactionData[] {
		return this.transactions.map((t) => t.toObject());
	}
}
