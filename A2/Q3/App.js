import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const API_KEY = '5b24f45c30a92ddad0a7df6d0a6d76b7';
const TMDB_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(TMDB_URL)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results);
        setFiltered(data.results);
      });
  }, []);

  useEffect(() => {
    if (search === '') {
      setFiltered(movies);
    } else {
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    }
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>📅 {item.release_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎟️ Ticket Booking</Text>
      <TextInput
        placeholder="Search Movies..."
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#222',
  },
  search: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  poster: {
    width: 100,
    height: 150,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 6,
    color: '#555',
  },
});
