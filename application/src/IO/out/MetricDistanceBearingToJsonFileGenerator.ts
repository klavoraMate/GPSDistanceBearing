import { GenericDistanceBearingToFileGenerator } from "./GenericDistanceBearingToFileGenerator";
import { DistanceBearing } from "../../data/DistanceBearing";
import { AsyncJsonOutputFileGenerator } from "./AsyncJsonOutputFileGenerator";

/**
 * A class for generating JSON output files from DistanceBearing data in metric units.
 */
export class MetricDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToFileGenerator {
    private readonly fileName: string;

    constructor(outputFileName: string) {
        this.fileName = outputFileName;
    }

    /**
     * Generates a JSON output file from an AsyncGenerator contained collection of DistanceBearing data in metric units.
     * @param distanceBearings - An array of DistanceBearing data in metric units to be exported.
     */
    generate(distanceBearings: AsyncGenerator<DistanceBearing>): void {
        distanceBearings = this.formatResult(distanceBearings);
        AsyncJsonOutputFileGenerator.generate(distanceBearings, this.fileName);
    }

    /**
     * Formats a collection of DistanceBearing data async in metric units by rounding the values.
     * @param distanceBearings - An array of DistanceBearing data in metric units.
     * @returns A formatted array of DistanceBearing data with rounded values.
     */
    async *formatResult(distanceBearings: AsyncGenerator<DistanceBearing>): AsyncGenerator<DistanceBearing> {
        for await (let distanceBearing of distanceBearings){
           distanceBearing = {
               fromGPSP: distanceBearing.fromGPSP,
               distance: Math.round(distanceBearing.distance),
               bearing: Math.round(distanceBearing.bearing)
           }
           yield distanceBearing;
        }
    }
}
