import {GenericDistanceBearingToJsonOutputGenerator} from "./GenericDistanceBearingToJsonOutputGenerator";
import {DistanceBearing} from "../../data/DistanceBearing";

export class ImperialDistanceBearingToJsonOutputGenerator implements GenericDistanceBearingToJsonOutputGenerator {
    private fileName: string;
    generate(distanceBearings: DistanceBearing[]): void {
    }
    constructor(outputFileName:string) {
        this.fileName= outputFileName;
    }
}