import {GenericGPSTrackInputFileParser} from "../IO/in/GenericGPSTrackInputFileParser";
import {GenericDistanceBearingToFileGenerator} from "../IO/out/GenericDistanceBearingToFileGenerator";
import {Logger} from "../util/Logger";
import {Calculator} from "./Calculator";
/**
 * An I/O calculator that extends the DistanceBearingCalculator class and uses
 * generic parsers and generators for input and output operations.
 */
//todo: rename this class
export class IODistanceBearingCalculator {
    private parser: GenericGPSTrackInputFileParser;
    private calculator: Calculator<any, any>;
    private generator: GenericDistanceBearingToFileGenerator;

    constructor(
        parser: GenericGPSTrackInputFileParser,
        calculator: Calculator<any, any>,
        generator: GenericDistanceBearingToFileGenerator
    ) {
        this.parser = parser;
        this.calculator = calculator;
        this.generator = generator;
    }

    /**
     * Runs the I/O calculator, parsing GPS tracks, calculating distances and bearings,
     * and creating an output file.
     */
    async run(): Promise<void> {
        try {
            Logger.step('GPS tracks parsing started.');
            const parsedTracks = await this.parser.parse();
            Logger.step('GPS tracks parsed successfully.');


            Logger.step('Distance and bearing calculation started.')
            const result = this.calculator.calculate(parsedTracks);
            Logger.step('Distance and bearing calculation ended.')

            Logger.step('Creating Distance and bearing calculation output file.');
            this.generator.generate(result);
        } catch (error) {
            Logger.error('An error occurred during running:', error);
            Logger.info('Terminating with failure.');
            process.exit(1);
        }
    }
}
