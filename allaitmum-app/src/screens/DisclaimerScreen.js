import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const logoImage = require('../../assets/logo-allaitmum.png');

export default function DisclaimerScreen({ onAccept }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundGradientStart }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Image source={logoImage} style={styles.logo} resizeMode="contain" />

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.iconRow}>
            <Ionicons name="information-circle" size={28} color={theme.primary} />
            <Text style={[styles.cardTitle, { color: theme.primary }]}>
              Avant de commencer
            </Text>
          </View>

          <Text style={[styles.text, { color: theme.textDark }]}>
            <Text style={styles.bold}>Malo est une application de suivi parental et de conseils généraux.</Text>
          </Text>

          <Text style={[styles.text, { color: theme.text }]}>
            Elle ne remplace en aucun cas l'avis d'un médecin, pédiatre ou professionnel de santé.
          </Text>

          <Text style={[styles.text, { color: theme.text }]}>
            En cas de doute, de fièvre persistante, ou de tout symptôme inquiétant chez ton bébé, consulte toujours un professionnel de santé.
          </Text>

          <View style={[styles.separator, { backgroundColor: theme.border }]} />

          <Text style={[styles.small, { color: theme.textLight }]}>
            En continuant, tu reconnais que Malo est un outil d'aide et de suivi, et non un dispositif médical.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={onAccept}
        >
          <Text style={styles.buttonText}>J'ai compris, on y va !</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  text: { fontSize: 15, lineHeight: 23 },
  bold: { fontWeight: '700' },
  separator: { height: 1, marginVertical: 4 },
  small: { fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
