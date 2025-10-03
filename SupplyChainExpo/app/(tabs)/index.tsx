import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Supply Chain Intelligence!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">About This App</ThemedText>
        <ThemedText>
          This is a mobile application for supply chain management that allows you to:
        </ThemedText>
        <ThemedText>• Scan QR codes to track items</ThemedText>
        <ThemedText>• Get your current location</ThemedText>
        <ThemedText>• Sync data with the server</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/supplychain">
          <Link.Trigger>
            <ThemedText type="subtitle">Get Started</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Open Supply Chain" icon="barcode.viewfinder" onPress={() => {}} />
          </Link.Menu>
        </Link>

        <ThemedText>
          Tap the link above or the "Supply Chain" tab below to start using the app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Learn More</ThemedText>
        <ThemedText>
          Check out the Explore tab to learn more about the technologies used in this app.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});