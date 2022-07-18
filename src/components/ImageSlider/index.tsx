import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';
import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const indexChange = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      const index = info.viewableItems[0].index!;

      setCurrentIndex(index);
    }
  );

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet
            key={'indicator-' + String(index)}
            active={currentIndex === index}
          />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={indexChange.current}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}
