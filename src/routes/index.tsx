import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppStackParamList } from './app.stack.routes';
import { AppTabParamList, AppTabRoutes } from './app.tab.routes';
import { AuthRoutes, AuthRoutesParamList } from './auth.routes';

import { useAuth } from '../hooks/auth';
import { LoadAnimation } from '../components/LoadAnimation';

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
  const { user, loading } = useAuth();

  return loading ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
