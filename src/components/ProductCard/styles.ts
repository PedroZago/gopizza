import { Image as RNImage, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styled, { css } from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
`;

export const Content = styled(RectButton)`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled(RNImage)`
  width: 104px;
  height: 104px;

  border-radius: 52px;
  margin-right: 20px;
`;

export const Details = styled(View)`
  flex: 1;
`;

export const Name = styled(Text)`
  flex: 1;

  ${({ theme }) => css`
    font-size: 20px;
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Description = styled(Text)`
  ${({ theme }) => css`
    font-size: 12px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_400};
    line-height: 20px;

    margin-right: 21px;
  `}
`;

export const Identification = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Line = styled(View)`
  width: 100%;
  height: 1px;

  margin: 12px 0;
  margin-left: 124px;

  background-color: ${({ theme }) => theme.COLORS.SHAPE};
`;
