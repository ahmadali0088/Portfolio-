import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Dummy API URL
const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Replace with actual job API

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      navigation.navigate("JobListings");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Job Listings Screen
const JobListingsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setJobs(data.slice(0, 10))) // Limit results
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.jobCard}
            onPress={() => navigation.navigate("JobDetails", { job: item })}
          >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>Company XYZ</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Job Details Screen
const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.description}>{job.body}</Text>
      <Button title="Apply Now" onPress={() => alert("Application Submitted!")} />
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="JobListings" component={JobListingsScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  jobCard: { padding: 15, backgroundColor: "#f8f8f8", marginBottom: 10, borderRadius: 5 },
  jobTitle: { fontSize: 18, fontWeight: "bold" },
  jobCompany: { fontSize: 14, color: "gray" },
  description: { marginBottom: 20 },
});
