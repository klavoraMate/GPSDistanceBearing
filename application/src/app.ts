import {IODistanceBearingCalculator} from "./logic/IODistanceBearingCalculator";
import {JsonGPSTrackInputFileParser} from "./IO/in/JsonGPSTrackInputFileParser";
import {MetricDistanceBearingToJsonOutputGenerator} from "./IO/out/MetricDistanceBearingToJsonOutputGenerator";
import {ImperialDistanceBearingToJsonOutputGenerator} from "./IO/out/ImperialDistanceBearingToJsonOutputGenerator";
import {Logger} from "./util/Logger";

const args = process.argv.slice(2);
const inputFileName = args[0];
const outputFileName = args[1];
const measurementSystem = args[2]
switch (measurementSystem) {
    //todo: create a IODistanceBearingCalculatorBuilder
    case "metric": {
        const parser = new JsonGPSTrackInputFileParser(inputFileName);
        const generator = new MetricDistanceBearingToJsonOutputGenerator(outputFileName);
        const calculator = new IODistanceBearingCalculator(parser, generator);
        calculator.run();
        break;
    }
    case "imperial": {
        const parser = new JsonGPSTrackInputFileParser(inputFileName);
        const generator = new ImperialDistanceBearingToJsonOutputGenerator(outputFileName);
        const calculator = new IODistanceBearingCalculator(parser, generator);
        calculator.run()
        break;
    }
    default:
        Logger.info("Invalid command. Usage: node ./dir/src/app.js <input file name> <output file name> [metric,imperial]")
}
