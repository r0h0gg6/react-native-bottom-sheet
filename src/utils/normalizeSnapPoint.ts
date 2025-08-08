/**
 * Converts a snap point to fixed numbers.
 * Converts percentage values to pixel values based on container height.
 * @param snapPoint The snap point to normalize (number or percentage string)
 * @param containerHeight The container height to calculate percentage against
 * @returns The normalized snap point as actual height in pixels
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

    // Return the actual height, not position from top
    // The BottomSheet component expects height values, not position values
    return Math.max(0, normalizedSnapPoint);
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
 * @returns Array of normalized snap points sorted from lowest to highest position (top to bottom)
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

    // Sort from highest height to lowest height (tallest sheet to shortest sheet)
    // This maintains the expected index mapping where higher indices = taller sheets
    return normalized.sort((a, b) => b - a);
};

/**
 * Creates index mapping between original snap points and sorted snap points
 * @param snapPoints Original snap points array
 * @param containerHeight Container height for percentage calculations
 * @returns Mapping functions and normalized arrays
 */
export const createSnapPointMapping = (
    snapPoints: (number | string)[],
    containerHeight: number
) => {
    // Create normalized values with original indices
    const normalizedWithIndices = snapPoints.map((snapPoint, originalIndex) => ({
        originalIndex,
        normalizedValue: normalizeSnapPoint(snapPoint, containerHeight),
        originalSnapPoint: snapPoint
    }));

    // Sort by normalized value (lowest position to highest - top to bottom)
    const sorted = [...normalizedWithIndices].sort((a, b) => a.normalizedValue - b.normalizedValue);

    // Create the sorted normalized array that the component expects
    const sortedNormalizedSnapPoints = sorted.map(item => item.normalizedValue);

    // Create mapping functions
    const originalToSortedIndex = (originalIndex: number): number => {
        return sorted.findIndex(sortedItem => sortedItem.originalIndex === originalIndex);
    };

    const sortedToOriginalIndex = (sortedIndex: number): number => {
        return sorted[sortedIndex]?.originalIndex ?? -1;
    };

    return {
        sortedNormalizedSnapPoints,
        originalToSortedIndex,
        sortedToOriginalIndex,
        normalizedWithIndices,
        sorted
    };
};
