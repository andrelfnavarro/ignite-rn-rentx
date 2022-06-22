import React from 'react';
import { useTheme } from 'styled-components';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
} from './styles';
import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';

export const Scheduling = () => {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BackButton color={theme.colors.shape} onPress={() => null} />
        <Title>
          Escolha uma{'\n'}data de início e{'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>PARA</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
    </Container>
  );
};
