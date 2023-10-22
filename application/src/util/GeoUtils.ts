import {GPSP} from "../data/GPSP";

export class GeoUtils{

    /**
     * Returns the distance along the surface of the earth from pointA to pointB.
     * Distance is calculated with the Haversine formula.
     *
     * @param pointA  Starting Latitude/Longitude point.
     * @param pointB  Destination Latitude/Longitude point.
     * @returns number Distance between the pointA and pointB in meters.
     */
    static distance(pointA: GPSP, pointB: GPSP): number {
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


    /**
     * Returns the initial bearing from pointA to pointB.
     *
     * @param pointA Starting Latitude/Longitude point.
     * @param pointB Destination Latitude/Longitude point.
     * @returns number Initial bearing in degrees from north (0°..360°).
     */
    static bearing(pointA: GPSP, pointB: GPSP): number {
        // tanθ = sinΔλ⋅cosφ2 / cosφ1⋅sinφ2 − sinφ1⋅cosφ2⋅cosΔλ
        const φ1 = pointA.lat * Math.PI / 180;
        const φ2 = pointB.lat * Math.PI / 180;
        const Δλ = (pointB.lon - pointA.lon) * Math.PI / 180;

        const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
        const y = Math.sin(Δλ) * Math.cos(φ2);
        const θ = Math.atan2(y, x);
        const θdeg = θ * 180 / Math.PI
        const a = 180, p = 360;

        return (((2 * a * θdeg / p) % p) + p) % p;

    }
}
