import { TextInput, TextInputProps } from 'react-native';

import styled, { css } from 'styled-components/native';

import { isPrimaryType, TypeProps } from '@utils/isPrimary';

interface Props {
  type: TypeProps;
}

export const Container = styled(TextInput).attrs<Props>(
  ({ theme, type }) =>
    ({
      placeholderTextColor: isPrimaryType(type)
        ? theme.COLORS.SECONDARY_900
        : theme.COLORS.PRIMARY_50,
    } as TextInputProps)
)<Props>`
  width: 100%;
  height: 56px;

  background-color: transparent;

  border-radius: 12px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-size: 14px;
    font-family: ${theme.FONTS.TEXT};
    color: ${isPrimaryType(type)
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};

    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;
