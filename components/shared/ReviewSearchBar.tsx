import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ReviewSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = ['Recent', 'Top Rated', 'Most Reviews'];

export function ReviewSearchBar({
  searchQuery,
  onSearchChange,
  onFilterPress,
  selectedSort,
  onSortChange,
}: ReviewSearchBarProps) {
  return (
    <View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search funds, tags..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <MaterialIcons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterToggle} onPress={onFilterPress}>
          <MaterialIcons name="filter-list" size={20} color="#F67D2C" />
          <Text style={styles.filterToggleText}>Filters</Text>
        </TouchableOpacity>

        <View style={styles.sortOptions}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.sortChip, selectedSort === option && styles.sortChipActive]}
              onPress={() => onSortChange(option)}
            >
              <Text style={[styles.sortChipText, selectedSort === option && styles.sortChipTextActive]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF0C8',
    borderRadius: 20,
  },
  filterToggleText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#F67D2C',
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 8,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  sortChipActive: {
    backgroundColor: '#F67D2C',
  },
  sortChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  sortChipTextActive: {
    color: '#FFFFFF',
  },
});
