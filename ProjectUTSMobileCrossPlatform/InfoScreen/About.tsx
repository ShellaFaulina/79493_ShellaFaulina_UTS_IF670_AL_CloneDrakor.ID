import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const aboutItems = [
  { id: '1', title: 'About App', description: 'Drakor ID', icon: '💻' },
  { id: '2', title: 'Versi', description: 'v1.8', icon: '❓' },
  { id: '3', title: 'Copyright', description: 'Shared © 2024 Drakor ID Developer', icon: '🔒' },
  { id: '4', title: 'Privacy Policy and GDPR', description: 'Privacy Policy and GDPR', icon: '🔐' },
  { id: '5', title: 'Library', description: 'Plugin yang kami gunakan', icon: '🔥' },
];

const About = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tentang Drakor ID</Text>
      <FlatList
        data={aboutItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { color: 'white', fontSize: 24, fontWeight: 'bold', padding: 16 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  icon: { fontSize: 24, marginRight: 16 },
  info: { flex: 1 },
  title: { color: 'white', fontSize: 18 },
  description: { color: 'gray', fontSize: 14 },
  adBanner: { backgroundColor: '#FF4500', padding: 16, alignItems: 'center' },
  adText: { color: 'white', fontWeight: 'bold' },
});

export default About;
