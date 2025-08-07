/**
 * Calculates the destination snap point based on current position, velocity, and available snap points
 * Similar to redash snapPoint function
 * @param value Current position value
 * @param velocity Current velocity
 * @param points Array of snap points to snap to
 * @returns The closest snap point to snap to
 */
export const snapPoint = (
    value: number,
    velocity: number,
    points: number[]
): number => {
    if (points.length === 0) {
        return value;
    }

    const point = value + 0.2 * velocity;
    const deltas = points.map(p => Math.abs(point - p));
    const minDelta = Math.min(...deltas);
    const closestPointIndex = deltas.indexOf(minDelta);

    return points[closestPointIndex] || value;
};

/**
 * Clamps a value between min and max
 * @param value Value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Interpolates a value from one range to another
 * @param value Input value
 * @param inputRange Input range [min, max]
 * @param outputRange Output range [min, max]
 * @param extrapolate How to handle values outside the input range
 * @returns Interpolated value
 */
export const interpolate = (
    value: number,
    inputRange: [number, number],
    outputRange: [number, number],
    extrapolate: 'clamp' | 'extend' = 'clamp'
): number => {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;

    if (extrapolate === 'clamp') {
        if (value <= inputMin) return outputMin;
        if (value >= inputMax) return outputMax;
    }

    const ratio = (value - inputMin) / (inputMax - inputMin);
    return outputMin + ratio * (outputMax - outputMin);
};
