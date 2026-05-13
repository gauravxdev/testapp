import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';

export default function RoadshowsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Roadshows</Text>
          </View>
          
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Upcoming Roadshows</Text>
              <View style={styles.event}>
                <Text style={styles.eventTitle}>Tech Innovation Summit 2024</Text>
                <Text style={styles.eventDate}>March 15, 2024</Text>
                <Text style={styles.eventLocation}>San Francisco, CA</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.eventTitle}>Product Launch Event</Text>
                <Text style={styles.eventDate}>April 20, 2024</Text>
                <Text style={styles.eventLocation}>New York, NY</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Past Roadshows</Text>
              <View style={styles.event}>
                <Text style={styles.eventTitle}>Annual Developer Conference</Text>
                <Text style={styles.eventDate}>January 10, 2024</Text>
                <Text style={styles.eventLocation}>Austin, TX</Text>
              </View>
              <View style={styles.event}>
                <Text style={styles.eventTitle}>Winter Showcase</Text>
                <Text style={styles.eventDate}>December 5, 2023</Text>
                <Text style={styles.eventLocation}>Chicago, IL</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Register for Updates</Text>
              <Text style={styles.description}>
                Stay informed about upcoming roadshows and events in your area.
              </Text>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  event: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1A1A1A',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
