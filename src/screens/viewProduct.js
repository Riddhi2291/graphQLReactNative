import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {DELETE_PRODUCT, VIEW_PRODUCT} from '../server/query';
import {ObjectId} from 'bson';

function ViewProduct({navigation, route}) {
  const Id = route?.params?.Id;

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const {data, loading, error} = useQuery(VIEW_PRODUCT, {
    variables: {getProductId: new ObjectId(Id)},
  });

  const onDelete = () => {
    deleteProduct({variables: {deleteProductId: Id}}).then(() => {
      navigation?.goBack();
    });
  };

  const onEdit = () => {
    navigation.navigate('AddProduct', {Id: Id, for: 'Edit'})
  };

  return (
    <View style={styles.container}>
      <View style={styles.productCard}>
        <View style={styles.row}>
          <Text style={styles.productTitle}>
            {data?.getProduct?.productName}
          </Text>
          <Text style={styles.price}>{`$${data?.getProduct?.price}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoText}>{data?.getProduct?.category}</Text>
          <Text style={styles.infoText}>{data?.getProduct?.colors[0]}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnEdit} onPress={onEdit}>
            <Text style={styles.btnText}>{'Edit'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDelete} onPress={onDelete}>
            <Text style={styles.btnText}>{'Delete'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    borderRadius: 10,
    padding: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  btnEdit: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ViewProduct;
