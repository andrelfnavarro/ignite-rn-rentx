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
import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';
import { TCar } from '../../dtos/CarDTO';

interface Props extends RectButtonProps {
  data: TCar;
}

export function Car({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Info>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <Details>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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
