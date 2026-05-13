import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MetricBar } from './MetricBar';

interface MetricsData {
  transparency: number;
  responsiveness: number;
  easeOfProcess: number;
  trustworthiness: number;
  overallSatisfaction: number;
}

interface FiveMetricScorecardScreenProps {
  data: MetricsData;
}

export function FiveMetricScorecardScreen({
  data,
}: FiveMetricScorecardScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Five-Metric Scorecard</Text>
        <View style={styles.metricsContainer}>
          <MetricBar label="Transparency" score={data.transparency} />
          <MetricBar label="Responsiveness" score={data.responsiveness} />
          <MetricBar label="Ease of Process" score={data.easeOfProcess} />
          <MetricBar label="Trustworthiness" score={data.trustworthiness} />
          <MetricBar label="Overall Satisfaction" score={data.overallSatisfaction} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  content: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  metricsContainer: {
    paddingHorizontal: 4,
  },
});
