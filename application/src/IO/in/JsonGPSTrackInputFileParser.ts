import {GenericGPSTrackInputFileParser} from "./GenericGPSTrackInputFileParser";
import {GPSTrack} from "../../data/GPSTrack";
import * as fs from "fs";
import * as path from "path";

export class JsonGPSTrackInputFileParser implements GenericGPSTrackInputFileParser {
    private readonly fileName: string;
    async parse(): Promise<GPSTrack[]> {
        const jsonFilePath = path.join(__dirname, '../../../../resources/' + this.fileName);
        return new Promise<GPSTrack[]>((resolve, reject) => {
            fs.readFile(jsonFilePath, 'utf8', (error, data) => {
                if (error) {
                    console.error('Error reading JSON file:', error);
                    reject(error);
                    return;
                }

                try {
                    const jsonData = JSON.parse(data);
                    const tracks = jsonData.input;
                    resolve(tracks);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    reject(error);
                }
            });
        });
    }

    constructor(inputFileName: string) {
        this.fileName = inputFileName;
    }
}
