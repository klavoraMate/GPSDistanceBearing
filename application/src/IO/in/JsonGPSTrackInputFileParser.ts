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
     * @returns An AsyncGenerator of GPSTrack objects.
     */
    async* parse(): AsyncGenerator<GPSTrack> {
        const jsonFilePath = path.join(__dirname, '../../../../resources/' + this.fileName);
        const fileDescriptor = fs.openSync(jsonFilePath, 'r');
        const fileStream = fs.createReadStream(jsonFilePath, {encoding: 'utf8'});
        const buffer = Buffer.alloc(1);
        let jsonString = '';
        let bytesRead;

        while (bytesRead = fs.readSync(fileDescriptor, buffer, 0, 1, null) > 0) {
            const char = buffer.toString();

        }

        if (jsonString.trim() !== '') {
            Logger.info('Incomplete JSON data at the end of the file: ' + jsonString);
        }

    }
}
