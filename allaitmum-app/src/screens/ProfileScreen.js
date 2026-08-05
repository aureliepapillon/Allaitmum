import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { getBabyAge } from '../utils/helpers';
import LionMascot from '../components/LionMascot';

const FEEDING_METHODS = [
  { id: 'breast', label: 'Sein' },
  { id: 'pump', label: 'Tire-lait' },
  { id: 'mixed', label: 'Mixte' },
  { id: 'bottle-bm', label: 'Biberon LM' },
  { id: 'bottle-formula', label: 'Biberon formule' },
  { id: 'transition', label: 'Transition' },
];

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const {
    baby, babies, activeBabyId,
    feedingSessions, diaperEntries, sleepSessions, moodEntries, vaccinesDone,
    resetApp, addBaby, switchBaby,
  } = useApp();

  const [showAddBaby, setShowAddBaby] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [newGender, setNewGender] = useState('fille');
  const [newWeight, setNewWeight] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newMethod, setNewMethod] = useState(null);

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

  const handleAddBaby = () => {
    if (!newName || !newBirthDate || !newMethod) {
      Alert.alert('Champs requis', 'Remplis au moins le prénom, la date de naissance et le mode d\'alimentation.');
      return;
    }
    addBaby(
      {
        name: newName,
        birthDate: newBirthDate,
        gender: newGender,
        birthWeight: newWeight ? parseFloat(newWeight) : null,
        birthHeight: newHeight ? parseFloat(newHeight) : null,
      },
      newMethod
    );
    setShowAddBaby(false);
    setNewName('');
    setNewBirthDate('');
    setNewGender('fille');
    setNewWeight('');
    setNewHeight('');
    setNewMethod(null);
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

      {/* Baby selector (if multiple babies) */}
      {babies.length > 1 && (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>Mes bébés</Text>
          {babies.map((b) => (
            <TouchableOpacity
              key={b.id}
              style={[
                styles.babySelectorItem,
                {
                  backgroundColor: b.id === activeBabyId ? theme.primary + '15' : 'transparent',
                  borderColor: b.id === activeBabyId ? theme.primary : theme.border,
                },
              ]}
              onPress={() => switchBaby(b.id)}
            >
              <View style={[styles.miniAvatar, { backgroundColor: b.id === activeBabyId ? theme.primary : theme.secondary }]}>
                <Text style={{ fontSize: 16 }}>{b.gender === 'fille' ? '👧' : '👦'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.babySelectorName, { color: b.id === activeBabyId ? theme.primary : theme.textDark }]}>
                  {b.name}
                </Text>
                <Text style={[styles.babySelectorAge, { color: theme.textLight }]}>
                  {getBabyAge(b.birthDate)}
                </Text>
              </View>
              {b.id === activeBabyId && (
                <Ionicons name="checkmark-circle" size={22} color={theme.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Active baby card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.babyRow}>
          <LionMascot size={56} gender={baby.gender} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.babyName, { color: theme.primary }]}>
              {baby.name || 'Bébé'}
            </Text>
            <Text style={[styles.babyAge, { color: theme.text }]}>
              {getBabyAge(baby.birthDate)}
            </Text>
            <Text style={[styles.babyGender, { color: theme.textLight }]}>
              {baby.gender === 'fille' ? 'Fille' : 'Garçon'}
              {baby.birthWeight ? ` — ${baby.birthWeight} kg` : ''}
              {baby.birthHeight ? ` — ${baby.birthHeight} cm` : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.addBabyButton, { borderColor: theme.primary }]}
          onPress={() => setShowAddBaby(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color={theme.primary} />
          <Text style={[styles.addBabyText, { color: theme.primary }]}>Ajouter un bébé</Text>
        </TouchableOpacity>
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

      {/* Ondes & mode avion */}
      <View style={[styles.card, { backgroundColor: '#E3F2FD' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Text style={{ fontSize: 20 }}>✈️</Text>
          <Text style={[styles.cardTitle, { color: '#1565C0', marginBottom: 0 }]}>Mode avion compatible</Text>
        </View>
        <Text style={[styles.aboutText, { color: '#1E3A5F' }]}>
          Toutes les données de Malo sont stockées localement sur ton téléphone (aucun serveur). Tu peux activer le <Text style={{ fontWeight: '700' }}>mode avion</Text> quand tu utilises l'app près de bébé pour réduire les ondes électromagnétiques.{'\n\n'}
          Seuls les liens externes (partenaires, prise de RDV) nécessitent une connexion internet.
        </Text>
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
          Malo est une application créée avec amour pour accompagner toutes les mamans dans leur parcours d'alimentation.{'\n\n'}
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

      {/* Contact */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Nous contacter</Text>
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: theme.primary + '15', borderColor: theme.primary + '40' }]}
          onPress={() => Linking.openURL('mailto:aureliepapillon111@gmail.com?subject=Malo%20-%20Question')}
        >
          <Ionicons name="mail-outline" size={20} color={theme.primary} />
          <Text style={[styles.contactText, { color: theme.primary }]}>Une question ? Écris-nous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#EF535015', borderColor: '#EF535040', marginTop: 10 }]}
          onPress={() => Linking.openURL(`mailto:aureliepapillon111@gmail.com?subject=Malo%20-%20Bug&body=D%C3%A9cris%20le%20probl%C3%A8me%20rencontr%C3%A9%20:%0A%0ABébé%20:%20${baby.name}%0AVersion%20:%201.0.0`)}
        >
          <Ionicons name="bug-outline" size={20} color="#EF5350" />
          <Text style={[styles.contactText, { color: '#EF5350' }]}>Signaler un bug</Text>
        </TouchableOpacity>
      </View>

      {/* Add baby modal */}
      <Modal visible={showAddBaby} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.primary }]}>Nouveau bébé</Text>
                <TouchableOpacity onPress={() => setShowAddBaby(false)}>
                  <Ionicons name="close" size={28} color={theme.textLight} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.label, { color: theme.text }]}>Prénom *</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={newName}
                onChangeText={setNewName}
                placeholder="Prénom du bébé"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.label, { color: theme.text }]}>Date de naissance (AAAA-MM-JJ) *</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={newBirthDate}
                onChangeText={setNewBirthDate}
                placeholder="2025-06-15"
                placeholderTextColor={theme.textLight}
                keyboardType="numbers-and-punctuation"
              />

              <Text style={[styles.label, { color: theme.text }]}>Sexe</Text>
              <View style={styles.genderRow}>
                {['fille', 'garçon'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderButton,
                      {
                        borderColor: theme.primary,
                        backgroundColor: newGender === g ? theme.primary + '20' : theme.card,
                      },
                    ]}
                    onPress={() => setNewGender(g)}
                  >
                    <Text style={[styles.genderText, { color: theme.primary, fontWeight: newGender === g ? '700' : '500' }]}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.measureRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: theme.text }]}>Poids (kg)</Text>
                  <TextInput
                    style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                    value={newWeight}
                    onChangeText={setNewWeight}
                    placeholder="3.2"
                    placeholderTextColor={theme.textLight}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: theme.text }]}>Taille (cm)</Text>
                  <TextInput
                    style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                    value={newHeight}
                    onChangeText={setNewHeight}
                    placeholder="50"
                    placeholderTextColor={theme.textLight}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <Text style={[styles.label, { color: theme.text }]}>Mode d'alimentation *</Text>
              <View style={styles.methodGrid}>
                {FEEDING_METHODS.map((m) => (
                  <TouchableOpacity
                    key={m.id}
                    style={[
                      styles.methodChip,
                      {
                        backgroundColor: newMethod === m.id ? theme.primary : theme.card,
                        borderColor: newMethod === m.id ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setNewMethod(m.id)}
                  >
                    <Text style={{ color: newMethod === m.id ? '#fff' : theme.textDark, fontSize: 13, fontWeight: '500' }}>
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={[
                  styles.mainButton,
                  { backgroundColor: (!newName || !newBirthDate || !newMethod) ? theme.textLight : theme.primary },
                ]}
                onPress={handleAddBaby}
                disabled={!newName || !newBirthDate || !newMethod}
              >
                <Text style={styles.mainButtonText}>Ajouter ce bébé</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  addBabyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  addBabyText: { fontSize: 14, fontWeight: '600' },
  babySelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  babySelectorName: { fontSize: 16, fontWeight: '600' },
  babySelectorAge: { fontSize: 12, marginTop: 2 },
  miniAvatar: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
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
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  contactText: { fontSize: 15, fontWeight: '500' },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: '700' },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, marginTop: 14 },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 15,
  },
  genderRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  genderText: { fontSize: 15 },
  measureRow: { flexDirection: 'row', gap: 12 },
  methodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  methodChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  mainButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  mainButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
