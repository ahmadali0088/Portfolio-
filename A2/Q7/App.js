import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

// --- Profile Screen ---
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetching user profile data from a public API (JSONPlaceholder)
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => {
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData)); // Save to local storage
      setEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <TextInput
        style={styles.input}
        value={userData.name}
        editable={editing}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        value={userData.email}
        editable={editing}
        onChangeText={(text) => handleChange("email", text)}
      />
      <TextInput
        style={styles.input}
        value={userData.phone}
        editable={editing}
        onChangeText={(text) => handleChange("phone", text)}
      />

      {!editing ? (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// --- Main App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#3897f0",
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
