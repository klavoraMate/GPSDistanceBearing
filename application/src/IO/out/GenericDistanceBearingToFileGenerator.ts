import { DistanceBearing } from "../../data/DistanceBearing";

/**
 * An interface for generating output files from an array of DistanceBearing data.
 */
export interface GenericDistanceBearingToFileGenerator {
    /**
     * Generates an output file from an AsyncGenerator contained collection of DistanceBearing data.
     *
     * @param distanceBearings - An array of DistanceBearing data to be used for file generation.
     */
    generate(distanceBearings: AsyncGenerator<DistanceBearing>): void;

    /**
     * Formats an AsyncGenerator contained collection of DistanceBearing data before generating the output file.
     *
     * @param distanceBearings - An array of DistanceBearing data to be formatted.
     * @returns A formatted array of DistanceBearing data.
     */
    formatResult(distanceBearings: AsyncGenerator<DistanceBearing>): AsyncGenerator<DistanceBearing>;
}
