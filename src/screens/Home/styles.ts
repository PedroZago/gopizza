import {
  FlatList,
  FlatListProps,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

import { ProductData } from '@src/interfaces';

import { Button } from '@components/index';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(
  ({ theme }) => ({ colors: theme.COLORS.GRADIENT } as LinearGradientProps)
)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${getStatusBarHeight() + 33}px 24px 58px;
`;

export const Greeting = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled(Image)`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

export const GreetingText = styled(Text)`
  ${({ theme }) => css`
    font-size: 20px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const SignOut = styled(TouchableOpacity)``;

export const MenuHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 25px 24px 0;
  padding-bottom: 22px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const MenuItemsNumber = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 22px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
    line-height: 22px;
  `}
`;

export const ProductsList = styled(
  FlatList as new (props: FlatListProps<ProductData>) => FlatList<ProductData>
).attrs({
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 125,
    marginHorizontal: 24,
  },
  showsVerticalScrollIndicator: false,
} as FlatListProps<ProductData>)``;

export const NewProductButton = styled(Button)`
  margin: 0 24px;
  margin-bottom: ${getBottomSpace() + 12}px;
`;
