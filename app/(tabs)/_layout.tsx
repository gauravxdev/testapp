import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { HapticTab } from '@/components/haptic-tab';

function TabIcon({ name, color, focused }: { name: any; color: string; focused: boolean }) {
  return (
    <View style={styles.iconWrapper}>
      <MaterialCommunityIcons size={26} name={name} color={focused ? '#1A1A1A' : color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#555555',
        tabBarStyle: {
          backgroundColor: '#DCDCDC',
          borderTopColor: 'transparent',
          position: 'absolute',
          bottom: 28,
          left: 24,
          right: 24,
          borderRadius: 36,
          height: 72,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          paddingBottom: 8,
          paddingTop: 8,
          paddingHorizontal: 16,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
          paddingBottom: 0,
          marginHorizontal: -12,
        },
        headerShown: false,
        tabBarButton: (props) => <HapticTab {...props} />,
      }}>
      <Tabs.Screen
        name="ratings"
        options={{
          title: 'Ratings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="star" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: 'Reviews',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="message-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="roadshows"
        options={{
          title: 'Roadshows',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="car" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="representations"
        options={{
          title: 'Representation',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="account-details" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="loan"
        options={{
          title: 'Loan',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bank" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
});
