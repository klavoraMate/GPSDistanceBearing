import {DistanceBearing} from "../../data/DistanceBearing";

export interface GenericDistanceBearingToJsonOutputGenerator {
    generate(distanceBearings:DistanceBearing[]):void
}
