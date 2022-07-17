import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import loadingAnimation from '../../assets/loader-car.json';
import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <AnimatedLottieView
        style={{ height: 200 }}
        resizeMode="contain"
        source={loadingAnimation}
        autoPlay
        loop
      />
    </Container>
  );
}
