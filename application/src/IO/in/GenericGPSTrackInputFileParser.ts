import {GPSTrack} from "../../data/GPSTrack";

export interface GenericGPSTrackInputFileParser{
    parse():GPSTrack[]
}
