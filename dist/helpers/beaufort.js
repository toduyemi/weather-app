import { Units } from '../types/appTypes.types';
const kmhBoundaries = [
    2, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118, 133, 149, 166, 184, 201,
];
const mphBoundaries = [
    1, 4, 8, 13, 19, 25, 32, 39, 47, 55, 64, 73, 83, 93, 104, 115, 125,
];
export function convertToBeaufort(speed, unitState) {
    if (speed < 0) {
        throw new Error('Invalid speed value');
    }
    let beaufort;
    if (unitState == Units.metric) {
        speed = mpsToKmh(speed);
        beaufort = kmhBoundaries.reduce((acc, curr) => {
            return acc + (speed >= curr ? 1 : 0);
        }, 0);
    }
    else {
        beaufort = mphBoundaries.reduce((acc, curr) => {
            return acc + (speed > curr ? 1 : 0);
        }, 0);
    }
    return beaufort;
}
export function mpsToKmh(speed) {
    return 3.6 * speed;
}
//# sourceMappingURL=beaufort.js.map