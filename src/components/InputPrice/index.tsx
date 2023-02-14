import React from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

interface InputPriceProps extends TextInputProps {
  size: string;
}

export const InputPrice: React.FC<InputPriceProps> = ({ size, ...rest }) => {
  return (
    <S.Container>
      <S.Size>
        <S.Label>{size}</S.Label>
      </S.Size>

      <S.Label>R$</S.Label>

      <S.Input keyboardType="numeric" {...rest} />
    </S.Container>
  );
};
