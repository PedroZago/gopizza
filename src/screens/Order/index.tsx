import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';

import { OrderNavigationProps } from '@src/@types/navigation';
import { useAuth } from '@src/hooks/auth';
import { ProductData } from '@src/interfaces';
import { PIZZA_TYPES } from '@src/utils/pizzaTypes';

import { Button, ButtonBack, Input, RadioButton } from '@components/index';

import * as S from './styles';

interface PizzaResponse extends ProductData {
  prices_sizes: {
    [key: string]: number;
  };
}

export const Order = () => {
  const [size, setSize] = useState('');
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState('');
  const [sendingOrder, setSendingOrder] = useState(false);

  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const { user } = useAuth();

  const amount = size ? pizza.prices_sizes[size] * quantity : '00,00';

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleOrder() {
    try {
      const schema = Yup.object().shape({
        size: Yup.string().required('Selecione o tamanho da pizza.'),
        tableNumber: Yup.string().required('Informe o número da mesa.').trim(),
        quantity: Yup.string().required('Informe a quantidade.').trim(),
      });

      await schema.validate({
        size,
        tableNumber,
        quantity,
      });

      setSendingOrder(true);

      firestore().collection('orders').add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: 'Preparando',
        waiter_id: user?.id,
        image: pizza.photo_url,
      });

      navigation.navigate('home');
    } catch (error) {
      setSendingOrder(false);
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Pedido', error.message);
      } else {
        Alert.alert('Pedido', 'Não foi possível registrar o pedido.');
      }
    }
  }

  async function fetchPizza() {
    try {
      const response = await firestore().collection('pizzas').doc(id).get();

      const product = response.data() as PizzaResponse;

      setPizza(product);
    } catch {
      Alert.alert('Cadastro', 'Não foi possível carregar a pizza.');
    }
  }

  useEffect(() => {
    if (id) fetchPizza();
  }, [id]);

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <S.Content>
        <S.Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </S.Header>

        <S.Photo
          source={{
            uri: pizza.photo_url,
          }}
        />

        <S.Form>
          <S.Title>{pizza.name}</S.Title>

          <S.Label>Selecione um tamanho</S.Label>

          <S.Sizes>
            {PIZZA_TYPES.map(type => (
              <RadioButton
                key={type.id}
                selected={size === type.id}
                title={type.name}
                onPress={() => setSize(type.id)}
              />
            ))}
          </S.Sizes>

          <S.FormRow>
            <S.InputGroup>
              <S.Label>Número da mesa</S.Label>

              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Quantidade</S.Label>

              <Input
                keyboardType="numeric"
                onChangeText={value => setQuantity(Number(value))}
              />
            </S.InputGroup>
          </S.FormRow>

          <S.Price>Valor de R$ {amount}</S.Price>

          <Button
            title="Confirmar pedido"
            onPress={handleOrder}
            isLoading={sendingOrder}
          />
        </S.Form>
      </S.Content>
    </S.Container>
  );
};
