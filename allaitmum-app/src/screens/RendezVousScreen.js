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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

const APPOINTMENT_TYPES = [
  { id: 'pediatre', label: 'Pédiatre', icon: 'medical', color: '#4CAF50' },
  { id: 'sage-femme', label: 'Sage-femme', icon: 'heart', color: '#E91E63' },
  { id: 'generaliste', label: 'Médecin généraliste', icon: 'medkit', color: '#2196F3' },
  { id: 'osteopathe', label: 'Ostéopathe', icon: 'hand-left', color: '#9C27B0' },
  { id: 'pmi', label: 'PMI', icon: 'home', color: '#FF9800' },
  { id: 'dentiste', label: 'Dentiste', icon: 'happy', color: '#00BCD4' },
  { id: 'orl', label: 'ORL', icon: 'ear', color: '#795548' },
  { id: 'ophtalmo', label: 'Ophtalmologue', icon: 'eye', color: '#607D8B' },
  { id: 'autre', label: 'Autre', icon: 'calendar', color: '#9E9E9E' },
];

export default function RendezVousScreen({ onClose }) {
  const { theme } = useTheme();
  const { appointments = [], setAppointments, activeBabyId } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [notes, setNotes] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [location, setLocation] = useState('');

  // Filter appointments for active baby
  const babyAppointments = appointments.filter(a => !a.babyId || a.babyId === activeBabyId);

  // Split into upcoming and past
  const now = new Date();
  const upcomingAppointments = babyAppointments
    .filter(a => new Date(a.dateTime) >= now && a.status !== 'cancelled')
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const pastAppointments = babyAppointments
    .filter(a => new Date(a.dateTime) < now || a.status === 'done')
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  const resetForm = () => {
    setSelectedType(null);
    setDateStr('');
    setTimeStr('');
    setNotes('');
    setDoctorName('');
    setLocation('');
  };

  // Auto-format date : l'utilisatrice tape les chiffres, les "/" s'ajoutent automatiquement
  const handleDateChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let formatted = digits;
    if (digits.length > 2) formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    if (digits.length > 4) formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    setDateStr(formatted);
  };

  // Auto-format heure : les ":" s'ajoutent automatiquement
  const handleTimeChange = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    let formatted = digits;
    if (digits.length > 2) formatted = `${digits.slice(0, 2)}:${digits.slice(2)}`;
    setTimeStr(formatted);
  };

  // Parse date string (DD/MM/YYYY) to Date object
  const parseDate = (str) => {
    const parts = str.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Parse time string (HH:MM) to hours and minutes
  const parseTime = (str) => {
    const parts = str.split(':');
    if (parts.length === 2) {
      return { hours: parseInt(parts[0], 10), minutes: parseInt(parts[1], 10) };
    }
    return null;
  };

  const handleAddAppointment = () => {
    if (!selectedType) {
      Alert.alert('Erreur', 'Sélectionne un type de rendez-vous');
      return;
    }

    const parsedDate = parseDate(dateStr);
    if (!parsedDate) {
      Alert.alert('Erreur', 'Format de date invalide. Utilise JJ/MM/AAAA');
      return;
    }

    const parsedTime = parseTime(timeStr);
    if (!parsedTime) {
      Alert.alert('Erreur', 'Format d\'heure invalide. Utilise HH:MM');
      return;
    }

    const dateTime = new Date(parsedDate);
    dateTime.setHours(parsedTime.hours, parsedTime.minutes);

    const newAppointment = {
      id: Date.now(),
      babyId: activeBabyId,
      type: selectedType,
      dateTime: dateTime.toISOString(),
      doctorName,
      location,
      notes,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [...(prev || []), newAppointment]);
    setShowAddModal(false);
    resetForm();
  };

  const handleMarkDone = (appointmentId) => {
    setAppointments(prev =>
      prev.map(a => a.id === appointmentId ? { ...a, status: 'done' } : a)
    );
  };

  const handleCancel = (appointmentId) => {
    Alert.alert(
      'Annuler le RDV',
      'Veux-tu vraiment annuler ce rendez-vous ?',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: () => {
            setAppointments(prev =>
              prev.map(a => a.id === appointmentId ? { ...a, status: 'cancelled' } : a)
            );
          },
        },
      ]
    );
  };

  const handleDelete = (appointmentId) => {
    Alert.alert(
      'Supprimer',
      'Supprimer ce rendez-vous ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setAppointments(prev => prev.filter(a => a.id !== appointmentId));
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTypeInfo = (typeId) => {
    return APPOINTMENT_TYPES.find(t => t.id === typeId) || APPOINTMENT_TYPES[APPOINTMENT_TYPES.length - 1];
  };

  const renderAppointmentCard = (appointment, isPast = false) => {
    const typeInfo = getTypeInfo(appointment.type);
    const isCancelled = appointment.status === 'cancelled';

    return (
      <View
        key={appointment.id}
        style={[
          styles.appointmentCard,
          { backgroundColor: theme.card },
          isCancelled && { opacity: 0.5 },
        ]}
      >
        <View style={[styles.typeIndicator, { backgroundColor: typeInfo.color }]}>
          <Ionicons name={typeInfo.icon} size={20} color="#fff" />
        </View>

        <View style={styles.appointmentContent}>
          <View style={styles.appointmentHeader}>
            <Text style={[styles.appointmentType, { color: theme.textDark }]}>
              {typeInfo.label}
            </Text>
            {isCancelled && (
              <View style={[styles.statusBadge, { backgroundColor: '#F44336' }]}>
                <Text style={styles.statusBadgeText}>Annulé</Text>
              </View>
            )}
            {appointment.status === 'done' && (
              <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.statusBadgeText}>Fait</Text>
              </View>
            )}
          </View>

          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={14} color={theme.textLight} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {formatDate(appointment.dateTime)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={14} color={theme.textLight} />
              <Text style={[styles.detailText, { color: theme.text }]}>
                {formatTime(appointment.dateTime)}
              </Text>
            </View>
            {appointment.doctorName && (
              <View style={styles.detailRow}>
                <Ionicons name="person-outline" size={14} color={theme.textLight} />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {appointment.doctorName}
                </Text>
              </View>
            )}
            {appointment.location && (
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={14} color={theme.textLight} />
                <Text style={[styles.detailText, { color: theme.text }]}>
                  {appointment.location}
                </Text>
              </View>
            )}
            {appointment.notes && (
              <Text style={[styles.notesText, { color: theme.textLight }]}>
                {appointment.notes}
              </Text>
            )}
          </View>

          {!isPast && !isCancelled && appointment.status !== 'done' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#4CAF50' }]}
                onPress={() => handleMarkDone(appointment.id)}
              >
                <Ionicons name="checkmark" size={16} color="#fff" />
                <Text style={styles.actionBtnText}>Fait</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: '#FF9800' }]}
                onPress={() => handleCancel(appointment.id)}
              >
                <Ionicons name="close" size={16} color="#fff" />
                <Text style={styles.actionBtnText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          )}

          {isPast && (
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(appointment.id)}
            >
              <Ionicons name="trash-outline" size={18} color={theme.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      {/* Header */}
      {onClose && (
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>Rendez-vous</Text>
          <View style={{ width: 40 }} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Add button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Ajouter un rendez-vous</Text>
        </TouchableOpacity>

        {/* Upcoming appointments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            À venir ({upcomingAppointments.length})
          </Text>
          {upcomingAppointments.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
              <Ionicons name="calendar-outline" size={40} color={theme.textLight} />
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                Aucun rendez-vous prévu
              </Text>
            </View>
          ) : (
            upcomingAppointments.map(a => renderAppointmentCard(a, false))
          )}
        </View>

        {/* Past appointments */}
        {pastAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textLight }]}>
              Passés ({pastAppointments.length})
            </Text>
            {pastAppointments.slice(0, 5).map(a => renderAppointmentCard(a, true))}
          </View>
        )}
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>
                Nouveau rendez-vous
              </Text>
              <TouchableOpacity onPress={() => { setShowAddModal(false); resetForm(); }}>
                <Ionicons name="close" size={24} color={theme.textDark} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {/* Type selector */}
              <Text style={[styles.label, { color: theme.textDark }]}>Type de rendez-vous</Text>
              <View style={styles.typeGrid}>
                {APPOINTMENT_TYPES.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeOption,
                      { borderColor: theme.border },
                      selectedType === type.id && { borderColor: type.color, backgroundColor: type.color + '15' },
                    ]}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <Ionicons name={type.icon} size={22} color={type.color} />
                    <Text style={[styles.typeLabel, { color: theme.textDark }]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Date */}
              <Text style={[styles.label, { color: theme.textDark }]}>Date</Text>
              <View style={[styles.dateInput, { borderColor: theme.border, backgroundColor: theme.inputBg }]}>
                <Ionicons name="calendar" size={20} color={theme.primary} />
                <TextInput
                  style={[styles.dateInputText, { color: theme.textDark, flex: 1 }]}
                  value={dateStr}
                  onChangeText={handleDateChange}
                  placeholder="25/03/2026"
                  placeholderTextColor={theme.textLight}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>

              {/* Time */}
              <Text style={[styles.label, { color: theme.textDark }]}>Heure</Text>
              <View style={[styles.dateInput, { borderColor: theme.border, backgroundColor: theme.inputBg }]}>
                <Ionicons name="time" size={20} color={theme.primary} />
                <TextInput
                  style={[styles.dateInputText, { color: theme.textDark, flex: 1 }]}
                  value={timeStr}
                  onChangeText={handleTimeChange}
                  placeholder="14:30"
                  placeholderTextColor={theme.textLight}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              {/* Doctor name */}
              <Text style={[styles.label, { color: theme.textDark }]}>Nom du praticien (optionnel)</Text>
              <TextInput
                style={[styles.textInput, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={doctorName}
                onChangeText={setDoctorName}
                placeholder="Dr. Martin"
                placeholderTextColor={theme.textLight}
              />

              {/* Location */}
              <Text style={[styles.label, { color: theme.textDark }]}>Lieu (optionnel)</Text>
              <TextInput
                style={[styles.textInput, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={location}
                onChangeText={setLocation}
                placeholder="Cabinet médical, adresse..."
                placeholderTextColor={theme.textLight}
              />

              {/* Notes */}
              <Text style={[styles.label, { color: theme.textDark }]}>Notes (optionnel)</Text>
              <TextInput
                style={[styles.textInput, styles.textAreaInput, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Penser à apporter le carnet de santé..."
                placeholderTextColor={theme.textLight}
                multiline
                numberOfLines={3}
              />

              {/* Save button */}
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.primary }]}
                onPress={handleAddAppointment}
              >
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },

  emptyCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: { fontSize: 14 },

  appointmentCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  typeIndicator: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentContent: {
    flex: 1,
    padding: 14,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  appointmentType: { fontSize: 16, fontWeight: '600' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  appointmentDetails: { gap: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 13 },
  notesText: { fontSize: 12, marginTop: 6, fontStyle: 'italic' },

  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: { fontSize: 20, fontWeight: '700' },
  modalScroll: { padding: 20 },

  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 16 },

  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    gap: 4,
  },
  typeLabel: { fontSize: 11, textAlign: 'center' },

  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  dateInputText: { fontSize: 15 },

  textInput: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 15,
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  saveButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
