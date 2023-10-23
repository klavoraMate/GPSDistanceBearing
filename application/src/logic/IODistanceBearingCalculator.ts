import {DistanceBearingCalculator} from "./DistanceBearingCalculator";
import {GenericGPSTrackInputFileParser} from "../IO/in/GenericGPSTrackInputFileParser";
import {GenericDistanceBearingToFileGenerator} from "../IO/out/GenericDistanceBearingToFileGenerator";
import {Logger} from "../util/Logger";

export class IODistanceBearingCalculator extends DistanceBearingCalculator {
    private parser: GenericGPSTrackInputFileParser;
    private generator: GenericDistanceBearingToFileGenerator;

    constructor(
        parser: GenericGPSTrackInputFileParser,
        generator: GenericDistanceBearingToFileGenerator
    ) {
        super();
        this.parser = parser;
        this.generator = generator;
    }

    async run(): Promise<void> {
        try {
            Logger.step('GPS tracks parsing started.');
            const parsedTracks = await this.parser.parse();
            Logger.step('GPS tracks parsed successfully.');

            Logger.step('Distance and bearing calculation started.')
            const result = super.calculate(parsedTracks);
            Logger.step('Distance and bearing calculation ended.')

            Logger.step('Creating Distance and bearing calculation output file.')
            this.generator.generate(result);
        } catch (error) {
            Logger.error('An error occurred during running:', error);
            Logger.info('Terminating with failure.')
            process.exit(1)
        }
    }

}
