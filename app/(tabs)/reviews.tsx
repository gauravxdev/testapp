import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { ThemedView } from '@/components/themed-view';
import { AnalyticsCarouselModal, ProductAnalyticsData } from '@/components/analytics/AnalyticsCarouselModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_SPACING = 8;
const CARD_OFFSET = CARD_WIDTH + CARD_SPACING * 2;
const SPRING_CONFIG = {
  damping: 28,
  stiffness: 200,
  mass: 0.8,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 2,
};

interface ProductCard {
  id: number;
  title: string;
  subtitle: string;
  assetType: string;
  totalReviews: number;
  tags: string[];
  positiveCount: number;
  negativeCount: number;
  rating: number;
}

const products: ProductCard[] = [
  { id: 1, title: 'HDFC Large Cap Fund', subtitle: 'Growth - Direct Plan', assetType: 'Mutual Fund', totalReviews: 278, tags: ['Large CAP Stocks', 'ETF', 'IPO'], positiveCount: 67, negativeCount: 40, rating: 4.5 },
  { id: 2, title: 'ICICI Prudential Bluechip', subtitle: 'Growth Plan', assetType: 'Mutual Fund', totalReviews: 342, tags: ['Bluechip Stocks', 'Diversified'], positiveCount: 72, negativeCount: 35, rating: 4.8 },
  { id: 3, title: 'TCS Infra Growth', subtitle: 'Equity Shares', assetType: 'Stocks', totalReviews: 156, tags: ['IT', 'Large CAP', 'Growth'], positiveCount: 58, negativeCount: 45, rating: 4.2 },
  { id: 4, title: 'Axis Mid Cap Fund', subtitle: 'Growth Option', assetType: 'Mutual Fund', totalReviews: 189, tags: ['Mid CAP', 'Moderate Risk'], positiveCount: 65, negativeCount: 38, rating: 4.6 },
  { id: 5, title: 'Nifty 50 ETF', subtitle: 'Index Tracker', assetType: 'ETF', totalReviews: 234, tags: ['Index', 'Diversified', 'Low Cost'], positiveCount: 70, negativeCount: 42, rating: 4.3 },
  { id: 6, title: 'Reliance IPO 2024', subtitle: 'New Listing', assetType: 'IPO', totalReviews: 198, tags: ['Energy', 'Retail', 'High Demand'], positiveCount: 75, negativeCount: 30, rating: 4.7 },
];

const filterOptions = ['All', 'Mutual Fund', 'Stocks', 'ETF', 'IPO'];
const sortOptions = ['Recent', 'Top Rated', 'Most Reviews'];

const generateAnalyticsData = (product: typeof products[0]): ProductAnalyticsData => ({
  productId: product.id,
  productName: product.title,
  productSubtitle: product.subtitle,
  sentiment: {
    positive: product.positiveCount,
    neutral: Math.round((product.totalReviews - product.positiveCount - product.negativeCount) / 3),
    negative: product.negativeCount,
    topPositiveThemes: ['Finance', 'Energy', 'Banking'],
    topNeutralThemes: ['Technology', 'Healthcare', 'Retail'],
    topNegativeThemes: ['Finance', 'Energy', 'Banking'],
  },
  metrics: {
    transparency: Math.min(5, product.rating + 0.2),
    responsiveness: Math.min(5, product.rating - 0.3),
    easeOfProcess: Math.min(5, product.rating + 0.5),
    trustworthiness: Math.min(5, product.rating - 0.1),
    overallSatisfaction: product.rating,
  },
  resolution: {
    resolved: Math.round((product.positiveCount / product.totalReviews) * 100),
    inProgress: 20,
    unresolved: Math.round((product.negativeCount / product.totalReviews) * 100),
  },
});

