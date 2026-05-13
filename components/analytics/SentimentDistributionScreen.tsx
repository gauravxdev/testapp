import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DonutChart } from './DonutChart';

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  topPositiveThemes: string[];
  topNeutralThemes: string[];
  topNegativeThemes: string[];
}

interface SentimentDistributionScreenProps {
  data: SentimentData;
}

export function SentimentDistributionScreen({
  data,
}: SentimentDistributionScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Sentiment Distribution</Text>
        <DonutChart
          data={{
            positive: data.positive,
            neutral: data.neutral,
            negative: data.negative,
          }}
        />
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.legendText}>Positive {data.positive}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.legendText}>Neutral {data.neutral}%</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
            <Text style={styles.legendText}>Negative {data.negative}%</Text>
          </View>
        </View>

        <View style={styles.themesSection}>
          <Text style={styles.themeSectionTitle}>Top Positive Themes</Text>
          <View style={styles.themeTags}>
            {data.topPositiveThemes.map((theme, i) => (
              <View key={i} style={[styles.themeTag, styles.themeTagPositive]}>
                <Text style={styles.themeTagText}>{theme}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.themesSection}>
          <Text style={styles.themeSectionTitle}>Top Neutral Themes</Text>
          <View style={styles.themeTags}>
            {data.topNeutralThemes.map((theme, i) => (
              <View key={i} style={[styles.themeTag, styles.themeTagNeutral]}>
                <Text style={styles.themeTagText}>{theme}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.themesSection}>
          <Text style={styles.themeSectionTitle}>Top Negative Themes</Text>
          <View style={styles.themeTags}>
            {data.topNegativeThemes.map((theme, i) => (
              <View key={i} style={[styles.themeTag, styles.themeTagNegative]}>
                <Text style={styles.themeTagText}>{theme}</Text>
              </View>
            ))}
          </View>
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
    marginBottom: 8,
    textAlign: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: '#666',
  },
  themesSection: {
    marginBottom: 16,
  },
  themeSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  themeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  themeTagPositive: {
    backgroundColor: '#E8F5E9',
  },
  themeTagNeutral: {
    backgroundColor: '#FFF8E1',
  },
  themeTagNegative: {
    backgroundColor: '#FFEBEE',
  },
  themeTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A1A',
  },
});
