import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@src/hooks/auth';

import { SignIn } from '@screens/index';

import { UserStackRoutes } from './user.stack.routes';

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <UserStackRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
