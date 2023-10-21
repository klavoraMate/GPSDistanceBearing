import {GenericGPSTrackInputFileParser} from "./GenericGPSTrackInputFileParser";
import {GPSTrack} from "../../data/GPSTrack";
import * as fs from "fs";
import * as path from "path";
import {Logger} from "../../util/Logger";

export class JsonGPSTrackInputFileParser implements GenericGPSTrackInputFileParser {
    private readonly fileName: string;

    async parse(): Promise<GPSTrack[]> {
        const jsonFilePath = path.join(__dirname, '../../../../resources/' + this.fileName);
        return new Promise<GPSTrack[]>((resolve, reject) => {
            fs.readFile(jsonFilePath, 'utf8', (error: NodeJS.ErrnoException | null, data) => {
                if (error) {
                    Logger.error('Error reading JSON file:', error);
                    reject(error);
                    return;
                }
                Logger.step("Input file <" + this.fileName + "> found")
                try {
                    const jsonData = JSON.parse(data);
                    const tracks = jsonData.input;
                    resolve(tracks);
                } catch (error) {
                    Logger.error('Error parsing JSON:', error);
                    reject(error);
                }
            });
        });
    }

    constructor(inputFileName: string) {
        this.fileName = inputFileName;
    }
}
