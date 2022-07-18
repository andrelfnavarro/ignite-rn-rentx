import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

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
import { Alert } from 'react-native';
import { getPlatformDate } from '../../utils/getPlatformDate';

export interface SchedulingDetailsRouteParams {
  car: TCar;
  dates: Array<keyof MarkedDateProps>;
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation();

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
      const { data: carSchedules } = await api.get(
        `/schedules_bycars/${car.id}`
      );

      const unavailableDates = [...carSchedules.unavailable_dates, ...dates];

      await api.post('schedules_byuser', {
        user_id: 42,
        date_start: rentPeriod.start,
        date_end: rentPeriod.end,
        car,
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      });
    } catch (error) {
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

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <ImageSliderWrapper>
        <ImageSlider imagesUrl={car.photos} />
      </ImageSliderWrapper>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              icon={getCarAccessoryIcon(accessory.type)}
              name={accessory.name}
            />
          ))}
        </Accessories>

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
              R$ {car.rent.price} x{dates.length} diárias
            </RentalPriceQuota>

            <RentalPriceTotal>
              R$ {car.rent.price * dates.length}
            </RentalPriceTotal>
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
