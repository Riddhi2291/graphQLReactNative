import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ApolloProvider} from '@apollo/client';
import client from './src/server/client';
import ProductList from './src/screens/productList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewProduct from './src/screens/viewProduct';
import AddProduct from './src/screens/addProduct';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={ProductList} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="ViewProduct" component={ViewProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
