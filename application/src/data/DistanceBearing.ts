import {GPSP} from "./GPSP";

/**
 * Represents a geographic location specified by GPS coordinates, distance, and bearing.
 * @property {GPSP} fromGPSP - The starting GPS position.
 * @property {number} distance - The distance from the starting position in meters.
 * @property {number} bearing - The direction in degrees from the starting position.
 */
export type DistanceBearing={
    fromGPSP:GPSP
    distance:number,
    bearing:number
}
