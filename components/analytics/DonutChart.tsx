import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DonutChartProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
  size?: number;
}

export function DonutChart({ data, size = 200 }: DonutChartProps) {
  const total = data.positive + data.neutral + data.negative;
  const positivePercent = total > 0 ? (data.positive / total) * 100 : 0;
  const neutralPercent = total > 0 ? (data.neutral / total) * 100 : 0;
  const negativePercent = total > 0 ? (data.negative / total) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.chartWrapper, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={styles.segmentContainer}>
          <View 
            style={[
              styles.segment, 
              { 
                backgroundColor: '#4CAF50',
                width: `${positivePercent}%` 
              }
            ]} 
          />
          <View 
            style={[
              styles.segment, 
              { 
                backgroundColor: '#FFC107',
                width: `${neutralPercent}%` 
              }
            ]} 
          />
          <View 
            style={[
              styles.segment, 
              { 
                backgroundColor: '#F44336',
                width: `${negativePercent}%` 
              }
            ]} 
          />
        </View>
        <View style={[styles.centerText, { width: size - 40, height: size - 40, borderRadius: (size - 40) / 2 }]}>
          <Text style={styles.centerLabel}>Total</Text>
          <Text style={styles.centerValue}>{Math.round(total)}%</Text>
        </View>
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Positive {Math.round(positivePercent)}%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
          <Text style={styles.legendText}>Neutral {Math.round(neutralPercent)}%</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Negative {Math.round(negativePercent)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  chartWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 20,
    borderColor: '#F5F5F5',
    overflow: 'hidden',
  },
  segmentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  segment: {
    height: '100%',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  centerLabel: {
    fontSize: 14,
    color: '#666',
  },
  centerValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  legend: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});