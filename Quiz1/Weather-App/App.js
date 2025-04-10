import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

const WeatherScreen = () => {
  // Static weather data
  const city = "Islamabad";
  const temperature = "22°C";
  const weatherCondition = "Sunny";
  const weatherIcon = { uri: "https://openweathermap.org/img/wn/01d@2x.png" }; // Fetch sunny icon from OpenWeather
  const backgroundColor = weatherCondition === "Sunny" ? "#FDB813" : weatherCondition === "Cloudy" ? "#B0C4DE" : weatherCondition === "Rainy" ? "#778899" : "skyblue"; // Dynamic background color

  return (
    <View style={[styles.background, { backgroundColor }]}> 
      <View style={styles.container}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.temp}>{temperature}</Text>
        <Image source={weatherIcon} style={styles.icon} />
        <Text style={styles.description}>{weatherCondition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight transparency for readability
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  description: {
    fontSize: 24,
    textTransform: "capitalize",
    color: "#fff",
  },
});

export default WeatherScreen;