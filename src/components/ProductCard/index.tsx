import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import { ProductData } from '@src/interfaces';

import * as S from './styles';

interface ProductCardProps extends RectButtonProps {
  data: ProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ data, ...rest }) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Content {...rest}>
        <S.Image source={{ uri: data.photo_url }} />

        <S.Details>
          <S.Identification>
            <S.Name>{data.name}</S.Name>

            <Feather
              name="chevron-right"
              size={18}
              color={theme.COLORS.SHAPE}
            />
          </S.Identification>

          <S.Description>{data.description}</S.Description>
        </S.Details>
      </S.Content>

      <S.Line />
    </S.Container>
  );
};
