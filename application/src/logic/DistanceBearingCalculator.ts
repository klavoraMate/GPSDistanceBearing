import {GPSP} from "../data/GPSP";
import {Calculator} from "./Calculator";
import {GPSTrack} from "../data/GPSTrack";
import {DistanceBearing} from "../data/DistanceBearing";

export abstract class DistanceBearingCalculator extends Calculator<GPSTrack[], DistanceBearing[]> {
    protected tracks: GPSTrack[] = [];
    protected results: DistanceBearing[] = [];

    distance(pointA: GPSP, pointB: GPSP): number {
        const R = 6371e3;
        const φ1 = pointA.lat * Math.PI / 180;
        const φ2 = pointB.lat * Math.PI / 180;
        const Δφ = (pointB.lat - pointA.lat) * Math.PI / 180;
        const Δλ = (pointB.lon - pointA.lon) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c;
        return d;
    }

    bearing(pointA: GPSP, pointB: GPSP): number {
        return 0;
    }

    calculate(input: GPSTrack[]): DistanceBearing[] {
        return [{point: {lat: 0, lon: 0}, distance: 0, bearing: 0}];
    }
}
