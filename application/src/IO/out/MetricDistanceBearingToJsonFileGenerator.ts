import { GenericDistanceBearingToFileGenerator } from "./GenericDistanceBearingToFileGenerator";
import { DistanceBearing } from "../../data/DistanceBearing";
import { SimpleJsonOutputFileGenerator } from "./SimpleJsonOutputFileGenerator";

/**
 * A class for generating JSON output files from DistanceBearing data in metric units.
 */
export class MetricDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToFileGenerator {
    private readonly fileName: string;

    constructor(outputFileName: string) {
        this.fileName = outputFileName;
    }

    /**
     * Generates a JSON output file from an array of DistanceBearing data in metric units.
     * @param distanceBearings - An array of DistanceBearing data in metric units to be exported.
     */
    generate(distanceBearings: DistanceBearing[]): void {
        distanceBearings = this.formatResult(distanceBearings);
        SimpleJsonOutputFileGenerator.generate(distanceBearings, this.fileName);
    }

    /**
     * Formats an array of DistanceBearing data in metric units by rounding the values.
     * @param distanceBearings - An array of DistanceBearing data in metric units.
     * @returns A formatted array of DistanceBearing data with rounded values.
     */
    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[] {
        return distanceBearings.map((record) => {
            return {
                fromGPSP: record.fromGPSP,
                distance: Math.round(record.distance),
                bearing: Math.round(record.bearing)
            };
        });
    }
}
