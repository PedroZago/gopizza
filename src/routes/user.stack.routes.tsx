import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Product, Home } from '@screens/index';

const { Navigator, Screen } = createNativeStackNavigator();

export const UserStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />

      <Screen name="product" component={Product} />
    </Navigator>
  );
};
