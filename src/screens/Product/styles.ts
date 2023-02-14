import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  Text,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

import { Button } from '@src/components/Button';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(
  ({ theme }) =>
    ({
      colors: theme.COLORS.GRADIENT,
      start: { x: 0, y: 1 },
      end: { x: 0.5, y: 0.5 },
    } as LinearGradientProps)
)`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 33}px 20px 24px;
`;

export const ContentWrapper = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
} as ScrollViewProps)``;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 24px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const DeleteLabel = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Upload = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 32px 0;
`;

export const PickImageButton = styled(Button)`
  max-width: 90px;
  margin-left: 32px;
`;

export const Form = styled(View)`
  width: 100%;

  padding: 24px;
`;

export const Label = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};

    margin-bottom: 12px;
  `}
`;

export const InputGroup = styled(View)`
  width: 100%;

  margin-bottom: 16px;
`;

export const InputGroupHeader = styled(View)`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MaxCharacters = styled(Text)`
  ${({ theme }) => css`
    font-size: 10px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};

    margin-bottom: 12px;
  `}
`;
