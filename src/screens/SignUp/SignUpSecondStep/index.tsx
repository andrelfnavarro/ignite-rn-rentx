import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import { z, ZodError } from 'zod';

import { Input } from '../../../components/Input';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Form,
  Steps,
  Title,
  SubTitle,
  StepTitle,
} from './styles';
import api from '../../../services/api';

export interface SignUpSecondStepParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

const SignUpSchema = z
  .object({
    password: z
      .string({ required_error: 'Senha obrigatória' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    passwordConfirmation: z.string({
      required_error: 'Confirmação de senha obrigatória',
    }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  });

export const SignUpSecondStep = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { user } = route.params as SignUpSecondStepParams;

  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

  const handleRegister = async () => {
    try {
      SignUpSchema.parse({ password, passwordConfirmation });

      await api.post('/users', {
        ...user,
        driver_license: user.driverLicense,
        password,
      });

      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora é só fazer o login e\naproveitar.`,
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        Alert.alert(error.errors[0].message);
      } else {
        Alert.alert('Erro ao cadastrar', 'Tente novamente.');
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          <Header>
            <BackButton onPress={navigation.goBack} />

            <Steps>
              <Bullet />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</SubTitle>

          <Form>
            <StepTitle>2. Senha</StepTitle>

            <Input
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <Input
              iconName="lock"
              placeholder="Repetir senha"
              secureTextEntry
              onChangeText={setPasswordConfirmation}
              value={password}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
