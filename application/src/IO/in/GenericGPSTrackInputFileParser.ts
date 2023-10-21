import {GPSTrack} from "../../data/GPSTrack";

export interface GenericGPSTrackInputFileParser {
    parse(): Promise<GPSTrack[]>;
}
