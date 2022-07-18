import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput, TextInputProps } from 'react-native';

interface Props {
  isFocused?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 55px;
  width: 55px;
  margin-right: 2px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputField = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 24px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
