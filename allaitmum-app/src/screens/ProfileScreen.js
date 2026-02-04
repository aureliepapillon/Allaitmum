import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { getBabyAge } from '../utils/helpers';

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { baby, feedingSessions, diaperEntries, sleepSessions, moodEntries, vaccinesDone, resetApp } = useApp();

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser',
      'Cette action supprimera TOUTES tes données. Es-tu sûre ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Réinitialiser', style: 'destructive', onPress: resetApp },
      ]
    );
  };

  const stats = [
    { icon: 'heart', label: 'Tétées/biberons', value: feedingSessions.length, color: '#E88A7A' },
    { icon: 'water-outline', label: 'Changes', value: diaperEntries.length, color: '#42A5F5' },
    { icon: 'moon', label: 'Dodos', value: sleepSessions.length, color: '#9575CD' },
    { icon: 'journal', label: 'Notes journal', value: moodEntries.length, color: '#FFB74D' },
    { icon: 'shield-checkmark', label: 'Vaccins faits', value: vaccinesDone.length, color: '#66BB6A' },
  ];

  const links = [
    { label: 'La Leche League France', url: 'https://www.lllfrance.org', icon: 'globe' },
    { label: 'e-lactancia.org', url: 'https://www.e-lactancia.org', icon: 'medkit' },
    { label: 'CRAT (lecrat.fr)', url: 'https://lecrat.fr', icon: 'document-text' },
    { label: 'Solidarilait', url: 'https://www.solidarilait.org', icon: 'people' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Profil</Text>

      {/* Baby card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.babyRow}>
          <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
            <Ionicons name="happy" size={32} color={theme.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.babyName, { color: theme.primary }]}>
              {baby.name || 'Bébé'}
            </Text>
            <Text style={[styles.babyAge, { color: theme.text }]}>
              {getBabyAge(baby.birthDate)}
            </Text>
            <Text style={[styles.babyGender, { color: theme.textLight }]}>
              {baby.gender === 'fille' ? 'Fille' : 'Garçon'}
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Statistiques</Text>
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={[styles.statItem, { backgroundColor: s.color + '15' }]}>
              <Ionicons name={s.icon} size={22} color={s.color} />
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: theme.text }]}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Night mode */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Apparence</Text>
        <TouchableOpacity style={styles.settingRow} onPress={toggleTheme}>
          <View style={styles.settingLeft}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={22} color={theme.primary} />
            <Text style={[styles.settingLabel, { color: theme.textDark }]}>Mode nuit</Text>
          </View>
          <View
            style={[
              styles.toggle,
              { backgroundColor: isDark ? theme.primary : theme.secondary },
            ]}
          >
            <View
              style={[
                styles.toggleDot,
                {
                  backgroundColor: '#fff',
                  transform: [{ translateX: isDark ? 20 : 0 }],
                },
              ]}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Useful links */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Ressources utiles</Text>
        {links.map((link) => (
          <TouchableOpacity
            key={link.label}
            style={[styles.linkRow, { borderBottomColor: theme.border }]}
            onPress={() => Linking.openURL(link.url)}
          >
            <Ionicons name={link.icon} size={20} color={theme.primary} />
            <Text style={[styles.linkLabel, { color: theme.textDark }]}>{link.label}</Text>
            <Ionicons name="open-outline" size={16} color={theme.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* About */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.primary }]}>À propos</Text>
        <Text style={[styles.aboutText, { color: theme.text }]}>
          Allait'mum est une application créée avec amour pour accompagner toutes les mamans dans leur parcours d'alimentation.{'\n\n'}
          Sein, biberon, tire-lait, mixte... Aucun jugement. Juste du soutien.{'\n\n'}
          Les informations sont sourcées (La Leche League, CRAT, e-lactancia, OMS) mais ne remplacent pas l'avis d'un professionnel de santé.
        </Text>
        <Text style={[styles.version, { color: theme.textLight }]}>Version 1.0.0</Text>
      </View>

      {/* Danger zone */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.dangerTitle, { color: theme.danger }]}>Zone dangereuse</Text>
        <Text style={[styles.dangerText, { color: theme.text }]}>
          Cette action supprimera toutes tes données et te ramènera au début.
        </Text>
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: theme.danger }]}
          onPress={handleReset}
        >
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.resetText}>Réinitialiser l'application</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 14 },
  babyRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  babyName: { fontSize: 22, fontWeight: '700' },
  babyAge: { fontSize: 14, marginTop: 2 },
  babyGender: { fontSize: 12, marginTop: 2 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statItem: {
    width: '47%',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: 24, fontWeight: '700' },
  statLabel: { fontSize: 11, textAlign: 'center' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settingLabel: { fontSize: 16, fontWeight: '500' },
  toggle: { width: 48, height: 28, borderRadius: 14, padding: 4, justifyContent: 'center' },
  toggleDot: { width: 20, height: 20, borderRadius: 10 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  linkLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  aboutText: { fontSize: 14, lineHeight: 22 },
  version: { fontSize: 12, marginTop: 12 },
  dangerTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  dangerText: { fontSize: 13, marginBottom: 14 },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  resetText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
