import React from "react";
import { View, Text, Button, FlatList, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Dashboard</Text>
    <Button title="Add Expense" onPress={() => navigation.navigate("AddExpense")} />
    <Button title="View Transactions" onPress={() => navigation.navigate("Transactions")} />
  </View>
);

const AddExpenseScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Add Expense</Text>
    <TextInput placeholder="Amount" style={styles.input} keyboardType="numeric" />
    <TextInput placeholder="Category" style={styles.input} />
    <Button title="Save Expense" onPress={() => navigation.goBack()} />
  </View>
);

const TransactionsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Transactions</Text>
    <FlatList data={[]} renderItem={({ item }) => <Text>{item.name}</Text>} />
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, width: "80%", padding: 10, marginVertical: 10 },
});
