import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetricBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
}

export function MetricBar({
  label,
  score,
  maxScore = 5,
  color = '#F67D2C',
}: MetricBarProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.score}>{score.toFixed(1)}</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  score: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F67D2C',
  },
  barBackground: {
    height: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
});
