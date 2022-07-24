import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { Button } from '../../components/Button';
import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';
import { Car as DBCarModel } from '../../database/model/Car';
import { TCar } from '../../dtos/CarDTO';
import api from '../../services/api';
import { useTheme } from 'styled-components/native';

export interface CarDetailsRouteParams {
  car: DBCarModel;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<TCar>({} as TCar);

  const navigation = useNavigation();
  const route = useRoute();
  const netInfo = useNetInfo();
  const theme = useTheme();

  const { car } = route.params as CarDetailsRouteParams;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimation = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 1,
      backgroundColor: theme.colors.background_secondary,
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 100],
        Extrapolate.CLAMP
      ),
    };
  });

  const carSliderAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handleConfirm = () => {
    navigation.navigate('Scheduling', { car: carUpdated });
  };

  useEffect(() => {
    const fetchCarUpdated = async () => {
      try {
        const { data } = await api.get(`/cars/${car.id}`);

        setCarUpdated(data);
      } catch (error) {}
    };

    if (netInfo.isConnected) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <Animated.View style={headerAnimation}>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>

        <Animated.View style={carSliderAnimation}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [
                      {
                        id: car.thumbnail,
                        photo: car.thumbnail,
                        car_id: car.id,
                      },
                    ]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected ? car.price : '...'}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getCarAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          enabled={netInfo.isConnected === true}
          onPress={handleConfirm}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
