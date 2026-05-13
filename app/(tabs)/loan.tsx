import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { Receipt } from '@/components/Receipt';

export default function LoanScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Loan</Text>
          </View>
          
          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Active Loans</Text>
              <View style={styles.loanItem}>
                <Text style={styles.loanTitle}>Home Loan</Text>
                <Text style={styles.loanAmount}>$250,000</Text>
                <Text style={styles.loanStatus}>Active</Text>
              </View>
              <View style={styles.loanItem}>
                <Text style={styles.loanTitle}>Car Loan</Text>
                <Text style={styles.loanAmount}>$35,000</Text>
                <Text style={styles.loanStatus}>Active</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Apply for Loan</Text>
              <Text style={styles.description}>
                Explore competitive loan options tailored to your needs. Apply in minutes.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Loan Summary</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Total Outstanding</Text>
                <Text style={styles.summaryValue}>$285,000</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Monthly EMI</Text>
                <Text style={styles.summaryValue}>$2,450</Text>
              </View>
            </View>

            <Receipt />
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
  loanItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  loanTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  loanAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F67D2C',
    marginBottom: 2,
  },
  loanStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F67D2C',
  },
});
