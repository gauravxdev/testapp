import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';

export default function RatingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Ratings</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.subtitle}>Overall Rating</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingValue}>4.5</Text>
              <Text style={styles.ratingStars}>★★★★★</Text>
              <Text style={styles.ratingCount}>Based on 1,234 reviews</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Rating Breakdown</Text>
            {[
              { stars: 5, percentage: 70 },
              { stars: 4, percentage: 20 },
              { stars: 3, percentage: 5 },
              { stars: 2, percentage: 3 },
              { stars: 1, percentage: 2 },
            ].map((rating) => (
              <View key={rating.stars} style={styles.ratingBar}>
                <Text style={styles.starLabel}>{rating.stars} ★</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { width: `${rating.percentage}%` }]} />
                </View>
                <Text style={styles.percentage}>{rating.percentage}%</Text>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recent Ratings</Text>
            <View style={styles.ratingCard}>
              <Text style={styles.cardTitle}>Excellent Service</Text>
              <Text style={styles.cardRating}>★★★★★</Text>
              <Text style={styles.cardText}>Great experience with the team!</Text>
            </View>
            <View style={styles.ratingCard}>
              <Text style={styles.cardTitle}>Good Product</Text>
              <Text style={styles.cardRating}>★★★★☆</Text>
              <Text style={styles.cardText}>Met my expectations well.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: 100,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F67D2C',
  },
  content: {
    gap: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  ratingContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFF0C8',
    borderRadius: 12,
  },
  ratingValue: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F67D2C',
    textAlign: 'center',
  },
  ratingStars: {
    fontSize: 32,
    marginBottom: 10,
    color: '#F67D2C',
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  starLabel: {
    width: 40,
    fontSize: 14,
    color: '#1A1A1A',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#F67D2C',
    borderRadius: 4,
  },
  percentage: {
    width: 45,
    fontSize: 14,
    textAlign: 'right',
    color: '#1A1A1A',
  },
  ratingCard: {
    backgroundColor: '#FFF0C8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1A1A1A',
  },
  cardRating: {
    fontSize: 20,
    marginBottom: 5,
    color: '#F67D2C',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
  },
});
