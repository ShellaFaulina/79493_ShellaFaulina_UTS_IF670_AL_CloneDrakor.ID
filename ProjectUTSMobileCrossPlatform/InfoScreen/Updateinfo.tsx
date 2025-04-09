import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Updateinfo = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.header}>Update Info</Text>

          <Text style={styles.subHeader}>Versi 1.8:</Text>
          <Text style={styles.listItem}>• Update Android SDK 34</Text>
          <Text style={styles.listItem}>• Update ExoPlayer versi 2.18.3</Text>
          <Text style={styles.listItem}>• Support Android 14</Text>
          <Text style={styles.listItem}>• Fix Download Error</Text>
          <Text style={styles.listItem}>• Lebih stabil</Text>
          <Text style={styles.listItem}>• Bugfix</Text>

          <Text style={styles.footer}>Salam Drakor ID!</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  footer: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default Updateinfo;
