import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import dataAllmovie from '../dataAllmovie.json';
import imageMapping from './imageMapping';

const genres = [
  'Action', 'Adventure', 'Animation', 'Business', 'Comedy',
  'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Mystery'
];

const Genre = ({ navigation }) => {
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredData = dataAllmovie.filter(
    (item) =>
      item.genre === selectedGenre &&
      item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { item })}
    >
      <Image
        source={imageMapping[item.imageName] || imageMapping['default.jpg']}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.year}>{item.genre}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.videos}>{item.episode} Episode</Text>
        <View style={styles.details}>
          <Text style={styles.rating}>Rating: {item.rating.toFixed(1)}</Text>
          <Text style={styles.views}>{item.views} views</Text>
        </View>
        {item.status && (
          <Text style={styles.complete}>{item.status}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Select Genre</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedGenre.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView style={styles.genreList}>
            {genres.map((genre, index) => (
              <TouchableOpacity
                key={index}
                style={styles.genreItem}
                onPress={() => {
                  setSelectedGenre(genre);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.genreText}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  label: { color: 'white', fontSize: 16, marginRight: 8 },
  dropdown: { backgroundColor: '#222', padding: 8, borderRadius: 8 },
  dropdownText: { color: 'white', fontWeight: 'bold' },
  search: {
    backgroundColor: '#222',
    color: 'white',
    padding: 8,
    borderRadius: 8,
    margin: 16,
  },
  card: {
    flexDirection: 'row',
    margin: 8,
    backgroundColor: '#111',
    borderRadius: 12,
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, padding: 8 },
  year: { color: 'yellow', fontSize: 12 },
  title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  videos: { color: 'gray', fontSize: 14 },
  details: { flexDirection: 'row', justifyContent: 'space-between' },
  rating: { color: 'green' },
  views: { color: 'white' },
  complete: {
    color: 'white',
    marginTop: 8,
    backgroundColor: 'black',
    padding: 4,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  genreList: {
    maxHeight: 300,
    margin: 20,
    backgroundColor: '#111',
    borderRadius: 10,
  },
  genreItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  genreText: { color: 'white', fontSize: 16 },
  closeButton: { padding: 16, alignItems: 'center' },
  closeText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
});

export default Genre;
