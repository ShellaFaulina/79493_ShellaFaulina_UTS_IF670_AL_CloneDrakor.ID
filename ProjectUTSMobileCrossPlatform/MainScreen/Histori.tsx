import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

const Histori = () => {
  const [backupModalVisible, setBackupModalVisible] = useState(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [backupFileName, setBackupFileName] = useState('');
  const [hasBackup, setHasBackup] = useState(false);
  const [restoreFileName, setRestoreFileName] = useState('');

  const handleBackup = () => {
    setBackupModalVisible(true);
  };

  const handleRestore = () => {
    if (!hasBackup) {
      Alert.alert('Peringatan', 'Tidak ada file backup!');
      return;
    }
    setRestoreModalVisible(true);
  };

  const handleSaveBackup = () => {
    if (backupFileName.trim() === '') {
      Alert.alert('Peringatan', 'Nama file backup tidak boleh kosong!');
      return;
    }
    setHasBackup(true); 
    Alert.alert('Sukses', `Backup disimpan dengan nama: ${backupFileName}`);
    setBackupModalVisible(false);
  };

  const handleCancel = () => {
    setBackupModalVisible(false);
    setRestoreModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backupButton]}
          onPress={handleBackup}
        >
          <Text style={styles.buttonText}>Backup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.restoreButton]}
          onPress={handleRestore}
        >
          <Text style={styles.buttonText}>Restore</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emptyHistory}>
        <Text style={styles.emptyText}>Belum ada Riwayat Nonton...</Text>
      </View>

      {/* Backup */}
      <Modal transparent={true} visible={backupModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nama File Backup:</Text>
            <TextInput
              style={styles.input}
              value={backupFileName}
              onChangeText={setBackupFileName}
              placeholder="Masukkan nama file"
              placeholderTextColor="gray"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modalButtonText}>BATAL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveBackup}>
                <Text style={styles.modalButtonText}>SIMPAN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Restore */}
      <Modal transparent={true} visible={restoreModalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Restore Riwayat Nonton:</Text>
            <Text style={styles.dbText}>.db</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modalButtonText}>BATAL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 10,
  },
  backupButton: {
    backgroundColor: 'green',
  },
  restoreButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyHistory: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginBottom: 20,
    padding: 5,
    fontSize: 16,
  },
  dbText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default Histori;
