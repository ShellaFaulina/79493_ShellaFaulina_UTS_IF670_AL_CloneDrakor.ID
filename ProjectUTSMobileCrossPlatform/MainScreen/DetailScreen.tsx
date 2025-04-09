import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import dataFilm from "../dataFilm.json";

const { width } = Dimensions.get("window");

const DetailScreen = ({ route }: any) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const drama = dataFilm.find((d) => d.title.toLowerCase() === item.title?.toLowerCase());
  if (!drama) return <Text style={{ color: "white" }}>Data tidak ditemukan</Text>;

  const episodes = Array.from({ length: drama.episode }, (_, index) => ({
    title: `${drama.title} E${(index + 1).toString().padStart(2, "0")}`,
  }));

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
  >
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
      <Text style={styles.backText}>← Drakor ID</Text>
    </TouchableOpacity>
    {/* Episode Aktif */}
    <View style={styles.episodeHeader}>
      <Text style={styles.episodeTitle}>{drama.title} E01</Text>
      <Text style={styles.subTitle}>
        {drama.title} - Serial Drama Korea 2025
      </Text>
    </View>
    {/* Navigasi Episode */}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.episodeNav}>
      {episodes.map((ep, index) => (
        <TouchableOpacity key={index} style={styles.episodeNavItem}>
          <Text style={styles.episodeNavText}>{ep.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* ownload & Semua Episode */}
    <TouchableOpacity style={styles.downloadButton}>
      <Text style={styles.downloadText}>Download</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.allEpisodesButton}>
      <Text style={styles.allEpisodesText}>LIHAT SEMUA EPISODE</Text>
    </TouchableOpacity>
    {/* Detail Info */}
    <View style={styles.infoBox}>
      <Text style={styles.sectionTitle}>Informasi Drama</Text>
      <View style={styles.infoGrid}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Drama:</Text>
          <Text style={styles.infoValue}>{drama.title}</Text>
          <Text style={styles.infoLabel}>Director:</Text>
          <Text style={styles.infoValue}>{drama.director}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Episodes:</Text>
          <Text style={styles.infoValue}>{drama.episode}</Text>
          <Text style={styles.infoLabel}>Genres:</Text>
          <Text style={styles.infoValue}>{drama.genre}</Text>
        </View>
        <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Release Date:</Text>
            <Text style={styles.infoValue}>{drama.releaseDate}</Text>
        </View>
        <View style={styles.ratingRow}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingValue}>{drama.rating.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Sinopsis</Text>
      <Text style={styles.infoValue}>{drama.sinopsis}</Text>
      <Text style={styles.sectionTitle}>Cast</Text>
      {drama.cast?.map((actor, idx) => (
        <Text key={idx} style={styles.infoValue}>• {actor}</Text>
      ))}
    </View>
  </ScrollView>
</SafeAreaView>

  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
},
scrollContent: {
    paddingBottom: 100,
},
  back: {
    marginVertical: 12,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
  },
  header: {
    width: "100%",
    height: 200,
    position: "relative",
    marginBottom: 10,
  },
  episodeHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  episodeTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  subTitle: {
    color: "#ccc",
    fontSize: 14,
  },
  episodeNav: {
    flexDirection: "row",
    marginBottom: 10,
  },
  episodeNavItem: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  episodeNavText: {
    color: "limegreen",
  },
  downloadButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  allEpisodesButton: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  allEpisodesText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoLeft: {
    flex: 1,
    paddingRight: 10,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  infoColumn: {
    flex: 1,
  },  
  infoLabel: {
    color: "#999",
    fontSize: 13,
    fontWeight: "bold",
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  ratingStar: {
    color: "#FFD700",
    fontSize: 16,
    marginRight: 6,
  },
  ratingValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },  
  sectionTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
