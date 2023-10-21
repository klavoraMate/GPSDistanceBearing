import {GenericGPSTrackInputFileParser} from "./GenericGPSTrackInputFileParser";
import {GPSTrack} from "../../data/GPSTrack";

export class JsonGPSTrackInputFileParser implements GenericGPSTrackInputFileParser {
    private fileName: string;

    parse(): GPSTrack[] {
        return [{GPSP:{lat: 0, lon: 0}, date: "0", time: "0"}];
    }

    constructor(inputFileName: string) {
        this.fileName = inputFileName;
    }
}
