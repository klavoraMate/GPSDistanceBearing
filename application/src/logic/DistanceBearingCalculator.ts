import {Calculator} from "./Calculator";
import {GPSTrack} from "../data/GPSTrack";
import {DistanceBearing} from "../data/DistanceBearing";

export abstract class DistanceBearingCalculator extends Calculator<GPSTrack[], DistanceBearing[]> {
    protected tracks: GPSTrack[] = [];
    protected results: DistanceBearing[] = [];




    calculate(input: GPSTrack[]): DistanceBearing[] {
        return [{point: {lat: 0, lon: 0}, distance: 0, bearing: 0}];
    }
}
