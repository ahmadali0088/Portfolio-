import React, { useState, useContext, createContext } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const CartContext = createContext();

const restaurants = [
  { id: "1", name: "Pizza Place", image: "https://via.placeholder.com/150", rating: 4.5, menu: [
    { id: "101", name: "Pepperoni Pizza", price: 12.99 },
    { id: "102", name: "Veggie Pizza", price: 10.99 },
  ]},
  { id: "2", name: "Sushi Spot", image: "https://via.placeholder.com/150", rating: 4.8, menu: [
    { id: "201", name: "Salmon Roll", price: 15.99 },
    { id: "202", name: "Tuna Roll", price: 14.99 },
  ]}
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search restaurants..."
        onChangeText={setSearch}
      />
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.restaurantCard}
            onPress={() => navigation.navigate("RestaurantDetails", { restaurant: item })}
          >
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <Text style={styles.restaurantName}>{item.name}</Text>
            <Text>⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { addToCart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item.name} - ${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={styles.addButton}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const CartScreen = () => {
  const { cart } = useContext(CartContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart([...cart, item]);
  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: { padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10 },
  restaurantCard: { padding: 10, marginVertical: 5, backgroundColor: "#f8f8f8", borderRadius: 8 },
  restaurantImage: { width: 100, height: 100, borderRadius: 8 },
  restaurantName: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  menuItem: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  addButton: { color: "blue" },
  checkoutButton: { backgroundColor: "green", padding: 15, borderRadius: 8, marginTop: 10, alignItems: "center" },
  checkoutText: { color: "white", fontWeight: "bold" },
});
