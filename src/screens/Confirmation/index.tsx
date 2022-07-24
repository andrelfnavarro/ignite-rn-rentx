import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';
import { AppRoutesParamList } from '../../routes';

export interface ConfirmationParams {
  title: string;
  message: string;
  nextScreenRoute: keyof AppRoutesParamList;
}

export const Confirmation: React.FC = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const { title, message, nextScreenRoute } =
    route.params as ConfirmationParams;

  const handleComplete = () => {
    navigation.navigate(nextScreenRoute);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={dimensions.width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleComplete} />
      </Footer>
    </Container>
  );
};
