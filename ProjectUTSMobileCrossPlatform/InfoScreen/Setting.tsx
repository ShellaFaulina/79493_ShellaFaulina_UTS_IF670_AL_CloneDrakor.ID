import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

const Setting = ({ navigation }) => {
  const [vibrate, setVibrate] = useState(true);
  const [fastMode, setFastMode] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const loadSettings = async () => {
      const storedVibrate = await AsyncStorage.getItem('vibrate');
      const storedFastMode = await AsyncStorage.getItem('fastMode');

      if (storedVibrate !== null) setVibrate(storedVibrate === 'true');
      if (storedFastMode !== null) setFastMode(storedFastMode === 'true');
    };

    loadSettings();
  }, []);

  const toggleVibrate = async (value) => {
    setVibrate(value);
    await AsyncStorage.setItem('vibrate', value.toString());
  };
  const toggleFastMode = async (value) => {
    setFastMode(value);
    await AsyncStorage.setItem('fastMode', value.toString());
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pengaturan Aplikasi</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Movie per Load</Text>
            <Text style={styles.description}>Display movies per load</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Vibrate</Text>
            <Text style={styles.description}>Vibrate it when data load</Text>
          </View>
          <Switch value={vibrate} onValueChange={toggleVibrate} />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Fast Mode</Text>
            <Text style={styles.description}>Hide all thumbnails</Text>
          </View>
          <Switch value={fastMode} onValueChange={toggleFastMode} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 20,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#aaa',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Setting;
