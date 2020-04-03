import * as sinon from 'ts-sinon';
import {Account} from '../../../src/account/Account';
import {DefaultAccount} from '../../../src/account/DefaultAccount';
import {Balance} from '../../../src/balance/Balance';
import {OperationsDate} from '../../../src/dates/OperationsDate';
import {BalanceLogger} from '../../../src/log/BalanceLogger';

const getRandomNumber = (): number => Math.random() * 100;

describe('tests/unit/account/DefaultAccount.ts', () => {
	describe('Given a user has an Account', () => {
		let account: Account;
		let balance: sinon.StubbedInstance<Balance>;
		let statementPrinter: sinon.StubbedInstance<BalanceLogger>;
		let amount: number;

		before(() => {
			balance = sinon.stubInterface<Balance>();
			statementPrinter = sinon.stubInterface<BalanceLogger>();
			account = DefaultAccount.of(balance, statementPrinter);
		});

		beforeEach(() => {
			amount = getRandomNumber();
		});

		describe('When she makes a deposit', () => {
			it('should make a deposit on its statement', () => {
				account.deposit(amount);
				sinon.default.assert.calledWith(
					balance.makeTransaction,
					amount,
					OperationsDate.now(),
					'DEPOSIT_OPERATION',
				);
			});
		});

		describe('When she makes a withdraw', () => {
			it('should make a withdraw on its statement', () => {
				account.withdraw(amount);
				sinon.default.assert.calledWith(
					balance.makeTransaction,
					amount,
					OperationsDate.now(),
					'WITHDRAW_OPERATION',
				);
			});
		});
		describe('When she wants to print her statement', () => {
			it('should call properly the printer', () => {
				account.printStatement();
				sinon.default.assert.calledOnce(statementPrinter.print);
			});
		});
	});
});
