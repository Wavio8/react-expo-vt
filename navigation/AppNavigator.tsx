import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import LegacyListScreen from '../screens/LegacyListScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';

type TabParamList = {
  Новости: undefined;
  Заказы: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  ComingSoon: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        const icon =
          route.name === 'Новости' ? 'newspaper-outline' : 'receipt-outline';
        return <Ionicons name={icon} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4A9EE3',
      tabBarInactiveTintColor: '#999',
    })}
  >
    <Tab.Screen name="Новости" component={LegacyListScreen} />
    <Tab.Screen name="Заказы" component={OrdersScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={TabNavigator} />
      <RootStack.Screen name="ComingSoon" component={ComingSoonScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
