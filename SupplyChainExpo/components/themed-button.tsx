import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from './themed-text';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

export function ThemedButton({ title, onPress, style }: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: '#2196F3', dark: '#2196F3' }, 'background');
  const textColor = useThemeColor({ light: '#FFFFFF', dark: '#FFFFFF' }, 'text');

  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}>
      <ThemedText style={[styles.buttonText, { color: textColor }]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});