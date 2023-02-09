import React from 'react';
import { TextInputProps } from 'react-native';

import { TypeProps } from '@utils/isPrimary';

import * as S from './styles';

interface InputProps extends TextInputProps {
  type?: TypeProps;
}

export const Input: React.FC<InputProps> = ({ type = 'primary', ...rest }) => {
  return <S.Container type={type} {...rest} />;
};
