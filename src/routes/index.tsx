import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppStackParamList } from './app.stack.routes';
import { AppTabParamList, AppTabRoutes } from './app.tab.routes';
import { AuthRoutes, AuthRoutesParamList } from './auth.routes';

import { useAuth } from '../hooks/auth';

export interface AppRoutesParamList
  extends AppStackParamList,
    AppTabParamList,
    AuthRoutesParamList {}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutesParamList {}
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
