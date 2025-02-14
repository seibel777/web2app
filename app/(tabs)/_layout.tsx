import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              tint="light"
              intensity={95}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
          ) : null,
        tabBarActiveTintColor: '#FF385C',
        tabBarInactiveTintColor: '#72777A',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Store',
          headerTitle: 'Your Store',
          tabBarIcon: ({ size, color }) => (
            <View style={{ marginTop: 5 }}>
              <Ionicons name="storefront-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <View style={{ marginTop: 5 }}>
              <Ionicons name="settings-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}