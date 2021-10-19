import React from 'react';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage
          resizeMode="contain"
          source={{
            uri: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
          }}
        />
      </CarImageWrapper>
    </Container>
  );
}
