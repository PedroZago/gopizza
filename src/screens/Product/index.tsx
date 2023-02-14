import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useRoute, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { ProductNavigationProps } from '@src/@types/navigation';
import { ProductData } from '@src/interfaces';

import {
  ButtonBack,
  InputPrice,
  Photo,
  Input,
  Button,
} from '@components/index';

import * as S from './styles';

interface PizzaResponse extends ProductData {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
}

export const Product = () => {
  const [image, setImage] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');

  const [photoPath, setPhotoPath] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  }

  async function handleAdd() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Informe o nome da pizza.').trim(),
        description: Yup.string()
          .required('Informe a descrição da pizza.')
          .trim(),
        image: Yup.string().required('Selecione a imagem da pizza.'),
        priceSizeP: Yup.string().required(
          'Informe o preço de todos os tamanhos da pizza.'
        ),
        priceSizeM: Yup.string().required(
          'Informe o preço de todos os tamanhos da pizza.'
        ),
        priceSizeG: Yup.string().required(
          'Informe o preço de todos os tamanhos da pizza.'
        ),
      });

      await schema.validate({
        name,
        description,
        image,
        priceSizeP,
        priceSizeM,
        priceSizeG,
      });

      setIsLoading(true);

      const fileName = new Date().getTime();
      const reference = storage().ref(`/pizzas/${fileName}.png`);

      await reference.putFile(image);
      const photo_url = await reference.getDownloadURL();

      firestore()
        .collection('pizzas')
        .add({
          name,
          name_insensitive: name.toLocaleLowerCase().trim(),
          description,
          prices_sizes: {
            p: priceSizeP,
            m: priceSizeM,
            g: priceSizeG,
          },
          photo_url,
          photo_path: reference.fullPath,
        });

      navigation.navigate('home');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Cadastro', error.message);
      } else {
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
      }
    }
  }

  async function fetchPizza() {
    try {
      const response = await firestore().collection('pizzas').doc(id).get();

      const product = response.data() as PizzaResponse;

      setName(product.name);
      setImage(product.photo_url);
      setPhotoPath(product.photo_path);
      setDescription(product.description);
      setPriceSizeP(product.prices_sizes.p);
      setPriceSizeM(product.prices_sizes.m);
      setPriceSizeG(product.prices_sizes.g);
    } catch {
      Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleDelete() {
    try {
      await firestore().collection('pizzas').doc(id).delete();
      await storage().ref(photoPath).delete();

      navigation.navigate('home');
    } catch {}
  }

  useEffect(() => {
    if (id) fetchPizza();
  }, [id]);

  return (
    <S.Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.ContentWrapper>
          <S.Header>
            <ButtonBack onPress={handleGoBack} />

            <S.Title>Cadastrar</S.Title>

            {id ? (
              <TouchableOpacity onPress={handleDelete}>
                <S.DeleteLabel>Deletar</S.DeleteLabel>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 50 }} />
            )}
          </S.Header>

          <S.Upload>
            <Photo uri={image} />

            {!id && (
              <S.PickImageButton
                title="Carregar"
                type="secondary"
                onPress={handlePickerImage}
              />
            )}
          </S.Upload>

          <S.Form>
            <S.InputGroup>
              <S.Label>Nome</S.Label>

              <Input onChangeText={setName} value={name} />
            </S.InputGroup>

            <S.InputGroup>
              <S.InputGroupHeader>
                <S.Label>Descrição</S.Label>

                <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
              </S.InputGroupHeader>

              <Input
                onChangeText={setDescription}
                value={description}
                multiline
                maxLength={60}
                style={{ height: 80 }}
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Tamanhos e preços</S.Label>

              <InputPrice
                onChangeText={setPriceSizeP}
                value={priceSizeP}
                size="P"
              />

              <InputPrice
                onChangeText={setPriceSizeM}
                value={priceSizeM}
                size="M"
              />

              <InputPrice
                onChangeText={setPriceSizeG}
                value={priceSizeG}
                size="G"
              />
            </S.InputGroup>

            {!id && (
              <Button
                title="Cadastrar pizza"
                isLoading={isLoading}
                onPress={handleAdd}
              />
            )}
          </S.Form>
        </S.ContentWrapper>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};
