import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStackParamList, StackRoutes } from './stack.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}
