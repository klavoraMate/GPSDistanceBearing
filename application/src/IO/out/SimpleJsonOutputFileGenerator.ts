import path from "path";
import fs from "fs";
import {Logger} from "../../util/Logger";

/**
 * A utility class for exporting data to a JSON file.
 */
export class SimpleJsonOutputFileGenerator<T> {
    /**
     * Generates a JSON file containing the specified data.
     *
     * @param input - The data to be exported to the JSON file.
     * @param fileName - The name of the JSON file to be created or overwritten.
     */
    static generate<T>(input: T, fileName: string): void {
        const resultJson = JSON.stringify({output: input});
        const jsonFilePath = path.join(__dirname, '../../../resources/' + fileName);
        fs.writeFile(jsonFilePath, resultJson, (err) => {
            if (err) {
                Logger.error('Error writing to JSON file:', err);
            } else {
                Logger.step('JSON file <' + fileName + '> saved successfully.');
            }
        });
    }
}
