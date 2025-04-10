import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

const API_URL = "https://api.disneyapi.dev/character";

// ✅ Character Card Component
const CharacterCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Image
          source={{
            uri: item.imageUrl || "https://via.placeholder.com/140x140.png?text=No+Image",
          }}
          style={styles.image}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.imageOverlay}
        >
          <Text style={styles.title}>{item.name}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`❌ HTTP Error! Status: ${response.status}`);

      const json = await response.json();
      if (!json.data || !Array.isArray(json.data)) {
        throw new Error("❌ Invalid API response format");
      }

      setData(json.data.slice(0, 20));
    } catch (error) {
      console.error("🚨 Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#10002B", "#240046", "#3C096C"]} style={styles.container}>
      <Text style={styles.header}>✨Disney Characters✨</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <CharacterCard item={item} onPress={() => setSelectedCharacter(item)} />
          )}
        />
      ) : (
        <Text style={styles.noData}>❌ No Characters Found!</Text>
      )}

      {/* Modal for Character Details */}
      <Modal
        isVisible={!!selectedCharacter}
        onBackdropPress={() => setSelectedCharacter(null)}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        {selectedCharacter && (
          <View style={styles.modalContent}>
            <Image
              source={{
                uri:
                  selectedCharacter.imageUrl ||
                  "https://via.placeholder.com/160x160.png?text=No+Image",
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>{selectedCharacter.name}</Text>
            <Text style={styles.modalText}>
              🎬 Movies:{" "}
              <Text style={styles.movieText}>
                {selectedCharacter.films?.join(", ") || "Unknown"}
              </Text>
            </Text>
          </View>
        )}
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#FFD700",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    margin: 8,
    borderRadius: 20,
    alignItems: "center",
    width: Dimensions.get("window").width / 2 - 24,
    shadowColor: "#FFD700",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 6,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    textTransform: "capitalize",
  },
  noData: { fontSize: 18, color: "red", textAlign: "center", marginTop: 20 },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  modalImage: { width: 160, height: 160, borderRadius: 15, marginBottom: 15 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  movieText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2b5876",
  },
});
