import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationIndicatorProps {
  totalScreens: number;
  currentIndex: number;
  dotColor?: string;
  activeDotColor?: string;
}

export function PaginationIndicator({
  totalScreens,
  currentIndex,
  dotColor = '#E5E5E5',
  activeDotColor = '#F67D2C',
}: PaginationIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalScreens }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index && styles.activeDot,
            { backgroundColor: currentIndex === index ? activeDotColor : dotColor },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
});
