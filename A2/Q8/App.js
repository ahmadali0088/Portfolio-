import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SEAT_API_URL = 'https://my-json-server.typicode.com/yourusername/yourrepo/seats';  // Replace with your mock API URL

export default function App() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  useEffect(() => {
    fetch(SEAT_API_URL)
      .then(res => res.json())
      .then(data => {
        setSeats(data);
        loadSelectedSeats();
      });
  }, []);

  // Load selected seats from AsyncStorage
  const loadSelectedSeats = async () => {
    try {
      const storedSeats = await AsyncStorage.getItem('selectedSeats');
      if (storedSeats) {
        setSelectedSeats(JSON.parse(storedSeats));
      }
    } catch (error) {
      console.error("Error loading selected seats", error);
    }
  };

  // Toggle seat selection
  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prevSelectedSeats => {
      const updatedSeats = prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter(id => id !== seatId)
        : [...prevSelectedSeats, seatId];
      saveSelectedSeats(updatedSeats);
      return updatedSeats;
    });
  };

  // Save selected seats to AsyncStorage
  const saveSelectedSeats = async (updatedSeats) => {
    try {
      await AsyncStorage.setItem('selectedSeats', JSON.stringify(updatedSeats));
    } catch (error) {
      console.error("Error saving selected seats", error);
    }
  };

  // Handle confirmation of seat selection
  const confirmSelection = () => {
    Alert.alert("Selection Confirmed", `You have selected ${selectedSeats.length} seats.`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.seat, item.booked ? styles.booked : styles.available, selectedSeats.includes(item.id) && styles.selected]}
      onPress={() => item.booked ? null : toggleSeatSelection(item.id)}
    >
      <Text style={styles.seatText}>{item.booked ? 'Booked' : 'Available'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎟️ Seat Selection</Text>
      <FlatList
        data={seats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={5}
        contentContainerStyle={styles.seatList}
      />
      <Button title="Confirm Selection" onPress={confirmSelection} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#222',
  },
  seatList: {
    alignItems: 'center',
    marginVertical: 20,
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  available: {
    backgroundColor: '#8BC34A',
  },
  booked: {
    backgroundColor: '#FF5722',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  seatText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
