import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
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

const SignUpSchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(1, 'Nome obrigatório'),
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
  driverLicense: z
    .string()
    .regex(/^\d+$/, 'CNH precisa ser um número')
    .transform(Number),
});

export const SignUpFirstStep = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const handleNextStep = () => {
    try {
      SignUpSchema.parse({ name, email, driverLicense });
      navigation.navigate('SignUpSecondStep', {
        user: { name, email, driverLicense },
      });
    } catch (error) {
      console.log(error);

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
            <StepTitle>1. Dados</StepTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName="user"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
