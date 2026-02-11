import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

const { width } = Dimensions.get('window');
const headerImage = require('../../assets/medicament-allergie.png');

const FREQUENCIES = [
  { id: '1x', label: '1x/jour' },
  { id: '2x', label: '2x/jour' },
  { id: '3x', label: '3x/jour' },
  { id: '4x', label: '4x/jour' },
  { id: 'besoin', label: 'Si besoin' },
];

const SEVERITIES = [
  { id: 'légère', label: 'Légère', color: '#FFC107' },
  { id: 'modérée', label: 'Modérée', color: '#FF9800' },
  { id: 'sévère', label: 'Sévère', color: '#F44336' },
];

export default function MedicamentsScreen({ onClose }) {
  const { theme } = useTheme();
  const {
    baby, activeBabyId,
    medications, addMedication, updateMedication, deleteMedication,
    allergies, addAllergy, deleteAllergy,
  } = useApp();

  const [activeTab, setActiveTab] = useState('meds'); // 'meds' or 'allergies'
  const [showAddMed, setShowAddMed] = useState(false);
  const [showAddAllergy, setShowAddAllergy] = useState(false);

  // Medication form
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFrequency, setMedFrequency] = useState('');
  const [medNotes, setMedNotes] = useState('');

  // Allergy form
  const [allergyName, setAllergyName] = useState('');
  const [allergySeverity, setAllergySeverity] = useState('');
  const [allergyReaction, setAllergyReaction] = useState('');

  const babyMedications = medications.filter((m) => m.babyId === activeBabyId);
  const activeMeds = babyMedications.filter((m) => m.active);
  const pastMeds = babyMedications.filter((m) => !m.active);
  const babyAllergies = allergies.filter((a) => a.babyId === activeBabyId);

  const handleAddMedication = () => {
    if (!medName.trim()) {
      Alert.alert('Erreur', 'Le nom du médicament est requis');
      return;
    }
    addMedication(medName.trim(), medDosage.trim(), medFrequency, null, null, medNotes.trim());
    setMedName('');
    setMedDosage('');
    setMedFrequency('');
    setMedNotes('');
    setShowAddMed(false);
  };

  const handleStopMedication = (med) => {
    Alert.alert(
      'Arrêter le traitement',
      `Arrêter ${med.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Arrêter',
          onPress: () => updateMedication(med.id, {
            active: false,
            endDate: new Date().toISOString().split('T')[0]
          }),
        },
      ]
    );
  };

  const handleDeleteMedication = (med) => {
    Alert.alert(
      'Supprimer',
      `Supprimer ${med.name} de l'historique ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteMedication(med.id) },
      ]
    );
  };

  const handleAddAllergy = () => {
    if (!allergyName.trim()) {
      Alert.alert('Erreur', 'Le nom de l\'allergène est requis');
      return;
    }
    if (!allergySeverity) {
      Alert.alert('Erreur', 'Veuillez indiquer la sévérité');
      return;
    }
    addAllergy(allergyName.trim(), allergySeverity, allergyReaction.trim());
    setAllergyName('');
    setAllergySeverity('');
    setAllergyReaction('');
    setShowAddAllergy(false);
  };

  const handleDeleteAllergy = (allergy) => {
    Alert.alert(
      'Supprimer',
      `Supprimer l'allergie à ${allergy.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteAllergy(allergy.id) },
      ]
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Santé</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'meds' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab('meds')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'meds' ? theme.primary : theme.textLight }]}>
            Médicaments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'allergies' && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
          onPress={() => setActiveTab('allergies')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'allergies' ? theme.primary : theme.textLight }]}>
            Allergies
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header image */}
        <View style={[styles.imageCard, { backgroundColor: theme.card }]}>
          <Image source={headerImage} style={styles.headerImage} resizeMode="contain" />
        </View>

        {activeTab === 'meds' ? (
          <>
            {/* Active medications */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.primary }]}>
                  Traitements en cours
                </Text>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setShowAddMed(true)}
                >
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {activeMeds.length === 0 ? (
                <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
                  <Text style={{ fontSize: 40 }}>💊</Text>
                  <Text style={[styles.emptyText, { color: theme.textLight }]}>
                    Aucun traitement en cours
                  </Text>
                  <Text style={[styles.emptySubtext, { color: theme.textLight }]}>
                    Appuie sur + pour ajouter un médicament
                  </Text>
                </View>
              ) : (
                activeMeds.map((med) => (
                  <View key={med.id} style={[styles.medCard, { backgroundColor: theme.card }]}>
                    <View style={styles.medHeader}>
                      <Text style={[styles.medName, { color: theme.textDark }]}>{med.name}</Text>
                      <TouchableOpacity onPress={() => handleStopMedication(med)}>
                        <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
                      </TouchableOpacity>
                    </View>
                    {med.dosage && (
                      <Text style={[styles.medInfo, { color: theme.text }]}>
                        Dosage : {med.dosage}
                      </Text>
                    )}
                    {med.frequency && (
                      <Text style={[styles.medInfo, { color: theme.text }]}>
                        Fréquence : {FREQUENCIES.find(f => f.id === med.frequency)?.label || med.frequency}
                      </Text>
                    )}
                    {med.notes && (
                      <Text style={[styles.medNotes, { color: theme.textLight }]}>
                        {med.notes}
                      </Text>
                    )}
                    <Text style={[styles.medDate, { color: theme.textLight }]}>
                      Depuis le {formatDate(med.startDate)}
                    </Text>
                  </View>
                ))
              )}
            </View>

            {/* Past medications */}
            {pastMeds.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.textLight }]}>
                  Historique
                </Text>
                {pastMeds.map((med) => (
                  <View key={med.id} style={[styles.medCard, styles.pastMedCard, { backgroundColor: theme.card }]}>
                    <View style={styles.medHeader}>
                      <Text style={[styles.medName, { color: theme.textLight }]}>{med.name}</Text>
                      <TouchableOpacity onPress={() => handleDeleteMedication(med)}>
                        <Ionicons name="trash-outline" size={20} color={theme.textLight} />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.medDate, { color: theme.textLight }]}>
                      Du {formatDate(med.startDate)} au {formatDate(med.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            {/* Allergies */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.primary }]}>
                  Allergies connues
                </Text>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setShowAddAllergy(true)}
                >
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              {babyAllergies.length === 0 ? (
                <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
                  <Text style={{ fontSize: 40 }}>✅</Text>
                  <Text style={[styles.emptyText, { color: theme.textLight }]}>
                    Aucune allergie connue
                  </Text>
                  <Text style={[styles.emptySubtext, { color: theme.textLight }]}>
                    C'est une bonne nouvelle !
                  </Text>
                </View>
              ) : (
                babyAllergies.map((allergy) => {
                  const severity = SEVERITIES.find(s => s.id === allergy.severity);
                  return (
                    <View key={allergy.id} style={[styles.allergyCard, { backgroundColor: theme.card }]}>
                      <View style={styles.allergyHeader}>
                        <View style={styles.allergyTitleRow}>
                          <Ionicons name="warning" size={20} color={severity?.color || '#FFC107'} />
                          <Text style={[styles.allergyName, { color: theme.textDark }]}>
                            {allergy.name}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDeleteAllergy(allergy)}>
                          <Ionicons name="trash-outline" size={20} color={theme.textLight} />
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.severityBadge, { backgroundColor: severity?.color + '20' }]}>
                        <Text style={[styles.severityText, { color: severity?.color }]}>
                          {severity?.label || allergy.severity}
                        </Text>
                      </View>
                      {allergy.reaction && (
                        <Text style={[styles.allergyReaction, { color: theme.text }]}>
                          Réaction : {allergy.reaction}
                        </Text>
                      )}
                      <Text style={[styles.allergyDate, { color: theme.textLight }]}>
                        Découverte le {formatDate(allergy.discoveredDate)}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>

            {/* Info card */}
            <View style={[styles.infoCard, { backgroundColor: theme.secondary + '40' }]}>
              <Ionicons name="information-circle" size={20} color={theme.primary} />
              <Text style={[styles.infoText, { color: theme.textDark }]}>
                Pensez à informer le médecin et la crèche/nounou des allergies de {baby.name}.
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* Add Medication Modal */}
      <Modal visible={showAddMed} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>
                Nouveau médicament
              </Text>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Nom *</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={medName}
                onChangeText={setMedName}
                placeholder="Ex: Doliprane"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Dosage</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={medDosage}
                onChangeText={setMedDosage}
                placeholder="Ex: 2.5ml"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Fréquence</Text>
              <View style={styles.frequencyGrid}>
                {FREQUENCIES.map((freq) => (
                  <TouchableOpacity
                    key={freq.id}
                    style={[
                      styles.frequencyBtn,
                      { borderColor: theme.border },
                      medFrequency === freq.id && { backgroundColor: theme.primary, borderColor: theme.primary },
                    ]}
                    onPress={() => setMedFrequency(freq.id)}
                  >
                    <Text style={[
                      styles.frequencyText,
                      { color: theme.textDark },
                      medFrequency === freq.id && { color: '#fff' },
                    ]}>
                      {freq.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={medNotes}
                onChangeText={setMedNotes}
                placeholder="Ex: Après les repas, pendant 5 jours..."
                placeholderTextColor={theme.textLight}
                multiline
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.background }]}
                  onPress={() => setShowAddMed(false)}
                >
                  <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={handleAddMedication}
                >
                  <Text style={[styles.modalBtnText, { color: '#fff' }]}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Allergy Modal */}
      <Modal visible={showAddAllergy} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>
                Nouvelle allergie
              </Text>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Allergène *</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={allergyName}
                onChangeText={setAllergyName}
                placeholder="Ex: Arachides, Lait, Pénicilline..."
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Sévérité *</Text>
              <View style={styles.severityGrid}>
                {SEVERITIES.map((sev) => (
                  <TouchableOpacity
                    key={sev.id}
                    style={[
                      styles.severityBtn,
                      { borderColor: sev.color },
                      allergySeverity === sev.id && { backgroundColor: sev.color },
                    ]}
                    onPress={() => setAllergySeverity(sev.id)}
                  >
                    <Text style={[
                      styles.severityBtnText,
                      { color: sev.color },
                      allergySeverity === sev.id && { color: '#fff' },
                    ]}>
                      {sev.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Type de réaction</Text>
              <TextInput
                style={[styles.input, styles.textArea, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={allergyReaction}
                onChangeText={setAllergyReaction}
                placeholder="Ex: Urticaire, gonflement, difficultés respiratoires..."
                placeholderTextColor={theme.textLight}
                multiline
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.background }]}
                  onPress={() => setShowAddAllergy(false)}
                >
                  <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={handleAddAllergy}
                >
                  <Text style={[styles.modalBtnText, { color: '#fff' }]}>Ajouter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: { fontSize: 15, fontWeight: '600' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  imageCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerImage: {
    width: width - 64,
    height: 100,
  },

  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '600' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  emptyText: { fontSize: 16, fontWeight: '500', marginTop: 12 },
  emptySubtext: { fontSize: 13, marginTop: 4 },

  medCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  pastMedCard: { opacity: 0.7 },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medName: { fontSize: 17, fontWeight: '600' },
  medInfo: { fontSize: 14, marginBottom: 4 },
  medNotes: { fontSize: 13, fontStyle: 'italic', marginTop: 4 },
  medDate: { fontSize: 12, marginTop: 8 },

  allergyCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  allergyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  allergyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  allergyName: { fontSize: 17, fontWeight: '600' },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  severityText: { fontSize: 12, fontWeight: '600' },
  allergyReaction: { fontSize: 14, marginTop: 10 },
  allergyDate: { fontSize: 12, marginTop: 8 },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
  },
  infoText: { flex: 1, fontSize: 13, lineHeight: 18 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  frequencyText: { fontSize: 13, fontWeight: '500' },
  severityGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  severityBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
  },
  severityBtnText: { fontSize: 14, fontWeight: '600' },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: { fontSize: 16, fontWeight: '600' },
});
