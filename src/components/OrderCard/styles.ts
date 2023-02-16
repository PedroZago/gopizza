import { TouchableOpacity, Image as RNImage, Text, View } from 'react-native';

import styled, { css } from 'styled-components/native';

import { StatusTypesProps } from '@src/interfaces';

interface ContainerProps {
  index: number;
}

interface StatusProps {
  status: StatusTypesProps;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 50%;

  align-items: center;

  padding: 24px;

  ${({ theme, index }) => css`
    border-right-width: ${index % 2 > 0 ? 0 : 1}px;
    border-right-color: ${theme.COLORS.SHAPE};
  `}
`;

export const Image = styled(RNImage)`
  width: 104px;
  height: 104px;

  border-radius: 52px;
`;

export const Name = styled(Text)`
  ${({ theme }) => css`
    font-size: 20px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};

    margin-top: 21px;
  `}
`;

export const Description = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};

    margin-top: 11px;
  `}
`;

export const StatusContainer = styled(View)<StatusProps>`
  padding: 4px 16px;
  border-radius: 12px;
  margin-top: 16px;

  align-items: center;
  justify-content: center;

  ${({ status, theme }) =>
    status === 'Preparando' &&
    css`
      background-color: ${theme.COLORS.ALERT_50};

      border: 1px solid ${theme.COLORS.ALERT_900};
    `}

  ${({ status, theme }) =>
    status === 'Entregue' &&
    css`
      background-color: ${theme.COLORS.SECONDARY_900};
    `}

  ${({ status, theme }) =>
    status === 'Pronto' &&
    css`
      background-color: ${theme.COLORS.SUCCESS_900};
    `}
`;

export const StatusLabel = styled(Text)<StatusProps>`
  ${({ theme, status }) => css`
    font-size: 12px;
    font-family: ${theme.FONTS.TEXT};
    color: ${status === 'Preparando'
      ? theme.COLORS.ALERT_900
      : theme.COLORS.TITLE};

    line-height: 20px;
  `}
`;
