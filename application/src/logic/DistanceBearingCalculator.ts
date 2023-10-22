import {GPSP} from "../data/GPSP";
import {Calculator} from "./Calculator";
import {GPSTrack} from "../data/GPSTrack";
import {DistanceBearing} from "../data/DistanceBearing";

export abstract class DistanceBearingCalculator extends Calculator<GPSTrack[], DistanceBearing[]> {
    protected tracks: GPSTrack[] = [];
    protected results: DistanceBearing[] = [];

    /**
     * Returns the distance along the surface of the earth from pointA to pointB.
     * Distance is calculated with the Haversine formula.
     *
     * @param pointA  Starting Latitude/Longitude point
     * @param pointB  Destination Latitude/Longitude point
     * @returns number Distance between the pointA and pointB in meters
     */
    distance(pointA: GPSP, pointB: GPSP): number {
        // Haversine formula:
        // a = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
        // c = 2·atan2(√(a), √(1−a))
        // d = R * c
        const R = 6371e3; //earth’s radius (mean radius = 6,371km)
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
