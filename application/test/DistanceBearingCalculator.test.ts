import {DistanceBearingCalculator} from '../src/logic/DistanceBearingCalculator';
import {Point} from "../src/data/Point";

class MockDistanceBearingCalculator extends DistanceBearingCalculator {

}

const pointA: Point = {
    lat: 47.50741,
    lon: 18.60759,
};

const pointB: Point = {
    lat: 47.50060,
    lon: 18.59482,
};

describe('DistanceBearingCalculator', () => {

    test('distance() should calculate the distance correctly', () => {
        const calculator = new MockDistanceBearingCalculator();

        const result = calculator.distance(pointA,pointB);
        expect(result).toBeCloseTo(1213);
    });

    test('bearing() should calculate the bearing correctly', () => {
        const calculator = new MockDistanceBearingCalculator();
        const result = calculator.bearing(pointA,pointB);
        expect(result).toBeCloseTo(232);
    });
});
