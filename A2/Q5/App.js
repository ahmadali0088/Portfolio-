import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const API_URL = 'https://raw.githubusercontent.com/saadpasta/json-hosting/main/restaurantData.json';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Fetched Data:", data);
      setRestaurants(data);
      setFiltered(data);
      const cuisineList = [...new Set(data.map(item => item.cuisine))];
      setCuisines(cuisineList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const filterByCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === '') {
      setFiltered(restaurants);
    } else {
      const result = restaurants.filter(r => r.cuisine === cuisine);
      setFiltered(result);
    }
  };

  const renderRestaurant = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>Cuisine: {item.cuisine}</Text>
      <Text style={styles.detail}>Rating: ⭐ {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Food Delivery</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => filterByCuisine('')}>
          <Text style={[styles.filterButton, selectedCuisine === '' && styles.selected]}>All</Text>
        </TouchableOpacity>
        {cuisines.map((cuisine) => (
          <TouchableOpacity key={cuisine} onPress={() => filterByCuisine(cuisine)}>
            <Text style={[styles.filterButton, selectedCuisine === cuisine && styles.selected]}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6347" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRestaurant}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    marginRight: 10,
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
    fontSize: 14,
  },
  selected: {
    backgroundColor: '#FF6347',
    color: '#fff',
  },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
  },
});
