import {DistanceBearingCalculator} from "./DistanceBearingCalculator";
import {GenericGPSTrackInputFileParser} from "../IO/in/GenericGPSTrackInputFileParser";
import {GenericDistanceBearingToJsonOutputGenerator} from "../IO/out/GenericDistanceBearingToJsonOutputGenerator";
import {Logger} from "../util/Logger";

export class IODistanceBearingCalculator extends DistanceBearingCalculator {
    private parser: GenericGPSTrackInputFileParser;
    private generator: GenericDistanceBearingToJsonOutputGenerator;

    constructor(
        parser: GenericGPSTrackInputFileParser,
        generator: GenericDistanceBearingToJsonOutputGenerator
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
            // this.generator.generate(result);
        } catch (error) {
            Logger.error('An error occurred during parsing or calculation:', error);
        }
    }

}
