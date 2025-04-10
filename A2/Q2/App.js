// App.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// --- Login Screen ---
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      navigation.navigate("Feed", { username });
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.logo}>Instagram</Text>
      <TextInput
        placeholder="Enter your username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Feed Screen ---
const FeedScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = route.params?.username || "Guest";

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.slice(0, 15)); // Limit to 15 posts
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate("Details", { post: item })}
    >
      <View style={styles.postHeader}>
        <Image
          source={{
            uri: `https://i.pravatar.cc/150?img=${item.userId}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>user_{item.userId}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.feed}
    />
  );
};

// --- Post Details Screen ---
const DetailsScreen = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsUsername}>user_{post.userId}</Text>
      <Text style={styles.detailsTitle}>{post.title}</Text>
      <Text style={styles.detailsBody}>{post.body}</Text>
    </View>
  );
};

// --- Main App ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#000",
    fontFamily: "sans-serif",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#3897f0",
    padding: 12,
    borderRadius: 8,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  feed: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  postTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 5,
  },
  postBody: {
    fontSize: 14,
    color: "#555",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  detailsUsername: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsBody: {
    fontSize: 16,
    color: "#444",
  },
});
