# SnapPoints Feature Implementation

This document explains how to use the new snapPoints functionality in your react-native-bottom-sheet library, inspired by the @gorhom/bottom-sheet implementation.

## Overview

The snapPoints feature allows your bottom sheet to snap to predefined positions instead of just open/close. This provides a more flexible and user-friendly experience similar to iOS and modern Android bottom sheets.

## Basic Usage

### 1. Simple Snap Points

```tsx
import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from '@your-package/bottom-sheet';
import type { BottomSheetMethods } from '@your-package/bottom-sheet';

const MyComponent = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  // Define snap points - can be numbers (pixels) or strings (percentages)
  const snapPoints = [200, '50%', '90%'];

  return (
    <View>
      <Button 
        title="Open to 50%" 
        onPress={() => bottomSheetRef.current?.snapToIndex(1)} 
      />
      
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0} // Start at first snap point (200px)
        onChange={(index, position) => {
          console.log('Snapped to:', index, 'at position:', position);
        }}
      >
        <Text>Your content here</Text>
      </BottomSheet>
    </View>
  );
};
```

### 2. Mixed Units

You can mix pixel values and percentages:

```tsx
const snapPoints = [150, '25%', 400, '75%', '95%'];
```

## New Props

### `snapPoints?: (number | string)[]`
- Array of snap points that the bottom sheet will snap to
- Can be numbers (pixels) or strings (percentages like '50%')
- When provided, takes precedence over the `height` prop
- Example: `[200, '50%', '90%']`

### `index?: number`
- Initial snap point index (0-based)
- Set to -1 to start with the sheet closed
- Defaults to 0 when snapPoints are provided
- Example: `index={1}` starts at the second snap point

### `onChange?: (index: number, position: number) => void`
- Callback fired when the snap point changes
- `index`: The snap point index (-1 for closed)
- `position`: The actual position in pixels

## New Methods

### `snapToIndex(index: number)`
Snap to a specific snap point by index:
```tsx
bottomSheetRef.current?.snapToIndex(2); // Snap to third snap point
bottomSheetRef.current?.snapToIndex(-1); // Close the sheet
```

### `snapToPosition(position: number)`
Snap to a specific position in pixels:
```tsx
bottomSheetRef.current?.snapToPosition(300); // Snap to 300px height
```

### `expand()`
Snap to the highest snap point:
```tsx
bottomSheetRef.current?.expand();
```

### `collapse()`
Snap to the lowest snap point:
```tsx
bottomSheetRef.current?.collapse();
```

## Migration from Height-based to SnapPoints

### Before (height-based):
```tsx
<BottomSheet
  ref={bottomSheetRef}
  height="50%"
  onOpen={() => console.log('opened')}
  onClose={() => console.log('closed')}
>
  <Text>Content</Text>
</BottomSheet>
```

### After (snap points):
```tsx
<BottomSheet
  ref={bottomSheetRef}
  snapPoints={['50%']}
  index={0}
  onChange={(index, position) => {
    if (index === -1) {
      console.log('closed');
    } else {
      console.log('opened at position:', position);
    }
  }}
>
  <Text>Content</Text>
</BottomSheet>
```

## Advanced Examples

### 1. Multiple Snap Points with Custom Behavior

```tsx
const MyAdvancedSheet = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const snapPoints = [120, '30%', '60%', '90%'];

  const handleSheetChange = (index: number, position: number) => {
    switch (index) {
      case 0:
        console.log('Minimized');
        break;
      case 1:
        console.log('Small view');
        break;
      case 2:
        console.log('Medium view');
        break;
      case 3:
        console.log('Full view');
        break;
      case -1:
        console.log('Closed');
        break;
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={1} // Start at '30%'
      onChange={handleSheetChange}
      closeOnDragDown={true}
    >
      <View style={{ padding: 20 }}>
        <Text>Multi-level content</Text>
        <Button title="Minimize" onPress={() => bottomSheetRef.current?.snapToIndex(0)} />
        <Button title="Expand" onPress={() => bottomSheetRef.current?.expand()} />
      </View>
    </BottomSheet>
  );
};
```

### 2. Dynamic Snap Points

```tsx
const DynamicSheet = () => {
  const [snapPoints, setSnapPoints] = useState(['25%', '50%']);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const addSnapPoint = () => {
    setSnapPoints(prev => [...prev, '75%']);
  };

  return (
    <View>
      <Button title="Add 75% snap point" onPress={addSnapPoint} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        onChange={(index) => console.log('Current index:', index)}
      >
        <Text>Dynamic snap points: {snapPoints.join(', ')}</Text>
      </BottomSheet>
    </View>
  );
};
```

## Backward Compatibility

The implementation maintains full backward compatibility:

- If you don't provide `snapPoints`, the component works exactly as before
- All existing props (`height`, `onOpen`, `onClose`, etc.) continue to work
- Existing `open()` and `close()` methods still function

## Key Features

1. **Smooth Gesture Handling**: Drag the sheet and it will snap to the nearest point based on velocity and position
2. **Percentage Support**: Use '50%', '75%' etc. for responsive layouts
3. **Mixed Units**: Combine pixel values and percentages in the same array
4. **Velocity-based Snapping**: Fast drags will skip intermediate snap points
5. **Programmatic Control**: Use methods to snap to specific positions
6. **Callback Support**: Get notified when snap points change

## Implementation Notes

- Snap points are sorted automatically from lowest to highest
- The sheet will always snap to the closest valid point when released
- Percentage values are calculated relative to the container height
- The `onChange` callback provides both the index and actual pixel position
- Index -1 always represents the closed state

This implementation brings the powerful snap points functionality from @gorhom/bottom-sheet to your existing codebase while maintaining full backward compatibility.
