import { Image as RNImage, Text, View } from 'react-native';

import styled, { css } from 'styled-components/native';

export const Image = styled(RNImage)`
  width: 160px;
  height: 160px;

  border-radius: 80px;
`;

export const Placeholder = styled(View)`
  width: 160px;
  height: 160px;

  justify-content: center;
  align-items: center;

  border-radius: 80px;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled(Text)`
  ${({ theme }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
    text-align: center;
  `}
`;
