import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  MyCarsButton,
  TotalCars,
} from './styles';

import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { TCar } from '../../dtos/CarDTO';
import { Loader } from '../../components/Loader';

export function Home() {
  const [cars, setCars] = useState<TCar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();

  const myCarsPosition = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };

  const myCarsAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: myCarsPosition.x.value,
        },
        {
          translateY: myCarsPosition.y.value,
        },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = myCarsPosition.x.value;
      ctx.positionY = myCarsPosition.y.value;
    },
    onActive: (event, ctx) => {
      myCarsPosition.x.value = ctx.positionX + event.translationX;
      myCarsPosition.y.value = ctx.positionY + event.translationY;
    },
    onEnd: () => {
      myCarsPosition.x.value = withSpring(0);
      myCarsPosition.y.value = withSpring(0);
    },
  });

  const handleCarDetails = (car: TCar) => {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars');

        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <Loader />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={myCarsAnimation}>
          <MyCarsButton onPress={() => navigation.navigate('MyCars')}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
