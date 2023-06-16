import React from 'react';
import {FlatList, Text, View, StyleSheet, Image} from 'react-native';
import {useQuery} from '@apollo/client';
import { PRODUCT_QUERY } from '../server/query';

function ProductList() {
  const {data, loading, error} = useQuery(PRODUCT_QUERY);

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

  return (
    <FlatList
      style={styles.list}
      data={data?.getProductsList}
      renderItem={({item}) => (
        <View style={styles.jobCard}>
          <View style={styles.jobInfo}>
            <Text style={styles.jobTitle}>{item?.productName}</Text>
            <Text style={styles.jobCompany}>{item?.category}</Text>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  jobInfo: {
    flex: 1,
    padding: 10,
  },
  jobCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 1,
    margin: 4,
    padding: 8,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobCompany: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    color: '#ce2727',
  },
});

export default ProductList;