import { ActivityIndicator, ActivityIndicatorProps, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styled, { css } from 'styled-components/native';

import { TypeProps, isPrimaryType } from '@utils/isPrimary';

interface ContainerProps {
  type: TypeProps;
}

export const Container = styled(RectButton)<ContainerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;

  max-height: 56px;
  min-height: 56px;

  border-radius: 12px;

  background-color: ${({ theme, type }) =>
    isPrimaryType(type) ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `}
`;

export const Load = styled(ActivityIndicator).attrs(
  ({ theme }) =>
    ({
      color: theme.COLORS.TITLE,
    } as ActivityIndicatorProps)
)``;
