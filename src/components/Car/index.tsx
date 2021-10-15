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

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface Props {
  data: CarData;
}

export function Car({ data }: Props) {
  return (
    <Container>
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
