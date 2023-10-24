import {GenericGPSTrackInputFileParser} from "./GenericGPSTrackInputFileParser";
import {GPSTrack} from "../../data/GPSTrack";
import * as fs from "fs";
import * as path from "path";
import {Logger} from "../../util/Logger";

/**
 * A JSON GPSTrack input file parser that implements the GenericGPSTrackInputFileParser interface.
 */
export class JsonGPSTrackInputFileParser implements GenericGPSTrackInputFileParser {
    private readonly fileName: string;

    constructor(inputFileName: string) {
        this.fileName = inputFileName;
    }

    /**
     * Asynchronously parses a JSON file and returns an AsyncGenerator of GPSTrack objects.
     * This method expects the input file to be in the following JSON format:
     * {
     *   "input": [
     *     {
     *       "date": "2013-06-01",
     *       "time": "00:00:04",
     *       "GPSP": {
     *         "lat": 47.50741,
     *         "lon": 18.60759
     *       }
     *     },
     *     {
     *       "date": "2013-06-01",
     *       "time": "00:00:54",
     *       "GPSP": {
     *         "lat": 47.50060,
     *         "lon": 18.59482
     *       }
     *     }
     *   ]
     * }*
     *
     * @returns An AsyncGenerator of GPSTrack objects.
     */
    async* parse(): AsyncGenerator<GPSTrack> {
        const jsonFilePath = path.join(__dirname, '../../../../resources/' + this.fileName);
        const fileDescriptor = fs.openSync(jsonFilePath, 'r');
        const buffer = Buffer.alloc(1);

        // remove trailing: {input:[
        let endReached = false;
        while (fs.readSync(fileDescriptor, buffer, 0, 1, null) > 0 && !endReached) {
            const char = buffer.toString();
            if (char === '[')
                endReached = true;
        }

        while (fs.readSync(fileDescriptor, buffer, 0, 1, null) > 0) {
            endReached = false;
            let closingCount = 0;
            let jsonString = '';
            while (fs.readSync(fileDescriptor, buffer, 0, 1, null) > 0 && !endReached) {
                const char = buffer.toString();
                jsonString += char;
                if (char === '}')
                    closingCount++;
                if (closingCount == 2)
                    endReached = true;
            }

            //try parsing only when jsonString contains the necessary values 
            if (jsonString.includes("date")&&jsonString.includes("time")&&jsonString.includes("GPSP")){
                try {
                    const jsonTrack = JSON.parse(jsonString);
                    const track: GPSTrack = {
                        date: jsonTrack.date,
                        time: jsonTrack.time,
                        GPSP: {
                            lat: jsonTrack.GPSP.lat,
                            lon: jsonTrack.GPSP.lon,
                        },
                    };
                    yield track;
                } catch (error) {
                    Logger.error('Error parsing JSON:', error);
                    throw error;
                }
            }

        }


    }
}
