import {expect} from 'chai';
import {Balance} from '../../../src/balance/Balance';
import {OperationsDate} from '../../../src/dates/OperationsDate';
import {TransactionData} from '../../../src/balance/Transaction';

const randomString = (): string => Math.random().toString();

const buildExpectedBalanceHistory = (
	dates: OperationsDate[],
	amounts: {value: number; type: string}[],
	initialBalanceValue: number,
): TransactionData[] => {
	const history = [];
	let currentBalance = initialBalanceValue;

	for (const index in dates) {
		currentBalance =
			amounts[index].type === 'add'
				? currentBalance + amounts[index].value
				: currentBalance - amounts[index].value;

		const historyElement = {
			date: dates[index],
			amount: amounts[index].value,
			type: amounts[index].type === 'add' ? 'DEPOSIT_OPERATION' : 'WITHDRAW_OPERATION',
			runningBalance: currentBalance,
		} as TransactionData;
		history.push(historyElement);
	}

	return history;
};

describe('tests/unit/balance/Balance.ts', () => {
	describe('Given a balance with some transactions', () => {
		let balance: Balance;
		const initialBalanceValue = Math.random() * 100;
		const dates = [
			OperationsDate.of(randomString()),
			OperationsDate.of(randomString()),
			OperationsDate.of(randomString()),
			OperationsDate.of(randomString()),
			OperationsDate.of(randomString()),
		];
		const amounts = [
			{value: Math.random() * 10, type: 'add'},
			{value: Math.random() * 10, type: 'deduct'},
			{value: Math.random() * 10, type: 'add'},
			{value: Math.random() * 10, type: 'deduct'},
			{value: Math.random() * 10, type: 'add'},
		];

		before(() => {
			balance = Balance.of(initialBalanceValue);
			balance.makeTransaction(amounts[0].value, dates[0], 'DEPOSIT_OPERATION');
			balance.makeTransaction(amounts[1].value, dates[1], 'WITHDRAW_OPERATION');
			balance.makeTransaction(amounts[2].value, dates[2], 'DEPOSIT_OPERATION');
			balance.makeTransaction(amounts[3].value, dates[3], 'WITHDRAW_OPERATION');
			balance.makeTransaction(amounts[4].value, dates[4], 'DEPOSIT_OPERATION');
		});

		it('should generate a correct historical record', () => {
			const balanceHistory = balance.generateBalanceHistory();

			const expectedBalanceHistory = buildExpectedBalanceHistory(
				dates,
				amounts,
				initialBalanceValue,
			);
			expect(balanceHistory).to.deep.equals(expectedBalanceHistory);
		});
	});
});
