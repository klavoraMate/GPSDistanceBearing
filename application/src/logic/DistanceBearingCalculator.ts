import {Point} from "../data/Point";
import {Calculator} from "./Calculator";
import {GPSTrack} from "../data/GPSTrack";
import {DistanceBearing} from "../data/DistanceBearing";

export abstract class DistanceBearingCalculator extends Calculator<GPSTrack[], DistanceBearing[]> {
    protected tracks: GPSTrack[];
    protected results: DistanceBearing[];

    private distance(pointA: Point, pointB: Point): number {
        return 0;
    }

    private bearing(pointA: Point, pointB: Point): number {
        return 0;
    }

    calculate(input: GPSTrack[]): DistanceBearing[] {
        return;
    }
}