export default function ReviewsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Top Rated');
  const [showFilters, setShowFilters] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState<ProductAnalyticsData | null>(null);
  const translateX = useSharedValue(0);

  const handleViewDetails = useCallback((product: typeof products[0]) => {
    const data = generateAnalyticsData(product);
    setSelectedProductData(data);
    setModalVisible(true);
  }, []);

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(p => p.assetType.toLowerCase().includes(selectedFilter.toLowerCase()));
    }
    
    if (selectedSort === 'Top Rated') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'Most Reviews') {
      filtered.sort((a, b) => b.totalReviews - a.totalReviews);
    }
    
    return filtered;
  };

  const getTopRatedProducts = () => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);
  };

  const goToNext = () => {
    if (currentIndex < displayProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      translateX.value = withSpring(-(currentIndex + 1) * CARD_OFFSET, SPRING_CONFIG);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      translateX.value = withSpring(-(currentIndex - 1) * CARD_OFFSET, SPRING_CONFIG);
    }
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = -currentIndex * CARD_OFFSET + event.nativeEvent.translationX;
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const threshold = CARD_WIDTH * 0.2;
      const velocity = event.nativeEvent.velocityX;
      if ((event.nativeEvent.translationX < -threshold || velocity < -300) && currentIndex < displayProducts.length - 1) {
        goToNext();
      } else if ((event.nativeEvent.translationX > threshold || velocity > 300) && currentIndex > 0) {
        goToPrev();
      } else {
        translateX.value = withSpring(-currentIndex * CARD_OFFSET, SPRING_CONFIG);
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const filteredProducts = getFilteredProducts();
  const topRatedProducts = getTopRatedProducts();
  const displayProducts = searchQuery || selectedFilter !== 'All' || selectedSort !== 'Recent' ? filteredProducts : products;

  useEffect(() => {
    if (currentIndex >= displayProducts.length) {
      setCurrentIndex(0);
      translateX.value = withSpring(0, SPRING_CONFIG);
    }
  }, [filteredProducts.length, displayProducts.length, currentIndex, translateX]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MaterialIcons key={i} name="star" size={14} color="#F67D2C" />);
    }
    if (hasHalfStar) {
      stars.push(<MaterialIcons key="half" name="star-half" size={14} color="#F67D2C" />);
    }
    return stars;
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Reviews</Text>
            <TouchableOpacity style={styles.userIconContainer}>
              <MaterialIcons name="account-circle" size={40} color="#F67D2C" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search funds, tags..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="close" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={styles.filterToggle}
              onPress={() => setShowFilters(!showFilters)}
            >
              <MaterialIcons name="filter-list" size={20} color="#F67D2C" />
              <Text style={styles.filterToggleText}>Filters</Text>
            </TouchableOpacity>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortChip, selectedSort === option && styles.sortChipActive]}
                  onPress={() => setSelectedSort(option)}
                >
                  <Text style={[styles.sortChipText, selectedSort === option && styles.sortChipTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {showFilters && (
            <View style={styles.filterOptions}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.filterChip, selectedFilter === option && styles.filterChipActive]}
                  onPress={() => {
                    setSelectedFilter(option);
                    setShowFilters(false);
                  }}
                >
                  <Text style={[styles.filterChipText, selectedFilter === option && styles.filterChipTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="star" size={20} color="#F67D2C" />
              <Text style={styles.sectionTitle}>Top Rated</Text>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topRatedScrollContent}>
              {topRatedProducts.map((product, index) => (
                <View key={product.id} style={styles.topRatedCard}>
                  <View style={styles.topRatedRankRow}>
                    <View style={[styles.topRatedRank, index === 0 && styles.topRatedRankFirst]}>
                      <Text style={styles.topRatedRankText}>#{index + 1}</Text>
                    </View>
                  </View>
                  <View style={styles.topRatedContent}>
                    <Text style={styles.topRatedTitle} numberOfLines={1}>{product.title}</Text>
                    <Text style={styles.topRatedSubtitle} numberOfLines={1}>{product.subtitle}</Text>
                    <View style={styles.topRatedRating}>
                      <View style={styles.starsRow}>
                        {renderStars(product.rating)}
                      </View>
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sliderSection}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="swap-horiz" size={20} color="#F67D2C" />
              <Text style={styles.sectionTitle}>Browse Products</Text>
            </View>

            <View style={styles.cardsContainer}>
              <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
                <Animated.View style={[styles.cardsWrapper, animatedStyle]}>
                  {displayProducts.map((product, index) => (
                    <View key={product.id} style={styles.cardOuter}>
                      <View style={styles.card}>
                        <View style={styles.productHeader}>
                          <Text style={styles.productTitle}>{product.title}</Text>
                          <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                        </View>

                        <View style={styles.productDetails}>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Asset type</Text>
                            <Text style={styles.detailValue}>{product.assetType}</Text>
                          </View>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Total Reviews</Text>
                            <Text style={styles.detailValue}>{product.totalReviews}</Text>
                          </View>
                        </View>

                        <View style={styles.tagsContainer}>
                          {product.tags.map((tag, tagIndex) => (
                            <View key={tagIndex} style={styles.tag}>
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.sentimentSection}>
                          <Text style={styles.sentimentTitle}>Sentiment</Text>
                          <View style={styles.sentimentBarContainer}>
                            <View style={styles.sentimentBar}>
                              <View style={[styles.sentimentFill, { width: `${(product.positiveCount / (product.positiveCount + product.negativeCount)) * 100}%` }]} />
                            </View>
                          </View>
                          <View style={styles.sentimentLabels}>
                            <Text style={styles.sentimentValue}>{product.positiveCount}</Text>
                            <Text style={styles.sentimentValue}>{product.negativeCount}</Text>
                          </View>
                        </View>

                        <View style={styles.actionButtons}>
                          <TouchableOpacity style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Review</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.actionButton, styles.actionButtonSecondary]}
                            onPress={() => handleViewDetails(product)}
                          >
                            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>View Details</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.actionButton, styles.actionButtonTertiary]}>
                            <Text style={[styles.actionButtonText, styles.actionButtonTextTertiary]}>Compare</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </Animated.View>
              </PanGestureHandler>
            </View>

            <View style={styles.pagination}>
              <TouchableOpacity 
                style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]} 
                onPress={goToPrev}
                disabled={currentIndex === 0}
              >
                <MaterialIcons name="chevron-left" size={28} color={currentIndex === 0 ? '#ccc' : '#F67D2C'} />
              </TouchableOpacity>
              
              <View style={styles.dotsContainer}>
                {displayProducts.map((_, index) => (
                  <View 
                    key={index} 
                    style={[styles.dot, currentIndex === index && styles.dotActive]} 
                  />
                ))}
              </View>
              
              <TouchableOpacity 
                style={[styles.navButton, currentIndex === displayProducts.length - 1 && styles.navButtonDisabled]} 
                onPress={goToNext}
                disabled={currentIndex === displayProducts.length - 1}
              >
                <MaterialIcons name="chevron-right" size={28} color={currentIndex === displayProducts.length - 1 ? '#ccc' : '#F67D2C'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Products</Text>
            <Text style={styles.resultCount}>{filteredProducts.length} results found</Text>
            
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productHeaderRow}>
                  <View style={styles.productInfo}>
                    <Text style={styles.cardProductTitle}>{product.title}</Text>
                    <Text style={styles.cardProductSubtitle}>{product.subtitle}</Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingBadgeText}>{product.rating}</Text>
                    <MaterialIcons name="star" size={12} color="#FFF" />
                  </View>
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Asset type</Text>
                    <Text style={styles.detailValue}>{product.assetType}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Reviews</Text>
                    <Text style={styles.detailValue}>{product.totalReviews}</Text>
                  </View>
                </View>

                <View style={styles.cardTagsContainer}>
                  {product.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.cardSentiment}>
                  <Text style={styles.sentimentTitle}>Sentiment</Text>
                  <View style={styles.sentimentBarContainer}>
                    <View style={styles.sentimentBar}>
                      <View style={[styles.sentimentFill, { width: `${(product.positiveCount / (product.positiveCount + product.negativeCount)) * 100}%` }]} />
                    </View>
                  </View>
                  <View style={styles.sentimentLabels}>
                    <Text style={styles.sentimentValue}>{product.positiveCount} Pos</Text>
                    <Text style={styles.sentimentValue}>{product.negativeCount} Neg</Text>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Review</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.actionButtonSecondary]}
                    onPress={() => handleViewDetails(product)}
                  >
                    <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.actionButtonTertiary]}>
                    <Text style={[styles.actionButtonText, styles.actionButtonTextTertiary]}>Compare</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedProductData && (
        <AnalyticsCarouselModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          productData={selectedProductData}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
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
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterChipActive: {
    backgroundColor: '#F67D2C',
    borderColor: '#F67D2C',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sliderSection: {
    marginBottom: 24,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  resultCount: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  topRatedScroll: {
    marginLeft: -16,
  },
  topRatedScrollContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  topRatedCard: {
    width: 150,
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    padding: 14,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#F67D2C',
  },
  topRatedRankRow: {
    marginBottom: 8,
  },
  topRatedRank: {
    backgroundColor: '#F67D2C',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  topRatedRankFirst: {
    backgroundColor: '#FFD700',
  },
  topRatedRankText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topRatedContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRatedTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  topRatedSubtitle: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
  },
  topRatedRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#F67D2C',
    marginLeft: 4,
  },
  cardsContainer: {
    paddingVertical: 8,
    paddingLeft: (SCREEN_WIDTH - CARD_WIDTH) / 2 - CARD_SPACING,
  },
  cardsWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardOuter: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_SPACING,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  productHeader: {
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  productDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#FFF0C8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#F67D2C',
    fontWeight: '500',
  },
  sentimentSection: {
    marginBottom: 12,
  },
  sentimentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  sentimentBarContainer: {
    marginBottom: 4,
  },
  sentimentBar: {
    height: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sentimentFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  sentimentLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sentimentValue: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F67D2C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonSecondary: {
    backgroundColor: '#FFF0C8',
  },
  actionButtonTertiary: {
    backgroundColor: '#E8F5E9',
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionButtonTextSecondary: {
    color: '#F67D2C',
  },
  actionButtonTextTertiary: {
    color: '#4CAF50',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  dotActive: {
    backgroundColor: '#F67D2C',
    width: 24,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  cardProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardProductSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F67D2C',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 2,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardDetails: {
    marginBottom: 10,
  },
  cardTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cardSentiment: {
    marginBottom: 10,
  },
});