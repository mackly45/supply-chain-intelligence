import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/themed-button';

export default function SupplyChainScreen() {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Function to handle QR code scanning (simulated)
  const handleScanQRCode = () => {
    // In a real app, this would use the camera to scan QR codes
    const simulatedData = `Item-${Math.floor(Math.random() * 1000)}`;
    setScannedData(simulatedData);
    Alert.alert('Success', `QR Code scanned: ${simulatedData}`);
  };

  // Function to get current location (simulated)
  const getCurrentLocation = () => {
    // In a real app, this would use the device's GPS
    const simulatedLocation = {
      latitude: 40.7128 + (Math.random() - 0.5) * 0.1,
      longitude: -74.0060 + (Math.random() - 0.5) * 0.1,
    };
    setLocation(simulatedLocation);
    Alert.alert(
      'Location',
      `Latitude: ${simulatedLocation.latitude.toFixed(6)}, Longitude: ${simulatedLocation.longitude.toFixed(6)}`
    );
  };

  // Function to sync data (simulated)
  const syncData = () => {
    // In a real app, this would send data to a server
    Alert.alert('Sync', 'Data synchronization completed successfully');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Supply Chain Intelligence
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedButton title="Scan QR Code" onPress={handleScanQRCode} style={styles.button} />
        <ThemedButton title="Get My Location" onPress={getCurrentLocation} style={styles.button} />
        <ThemedButton title="Sync Data" onPress={syncData} style={styles.button} />

        {scannedData && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText type="subtitle" style={styles.resultTitle}>
              Last Scanned Code:
            </ThemedText>
            <ThemedText style={styles.resultData}>{scannedData}</ThemedText>
          </ThemedView>
        )}

        {location && (
          <ThemedView style={styles.resultContainer}>
            <ThemedText type="subtitle" style={styles.resultTitle}>
              Current Location:
            </ThemedText>
            <ThemedText style={styles.resultData}>Latitude: {location.latitude.toFixed(6)}</ThemedText>
            <ThemedText style={styles.resultData}>Longitude: {location.longitude.toFixed(6)}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  title: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
  },
  resultTitle: {
    marginBottom: 10,
  },
  resultData: {
    fontSize: 16,
    color: '#333',
  },
});