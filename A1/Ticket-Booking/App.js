import React from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const events = [
  { id: "1", name: "Movie: Avengers", type: "movie", location: "Cinema Hall 1" },
  { id: "2", name: "Concert: Coldplay", type: "event", location: "Stadium" },
  { id: "3", name: "Flight: NYC to LA", type: "flight", location: "JFK Airport" },
];

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate("BookingDetails", { event: item })}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <Text>{item.location}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const BookingDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{event.name}</Text>
      <Text>{event.location}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const PaymentScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Payment</Text>
    <TouchableOpacity style={styles.button} onPress={() => alert("Payment Successful!")}> 
      <Text style={styles.buttonText}>Pay Now</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  itemCard: { padding: 15, backgroundColor: "#f8f8f8", marginVertical: 5, borderRadius: 5 },
  itemText: { fontSize: 18, fontWeight: "bold" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontWeight: "bold" },
});
