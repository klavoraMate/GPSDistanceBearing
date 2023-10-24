import {GPSTrack} from "../../data/GPSTrack";

/**
 * Represents an interface for parsing GPSTrack data from various types of files.
 */
export interface GenericGPSTrackInputFileParser {
    /**
     * Asynchronously parses a file and extracts an array of GPSTrack objects.
     * @returns A Promise that resolves to an array of GPSTrack objects.
     */
    parse(): AsyncGenerator<GPSTrack>;
}
