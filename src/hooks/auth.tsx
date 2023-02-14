import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_COLLECTION } from '@src/constants';
import { NativeFirebaseError } from '@src/interfaces';

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextData {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function loadUserStorageData() {
    setIsLogging(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha');
    }

    setIsLogging(true);

    try {
      const account = await auth().signInWithEmailAndPassword(email, password);

      const profile = await firestore()
        .collection('users')
        .doc(account.user.uid)
        .get();

      const { name, isAdmin } = profile.data() as User;

      if (profile.exists) {
        const userData = {
          id: account.user.uid,
          name,
          isAdmin,
        };
        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      const { code } = error as NativeFirebaseError;

      if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        return Alert.alert('Login', 'E-mail e/ou senha incorretos.');
      } else {
        return Alert.alert('Login', 'Não foi possível realizar o login.');
      }
    } finally {
      setIsLogging(false);
    }
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Informe o e-mail');
    }

    try {
      auth().sendPasswordResetEmail(email);

      Alert.alert(
        'Redefinir senha',
        'Enviamos um link no seu e-mail para redefinir sua senha'
      );
    } catch {
      Alert.alert(
        'Redefinir senha',
        'Não foi possível enviar o e-mail para redefinir sua senha.'
      );
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        forgotPassword,
        isLogging,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
