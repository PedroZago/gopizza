import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { OrderData } from '@src/interfaces';

import * as S from './styles';

interface OrderCardProps extends TouchableOpacityProps {
  index: number;
  data: OrderData;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  index,
  data,
  ...rest
}) => {
  return (
    <S.Container index={index} {...rest}>
      <S.Image
        source={{
          uri: data.image,
        }}
      />

      <S.Name>{data.pizza}</S.Name>

      <S.Description>
        Mesa {data.table_number} - Qtde: {data.quantity}
      </S.Description>

      <S.StatusContainer status={data.status}>
        <S.StatusLabel status={data.status}>{data.status}</S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
};
