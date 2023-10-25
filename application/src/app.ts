import {IODataHandler} from "./logic/IODataHandler";
import {JsonGPSTrackInputFileParser} from "./IO/in/JsonGPSTrackInputFileParser";
import {MetricDistanceBearingToJsonFileGenerator} from "./IO/out/MetricDistanceBearingToJsonFileGenerator";
import {ImperialDistanceBearingToJsonFileGenerator} from "./IO/out/ImperialDistanceBearingToJsonFileGenerator";
import {Logger} from "./util/Logger";
import {DistanceBearingCalculator} from "./logic/DistanceBearingCalculator";

const args = process.argv.slice(2);
const inputPath = args[0];
const outputPath = args[1];
const measurementSystem = args[2]
Logger.step("Configuring calculation based on args")
switch (measurementSystem) {
    case "metric": {
        //todo:implement builder
        const parser = new JsonGPSTrackInputFileParser(inputPath);
        const generator = new MetricDistanceBearingToJsonFileGenerator(outputPath);
        const calculator = new DistanceBearingCalculator();
        const handler = new IODataHandler(parser,calculator, generator);
        handler.run();
        break;
    }
    case "imperial": {
        const parser = new JsonGPSTrackInputFileParser(inputPath);
        const generator = new ImperialDistanceBearingToJsonFileGenerator(outputPath);
        const calculator = new DistanceBearingCalculator();
        const handler = new IODataHandler(parser,calculator, generator);
        handler.run();
        break;
    }
    default:
        Logger.info("Invalid command. Usage: node ./dir/src/app.js <input file name> <output file name> [metric,imperial]")
}
