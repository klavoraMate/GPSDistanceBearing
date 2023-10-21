import {LogLevel} from "./LogLevel";

export class Logger {
    private static MAX_STEP: number = 10;

    private static log(message: string, logLevel: LogLevel): void {
        const logMessage = this.getLogPrefix(logLevel) + message;
        console.log(logMessage);
    }

    private static logWithIndex(message: string, logLevel: LogLevel, index: number): void {
        const logMessage = this.getLogPrefix(logLevel) + '[' + index + '/' + this.MAX_STEP + '] ' + message;
        console.log(logMessage);
    }

    static info(message: string): void {
        this.log(message, LogLevel.INFO);
    }

    static step(message: string, index: number): void {
        this.logWithIndex(message, LogLevel.STEP, index);
    }

    static error(message: string, error: Error | unknown): void {
        let errorLog;
        if (error instanceof Error)
            errorLog = message + '\n' + (error.stack || error.message);
        else
            errorLog = message;
        this.log(errorLog, LogLevel.ERROR);
    }

    private static getLogPrefix(logLevel: LogLevel): string {
        const prefixes = {
            [LogLevel.INFO]: '\x1b[34m[INFO]\x1b[0m ',
            [LogLevel.STEP]: '\x1b[32m[STEP]\x1b[0m ',
            [LogLevel.ERROR]: '\x1b[31m[ERROR]\x1b[0m ',
        };
        return prefixes[logLevel] || '';
    }
}
