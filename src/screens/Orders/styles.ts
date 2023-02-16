import { View, Text, FlatList, FlatListProps } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

import { OrderData } from '@src/interfaces';

export const Container = styled(View)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(
  ({ theme }) => ({ colors: theme.COLORS.GRADIENT } as LinearGradientProps)
)`
  padding: ${getStatusBarHeight() + 33}px 0 33px;
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 24px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};

    text-align: center;
  `}
`;

export const OrdersList = styled(
  FlatList as new (props: FlatListProps<OrderData>) => FlatList<OrderData>
).attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
  contentContainerStyle: {
    paddingBottom: 125,
    paddingHorizontal: 24,
  },
} as FlatListProps<OrderData>)``;
