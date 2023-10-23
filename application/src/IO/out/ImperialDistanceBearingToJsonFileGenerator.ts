import {GenericDistanceBearingToJsonFileGenerator} from "./GenericDistanceBearingToJsonFileGenerator";
import {DistanceBearing} from "../../data/DistanceBearing";
import {SimpleJsonOutputFileGenerator} from "./SimpleJsonOutputFileGenerator";
import {GeoUtils} from "../../util/GeoUtils";

export class ImperialDistanceBearingToJsonFileGenerator implements GenericDistanceBearingToJsonFileGenerator {
    private fileName: string;

    constructor(outputFileName: string) {
        this.fileName = outputFileName;
    }

    generate(distanceBearings: DistanceBearing[]): void {
        distanceBearings = this.formatResult(distanceBearings);
        SimpleJsonOutputFileGenerator.generate(distanceBearings, this.fileName);
    }

    formatResult(distanceBearings: DistanceBearing[]): DistanceBearing[] {
        return distanceBearings.map((record) => {
            return {
                fromGPSP: record.fromGPSP,
                distance: Math.round(GeoUtils.meterToYard(record.distance)),
                bearing: Math.round(GeoUtils.degreesToRadians(record.bearing))
            }
        })
    }

}
