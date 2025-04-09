import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registeredUser, setUser } = useContext(AuthContext);

  // Auto login on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        navigation.replace('Main');
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Email dan password harus diisi');
      return;
    }

    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      const loggedInUser = { email };
      setUser(loggedInUser);
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser)); // Simpan login
      Alert.alert('Login berhasil!');
      navigation.replace('Main');
    } else {
      Alert.alert('Email atau password salah!');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoAPK.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPW')}>
        <Text style={styles.link}>Lupa Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001A44',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#4A90E2',
  },
});