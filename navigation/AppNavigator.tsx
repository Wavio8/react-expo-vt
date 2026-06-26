import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LegacyListScreen from '../screens/LegacyListScreen';
import OrdersScreen from '../screens/OrdersScreen';

type TabParamList = {
  Новости: undefined;
  Заказы: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
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
  </NavigationContainer>
);
