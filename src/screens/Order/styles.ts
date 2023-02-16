import {
  KeyboardAvoidingView,
  Image,
  View,
  Text,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const Content = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Header = styled(LinearGradient).attrs(
  ({ theme }) => ({ colors: theme.COLORS.GRADIENT } as LinearGradientProps)
)`
  padding: ${getStatusBarHeight() + 34}px 24px 0;
`;

export const Photo = styled(Image)`
  width: 240px;
  height: 240px;

  border-radius: 120px;

  align-self: center;
  position: relative;
  top: -120px;
`;

export const Sizes = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 40px;
`;

export const Form = styled(View)`
  width: 100%;

  margin-top: -120px;
  padding: 24px;
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 32px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};

    margin-bottom: 32px;

    text-align: center;
  `}
`;

export const Label = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};

    margin-bottom: 16px;
  `}
`;

export const FormRow = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;

export const InputGroup = styled(View)`
  width: 48%;
`;

export const Price = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};

    margin: 24px 0;

    align-self: flex-end;
  `}
`;
