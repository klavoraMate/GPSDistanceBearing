import {Calculator} from "./Calculator";
import {GPSTrack} from "../data/GPSTrack";
import {DistanceBearing} from "../data/DistanceBearing";
import {GeoUtils} from "../util/GeoUtils";

/**
 * A calculator class for calculating the distance and initial bearing
 * between neighboring GPS tracks.
 */
export class DistanceBearingCalculator extends Calculator<AsyncGenerator<GPSTrack>, AsyncGenerator<DistanceBearing>> {
    /**
     * Calculates the distance and initial bearing between neighboring GPS tracks.
     *
     * @param input - An AsyncGenerator contained collection of GPSTrack data representing a series of GPS positions.
     * @returns An array of DistanceBearing data representing the calculated distances and bearings.
     */
    async* calculate(input: AsyncGenerator<GPSTrack>): AsyncGenerator<DistanceBearing> {
        let previousTrack: GPSTrack | undefined = undefined;

        for await (const currentTrack of input) {
            if (previousTrack) {
                const distance = GeoUtils.distance(previousTrack.GPSP, currentTrack.GPSP);
                const bearing = GeoUtils.bearing(previousTrack.GPSP, currentTrack.GPSP);

                yield {
                    fromGPSP: previousTrack.GPSP,
                    distance,
                    bearing,
                };
            }

            previousTrack = currentTrack;
        }
    }
}
