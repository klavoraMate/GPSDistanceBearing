import { GenericDistanceBearingToFileGenerator } from "./GenericDistanceBearingToFileGenerator";
import { DistanceBearing } from "../../data/DistanceBearing";
import { AsyncJsonOutputFileGenerator } from "./AsyncJsonOutputFileGenerator";
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
     * Generates a JSON output file from an AsyncGenerator contained DistanceBearing data in imperial units.
     * @param distanceBearings - An array of DistanceBearing data in metric units to be converted and exported.
     */
    generate(distanceBearings: AsyncGenerator<DistanceBearing>): void {
        distanceBearings = this.convertResult(distanceBearings);
        AsyncJsonOutputFileGenerator.generate(distanceBearings, this.fileName);
    }

    /**
     * Converts an AsyncGenerator contained DistanceBearing data async from metric to imperial unit, and it is also rounds it.
     * @param distanceBearings - An array of DistanceBearing data in metric units.
     * @returns A formatted array of DistanceBearing rounded data in imperial units.
     */
    async *convertResult(distanceBearings: AsyncGenerator<DistanceBearing>): AsyncGenerator<DistanceBearing> {
        for await (let distanceBearing of distanceBearings){
            distanceBearing = {
                fromGPSP: distanceBearing.fromGPSP,
                distance: Math.round(GeoUtils.meterToYard(distanceBearing.distance)),
                bearing: Math.round(GeoUtils.degreesToRadians(distanceBearing.bearing))
            }
            yield distanceBearing;
        }
    }
}
