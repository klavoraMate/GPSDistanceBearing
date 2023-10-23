import { DistanceBearing } from "../../data/DistanceBearing";

/**
 * An interface for generating output files from an array of DistanceBearing data.
 */
export interface GenericDistanceBearingToFileGenerator {
    /**
     * Generates an output file from an array of DistanceBearing data.
     *
     * @param distanceBearings - An array of DistanceBearing data to be used for file generation.
     */
    generate(distanceBearings: DistanceBearing[]): void;

    /**
     * Formats an array of DistanceBearing data before generating the output file.
     *
     * @param distanceBearings - An array of DistanceBearing data to be formatted.
     * @returns A formatted array of DistanceBearing data.
     */
    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[];
}
