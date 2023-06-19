import React, { useEffect } from 'react';
import {FlatList, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/client';
import {PRODUCT_QUERY} from '../server/query';

function ProductList({navigation}) {
  const {data, loading, error, refetch} = useQuery(PRODUCT_QUERY);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.infoText, styles.errorText]}>
          Error: {error.message}
        </Text>
      </View>
    );
  }

  const onAdd = () => {
    navigation.navigate('AddProduct', {for: 'Add'})
  }

  const onItemPress = (item) =>{
    console.log('item.....', item)
    navigation.navigate('ViewProduct', {Id: item?.id})
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data?.getProductsList}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.productCard} onPress={ () => onItemPress(item)}>
            <View style={styles.productInfo}>
              <View style={styles.row}>
                <Text style={styles.productTitle}>{item?.productName}</Text>
                <Text style={styles.price}>{`$${item?.price}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.infoText}>{item?.category}</Text>
                <Text style={styles.infoText}>{item?.colors[0]}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addContainer} onPress={onAdd}>
        <Text style={styles.addText}>{'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    padding: 10,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    margin: 4,
    padding: 8,
    borderRadius: 10,
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
  errorText: {
    color: '#ce2727',
  },
  addText:{
    fontSize: 20,
    color: '#fff',
  },
  addContainer:{
    backgroundColor:'skyblue',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom: 25,
    right: 25,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
  }
});

export default ProductList;
