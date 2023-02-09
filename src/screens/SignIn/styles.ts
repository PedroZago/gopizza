import {
  Image,
  ImageProps,
  ScrollView,
  ScrollViewProps,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(LinearGradient).attrs(
  ({ theme }) =>
    ({
      colors: theme.COLORS.GRADIENT,
      start: { x: 0, y: 1 },
      end: { x: 0.5, y: 0.5 },
    } as LinearGradientProps)
)`
  flex: 1;

  justify-content: center;
`;

export const Content = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
} as ScrollViewProps)`
  width: 100%;

  padding: 0 32px;
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 32px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};

    margin-bottom: 24px;

    align-self: flex-start;
  `}
`;

export const Brand = styled(Image).attrs({
  resizeMode: 'contain',
} as ImageProps)`
  height: 340px;

  margin-top: 64px;
  margin-bottom: 32px;
`;

export const ForgotPasswordButton = styled(TouchableOpacity)`
  align-self: flex-end;

  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;
