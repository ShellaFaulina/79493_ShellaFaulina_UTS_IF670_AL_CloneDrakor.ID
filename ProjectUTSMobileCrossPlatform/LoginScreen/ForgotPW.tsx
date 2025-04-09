import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ForgotPW({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Peringatan', 'Mohon isi alamat email terlebih dahulu.');
      return;
    }
    Alert.alert(
      'Email Dikirim',
      `Instruksi reset password telah dikirim ke ${email}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.label}>Masukkan alamat email akun Anda:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Kirim Link Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Kembali ke Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001A44',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#4A90E2',
    fontSize: 14,
    marginTop: 10,
  },
});
