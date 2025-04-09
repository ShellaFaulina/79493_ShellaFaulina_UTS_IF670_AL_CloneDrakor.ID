import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQ = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>FAQ</Text>

        <Text style={styles.question}>Min ini aplikasi resmi atau ga?</Text>
        <Text style={styles.answer}>
          Ini bukan aplikasi resmi seperti Viu yang memiliki Hak Siar resmi. Sumber film kami
          berasal dari komunitas subber Indonesia dan situs-situs penyedia download gratis lainnya.
        </Text>

        <Text style={styles.question}>Min kok streamingnya lambat ya?</Text>
        <Text style={styles.answer}>
          Streaming lambat bisa disebabkan oleh banyaknya pengguna yang mengakses server secara bersamaan,
          atau koneksi internet kamu kurang stabil. Cobalah gunakan jaringan Wi-Fi atau ganti server.
        </Text>

        <Text style={styles.question}>Min mau streaming lewat GDrive kok error ya?</Text>
        <Text style={styles.answer}>
          GDrive kadang membatasi jumlah streaming jika terlalu banyak pengguna mengakses dalam waktu bersamaan.
          Disarankan untuk mencoba server lain jika tersedia.
        </Text>

        <Text style={styles.question}>Min mau download lewat GDrive kok error juga ya?</Text>
        <Text style={styles.answer}>
          GDrive memiliki batas bandwidth harian (1TB per hari). Jika terlampaui, maka link download tidak bisa diakses sementara.
        </Text>

        <Text style={styles.question}>Kenapa drama terbaru suka delay update-nya?</Text>
        <Text style={styles.answer}>
          Kami mengandalkan sumber komunitas, jadi kadang subtitle atau video belum tersedia saat drama baru tayang.
          Harap bersabar dan pantau secara berkala.
        </Text>

        <Text style={styles.question}>Apakah semua drama memiliki subtitle Indonesia?</Text>
        <Text style={styles.answer}>
          Sebagian besar drama sudah dilengkapi subtitle Indonesia. Jika belum tersedia, tim kami akan mengusahakan
          update secepat mungkin.
        </Text>

        <Text style={styles.question}>Bisakah saya request drama tertentu?</Text>
        <Text style={styles.answer}>
          Bisa! Silakan hubungi kami melalui kontak yang tersedia di menu "Tentang Kami" atau melalui Instagram kami.
        </Text>

        <Text style={styles.question}>Apakah aplikasi ini gratis?</Text>
        <Text style={styles.answer}>
          Ya, aplikasi ini sepenuhnya gratis tanpa biaya berlangganan. Namun, kami sangat menghargai jika kamu mendukung kami
          lewat donasi atau share ke teman-teman kamu.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  answer: {
    fontSize: 16,
    color: '#bbb',
    marginTop: 8,
    lineHeight: 22,
  },
});

export default FAQ;
