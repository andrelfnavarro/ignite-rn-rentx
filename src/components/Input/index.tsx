import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

import { Container, IconContainer, InputField } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({
  iconName,
  value,
  secureTextEntry = false,
  ...rest
}: Props) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => setIsFocused(true);

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputField
        {...rest}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={secureTextEntry && !showPassword}
      />

      {secureTextEntry && (
        <BorderlessButton onPress={() => setShowPassword(state => !state)}>
          <IconContainer isFocused={isFocused}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
            />
          </IconContainer>
        </BorderlessButton>
      )}
    </Container>
  );
}
