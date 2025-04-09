import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const dramas = [
  {
    id: 1,
    title: "The Art of Negotiation",
    episodes: 2,
    rating: 8.5,
    views: "92.609",
  },
  {
    id: 2,
    title: "The Potato Lab",
    episodes: 4,
    rating: 8.5,
    views: "169.648",
  },
  {
    id: 3,
    title: "Newtopia",
    episodes: 6,
    rating: 8.2,
    views: "586.475",
  },
];

const OngoingScreen = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>SABTU</Text>
      {dramas.map((drama) => (
        <View key={drama.id} style={styles.card}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{drama.title}</Text>
            <Text style={styles.details}>{drama.episodes} VIDEO</Text>
            <Text style={styles.rating}>Rating: {drama.rating}</Text>
            <Text style={styles.views}>{drama.views} views</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#00ff00",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  poster: {
    width: 100,
    height: 130,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    color: "#aaa",
    fontSize: 14,
    marginVertical: 4,
  },
  rating: {
    color: "#00ff00",
    fontSize: 14,
  },
  views: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },
});

export default OngoingScreen;