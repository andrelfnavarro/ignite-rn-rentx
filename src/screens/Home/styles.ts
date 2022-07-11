import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TCar } from '../../dtos/CarDTO';

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  padding: 32px 24px;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<TCar>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  background-color: ${({ theme }) => theme.colors.main};

  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: ${getBottomSpace() ?? 22}px;
  right: 22px;
`;
