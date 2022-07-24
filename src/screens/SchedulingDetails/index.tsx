import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import {
  Container,
  Header,
  ImageSliderWrapper,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { MarkedDateProps } from '../../components/Calendar';
import { TCar } from '../../dtos/CarDTO';

import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';
import api from '../../services/api';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { useAuth } from '../../hooks/auth';

export interface SchedulingDetailsRouteParams {
  car: TCar;
  dates: Array<keyof MarkedDateProps>;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<TCar>({} as TCar);

  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const { user } = useAuth();

  const route = useRoute();
  const { car, dates } = route.params as SchedulingDetailsRouteParams;
  const [loading, setLoading] = useState(false);

  const rentPeriod = {
    start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
    end: format(
      getPlatformDate(new Date(dates[dates.length - 1])),
      'dd/MM/yyyy'
    ),
  };

  const handleRent = async () => {
    try {
      setLoading(true);
      console.log({
        user_id: user.user_id,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: car.price * dates.length,
      });
      await api.post('/rentals', {
        user_id: user.user_id,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: car.price * dates.length,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao alugar o carro. Tente novamente.');
      setLoading(false);
      return;
    }

    navigation.navigate('Confirmation', {
      title: 'Carro alugado!',
      message: `Agora você só precisa ir\naté a concessinária da RENTX\npegar seu automóvel.`,
      nextScreenRoute: 'Home',
    });
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
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <ImageSliderWrapper>
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
      </ImageSliderWrapper>

      <Content>
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
                icon={getCarAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon onPress={() => navigation.goBack()}>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>

            <RentalPriceTotal>R$ {car.price * dates.length}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleRent}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
