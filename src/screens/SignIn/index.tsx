import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { z, ZodError } from 'zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import { Footer, Container, Header, SubTitle, Title, Form } from './styles';

const SignInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const SignIn = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignIn = async () => {
    try {
      SignInSchema.parse({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof ZodError) {
        Alert.alert(error.errors[0].message);
      } else {
        Alert.alert('Erro ao fazer login', 'Verifique as credenciais.');
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
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button title="Login" onPress={handleSignIn} />

            <Button
              light
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={() => navigation.navigate('SignUpFirstStep')}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
