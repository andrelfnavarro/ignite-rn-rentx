import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';

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
} from './styles';

export const Profile: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleSignOut = () => {};

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={navigation.goBack} />
          <HeaderTitle>Editar perfil</HeaderTitle>

          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" color={theme.colors.shape} size={24} />
          </LogoutButton>
        </HeaderTop>

        <AvatarContainer>
          <Avatar
            source={{
              uri: 'https://avatars.githubusercontent.com/u/32081314?v=4',
            }}
          />
          <AddPhotoButton>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </AddPhotoButton>
        </AvatarContainer>
      </Header>
    </Container>
  );
};
