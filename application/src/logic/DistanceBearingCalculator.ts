import { Calculator } from "./Calculator";
import { GPSTrack } from "../data/GPSTrack";
import { DistanceBearing } from "../data/DistanceBearing";
import { GeoUtils } from "../util/GeoUtils";

/**
 * An abstract calculator class for calculating the distance and initial bearing
 * between neighboring GPS tracks.
 */
export abstract class DistanceBearingCalculator extends Calculator<GPSTrack[], DistanceBearing[]> {
    /**
     * Calculates the distance and initial bearing between neighboring GPS tracks.
     *
     * @param input - An array of GPSTrack data representing a series of GPS positions.
     * @returns An array of DistanceBearing data representing the calculated distances and bearings.
     */
    calculate(input: GPSTrack[]): DistanceBearing[] {
        const result: DistanceBearing[] = [];
        for (let i = 0; i < input.length - 1; i++) {
            const pointA = input[i].GPSP;
            const pointB = input[i + 1].GPSP;
            const distance = GeoUtils.distance(pointA, pointB);
            const bearing = GeoUtils.bearing(pointA, pointB);
            result.push({
                fromGPSP: pointA,
                distance: distance,
                bearing: bearing
            });
        }
        return result;
    }
}
