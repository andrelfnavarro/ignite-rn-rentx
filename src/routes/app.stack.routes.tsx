import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails, CarDetailsRouteParams } from '../screens/CarDetails';
import { Scheduling, SchedulingRouteParams } from '../screens/Scheduling';
import {
  SchedulingDetails,
  SchedulingDetailsRouteParams,
} from '../screens/SchedulingDetails';
import { ConfirmationParams, Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';

export type AppStackParamList = {
  Home: undefined;
  CarDetails: CarDetailsRouteParams;
  Scheduling: SchedulingRouteParams;
  SchedulingDetails: SchedulingDetailsRouteParams;
  Confirmation: ConfirmationParams;
  MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AppStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
