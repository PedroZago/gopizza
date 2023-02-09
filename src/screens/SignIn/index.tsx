import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { useAuth } from '@hooks/auth';

import BrandImg from '@assets/brand.png';

import * as S from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLogging, forgotPassword } = useAuth();

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleForgotPassword = () => {
    forgotPassword(email);
  };

  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <S.Content>
          <S.Brand source={BrandImg} />

          <S.Title>Login</S.Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <S.ForgotPasswordButton onPress={handleForgotPassword}>
            <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
