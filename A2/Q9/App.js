import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
  const [chartData, setChartData] = useState([]);

  const fetchTransactions = async () => {
    try {
      // Replace with a real fetch from your JSONServer if available
      // const res = await fetch(API_URL);
      // const data = await res.json();
      const data = mockData;
      setTransactions(data);
      updateChartData(data);
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

  const updateChartData = (data) => {
    // Assuming data has a date field in YYYY-MM-DD format, you can group expenses by month
    const monthlyExpenses = data.reduce((acc, { date, amount, type }) => {
      if (type === 'expense') {
        const month = new Date(date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + amount;
      }
      return acc;
    }, {});

    // Prepare data for chart
    const months = Object.keys(monthlyExpenses);
    const expenses = months.map(month => monthlyExpenses[month]);

    setChartData({
      labels: months,
      datasets: [
        {
          data: expenses,
          strokeWidth: 2, // Optional for line chart
        },
      ],
    });
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
        <>
          <View style={styles.chartContainer}>
            {chartData.labels && chartData.labels.length > 0 ? (
              <LineChart
                data={chartData}
                width={350}
                height={220}
                yAxisLabel="$"
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#f1f3f6',
                  backgroundGradientTo: '#f1f3f6',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <Text>No data available for the chart</Text>
            )}
          </View>
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
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
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
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
