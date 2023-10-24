import { LogLevel } from "./LogLevel";

/**
 * A utility class for logging messages with different log levels.
 */
export class Logger {
    private static MAX_STEP: number = 7;
    private static currentStep: number = 0;

    /**
     * Logs an informational message.
     * @param message - The information message to log.
     */
    static info(message: string): void {
        this.log(message, LogLevel.INFO);
    }

    /**
     * Logs a step message along with an index showing progress.
     * @param message - The step message to log.
     */
    static step(message: string): void {
        this.currentStep++;
        this.logWithIndex(message, LogLevel.STEP, this.currentStep);
    }

    /**
     * Logs an error message along with an optional error object.
     * @param message - The error message to log.
     * @param error - An optional error object.
     */
    static error(message: string, error: Error | unknown): void {
        let errorLog;
        if (error instanceof Error)
            errorLog = message + '\n' + (error.stack || error.message);
        else
            errorLog = message;
        this.log(errorLog, LogLevel.ERROR);
    }

    private static log(message: string, logLevel: LogLevel): void {
        const logMessage = this.getLogPrefix(logLevel) + message;
        console.log(logMessage);
    }

    private static logWithIndex(message: string, logLevel: LogLevel, index: number): void {
        const logMessage = this.getLogPrefix(logLevel) + '[' + index + '/' + this.MAX_STEP + '] ' + message;
        console.log(logMessage);
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
