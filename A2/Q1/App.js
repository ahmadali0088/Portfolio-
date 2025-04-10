import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity onPress={fetchProducts} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 E-Commerce App</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 15,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
