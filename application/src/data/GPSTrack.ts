import { GPSP } from "./GPSP";

/**
 * Represents a GPS track with date, time, and GPS position information.
 * @property {string} date - The date in the format YYYY-MM-DD.
 * @property {string} time - The time in the format HH:MM:SS.
 * @property {GPSP} GPSP - GPS coordinates with latitude and longitude.
 */
export type GPSTrack = {
    date: string;
    time: string;
    GPSP: GPSP;
}
