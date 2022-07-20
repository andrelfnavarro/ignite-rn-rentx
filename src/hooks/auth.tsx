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

interface AuthContextData {
  user: TUser;
  signIn: (credentials: SignInCredentials) => Promise<void>;
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
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error('Erro ao fazer login.');
    }
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
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
