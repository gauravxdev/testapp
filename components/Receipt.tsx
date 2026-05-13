import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const receiptData = {
  loanType: 'Home Loan',
  loanId: 'HL-2024-0042',
  amount: '$250,000',
  emi: '$2,150',
  tenure: '15 years',
  interestRate: '7.5%',
  totalPaid: '$38,700',
  remaining: '$211,300',
  status: 'Active',
  generatedDate: new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }),
};

export function Receipt() {
  const [receiptVisible, setReceiptVisible] = useState(false);
  const printProgress = useSharedValue(0);
  const receiptOpacity = useSharedValue(0);

  const handleGenerate = () => {
    setReceiptVisible(true);
    printProgress.value = 0;
    receiptOpacity.value = 0;
    printProgress.value = withTiming(1, {
      duration: 1800,
      easing: Easing.out(Easing.ease),
    });
    receiptOpacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });
  };

  const receiptAnimatedStyle = useAnimatedStyle(() => ({
    maxHeight: printProgress.value * 420,
    opacity: receiptOpacity.value,
    overflow: 'hidden',
  }));

  const printLineStyle = useAnimatedStyle(() => ({
    width: `${printProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <MaterialIcons name="print" size={20} color="#FFFFFF" />
        <Text style={styles.generateButtonText}>Generate Receipt</Text>
      </TouchableOpacity>

      {receiptVisible && (
        <Animated.View style={[styles.receiptCard, receiptAnimatedStyle]}>
          <View style={styles.receiptContent}>
            <View style={styles.receiptHeader}>
              <MaterialIcons name="receipt-long" size={28} color="#F67D2C" />
              <Text style={styles.receiptTitle}>Payment Receipt</Text>
              <Text style={styles.receiptDate}>{receiptData.generatedDate}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.receiptBody}>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Loan ID</Text>
                <Text style={styles.receiptValue}>{receiptData.loanId}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Loan Type</Text>
                <Text style={styles.receiptValue}>{receiptData.loanType}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Loan Amount</Text>
                <Text style={styles.receiptValue}>{receiptData.amount}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Monthly EMI</Text>
                <Text style={styles.receiptValue}>{receiptData.emi}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Tenure</Text>
                <Text style={styles.receiptValue}>{receiptData.tenure}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Interest Rate</Text>
                <Text style={styles.receiptValue}>{receiptData.interestRate}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Total Paid</Text>
                <Text style={[styles.receiptValue, { color: '#4CAF50' }]}>{receiptData.totalPaid}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Remaining</Text>
                <Text style={styles.receiptValue}>{receiptData.remaining}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{receiptData.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.receiptFooter}>
              Thank you for your continued trust.
            </Text>

            <Animated.View style={[styles.printLine, printLineStyle]} />
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F67D2C',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  receiptContent: {
    padding: 20,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  receiptDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  receiptBody: {
    gap: 10,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptLabel: {
    fontSize: 14,
    color: '#666',
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  receiptFooter: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  printLine: {
    height: 2,
    backgroundColor: '#F67D2C',
    borderRadius: 1,
    marginTop: 12,
    alignSelf: 'center',
  },
});
