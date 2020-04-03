import * as sinon from 'ts-sinon';
import {BalanceLogger} from '../../../src/log/BalanceLogger';
import {Balance} from '../../../src/balance/Balance';
import {OperationsDate} from '../../../src/dates/OperationsDate';
import {Line} from '../../../src/log/Line';
import {Logger} from '../../../src/log/Logger';

describe('tests/unit/account/BalanceLogger', () => {
	describe('Given an BalanceLogger', () => {
		let loggerMock: sinon.StubbedInstance<Logger>;
		let balanceLogger: BalanceLogger;

		before(() => {
			loggerMock = sinon.stubInterface<Logger>();
			balanceLogger = BalanceLogger.of(loggerMock);
		});

		describe('Given a balance with several operations', () => {
			const date = OperationsDate.now();
			let balance: Balance;

			before(() => {
				balance = Balance.of(200);
				balance.makeTransaction(65, OperationsDate.now(), 'DEPOSIT_OPERATION');
				balance.makeTransaction(25, OperationsDate.now(), 'WITHDRAW_OPERATION');
				balance.makeTransaction(125, OperationsDate.now(), 'WITHDRAW_OPERATION');
				balance.makeTransaction(1654, OperationsDate.now(), 'DEPOSIT_OPERATION');
			});

			it('the logger should print all transactions correctly', () => {
				balanceLogger.print(balance.generateBalanceHistory());

				sinon.default.assert.callOrder(
					loggerMock.printLine.withArgs(
						Line.of({date, amount: 65, type: 'DEPOSIT_OPERATION', runningBalance: 265}),
					),
					loggerMock.printLine.withArgs(
						Line.of({date, amount: 25, type: 'WITHDRAW_OPERATION', runningBalance: 240}),
					),
					loggerMock.printLine.withArgs(
						Line.of({date, amount: 125, type: 'WITHDRAW_OPERATION', runningBalance: 115}),
					),
					loggerMock.printLine.withArgs(
						Line.of({date, amount: 1654, type: 'DEPOSIT_OPERATION', runningBalance: 1769}),
					),
				);
			});
		});
	});
});
