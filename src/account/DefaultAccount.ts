import {Account} from './Account';
import {Balance} from '../balance/Balance';
import {BalanceLogger} from '../log/BalanceLogger';
import {Date} from '../dates/Date';
import {TransactionType} from '../balance/Transaction';

export class DefaultAccount implements Account {
	private balance: Balance;
	private balanceLogger: BalanceLogger;
	private date: Date;

	private constructor(balance: Balance, balanceLogger: BalanceLogger, date: Date) {
		this.balance = balance;
		this.balanceLogger = balanceLogger;
		this.date = date;
	}

	public static of(
		balance: Balance,
		balanceLogger: BalanceLogger,
		defaultDate?: Date,
	): DefaultAccount {
		const date = defaultDate ? defaultDate : Date.of();
		return new DefaultAccount(balance, balanceLogger, date);
	}

	public deposit(amount: number): void {
		this.makeTransaction(amount, 'DEPOSIT_OPERATION');
	}

	public withdraw(amount: number): void {
		this.makeTransaction(amount, 'WITHDRAW_OPERATION');
	}

	public printStatement(): void {
		this.balanceLogger.print(this.balance.generateBalanceHistory());
	}

	private makeTransaction(amount: number, type: TransactionType): void {
		this.balance.makeTransaction(amount, this.date.getCurrentDate(), type);
	}
}
