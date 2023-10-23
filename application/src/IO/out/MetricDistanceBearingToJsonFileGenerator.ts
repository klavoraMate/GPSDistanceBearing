import {GenericDistanceBearingToJsonFileGenerator} from "./GenericDistanceBearingToJsonFileGenerator";
import {DistanceBearing} from "../../data/DistanceBearing";
import {SimpleJsonOutputFileGenerator} from "./SimpleJsonOutputFileGenerator";

export class MetricDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToJsonFileGenerator {
    private readonly fileName: string;

    constructor(outputFileName: string) {
        this.fileName = outputFileName;
    }

    generate(distanceBearings: DistanceBearing[]): void {
        distanceBearings = this.formatResult(distanceBearings);
        SimpleJsonOutputFileGenerator.generate(distanceBearings,this.fileName);
    }
    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[] {
        return distanceBearings.map((record)=>{
            return {
                fromGPSP:record.fromGPSP,
                distance:Math.round(record.distance),
                bearing:Math.round(record.bearing)
            }
        })
    }

}
