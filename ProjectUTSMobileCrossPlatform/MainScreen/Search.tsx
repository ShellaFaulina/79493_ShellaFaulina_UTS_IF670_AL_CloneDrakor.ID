import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dataAllmovie from '../dataAllmovie.json';
import imageMapping from './imageMapping';

const Search = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState('Drama Korea');
  const [searchText, setSearchText] = useState('');

  const categories = [
    'Drama Korea',
    'Drama Thailand',
    'Drama Jepang',
    'Drama China',
    'Movie',
    'Variety Show',
  ];

  const handleSelectCategorie = (categorie) => {
    setSelectedCategorie(categorie);
    setShowDropdown(false);
  };

  const filteredData = dataAllmovie.filter(
    (item) =>
      item.categorie.toLowerCase() === selectedCategorie.toLowerCase() &&
      item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const imageSource =
      imageMapping[item.imageName] || imageMapping['default.jpg'];

    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => navigation.navigate('DetailScreen', { item })}
      >
        <Image source={imageSource} style={styles.thumbnail} />
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultSubtitle}>
            {item.genre} | {item.episode} Episode
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Pencarian Drakor ID</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Ketik kata kunci. Contoh 'Itaewon'"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>
          {selectedCategorie.toUpperCase()}
        </Text>
        <Ionicons name="chevron-down" size={20} color="white" />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelectCategorie(item)}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  searchInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 12,
    color: 'white',
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  dropdownText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Search;
