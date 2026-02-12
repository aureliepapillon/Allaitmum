import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { notificationService, REMINDER_TYPES } from '../utils/NotificationService';

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

export default function RappelsScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, reminders, updateReminders } = useApp();

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(null); // 'vitamin_d' or medication id
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);

  // Medication reminder form
  const [showMedForm, setShowMedForm] = useState(false);
  const [medName, setMedName] = useState('');
  const [medHour, setMedHour] = useState(9);
  const [medMinute, setMedMinute] = useState(0);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const granted = await notificationService.requestPermissions();
    setPermissionGranted(granted);
  };

  // Toggle vitamin D reminder
  const toggleVitaminD = async (enabled) => {
    if (enabled) {
      setShowTimePicker('vitamin_d');
    } else {
      await notificationService.cancelReminder(REMINDER_TYPES.VITAMIN_D.id);
      updateReminders({ ...reminders, vitaminD: null });
    }
  };

  const saveVitaminDTime = async () => {
    await notificationService.scheduleDailyReminder({
      id: REMINDER_TYPES.VITAMIN_D.id,
      title: REMINDER_TYPES.VITAMIN_D.title,
      body: `C'est l'heure de la vitamine D pour ${baby.name} !`,
      hour: selectedHour,
      minute: selectedMinute,
    });

    updateReminders({
      ...reminders,
      vitaminD: { hour: selectedHour, minute: selectedMinute, enabled: true },
    });

    setShowTimePicker(null);
    Alert.alert('Rappel activé', `Rappel quotidien à ${formatTime(selectedHour, selectedMinute)}`);
  };

  // Add medication reminder
  const addMedicationReminder = async () => {
    if (!medName.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer le nom du médicament');
      return;
    }

    const medId = `med_${Date.now()}`;
    await notificationService.scheduleDailyReminder({
      id: medId,
      title: 'Rappel médicament',
      body: `C'est l'heure de ${medName} pour ${baby.name} !`,
      hour: medHour,
      minute: medMinute,
    });

    const newMedReminders = [
      ...(reminders.medications || []),
      { id: medId, name: medName, hour: medHour, minute: medMinute, enabled: true },
    ];

    updateReminders({ ...reminders, medications: newMedReminders });

    setShowMedForm(false);
    setMedName('');
    setMedHour(9);
    setMedMinute(0);
    Alert.alert('Rappel ajouté', `Rappel pour ${medName} à ${formatTime(medHour, medMinute)}`);
  };

  // Toggle medication reminder
  const toggleMedication = async (med, enabled) => {
    if (enabled) {
      await notificationService.scheduleDailyReminder({
        id: med.id,
        title: 'Rappel médicament',
        body: `C'est l'heure de ${med.name} pour ${baby.name} !`,
        hour: med.hour,
        minute: med.minute,
      });
    } else {
      await notificationService.cancelReminder(med.id);
    }

    const updated = (reminders.medications || []).map((m) =>
      m.id === med.id ? { ...m, enabled } : m
    );
    updateReminders({ ...reminders, medications: updated });
  };

  // Delete medication reminder
  const deleteMedication = async (med) => {
    Alert.alert('Supprimer', `Supprimer le rappel pour ${med.name} ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await notificationService.cancelReminder(med.id);
          const updated = (reminders.medications || []).filter((m) => m.id !== med.id);
          updateReminders({ ...reminders, medications: updated });
        },
      },
    ]);
  };

  const formatTime = (h, m) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  if (!permissionGranted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>Rappels</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.permissionContainer}>
          <Ionicons name="notifications-off" size={60} color={theme.textLight} />
          <Text style={[styles.permissionTitle, { color: theme.textDark }]}>
            Notifications désactivées
          </Text>
          <Text style={[styles.permissionText, { color: theme.text }]}>
            Pour recevoir des rappels, autorisez les notifications dans les réglages de votre téléphone.
          </Text>
          <TouchableOpacity
            style={[styles.permissionBtn, { backgroundColor: theme.primary }]}
            onPress={checkPermissions}
          >
            <Text style={styles.permissionBtnText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Rappels</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={[styles.introCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="notifications" size={24} color={theme.primary} />
          <Text style={[styles.introText, { color: theme.textDark }]}>
            Configure des rappels quotidiens pour ne rien oublier !
          </Text>
        </View>

        {/* Vitamin D Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="sunny" size={22} color="#FF9800" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { color: theme.textDark }]}>Vitamine D</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textLight }]}>
                Rappel quotidien
              </Text>
            </View>
            <Switch
              value={!!reminders.vitaminD?.enabled}
              onValueChange={toggleVitaminD}
              trackColor={{ false: '#E0E0E0', true: theme.primary + '60' }}
              thumbColor={reminders.vitaminD?.enabled ? theme.primary : '#fff'}
            />
          </View>

          {reminders.vitaminD?.enabled && (
            <TouchableOpacity
              style={[styles.timeDisplay, { backgroundColor: theme.background }]}
              onPress={() => {
                setSelectedHour(reminders.vitaminD.hour);
                setSelectedMinute(reminders.vitaminD.minute);
                setShowTimePicker('vitamin_d');
              }}
            >
              <Ionicons name="time-outline" size={18} color={theme.primary} />
              <Text style={[styles.timeText, { color: theme.textDark }]}>
                Tous les jours à {formatTime(reminders.vitaminD.hour, reminders.vitaminD.minute)}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Medications Section */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="medkit" size={22} color="#4CAF50" />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={[styles.sectionTitle, { color: theme.textDark }]}>Médicaments</Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textLight }]}>
                {(reminders.medications || []).length} rappel(s) configuré(s)
              </Text>
            </View>
          </View>

          {/* List of medication reminders */}
          {(reminders.medications || []).map((med) => (
            <View
              key={med.id}
              style={[styles.medItem, { borderTopColor: theme.border }]}
            >
              <View style={styles.medInfo}>
                <Text style={[styles.medName, { color: theme.textDark }]}>{med.name}</Text>
                <Text style={[styles.medTime, { color: theme.textLight }]}>
                  {formatTime(med.hour, med.minute)}
                </Text>
              </View>
              <Switch
                value={med.enabled}
                onValueChange={(enabled) => toggleMedication(med, enabled)}
                trackColor={{ false: '#E0E0E0', true: theme.primary + '60' }}
                thumbColor={med.enabled ? theme.primary : '#fff'}
              />
              <TouchableOpacity onPress={() => deleteMedication(med)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color="#F44336" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Add medication button */}
          <TouchableOpacity
            style={[styles.addBtn, { borderColor: theme.primary }]}
            onPress={() => setShowMedForm(true)}
          >
            <Ionicons name="add" size={20} color={theme.primary} />
            <Text style={[styles.addBtnText, { color: theme.primary }]}>
              Ajouter un médicament
            </Text>
          </TouchableOpacity>
        </View>

        {/* Vaccines info */}
        <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
          <View style={[styles.sectionIcon, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="fitness" size={22} color="#2196F3" />
          </View>
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: theme.textDark }]}>Rappels vaccins</Text>
            <Text style={[styles.infoText, { color: theme.textLight }]}>
              Les rappels de vaccins sont envoyés automatiquement 3 jours avant les dates prévues selon l'âge de {baby.name}.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Time Picker Modal */}
      <Modal visible={showTimePicker !== null} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.modalScrollContent} keyboardShouldPersistTaps="handled">
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>Choisir l'heure</Text>

              <View style={styles.pickerRow}>
              <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                {HOURS.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={[
                      styles.pickerItem,
                      selectedHour === h && { backgroundColor: theme.primary + '20' },
                    ]}
                    onPress={() => setSelectedHour(h)}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        { color: theme.textDark },
                        selectedHour === h && { color: theme.primary, fontWeight: '700' },
                      ]}
                    >
                      {h.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={[styles.pickerSeparator, { color: theme.textDark }]}>:</Text>

              <ScrollView style={styles.pickerColumn} showsVerticalScrollIndicator={false}>
                {MINUTES.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={[
                      styles.pickerItem,
                      selectedMinute === m && { backgroundColor: theme.primary + '20' },
                    ]}
                    onPress={() => setSelectedMinute(m)}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        { color: theme.textDark },
                        selectedMinute === m && { color: theme.primary, fontWeight: '700' },
                      ]}
                    >
                      {m.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.background }]}
                  onPress={() => setShowTimePicker(null)}
                >
                  <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={saveVitaminDTime}
                >
                  <Text style={[styles.modalBtnText, { color: '#fff' }]}>Confirmer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Medication Modal */}
      <Modal visible={showMedForm} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.modalScrollContent} keyboardShouldPersistTaps="handled">
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>Nouveau rappel</Text>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Nom du médicament</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={medName}
                onChangeText={setMedName}
                placeholder="Ex: Vitamine K, Doliprane..."
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Heure du rappel</Text>
              <View style={styles.timeSelectRow}>
                <TouchableOpacity
                  style={[styles.timeSelect, { borderColor: theme.border, backgroundColor: theme.inputBg }]}
                  onPress={() => setMedHour((h) => (h > 0 ? h - 1 : 23))}
                >
                  <Ionicons name="remove" size={20} color={theme.textDark} />
                </TouchableOpacity>
                <Text style={[styles.timeSelectValue, { color: theme.textDark }]}>
                  {formatTime(medHour, medMinute)}
                </Text>
                <TouchableOpacity
                  style={[styles.timeSelect, { borderColor: theme.border, backgroundColor: theme.inputBg }]}
                  onPress={() => setMedHour((h) => (h < 23 ? h + 1 : 0))}
                >
                  <Ionicons name="add" size={20} color={theme.textDark} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.background }]}
                  onPress={() => {
                    setShowMedForm(false);
                    setMedName('');
                  }}
                >
                  <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={addMedicationReminder}
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

  scrollContent: { padding: 16, paddingBottom: 40 },

  // Permission denied state
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  permissionTitle: { fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  permissionText: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  permissionBtn: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  permissionBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Intro
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  introText: { flex: 1, fontSize: 14, lineHeight: 20 },

  // Section cards
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sectionTitleContainer: { flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  sectionSubtitle: { fontSize: 12, marginTop: 2 },

  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
  },
  timeText: { flex: 1, fontSize: 14 },

  // Medication items
  medItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 12,
    borderTopWidth: 1,
  },
  medInfo: { flex: 1 },
  medName: { fontSize: 15, fontWeight: '500' },
  medTime: { fontSize: 12, marginTop: 2 },
  deleteBtn: { padding: 8, marginLeft: 8 },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  addBtnText: { fontSize: 14, fontWeight: '600' },

  // Info card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  infoText: { fontSize: 13, lineHeight: 18 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 20 },

  // Time picker
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginBottom: 20,
  },
  pickerColumn: { height: 150, width: 60 },
  pickerItem: { paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  pickerText: { fontSize: 20 },
  pickerSeparator: { fontSize: 28, fontWeight: '700', marginHorizontal: 10 },

  modalButtons: { flexDirection: 'row', gap: 12 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalBtnText: { fontSize: 16, fontWeight: '600' },

  // Input
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  timeSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  timeSelect: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSelectValue: { fontSize: 24, fontWeight: '700', minWidth: 80, textAlign: 'center' },
});
