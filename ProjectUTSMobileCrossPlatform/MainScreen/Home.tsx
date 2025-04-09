import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import imageMapping from "./imageMapping"; 
import dataRilis from "../dataRilis.json";

const Home = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("BARU RILIS");
  const ongoingData = dataRilis.ongoingData;
  const newReleasesData = dataRilis.newReleasesData;  

  const groupByDay = (data: any[]) => {
    const daysOfWeek = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"];
    return daysOfWeek.map((day) => ({
      day,
      items: data.filter((item) => item.day === day),
    }));
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailScreen", { item })}
    >
      <Image
        source={imageMapping[item.imageName] || imageMapping["default.jpg"]}
        style={styles.image}
      />
      <View style={styles.info}>
        {activeTab === "ON GOING" && <Text style={styles.episode}>Episode {item.episode}</Text>}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>
          Rating: <Text style={styles.ratingValue}>{item.rating.toFixed(1)}</Text>
        </Text>
        <Text style={styles.detail}>{item.views} views</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Drakor ID v1.8</Text>
      </View>

      <View style={styles.tabContainer}>
        {["BARU RILIS", "ON GOING"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === "ON GOING" ? (
        <FlatList
          data={groupByDay(ongoingData)}
          keyExtractor={(item) => item.day}
          renderItem={({ item }) => (
            <View>
              {item.items.length > 0 && <Text style={styles.sectionTitle}>{item.day}</Text>}
              <FlatList data={item.items} keyExtractor={(subItem) => subItem.id} renderItem={renderItem} />
            </View>
          )}
        />
      ) : (
        <FlatList data={newReleasesData} keyExtractor={(item) => item.id} renderItem={renderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    padding: 20,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tab: {
    color: "gray",
    fontSize: 16,
    marginHorizontal: 20,
    paddingBottom: 5,
  },
  activeTab: {
    color: "lime",
    borderBottomWidth: 3,
    borderBottomColor: "lime",
  },
  sectionTitle: {
    color: "lime",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#121212",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  episode: {
    color: "lime",
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  rating: {
    color: "white",
    fontSize: 14,
  },
  ratingValue: {
    color: "lime",
    fontWeight: "bold",
  },
  detail: {
    color: "gray",
    fontSize: 14,
    marginTop: 4,
  },
});

export default Home;
