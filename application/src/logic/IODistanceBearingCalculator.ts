import {DistanceBearingCalculator} from "./DistanceBearingCalculator";
import {GenericGPSTrackInputFileParser} from "../IO/in/GenericGPSTrackInputFileParser";
import {GenericDistanceBearingToJsonOutputGenerator} from "../IO/out/GenericDistanceBearingToJsonOutputGenerator";
import {GPSTrack} from "../data/GPSTrack";

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
                console.log('Parsed tracks:', tracks);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
        //const result = super.calculate(gpsTracks);
        //this.generator.generate(result);
    }
}
