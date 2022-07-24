import React, { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';

import { database } from '../database';
import { User as DBUserModel } from '../database/model/User';

import { TUser, User } from '../dtos/UserDTO';
import api from '../services/api';

const APIAuthResponse = z.object({
  token: z.string(),
  user: User.omit({ token: true }),
});

interface SignInCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  name: TUser['name'];
  driver_license: TUser['driver_license'];
  avatar: TUser['avatar'];
}

interface AuthContextData {
  user: TUser;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: UpdateUserData) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<TUser>({} as TUser);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { data } = await api.post('/sessions', credentials);

      const authData = APIAuthResponse.parse(data);

      const { token, user } = authData;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<DBUserModel>('users');
      await database.write(async () => {
        const createdUser = await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.driver_license = user.driver_license;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });

        const createdUserData = createdUser._raw as unknown as TUser;
        setData({ ...createdUserData, token });
      });
    } catch (error) {
      throw new Error('Erro ao fazer login.');
    }
  };

  const signOut = async () => {
    try {
      const userCollection = database.get<DBUserModel>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);

        await userSelected.destroyPermanently();
      });

      setData({} as TUser);
    } catch (error) {
      throw new Error('Erro ao fazer logout.');
    }
  };

  const updateUser = async (updateUserData: UpdateUserData) => {
    try {
      const userCollection = database.get<DBUserModel>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);

        await userSelected.update(updatedUser => {
          updatedUser.name = updateUserData.name;
          updatedUser.driver_license = updateUserData.driver_license;
          updatedUser.avatar = updateUserData.avatar;
        });
      });

      setData(state => ({ ...state, ...updateUserData }));
    } catch (error) {}
  };

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection = database.get<DBUserModel>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as TUser;
        setData({ ...userData });
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
