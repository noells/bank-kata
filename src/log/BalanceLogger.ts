import {Logger} from './Logger';
import {Line} from './Line';
import {TransactionData} from '../balance/Transaction';

export class BalanceLogger {
	private logger: Logger;
	private constructor(logger: Logger) {
		this.logger = logger;
	}

	public static of(logger: Logger): BalanceLogger {
		return new BalanceLogger(logger);
	}

	public print(linesData: TransactionData[]): void {
		this.logger.printHeaderLine();
		linesData.map(Line.of).forEach(this.logger.printLine);
	}
}
