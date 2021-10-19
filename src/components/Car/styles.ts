import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 126px;

  padding: 24px;
  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  flex-direction: row;
  justify-content: space-between;
`;

export const Info = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(15)}px;
`;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 16px;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.main};
  font-size: ${RFValue(15)}px;
`;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Type = styled.View``;

export const CarImage = styled.Image`
  width: 167px;
  height: 85px;
`;