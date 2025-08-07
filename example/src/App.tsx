import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet, { type BottomSheetMethods } from '@r0h0gg6/bottom-sheet';


const SnapPointsExample = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const snapPoints = [200, '50%', '90%']; // 200px, 50% of screen, 90% of screen

  const handleSnapPress = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  const handleChange = (index: number, position: number) => {
    console.log('Snap point changed:', { index, position });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snap Points Example</Text>

      <View style={styles.buttonContainer}>
        <Button title="Snap to 200px" onPress={() => handleSnapPress(0)} />
        <Button title="Snap to 50%" onPress={() => handleSnapPress(1)} />
        <Button title="Snap to 90%" onPress={() => handleSnapPress(2)} />
        <Button title="Close" onPress={() => bottomSheetRef.current?.close()} />
        <Button title="Expand" onPress={() => bottomSheetRef.current?.expand()} />
        <Button title="Collapse" onPress={() => bottomSheetRef.current?.collapse()} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0} // Start at first snap point (200px)
        onChange={handleChange}
        modal={true}
        closeOnDragDown={true}
      >
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Bottom Sheet Content</Text>
          <Text style={styles.contentText}>
            This bottom sheet supports snap points! You can drag it to different positions
            or use the buttons above to snap to specific points.
          </Text>
          <Text style={styles.contentText}>
            The snap points are: 200px, 50% of screen height, and 90% of screen height.
          </Text>
        </View>
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
});

export default SnapPointsExample;
