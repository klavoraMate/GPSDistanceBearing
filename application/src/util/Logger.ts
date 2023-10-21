export class Logger {
    private static MAX_STEP: number = 10;

    private static log(message: string, logLevel: LogLevel): void {
        const logMessage = this.getLogPrefix(logLevel) + message;
        console.log(logMessage+'\x1b[0m');
    }

    private static logWithIndex(message: string, logLevel: LogLevel, index: number): void {
        const logMessage = this.getLogPrefix(logLevel) + message;
        console.log('[' + index + '/' + this.MAX_STEP + '] ' + logMessage + '\x1b[0m');
    }

    static info(message: string): void {
        this.log(message, LogLevel.INFO);
    }

    static step(message: string, index: number): void {
        this.logWithIndex(message, LogLevel.STEP, index);
    }

    static error(message: string, error: Error): void {
        const errorLog = message + '\n' + (error.stack || error.message);
        this.log(errorLog, LogLevel.ERROR);
    }

    private static getLogPrefix(logLevel: LogLevel): string {
        const prefixes = {
            [LogLevel.INFO]: '\x1b[34m[INFO] ',
            [LogLevel.STEP]: '\x1b[32m[STEP] ',
            [LogLevel.ERROR]: '\x1b[31m[ERROR] ',
        };
        return prefixes[logLevel] || '';
    }
}
