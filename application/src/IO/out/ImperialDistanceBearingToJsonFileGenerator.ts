import { GenericDistanceBearingToFileGenerator } from "./GenericDistanceBearingToFileGenerator";
import { DistanceBearing } from "../../data/DistanceBearing";
import { SimpleJsonOutputFileGenerator } from "./SimpleJsonOutputFileGenerator";
import { GeoUtils } from "../../util/GeoUtils";

/**
 * A class for generating JSON output files from DistanceBearing data in imperial units.
 */
export class ImperialDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToFileGenerator {
    private fileName: string;

    constructor(outputFileName: string) {
        this.fileName = outputFileName;
    }

    /**
     * Generates a JSON output file from an array of DistanceBearing data in imperial units.
     * @param distanceBearings - An array of DistanceBearing data in metric units to be converted and exported.
     */
    generate(distanceBearings: DistanceBearing[]): void {
        distanceBearings = this.formatResult(distanceBearings);
        SimpleJsonOutputFileGenerator.generate(distanceBearings, this.fileName);
    }

    /**
     * Formats an array of DistanceBearing data from metric to imperial unit, and it is also rounds it.
     * @param distanceBearings - An array of DistanceBearing data in metric units.
     * @returns A formatted array of DistanceBearing rounded data in imperial units.
     */
    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[] {
        return distanceBearings.map((record) => {
            return {
                fromGPSP: record.fromGPSP,
                distance: Math.round(GeoUtils.meterToYard(record.distance)),
                bearing: Math.round(GeoUtils.degreesToRadians(record.bearing))
            };
        });
    }
}
