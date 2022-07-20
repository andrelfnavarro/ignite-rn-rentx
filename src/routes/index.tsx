import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppStackParamList, AppStackRoutes } from './app.stack.routes';
import { AppTabParamList, AppTabRoutes } from './app.tab.routes';
import { AuthRoutes, AuthRoutesParamList } from './auth.routes';

import { useAuth } from '../hooks/auth';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AppStackParamList,
        AppTabParamList,
        AuthRoutesParamList {}
  }
}

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
