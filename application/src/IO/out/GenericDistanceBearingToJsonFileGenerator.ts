import {DistanceBearing} from "../../data/DistanceBearing";

export interface GenericDistanceBearingToJsonFileGenerator {
    generate(distanceBearings:DistanceBearing[]):void
    formatResult(distanceBearings:DistanceBearing[]):DistanceBearing[]
}
