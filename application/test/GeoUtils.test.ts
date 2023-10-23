import {GPSP} from "../src/data/GPSP";
import {GeoUtils} from "../src/util/GeoUtils";

describe('GeoUtils', () => {

    // Happy Cases
    test('distance() should calculate the distance correctly', () => {
        const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
        const pointB: GPSP = { lat: 47.50060, lon: 18.59482 };
        const result = GeoUtils.distance(pointA, pointB);
        expect(result).toBeCloseTo(1222, 0);
    });

    test('bearing() should calculate the bearing correctly', () => {
        const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
        const pointB: GPSP = { lat: 47.50060, lon: 18.59482 };
        const result = GeoUtils.bearing(pointA, pointB);
        expect(result).toBeCloseTo(232, 0);
    });

    // Sad Cases
    test('distance() should handle invalid input gracefully', () => {
        const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
        const pointB: GPSP = pointA;
        const result = GeoUtils.distance(pointA, pointB);
        expect(result).toBe(0);
    });

    test('bearing() should handle invalid input gracefully', () => {
        const pointA: GPSP = { lat: 47.50741, lon: 18.60759 };
        const pointB: GPSP = pointA;
        const result = GeoUtils.bearing(pointA, pointB);
        expect(result).toBeNaN();
    });
});
