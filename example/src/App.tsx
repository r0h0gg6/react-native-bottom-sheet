import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { type BottomSheetMethods } from '@r0h0gg6/bottom-sheet';

const SnapPointExample = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);

  const snapPoints = ['50%', '90%']; // Back to percentage-only
  const activeSnapPoints = hasUserInteracted ? snapPoints : undefined;

  // Add debugging for snap points
  useEffect(() => {
    console.log('Snap points:', snapPoints);
    console.log('Starting index:', 1);

    // Add a small delay to see the final snap points after normalization
    setTimeout(() => {
      console.log('Final normalized snap points should be calculated now');
    }, 1000);
  }, []);

  const handleSnapPress = (index: number) => {
    console.log('Snapping to index:', index, 'which should be:', snapPoints[index]);
    bottomSheetRef.current?.snapToIndex(index);
  };

  const handleChange = useCallback((index: number, position: number) => {
    console.log('Snap point changed:', { index, position, snapPoint: snapPoints[index] });
    if (index === 1) { // 90% height - show map
      setShowMap(true);
    } else { // 50% height or lower - hide map
      setShowMap(false);
    }
  }, []);

  useEffect(() => {
    bottomSheetRef.current?.open()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snap Points Example</Text>

      {/* Add debug info */}
      <Text style={styles.debugText}>
        Snap Points: {JSON.stringify(snapPoints)}
      </Text>
      <Text style={styles.debugText}>
        Current Index should be: 1 (90%)
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Snap to 50% (index 0)" onPress={() => handleSnapPress(0)} />
        <Button title="Snap to 90% (index 1)" onPress={() => handleSnapPress(1)} />
        <Button title="Close" onPress={() => bottomSheetRef.current?.close()} />
        <Button title="Expand" onPress={() => bottomSheetRef.current?.expand()} />
        <Button title="Collapse" onPress={() => bottomSheetRef.current?.collapse()} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={activeSnapPoints}
        index={1} // Should now correctly start at 90%
        onChange={handleChange}
        modal={false}
        closeOnDragDown={false}
        closeOnBackdropPress={false}
        onAnimate={() => {
          if (!hasUserInteracted) {
            setHasUserInteracted(true);
          }
        }}
      >
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Bottom Sheet Content</Text>
            <Text>
              {showMap ? 'Map is visible (90% height)' : 'Map is hidden (50% height)'}
            </Text>
            <Text style={styles.contentText}>
              This bottom sheet supports snap points! You can drag it to different positions
              or use the buttons above to snap to specific points.
            </Text>
            <Text style={styles.contentText}>
              The snap points are: 50% of screen height (index 0), and 90% of screen height (index 1).
            </Text>
            <Text style={styles.contentText}>
              Scroll through this content to test the scrolling functionality.
            </Text>
            <Text style={styles.contentText}>
              Initially, the sheet uses a fixed height which allows ScrollView to work perfectly.
            </Text>
            <Text style={styles.contentText}>
              After you interact with the buttons or drag handle, snap points become active.
            </Text>
            <Text style={styles.contentText}>
              This approach prevents gesture conflicts during initialization.
            </Text>
            <Text style={styles.contentText}>
              More content here to demonstrate scrolling...
            </Text>
            <Text style={styles.contentText}>
              Keep scrolling to see more content below.
            </Text>
            <Text style={styles.contentText}>
              This is the last piece of content to scroll through.
            </Text>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  content: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default SnapPointExample;