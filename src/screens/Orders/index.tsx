import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { useAuth } from '@src/hooks/auth';
import { OrderData } from '@src/interfaces';

import { ItemSeparator, OrderCard } from '@components/index';

import * as S from './styles';

export const Orders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  const { user } = useAuth();

  async function handlePizzaDelivered(id: string) {
    Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          firestore().collection('orders').doc(id).update({
            status: 'Entregue',
          });
        },
      },
    ]);
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('waiter_id', '==', user?.id)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderData[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>

      <S.OrdersList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            key={item.id}
            data={item}
            disabled={item.status === 'Entregue'}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </S.Container>
  );
};
