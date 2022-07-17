import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails, CarDetailsRouteParams } from '../screens/CarDetails';
import { Scheduling, SchedulingRouteParams } from '../screens/Scheduling';
import {
  SchedulingDetails,
  SchedulingDetailsRouteParams,
} from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: CarDetailsRouteParams;
  Scheduling: SchedulingRouteParams;
  SchedulingDetails: SchedulingDetailsRouteParams;
  SchedulingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
