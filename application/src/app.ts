import {IODataHandler} from "./logic/IODataHandler";
import {JsonGPSTrackInputFileParser} from "./IO/in/JsonGPSTrackInputFileParser";
import {MetricDistanceBearingToJsonFileGenerator} from "./IO/out/MetricDistanceBearingToJsonFileGenerator";
import {ImperialDistanceBearingToJsonFileGenerator} from "./IO/out/ImperialDistanceBearingToJsonFileGenerator";
import {Logger} from "./util/Logger";
import {DistanceBearingCalculator} from "./logic/DistanceBearingCalculator";
import {IODataHandlerBuilder} from "./util/IODatahandlerBuilder";

const args = process.argv.slice(2);
const inputPath = args[0];
const outputPath = args[1];
const measurementSystem = args[2]
Logger.step("Configuring calculation and IO properties based on args")
let handler;
switch (measurementSystem) {
    case "metric": {
        handler = IODataHandlerBuilder
            .parser(new JsonGPSTrackInputFileParser(inputPath))
            .calculator(new DistanceBearingCalculator())
            .generator(new MetricDistanceBearingToJsonFileGenerator(outputPath))
            .build();
        handler.run();
        break;
    }
    case "imperial": {
        handler = IODataHandlerBuilder
            .parser(new JsonGPSTrackInputFileParser(inputPath))
            .calculator(new DistanceBearingCalculator())
            .generator(new ImperialDistanceBearingToJsonFileGenerator(outputPath))
            .build();
        handler.run();
        break;
    }
    default:
        Logger.info("Invalid command. Usage: node ./dir/src/app.js <input file path with name and type> <output file path with name and type> [metric,imperial]")
}
