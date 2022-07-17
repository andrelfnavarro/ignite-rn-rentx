import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

import { Container, IconContainer, InputField } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ iconName, secureTextEntry = false, ...rest }: Props) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputField
        {...rest}
        secureTextEntry={secureTextEntry && !showPassword}
      />

      {secureTextEntry && (
        <BorderlessButton onPress={() => setShowPassword(state => !state)}>
          <IconContainer>
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
