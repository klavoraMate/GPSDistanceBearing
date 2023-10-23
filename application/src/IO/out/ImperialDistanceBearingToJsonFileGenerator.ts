import {GenericDistanceBearingToJsonFileGenerator} from "./GenericDistanceBearingToJsonFileGenerator";
import {DistanceBearing} from "../../data/DistanceBearing";

export class ImperialDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToJsonFileGenerator {
    private fileName: string;
    generate(distanceBearings: DistanceBearing[]): void {
    }
    constructor(outputFileName:string) {
        this.fileName= outputFileName;
    }

    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[] {
        return [];
    }
}
