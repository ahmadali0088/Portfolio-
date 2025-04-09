import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const products = [
  { id: '1', name: 'Laptop', price: '$999', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Smartphone', price: '$699', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Headphones', price: '$199', image: 'https://via.placeholder.com/150' }
];

const HomeScreen = ({ navigation }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <View style={{ padding: 10, borderBottomWidth: 1, alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ width: 200, height: 200 }} />
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <Text>Description of {product.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cart', { product })}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = ({ route, navigation }) => {
  const product = route.params?.product;
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text>Cart</Text>
      {product && <Text>{product.name} - {product.price}</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
        <Text>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text>Checkout</Text>
      <TextInput placeholder="Enter Shipping Address" style={{ borderWidth: 1, width: 200, margin: 5 }} />
      <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
        <Text>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const OrderHistoryScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text>Order History</Text>
      <Text>Past orders will appear here.</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
      <Text>Profile & Settings</Text>
      <Text>User Info</Text>
      <TouchableOpacity><Text>Change Theme</Text></TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
