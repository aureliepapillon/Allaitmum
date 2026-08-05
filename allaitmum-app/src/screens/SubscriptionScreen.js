import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function SubscriptionScreen({ onClose }) {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Ionicons name="close" size={24} color={theme.textDark} />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Ionicons name="star" size={60} color={theme.primary} />
      </View>

      <Text style={[styles.title, { color: theme.primary }]}>
        Fonctionnalités avancées
      </Text>

      <Text style={[styles.subtitle, { color: theme.textDark }]}>
        Bientôt disponible
      </Text>

      <Text style={[styles.description, { color: theme.textDark }]}>
        Des fonctionnalités supplémentaires pour accompagner encore mieux ton parcours de maternité arrivent prochainement.
      </Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: theme.primary }]}
        onPress={onClose}
      >
        <Text style={styles.btnText}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.7,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    opacity: 0.8,
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
