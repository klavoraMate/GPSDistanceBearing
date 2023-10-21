import {GenericGPSTrackInputFileParser} from "./GenericGPSTrackInputFileParser";
import {GPSTrack} from "../../data/GPSTrack";

export class JsonGPSTrackInputFileParser implements GenericGPSTrackInputFileParser {
    private fileName: string;
    parse(): GPSTrack {
        return;
    }
    constructor(inputFileName:string) {
        this.fileName = inputFileName;
    }
}
