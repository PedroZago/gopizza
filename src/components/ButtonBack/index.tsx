import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';

interface ButtonBackProps extends TouchableOpacityProps {}

export const ButtonBack: React.FC<ButtonBackProps> = ({ ...rest }) => {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons name="chevron-left" size={18} color={theme.COLORS.TITLE} />
    </S.Container>
  );
};
