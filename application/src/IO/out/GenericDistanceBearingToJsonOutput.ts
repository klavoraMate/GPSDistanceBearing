import {DistanceBearing} from "../../data/DistanceBearing";

export interface GenericDistanceBearingToJsonOutput{
    generate(distanceBearings:DistanceBearing[]):void
}
