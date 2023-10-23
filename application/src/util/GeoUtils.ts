import {GPSP} from "../data/GPSP";

/**
 * Contains general GPS related calculation and helper functions.
 * Also, GPS related unit conversion helper functions.
 * @source: https://www.movable-type.co.uk/scripts/latlong.html
 */
export class GeoUtils {

    /**
     * Returns the distance along the surface of the earth from pointA to pointB.
     * Distance is calculated with the Haversine formula.
     *
     * @param pointA  Starting Latitude/Longitude point.
     * @param pointB  Destination Latitude/Longitude point.
     * @returns number Distance between the pointA and pointB in meters.
     * @example
     *         const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
     *         const pointB: GPSP = { lat: 47.50060, lon: 18.59482 };
     *         const result = GeoUtils.distance(pointA, pointB); // ~1222
     */
    static distance(pointA: GPSP, pointB: GPSP): number {
        // Haversine formula:
        // a = sin²(Δφ/2) + cos(φ1)⋅cos(φ2)⋅sin²(Δλ/2)
        // c = 2·atan2(√(a), √(1−a))
        // d = R * c
        const R = 6371e3; //earth’s radius (mean radius = 6,371km)
        const φ1 = this.degreesToRadians(pointA.lat);
        const φ2 = this.degreesToRadians(pointB.lat);
        const Δφ = this.degreesToRadians((pointB.lat - pointA.lat));
        const Δλ = this.degreesToRadians((pointB.lon - pointA.lon));

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c;
        return d;
    }


    /**
     * Returns the initial bearing from pointA to pointB.
     *
     * @param pointA Starting Latitude/Longitude point.
     * @param pointB Destination Latitude/Longitude point.
     * @returns number Initial bearing in degrees from north (0°..360°).
     * @example
     *         const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
     *         const pointB: GPSP = { lat: 47.50060, lon: 18.59482 };
     *         const result = GeoUtils.bearing(pointA, pointB); // ~232
     */
    static bearing(pointA: GPSP, pointB: GPSP): number{
        if (this.equalPoints(pointA,pointB)) return NaN;
        // tanθ = sinΔλ⋅cosφ2 / cosφ1⋅sinφ2 − sinφ1⋅cosφ2⋅cosΔλ
        const φ1 = this.degreesToRadians(pointA.lat);
        const φ2 = this.degreesToRadians(pointB.lat);
        const Δλ = this.degreesToRadians(pointB.lon - pointA.lon);

        const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
        const y = Math.sin(Δλ) * Math.cos(φ2);
        const θ = Math.atan2(y, x);

        const bearing = this.radiansToDegrees(θ);

        return this.wrap360(bearing);
    }

    /**
     * Checks if two points are the same.
     *
     * @param pointA
     * @param pointB
     * @example
     *      const pointA = {lat:20.31452,lon:40.24562};
     *      const pointB = {lat:30.78355,lon:78.68232};
     *      const pointC = pointA;
     *
     *      equalPoints(pointA,pointB) //false
     *      equalPoints(pointA,pointC) //true
     */
    static equalPoints(pointA:GPSP,pointB:GPSP):boolean{
        return pointA.lat === pointB.lat && pointA.lon === pointB.lon;
    }

    /**
     * Constrain degrees to range 0..360 (for bearings); e.g. -1 => 359, 361 => 1.
     *
     * @private
     * @param  degrees
     * @returns degrees within range 0..360.
     */
    static wrap360(degrees: number): number {
        if (0 <= degrees && degrees < 360) return degrees; // avoid rounding due to arithmetic ops if within range

        // bearing wrapping requires a sawtooth wave function with a vertical offset equal to the
        // amplitude and a corresponding phase shift; this changes the general sawtooth wave function from
        //     f(x) = (2ax/p - p/2) % p - a
        // to
        //     f(x) = (2ax/p) % p
        // where a = amplitude, p = period, % = modulo; however, JavaScript '%' is a remainder operator
        // not a modulo operator - for modulo, replace 'x%n' with '((x%n)+n)%n'
        const x = degrees, a = 180, p = 360;
        return (((2 * a * x / p) % p) + p) % p;
    }

    /**
     * Converts degrees to radians
     *
     * @param number in degrees
     */
    static degreesToRadians(number: number): number {
        return number * Math.PI / 180;
    }

    /**
     * Converts radians to degrees
     *
     * @param number in radians
     */
    static radiansToDegrees(number: number): number {
        return number * 180 / Math.PI;
    }

    /**
     * Converts meters to yards.
     * @param meter Value which needs to be converted.
     * @returns number - Converted value in yards.
     */
    static meterToYard(meter:number):number{
        return meter*1.093613;
    }
}
