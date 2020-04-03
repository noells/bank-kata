import {Logger} from './Logger';
import {Line} from './Line';

export class ConsoleLogger implements Logger {
	public static of(): ConsoleLogger {
		return new ConsoleLogger();
	}

	public printHeaderLine(): void {
		console.log('DATE \t AMOUNT \t BALANCE');
	}

	public printLine(line: Line): void {
		console.log(line.toString());
	}
}
