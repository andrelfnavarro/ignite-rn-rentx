import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { z, ZodError } from 'zod';
import { useNetInfo } from '@react-native-community/netinfo';

import { Input } from '../../components/Input';
import { BackButton } from '../../components/BackButton';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  AvatarContainer,
  Avatar,
  AddPhotoButton,
  Content,
  Tabs,
  Tab,
  TabTitle,
  Section,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

type TabLabel = 'dataEdit' | 'passwordEdit';

const UpdateProfileSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  driverLicense: z
    .string()
    .regex(/^\d+$/, 'CNH precisa ser um número')
    .transform(Number),
  // oldPassword: z.string().optional(),
  // password: z.string().optional(),
  // passwordConfirmation: z.string().optional(),
});
// .refine(data => data.password === data.passwordConfirmation, {
//   message: 'Senhas não conferem',
//   path: ['passwordConfirmation'],
// })
// .refine(data => data.password !== data.oldPassword, {
//   message: 'Nova senha não pode ser igual a antiga',
//   path: ['password'],
// });

export const Profile: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const { user, signOut, updateUser } = useAuth();

  const [tab, setTab] = useState<TabLabel>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const handleTabChange = (newTab: TabLabel) => {
    if (!netInfo.isConnected && tab === 'passwordEdit') {
      Alert.alert(
        'Para mudar a senha, você precisa estar conectado a internet'
      );
      return;
    }

    setTab(newTab);
  };

  const handleSelectAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      UpdateProfileSchema.parse({ name, driverLicense });

      await updateUser({
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert('Pefil atualizado!');
    } catch (error) {
      if (error instanceof ZodError) {
        Alert.alert(error.errors[0].message);
      } else {
        Alert.alert('Não foi possível atualizar os dados');
      }
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, precisará de internet para conectar novamente',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: signOut },
      ]
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={navigation.goBack}
              />
              <HeaderTitle>Editar perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" color={theme.colors.shape} size={24} />
              </LogoutButton>
            </HeaderTop>

            <AvatarContainer>
              {!!avatar && (
                <Avatar
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <AddPhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </AddPhotoButton>
            </AvatarContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Tabs>
              <Tab
                active={tab === 'dataEdit'}
                onPress={() => handleTabChange('dataEdit')}
              >
                <TabTitle active={tab === 'dataEdit'}>Dados</TabTitle>
              </Tab>

              <Tab
                active={tab === 'passwordEdit'}
                onPress={() => handleTabChange('passwordEdit')}
              >
                <TabTitle active={tab === 'passwordEdit'}>
                  Trocar senha
                </TabTitle>
              </Tab>
            </Tabs>

            {tab === 'dataEdit' ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />

                <Input
                  defaultValue={user.email}
                  iconName="mail"
                  placeholder="E-mail"
                  autoCorrect={false}
                  editable={false}
                />

                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCorrect={false}
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <Input
                  secureTextEntry
                  iconName="lock"
                  placeholder="Senha atual"
                  autoCorrect={false}
                />

                <Input
                  secureTextEntry
                  iconName="lock"
                  placeholder="Nova senha"
                  autoCorrect={false}
                />

                <Input
                  secureTextEntry
                  iconName="lock"
                  placeholder="Repetir senha"
                  autoCorrect={false}
                />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
