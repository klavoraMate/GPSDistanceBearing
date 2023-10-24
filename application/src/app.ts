import {IODistanceBearingCalculator} from "./logic/IODistanceBearingCalculator";
import {JsonGPSTrackInputFileParser} from "./IO/in/JsonGPSTrackInputFileParser";
import {MetricDistanceBearingToJsonFileGenerator} from "./IO/out/MetricDistanceBearingToJsonFileGenerator";
import {ImperialDistanceBearingToJsonFileGenerator} from "./IO/out/ImperialDistanceBearingToJsonFileGenerator";
import {Logger} from "./util/Logger";
import {DistanceBearingCalculator} from "./logic/DistanceBearingCalculator";

const args = process.argv.slice(2);
const inputFileName = args[0];
const outputFileName = args[1];
const measurementSystem = args[2]
Logger.step("Configuring calculation based on args")
switch (measurementSystem) {
    case "metric": {
        //todo:implement builder
        const parser = new JsonGPSTrackInputFileParser(inputFileName);
        const generator = new MetricDistanceBearingToJsonFileGenerator(outputFileName);
        const calculator = new DistanceBearingCalculator();
        const IOCalculator = new IODistanceBearingCalculator(parser,calculator, generator);
        IOCalculator.run();
        break;
    }
    case "imperial": {
        const parser = new JsonGPSTrackInputFileParser(inputFileName);
        const generator = new ImperialDistanceBearingToJsonFileGenerator(outputFileName);
        const calculator = new DistanceBearingCalculator();
        const IOCalculator = new IODistanceBearingCalculator(parser,calculator, generator);
        IOCalculator.run();
        break;
    }
    default:
        Logger.info("Invalid command. Usage: node ./dir/src/app.js <input file name> <output file name> [metric,imperial]")
}
