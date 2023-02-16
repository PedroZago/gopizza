import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface RadioButtonProps extends TouchableOpacityProps {
  selected: boolean;
  title: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected = false,
  title,
  ...rest
}) => {
  return (
    <S.Container selected={selected} {...rest}>
      <S.Radio>{selected && <S.Selected />}</S.Radio>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
