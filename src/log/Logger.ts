import {Line} from './Line';

export interface Logger {
	printHeaderLine(): void;
	printLine(line: Line): void;
}
