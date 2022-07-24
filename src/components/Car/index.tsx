import React from 'react';

import {
  Container,
  Info,
  Brand,
  Name,
  Details,
  Price,
  Period,
  Rent,
  Type,
  CarImage,
} from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';
import { Car as DBCarModel } from '../../database/model/Car';

interface Props extends RectButtonProps {
  data: DBCarModel;
}

export function Car({ data, ...rest }: Props) {
  const netInfo = useNetInfo();
  const MotorIcon = getCarAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Info>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <Details>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ {netInfo.isConnected ? data.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </Details>
      </Info>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
