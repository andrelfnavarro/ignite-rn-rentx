import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Footer, Container, Header, SubTitle, Title, Form } from './styles';

export const SignIn = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header>
        <Title>Estamos{'\n'}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{'\n'}uma experiência incrível.
        </SubTitle>
      </Header>

      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input iconName="lock" placeholder="Senha" secureTextEntry />
      </Form>

      <Footer>
        <Button title="Login" enabled={false} loading={false} />

        <Button
          light
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
        />
      </Footer>
    </Container>
  );
};