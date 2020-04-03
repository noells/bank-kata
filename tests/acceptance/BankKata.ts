import * as sinon from 'ts-sinon';
import {Account} from '../../src/account/Account';
import {DefaultAccount} from '../../src/account/DefaultAccount';
import {Logger} from '../../src/log/Logger';
import {Balance} from '../../src/balance/Balance';
import {BalanceLogger} from '../../src/log/BalanceLogger';
import {Line} from '../../src/log/Line';
import {OperationsDate} from '../../src/dates/OperationsDate';
import {Date} from '../../src/dates/Date';

describe('tests/acceptance/BankKata', () => {
	describe('Given a client makes a deposit of 1000 on 10-01-2012\
		And a deposit of 2000 on 13-01-2012\
		And a withdrawal of 500 on 14-01-2012', () => {
		let account: Account;
		let balance: Balance;
		let balanceLogger: BalanceLogger;
		let loggerMock: sinon.StubbedInstance<Logger>;
		let dateManagerMock: sinon.StubbedInstance<Date>;

		const operationDates = [
			OperationsDate.of('10-01-2012'),
			OperationsDate.of('13-01-2012'),
			OperationsDate.of('14-01-2012'),
		];

		const makeDepositOnDate = (amount: number, date: OperationsDate): void => {
			dateManagerMock.getCurrentDate.returns(date);
			account.deposit(amount);
		};

		const makeWithdrawOnDate = (amount: number, date: OperationsDate): void => {
			dateManagerMock.getCurrentDate.returns(date);
			account.withdraw(amount);
		};

		const assertCorrectLoggerCalls = (): void =>
			sinon.default.assert.callOrder(
				loggerMock.printLine.withArgs(
					Line.of({
						date: operationDates[0],
						amount: 1000,
						type: 'DEPOSIT_OPERATION',
						runningBalance: 1000,
					}),
				),
				loggerMock.printLine.withArgs(
					Line.of({
						date: operationDates[1],
						amount: 2000,
						type: 'DEPOSIT_OPERATION',
						runningBalance: 3000,
					}),
				),
				loggerMock.printLine.withArgs(
					Line.of({
						date: operationDates[2],
						amount: 500,
						type: 'WITHDRAW_OPERATION',
						runningBalance: 2500,
					}),
				),
			);

		beforeEach(() => {
			dateManagerMock = sinon.stubInterface<Date>();
			loggerMock = sinon.stubInterface<Logger>();
			balanceLogger = BalanceLogger.of(loggerMock);
			balance = Balance.of();
			account = DefaultAccount.of(balance, balanceLogger, dateManagerMock);
			makeDepositOnDate(1000, operationDates[0]);
			makeDepositOnDate(2000, operationDates[1]);
			makeWithdrawOnDate(500, operationDates[2]);
		});

		it('When she prints her bank statement, then she should see a correct line per transaction', () => {
			account.printStatement();
			assertCorrectLoggerCalls();
		});
	});
});
