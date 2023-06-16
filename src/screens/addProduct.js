import React from 'react';
import {FlatList, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useQuery} from '@apollo/client';
import {PRODUCT_QUERY} from '../server/query';

function AddProduct() {
 
  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default AddProduct;
