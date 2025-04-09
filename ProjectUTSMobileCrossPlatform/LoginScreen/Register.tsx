import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setRegisteredUser } = useContext(AuthContext);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Semua field harus diisi.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password tidak sama.');
      return;
    }

    setRegisteredUser({ email, password });
    Alert.alert('Registrasi berhasil!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoAPK.png')} style={styles.logo} />
      <Text style={styles.title}>Register</Text>

      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Sudah punya akun? Login</Text>
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