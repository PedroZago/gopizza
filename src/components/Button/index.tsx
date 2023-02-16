import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { TypeProps } from '@utils/isPrimary';

import * as S from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  type = 'primary',
  isLoading = false,
  ...rest
}) => {
  return (
    <S.Container type={type} enabled={!isLoading} {...rest}>
      {!isLoading ? <S.Title>{title}</S.Title> : <S.Load />}
    </S.Container>
  );
};
