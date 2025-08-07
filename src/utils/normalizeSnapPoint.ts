/**
 * Converts a snap point to fixed numbers.
 * Converts percentage values to pixel values based on container height.
 * @param snapPoint The snap point to normalize (number or percentage string)
 * @param containerHeight The container height to calculate percentage against
 * @returns The normalized snap point position in pixels from the top
 */
export const normalizeSnapPoint = (
    snapPoint: number | string,
    containerHeight: number
): number => {
    let normalizedSnapPoint = snapPoint;

    // percentage snap point
    if (typeof normalizedSnapPoint === 'string') {
        const percentage = Number(normalizedSnapPoint.split('%')[0]);
        normalizedSnapPoint = (percentage * containerHeight) / 100;
    }

    // Convert height to position from top
    // If snapPoint is 200px height, position from top should be containerHeight - 200
    return Math.max(0, containerHeight - normalizedSnapPoint);
};

/**
 * Validates that a snap point is in the correct format
 * @param snapPoint The snap point to validate
 */
export const validateSnapPoint = (snapPoint: number | string): void => {
    if (typeof snapPoint !== 'number' && typeof snapPoint !== 'string') {
        throw new Error(
            `'${snapPoint}' is not a valid snap point! Expected types are string or number.`
        );
    }

    if (typeof snapPoint === 'string') {
        if (!snapPoint.includes('%')) {
            throw new Error(
                `'${snapPoint}' is not a valid percentage snap point! Expected percentage snap point must include '%'. e.g. '50%'`
            );
        }

        const numericPart = snapPoint.split('%')[0];
        if (!Number(numericPart) && numericPart !== '0') {
            throw new Error(
                `'${snapPoint}' is not a valid percentage snap point! Expected percentage snap point must be only numbers and '%'. e.g. '50%'`
            );
        }
    }
};

/**
 * Normalizes an array of snap points and sorts them
 * @param snapPoints Array of snap points to normalize
 * @param containerHeight Container height for percentage calculations
 * @returns Array of normalized snap points sorted from highest to lowest position
 */
export const normalizeSnapPoints = (
    snapPoints: (number | string)[],
    containerHeight: number
): number[] => {
    // Validate all snap points
    snapPoints.forEach(validateSnapPoint);

    // Normalize all snap points
    const normalized = snapPoints.map(snapPoint =>
        normalizeSnapPoint(snapPoint, containerHeight)
    );

    // Sort from highest position to lowest (top to bottom)
    return normalized.sort((a, b) => a - b);
};
