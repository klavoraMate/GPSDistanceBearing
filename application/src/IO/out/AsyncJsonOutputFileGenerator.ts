import path  from "path";
import fs from "fs";
import {Logger} from "../../util/Logger";

/**
 * A utility class for exporting data to a JSON file.
 */
export class AsyncJsonOutputFileGenerator<T> {
    /**
     * Generates a JSON file containing the specified data.
     *
     * @param input - The AsyncGenerator contained data to be exported to the JSON file.
     * @param pathString - The name of the JSON file to be created or overwritten.
     */
    static async generate<T>(input: AsyncGenerator<T>, pathString: string): Promise<void> {
        const jsonFilePath = path.join(pathString);
        const writeStream = fs.createWriteStream(jsonFilePath, { encoding: 'utf8' });

        writeStream.write('{"output": [', 'utf8');

        let firstItem = true;

        for await (const item of input) {
            if (firstItem) {
                firstItem = false;
            } else {
                writeStream.write(',', 'utf8');
            }

            const itemJson = JSON.stringify(item);
            writeStream.write(itemJson, 'utf8');
        }

        writeStream.end(']}', 'utf8');

        writeStream.on('finish', () => {
            Logger.step('JSON file <' + pathString + '> saved successfully.');
        });

        writeStream.on('error', (err) => {
            Logger.error('Error writing to JSON file:', err);
        });
    }
}
