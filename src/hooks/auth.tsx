import React, { createContext, useContext, useState } from 'react';
import { z } from 'zod';
import { TUser, User } from '../dtos/UserDTO';
import api from '../services/api';

interface AuthState {
  token: string;
  user: TUser;
}

const AuthState: z.ZodType<AuthState> = z.lazy(() =>
  z.object({
    token: z.string(),
    user: User,
  })
);

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
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { data } = await api.post('/sessions', credentials);

      const authData = AuthState.parse(data);

      const { token, user } = authData;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({ token, user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
