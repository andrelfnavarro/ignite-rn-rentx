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
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import {
  SignUpSecondStepParams,
  SignUpSecondStep,
} from '../screens/SignUp/SignUpSecondStep';

export type RootStackParamList = {
  Home: undefined;
  CarDetails: CarDetailsRouteParams;
  Scheduling: SchedulingRouteParams;
  SchedulingDetails: SchedulingDetailsRouteParams;
  Confirmation: ConfirmationParams;
  MyCars: undefined;
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: SignUpSecondStepParams;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
