import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

// Login Screen
const LoginScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, width: 200, margin: 5 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: 200, margin: 5 }} />
      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Feed Screen
const FeedScreen = ({ navigation }) => {
  const posts = [
    { id: '1', user: 'Alice', content: 'Hello World!', image: null },
    { id: '2', user: 'Bob', content: 'Enjoying my day!', image: 'https://via.placeholder.com/150' }
  ];
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{item.user}</Text>
          <Text>{item.content}</Text>
          {item.image && <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />}
          <TouchableOpacity><Text>Like</Text></TouchableOpacity>
          <TouchableOpacity><Text>Comment</Text></TouchableOpacity>
        </View>
      )}
    />
  );
};

// Create Post Screen
const CreatePostScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Create Post</Text>
      <TextInput placeholder="Caption" style={{ borderWidth: 1, width: 200, margin: 5 }} />
      <TouchableOpacity><Text>Upload Image</Text></TouchableOpacity>
      <TouchableOpacity><Text>Post</Text></TouchableOpacity>
    </View>
  );
};

// Profile Screen
const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <Text>Profile Screen</Text>
      <Text>User Name</Text>
      <Text>Bio goes here...</Text>
      <TouchableOpacity><Text>Follow/Unfollow</Text></TouchableOpacity>
    </ScrollView>
  );
};

// Chat Screen
const ChatScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
    </View>
  );
};

// Notifications Screen
const NotificationsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications</Text>
    </View>
  );
};

// App with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
