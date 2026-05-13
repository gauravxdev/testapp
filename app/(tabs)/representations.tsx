import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';

export default function RepresentationsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Representations</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Representatives</Text>
            <View style={styles.representative}>
              <Text style={styles.repName}>Sarah Johnson</Text>
              <Text style={styles.repRole}>Senior Account Manager</Text>
              <Text style={styles.repContact}>sarah.johnson@company.com</Text>
            </View>
            <View style={styles.representative}>
              <Text style={styles.repName}>Michael Chen</Text>
              <Text style={styles.repRole}>Business Development</Text>
              <Text style={styles.repContact}>michael.chen@company.com</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Request Support</Text>
            <Text style={styles.description}>
              Need assistance? Contact your representative for personalized support.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming Meetings</Text>
            <View style={styles.meeting}>
              <Text style={styles.meetingTitle}>Quarterly Review</Text>
              <Text style={styles.meetingDate}>March 25, 2024 at 2:00 PM</Text>
              <Text style={styles.meetingRep}>with Sarah Johnson</Text>
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1A1A1A',
  },
  representative: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  repName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1A1A1A',
  },
  repRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  repContact: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  meeting: {
    paddingVertical: 10,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1A1A1A',
  },
  meetingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  meetingRep: {
    fontSize: 14,
    color: '#666',
  },
});
