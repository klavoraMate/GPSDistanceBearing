import {Point} from "../data/Point";

export abstract class DistanceBearingCalculator{
    distance(pointA:Point,pointB:Point):number{
        return 0;
    }

    bearing(pointA:Point,pointB:Point):number{
        return 0;
    }
}
