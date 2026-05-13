import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ReviewHeaderProps {
  title: string;
  onProfilePress?: () => void;
}

export function ReviewHeader({ title, onProfilePress }: ReviewHeaderProps) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.userIconContainer} onPress={onProfilePress}>
        <MaterialIcons name="account-circle" size={40} color="#F67D2C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F67D2C',
  },
  userIconContainer: {
    padding: 4,
  },
});
