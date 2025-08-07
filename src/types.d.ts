/**
 * Supported animation types
 */
export enum ANIMATIONS {
  SLIDE = 'slide',
  SPRING = 'spring',
  FADE = 'fade',
}

/**
 * Alias for `ANIMATIONS` to allow literal animation type string as prop
 * @alias ANIMATIONS
 */
export type AnimationType = Lowercase<keyof typeof ANIMATIONS>;

/**
 * Supported custom backdrop component position
 */
export enum CUSTOM_BACKDROP_POSITIONS {
  TOP = 'top',
  BEHIND = 'behind',
}

/**
 * Bottom sheet's ref instance methods
 */
export interface BottomSheetMethods {
  /**
   * Expands the bottom sheet to the `height` passed through props
   */
  open(): void;
  /**
   * Collapses the bottom sheet
   */
  close(): void;
  /**
   * Snap to one of the provided snap points by index
   * @param index The index of the snap point to snap to
   */
  snapToIndex(index: number): void;
  /**
   * Snap to a specific position in pixels
   * @param position The position in pixels to snap to
   */
  snapToPosition(position: number): void;
  /**
   * Expand to the highest snap point
   */
  expand(): void;
  /**
   * Collapse to the lowest snap point
   */
  collapse(): void;
}
