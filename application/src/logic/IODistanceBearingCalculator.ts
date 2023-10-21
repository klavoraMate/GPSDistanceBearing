import {DistanceBearingCalculator} from "./DistanceBearingCalculator";
import {GenericGPSTrackInputFileParser} from "../IO/in/GenericGPSTrackInputFileParser";
import {GenericDistanceBearingToJsonOutputGenerator} from "../IO/out/GenericDistanceBearingToJsonOutputGenerator";

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

    }
}
