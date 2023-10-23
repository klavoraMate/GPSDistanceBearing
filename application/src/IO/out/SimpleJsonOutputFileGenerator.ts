import path from "path";
import fs from "fs";
import {Logger} from "../../util/Logger";

export class SimpleJsonOutputFileGenerator<T>{
    static generate<T>(input:T,fileName:string):void{
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
