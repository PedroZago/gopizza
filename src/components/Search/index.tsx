import React from 'react';
import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import * as S from './styles';

interface SearchProps extends TextInputProps {
  onSearch: () => void;
  onClear: () => void;
}

export const Search: React.FC<SearchProps> = ({
  onClear,
  onSearch,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.InputArea>
        <S.Input placeholder="pesquisar..." {...rest} />

        <S.ButtonClear onPress={onClear}>
          <Feather name="x" size={16} color={theme.COLORS.BLACK} />
        </S.ButtonClear>
      </S.InputArea>

      <S.Button onPress={onSearch}>
        <Feather name="search" size={16} color={theme.COLORS.TITLE} />
      </S.Button>
    </S.Container>
  );
};
