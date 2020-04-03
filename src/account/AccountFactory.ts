import {Account} from './Account';
import {Balance} from '../balance/Balance';
import {BalanceLogger} from '../log/BalanceLogger';
import {ConsoleLogger} from '../log/ConsoleLogger';
import {DefaultAccount} from './DefaultAccount';

export class AccountFactory {
	public static build(initialBalanceValue?: number): Account {
		const balance = Balance.of(initialBalanceValue);
		const consoleLogger = ConsoleLogger.of();
		const balanceLogger = BalanceLogger.of(consoleLogger);

		return DefaultAccount.of(balance, balanceLogger);
	}
}
