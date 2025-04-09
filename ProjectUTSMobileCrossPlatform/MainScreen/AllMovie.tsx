import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import dataallmovie from '../dataAllmovie.json';
import imageMapping from './imageMapping';

const AllMovie = ({ navigation }) => {
  const renderItem = (item) => {
    const imageSource = imageMapping[item.imageName] 

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => navigation.navigate('DetailDrama', { item })}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.year}>{item.year || 'Drama Korea'}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.detail}>{item.episode} Episode</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.rating}>Rating: {item.rating.toFixed(1)}</Text>
            <Text style={styles.views}>{item.views} views</Text>
          </View>
          {item.status && (
            <View style={styles.statusContainer}>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Semua Drama</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {dataallmovie.map((item) => renderItem(item))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  year: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  detail: {
    color: '#90EE90',
    fontSize: 14,
    fontStyle: 'italic',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rating: {
    color: '#32CD32',
    fontSize: 14,
  },
  views: {
    color: 'gray',
    fontSize: 14,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  status: {
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

export default AllMovie;
