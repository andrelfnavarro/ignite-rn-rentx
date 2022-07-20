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
import { TCar } from '../../dtos/CarDTO';
import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';

interface Props extends RectButtonProps {
  data: TCar;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getCarAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Info>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <Details>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
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
