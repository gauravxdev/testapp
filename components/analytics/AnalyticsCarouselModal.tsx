import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  PanResponder,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SentimentDistributionScreen } from './SentimentDistributionScreen';
import { FiveMetricScorecardScreen } from './FiveMetricScorecardScreen';
import { ResolutionLensScreen } from './ResolutionLensScreen';
import { PaginationIndicator } from './PaginationIndicator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const SCREENS = ['Sentiment', 'Metrics', 'Resolution'];

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  topPositiveThemes: string[];
  topNeutralThemes: string[];
  topNegativeThemes: string[];
}

interface MetricsData {
  transparency: number;
  responsiveness: number;
  easeOfProcess: number;
  trustworthiness: number;
  overallSatisfaction: number;
}

interface ResolutionData {
  resolved: number;
  inProgress: number;
  unresolved: number;
}

export interface ProductAnalyticsData {
  productId: number;
  productName: string;
  productSubtitle: string;
  sentiment: SentimentData;
  metrics: MetricsData;
  resolution: ResolutionData;
}

interface AnalyticsCarouselModalProps {
  visible: boolean;
  onClose: () => void;
  productData: ProductAnalyticsData;
}

export function AnalyticsCarouselModal({
  visible,
  onClose,
  productData,
}: AnalyticsCarouselModalProps) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const translateX = useSharedValue(0);

  const navigateToScreen = (index: number) => {
    setCurrentScreenIndex(index);
    translateX.value = withSpring(-index * SCREEN_WIDTH);
  };

  const handleClose = () => {
    setCurrentScreenIndex(0);
    translateX.value = withSpring(0);
    onClose();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.5;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.value = -currentScreenIndex * SCREEN_WIDTH + gestureState.dx;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        if (dx < -SWIPE_THRESHOLD && currentScreenIndex < 2) {
          navigateToScreen(currentScreenIndex + 1);
        } else if (dx > SWIPE_THRESHOLD && currentScreenIndex > 0) {
          navigateToScreen(currentScreenIndex - 1);
        } else {
          translateX.value = withSpring(-currentScreenIndex * SCREEN_WIDTH);
        }
      },
      onPanResponderTerminate: () => {
        translateX.value = withSpring(-currentScreenIndex * SCREEN_WIDTH);
      },
    })
  ).current;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.closeRow}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <MaterialIcons name="arrow-back" size={28} color="#F67D2C" />
          </TouchableOpacity>
          <Text style={styles.productTitle} numberOfLines={1}>
            {productData.productName}
          </Text>
          <View style={styles.closeButton} />
        </View>

        <View style={styles.tabRow}>
          {SCREENS.map((label, index) => (
            <TouchableOpacity
              key={label}
              style={[styles.tab, currentScreenIndex === index && styles.tabActive]}
              onPress={() => navigateToScreen(index)}
            >
              <Text
                style={[styles.tabText, currentScreenIndex === index && styles.tabTextActive]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.carouselContainer} {...panResponder.panHandlers}>
          <Animated.View style={[styles.carouselTrack, animatedStyle]}>
            <View style={styles.screenWrapper}>
              <SentimentDistributionScreen
                data={productData.sentiment}
              />
            </View>
            <View style={styles.screenWrapper}>
              <FiveMetricScorecardScreen
                data={productData.metrics}
              />
            </View>
            <View style={styles.screenWrapper}>
              <ResolutionLensScreen
                data={productData.resolution}
              />
            </View>
          </Animated.View>
        </View>

        <PaginationIndicator totalScreens={3} currentIndex={currentScreenIndex} />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  closeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#F67D2C',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  carouselContainer: {
    flex: 1,
  },
  carouselTrack: {
    flex: 1,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 3,
  },
  screenWrapper: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
});
