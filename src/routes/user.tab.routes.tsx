import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomMenu } from '@src/components/BottomMenu';
import { useAuth } from '@src/hooks/auth';

import { Home, Orders } from '@screens/index';

const { Navigator, Screen } = createBottomTabNavigator();

export const UserTabRoutes = () => {
  const [notifications, setNotifications] = useState('0');

  const theme = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .where('status', '==', 'Pronto')
      .onSnapshot(querySnapshot => {
        setNotifications(String(querySnapshot.docs.length));
      });

    return () => subscribe();
  }, []);

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          ),
        }}
      />

      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title="Pedidos"
              color={color}
              notifications={notifications}
            />
          ),
        }}
      />
    </Navigator>
  );
};
