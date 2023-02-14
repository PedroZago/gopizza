import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components/native';

import firestore from '@react-native-firebase/firestore';

import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { ProductData } from '@src/interfaces';

import { Search, ProductCard } from '@components/index';

import HappyEmoji from '@assets/happy.png';

import * as S from './styles';

export const Home = () => {
  const [pizzas, setPizzas] = useState<ProductData[]>([]);
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const navigation = useNavigation();

  async function fetchPizzas(value = '') {
    try {
      const formattedValue = value.toLocaleLowerCase().trim();

      const response = await firestore()
        .collection('pizzas')
        .orderBy('name_insensitive')
        .startAt(formattedValue)
        .endAt(`${formattedValue}\uf8ff`)
        .get();

      const data = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      }) as ProductData[];

      setPizzas(data);
    } catch {
      Alert.alert('Consulta', 'Não foi possível realizar a consulta.');
    }
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleClearSearch() {
    setSearch('');
    fetchPizzas('');
  }

  function handleOpen(id: string) {
    navigation.navigate('product', { id });
  }

  function handleAdd() {
    navigation.navigate('product', {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas();
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetingEmoji source={HappyEmoji} />

          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>

        <S.SignOut>
          <MaterialIcons name="logout" color={theme.COLORS.TITLE} size={24} />
        </S.SignOut>
      </S.Header>

      <Search
        onClear={handleClearSearch}
        onSearch={handleSearch}
        value={search}
        onChangeText={setSearch}
      />

      <S.MenuHeader>
        <S.Title>Cardápio</S.Title>

        <S.MenuItemsNumber>{`${pizzas.length} pizza${
          pizzas.length === 1 ? '' : 's'
        }`}</S.MenuItemsNumber>
      </S.MenuHeader>

      <S.ProductList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
      />

      <S.NewProductButton
        title="Cadastrar pizza"
        type="secondary"
        onPress={handleAdd}
      />
    </S.Container>
  );
};
