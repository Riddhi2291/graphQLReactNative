
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import client from './src/server/client';
import ProductList from './src/screens/productList';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ApolloProvider client={client}>
        <ProductList />
      </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
});

export default App;