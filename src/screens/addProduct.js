import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {ObjectId} from 'bson';

import {useMutation, useQuery} from '@apollo/client';
import {ADD_PRODUCT, EDIT_PRODUCT, VIEW_PRODUCT} from '../server/query';

function AddProduct({navigation, route}) {
  const Id = route?.params?.Id;
  const For = route?.params?.for;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [imagePath, setImagePath] = useState('');

  const [addProduct] = useMutation(ADD_PRODUCT);
  const [updateProduct] = useMutation(EDIT_PRODUCT);
  const {data, loading, error} =
    For == 'Edit'
      ? useQuery(VIEW_PRODUCT, {
          variables: {getProductId: new ObjectId(Id)},
        })
      : '';

  useEffect(() => {
    setName(data?.getProduct?.productName);
    setCategory(data?.getProduct?.category);
    setPrice(data?.getProduct?.price?.toString());
    setColor(data?.getProduct?.colors[0]);
    setImagePath(data?.getProduct?.imgPath);
  }, []);

  const onAdd = () => {
    addProduct({
      variables: {
        productName: name,
        price: parseInt(price),
        colors: [color],
        category: category,
        imgPath: imagePath,
      },
    })
      .then(() => {
        navigation?.goBack();
      })
      .catch(error => {
        console.log('error.......', error);
      });
  };

  const onEdit = () => {
    updateProduct({
      variables: {
        productName: name,
        price: parseInt(price),
        colors: [color],
        category: category,
        imgPath: imagePath,
        updateProductId: new ObjectId(Id),
      },
    })
      .then(() => {
        navigation?.goBack();
      })
      .catch(error => {
        console.log('error.......////', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          style={styles.input}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Category"
          value={category}
          style={styles.input}
          onChangeText={value => setCategory(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price"
          value={price}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => setPrice(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Color"
          value={color}
          style={styles.input}
          onChangeText={value => setColor(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Image"
          value={imagePath}
          style={styles.input}
          onChangeText={value => setImagePath(value)}
        />
      </View>

      <TouchableOpacity
        style={styles.btnEdit}
        onPress={For == 'Edit' ? onEdit : onAdd}>
        <Text style={styles.btnText}>{For}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'skyblue',
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    padding: 10,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
  btnEdit: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default AddProduct;
