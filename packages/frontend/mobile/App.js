import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import SQLite from 'react-native-sqlite-storage';
import Geolocation from 'react-native-geolocation-service';

// Initialisation de la base de données SQLite
const db = SQLite.openDatabase(
  {
    name: 'SupplyChainDB',
    location: 'default',
  },
  () => {
    console.log('Base de données connectée');
  },
  error => {
    console.log('Erreur de connexion à la base de données', error);
  }
);

const App = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [location, setLocation] = useState(null);

  // Création des tables lors du premier lancement
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS scanned_items (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)",
        [],
        () => {
          console.log('Table scanned_items créée avec succès');
        },
        error => {
          console.log('Erreur lors de la création de la table scanned_items', error);
        }
      );
    });

    // Demander la permission de localisation
    Geolocation.requestAuthorization();
  }, []);

  // Fonction pour gérer le résultat du scan QR
  const onSuccess = (e) => {
    setScanning(false);
    setScannedData(e.data);
    
    // Sauvegarder les données scannées dans la base de données locale
    db.transaction(txn => {
      txn.executeSql(
        "INSERT INTO scanned_items (data) VALUES (?)",
        [e.data],
        () => {
          console.log('Données scannées sauvegardées');
          Alert.alert('Succès', 'Code QR scanné et sauvegardé localement');
        },
        error => {
          console.log('Erreur lors de la sauvegarde des données scannées', error);
          Alert.alert('Erreur', 'Impossible de sauvegarder les données scannées');
        }
      );
    });
  };

  // Fonction pour obtenir la position actuelle
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        Alert.alert('Position', `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      },
      error => {
        Alert.alert('Erreur', `Impossible d'obtenir la position: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Fonction pour synchroniser les données avec le serveur
  const syncData = () => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT * FROM scanned_items WHERE synced = 0 OR synced IS NULL",
        [],
        (tx, res) => {
          const itemsToSync = [];
          for (let i = 0; i < res.rows.length; i++) {
            itemsToSync.push(res.rows.item(i));
          }
          
          // Ici, vous enverriez les données au serveur
          console.log('Données à synchroniser:', itemsToSync);
          Alert.alert('Synchronisation', `Synchronisation de ${itemsToSync.length} éléments`);
          
          // Marquer les éléments comme synchronisés (dans une vraie application)
          // txn.executeSql("UPDATE scanned_items SET synced = 1 WHERE id IN (?)", [itemsToSync.map(item => item.id)]);
        },
        error => {
          console.log('Erreur lors de la récupération des données à synchroniser', error);
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Supply Chain Intelligence</Text>
      </View>
      
      {!scanning ? (
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => setScanning(true)}>
            <Text style={styles.buttonText}>Scanner un QR Code</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
            <Text style={styles.buttonText}>Obtenir ma position</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={syncData}>
            <Text style={styles.buttonText}>Synchroniser les données</Text>
          </TouchableOpacity>
          
          {scannedData && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Dernier code scanné:</Text>
              <Text style={styles.resultData}>{scannedData}</Text>
            </View>
          )}
          
          {location && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Position actuelle:</Text>
              <Text style={styles.resultData}>Latitude: {location.latitude}</Text>
              <Text style={styles.resultData}>Longitude: {location.longitude}</Text>
            </View>
          )}
        </View>
      ) : (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={styles.centerText}>
              Placez le QR Code dans le cadre pour le scanner
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.button} onPress={() => setScanning(false)}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultData: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;