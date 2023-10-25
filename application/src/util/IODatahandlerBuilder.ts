import { GenericGPSTrackInputFileParser } from "../IO/in/GenericGPSTrackInputFileParser";
import { GenericDistanceBearingToFileGenerator } from "../IO/out/GenericDistanceBearingToFileGenerator";
import {Calculator} from "../logic/Calculator";
import {IODataHandler} from "../logic/IODataHandler";

/**
 * Builder class for creating IODataHandler instances.
 */
export class IODataHandlerBuilder {
    private static parserObject: GenericGPSTrackInputFileParser;
    private static calculatorObject: Calculator<any, any>;
    private static generatorObject: GenericDistanceBearingToFileGenerator;

    /**
     * Set the parser for the IODataHandler.
     * @param parser The parser to use.
     */
    static parser(parser: GenericGPSTrackInputFileParser){
        this.parserObject = parser;
        return this;
    }

    /**
     * Set the calculator for the IODataHandler.
     * @param calculator The calculator to use.
     */
    static calculator(calculator: Calculator<any, any>){
        this.calculatorObject = calculator;
        return this;
    }

    /**
     * Set the generator for the IODataHandler.
     * @param generator The generator to use.
     */
    static generator(generator: GenericDistanceBearingToFileGenerator){
        this.generatorObject = generator;
        return this;
    }

    /**
     * Build an IODataHandler instance with the configured options.
     */
    static build(): IODataHandler {
        if (!this.parserObject || !this.calculatorObject || !this.generatorObject) {
            throw new Error("Parser, calculator, and generator are required to build IODataHandler.");
        }

        return new IODataHandler(this.parserObject, this.calculatorObject, this.generatorObject);
    }
}
