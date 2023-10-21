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

    run(): void {
        this.parser.parse()
            .then(tracks => {
                Logger.step('GPS tracks parsed successfully',1);
            })
            .catch(error => {
                Logger.error('An error occurred during parsing the input:', error);
            });
        //const result = super.calculate(gpsTracks);
        //this.generator.generate(result);
    }
}
