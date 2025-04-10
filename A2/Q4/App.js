import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

// Mock API URL (replace with your JSONServer endpoint)
const API_URL = 'https://my-json-server.typicode.com/typicode/demo/posts'; // Replace with your endpoint

const mockData = [
  { id: '1', amount: 1500, category: 'Salary', date: '2025-04-01', type: 'income' },
  { id: '2', amount: 200, category: 'Groceries', date: '2025-04-03', type: 'expense' },
  { id: '3', amount: 100, category: 'Transport', date: '2025-04-04', type: 'expense' },
  { id: '4', amount: 500, category: 'Freelance', date: '2025-04-05', type: 'income' },
];

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      // Replace with a real fetch from your JSONServer if available
      // const res = await fetch(API_URL);
      // const data = await res.json();
      const data = mockData;
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const calculateSummary = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    return { income, expenses, balance };
  };

  const { income, expenses, balance } = calculateSummary();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
        {item.type === 'income' ? '+' : '-'}${item.amount}
      </Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Income: ${income}</Text>
        <Text style={styles.summaryText}>Expenses: ${expenses}</Text>
        <Text style={styles.summaryText}>Balance: ${balance}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summary: {
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  list: {
    paddingBottom: 100,
  },
  item: {
    padding: 14,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    marginBottom: 12,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
  },
  amount: {
    fontSize: 18,
    marginTop: 4,
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  date: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
});
