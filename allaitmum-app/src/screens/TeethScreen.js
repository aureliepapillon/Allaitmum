import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

// Baby teeth: 20 teeth total
// Upper: 5 left (10-6) + 5 right (1-5)
// Lower: 5 left (20-16) + 5 right (11-15)
const TEETH_MAP = {
  upper: [
    { id: 'U5L', name: '2e molaire G', position: 0 },
    { id: 'U4L', name: '1re molaire G', position: 1 },
    { id: 'U3L', name: 'Canine G', position: 2 },
    { id: 'U2L', name: 'Incisive lat. G', position: 3 },
    { id: 'U1L', name: 'Incisive cent. G', position: 4 },
    { id: 'U1R', name: 'Incisive cent. D', position: 5 },
    { id: 'U2R', name: 'Incisive lat. D', position: 6 },
    { id: 'U3R', name: 'Canine D', position: 7 },
    { id: 'U4R', name: '1re molaire D', position: 8 },
    { id: 'U5R', name: '2e molaire D', position: 9 },
  ],
  lower: [
    { id: 'L5L', name: '2e molaire G', position: 0 },
    { id: 'L4L', name: '1re molaire G', position: 1 },
    { id: 'L3L', name: 'Canine G', position: 2 },
    { id: 'L2L', name: 'Incisive lat. G', position: 3 },
    { id: 'L1L', name: 'Incisive cent. G', position: 4 },
    { id: 'L1R', name: 'Incisive cent. D', position: 5 },
    { id: 'L2R', name: 'Incisive lat. D', position: 6 },
    { id: 'L3R', name: 'Canine D', position: 7 },
    { id: 'L4R', name: '1re molaire D', position: 8 },
    { id: 'L5R', name: '2e molaire D', position: 9 },
  ],
};

const TEETH_ORDER = [
  { id: 'U1L', age: '6-10 mois' },
  { id: 'U1R', age: '6-10 mois' },
  { id: 'L1L', age: '6-10 mois' },
  { id: 'L1R', age: '6-10 mois' },
  { id: 'U2L', age: '9-13 mois' },
  { id: 'U2R', age: '9-13 mois' },
  { id: 'L2L', age: '10-16 mois' },
  { id: 'L2R', age: '10-16 mois' },
  { id: 'U4L', age: '13-19 mois' },
  { id: 'U4R', age: '13-19 mois' },
  { id: 'L4L', age: '14-18 mois' },
  { id: 'L4R', age: '14-18 mois' },
  { id: 'U3L', age: '16-22 mois' },
  { id: 'U3R', age: '16-22 mois' },
  { id: 'L3L', age: '17-23 mois' },
  { id: 'L3R', age: '17-23 mois' },
  { id: 'U5L', age: '23-31 mois' },
  { id: 'U5R', age: '23-31 mois' },
  { id: 'L5L', age: '23-31 mois' },
  { id: 'L5R', age: '23-31 mois' },
];

export default function TeethScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, teeth, toggleTooth, activeBabyId } = useApp();

  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [date, setDate] = useState('');

  const babyTeeth = teeth.filter((t) => t.babyId === activeBabyId);
  const teethCount = babyTeeth.length;

  const isToothOut = (toothId) => babyTeeth.some((t) => t.toothId === toothId);
  const getToothDate = (toothId) => {
    const tooth = babyTeeth.find((t) => t.toothId === toothId);
    return tooth?.date || null;
  };

  const handleToothPress = (tooth) => {
    setSelectedTooth(tooth);
    setDate('');
    setShowDateModal(true);
  };

  const handleConfirm = () => {
    if (selectedTooth) {
      toggleTooth(selectedTooth.id, date || null);
    }
    setShowDateModal(false);
    setSelectedTooth(null);
  };

  const ToothButton = ({ tooth, isUpper }) => {
    const isOut = isToothOut(tooth.id);
    const toothDate = getToothDate(tooth.id);

    return (
      <TouchableOpacity
        style={[
          styles.tooth,
          isUpper ? styles.toothUpper : styles.toothLower,
          { backgroundColor: isOut ? theme.primary : theme.card, borderColor: isOut ? theme.primary : theme.border },
        ]}
        onPress={() => handleToothPress(tooth)}
      >
        <Text style={[styles.toothText, { color: isOut ? '#fff' : theme.textLight }]}>
          {isOut ? '🦷' : '○'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          🦷 Dents de {baby.name || 'bébé'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Counter */}
        <View style={[styles.counterCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.counterNumber, { color: theme.primary }]}>{teethCount}</Text>
          <Text style={[styles.counterLabel, { color: theme.text }]}>dents sur 20</Text>
        </View>

        {/* Teeth diagram */}
        <View style={[styles.teethDiagram, { backgroundColor: theme.card }]}>
          <Text style={[styles.diagramLabel, { color: theme.textLight }]}>Mâchoire supérieure</Text>
          <View style={styles.teethRow}>
            {TEETH_MAP.upper.map((tooth) => (
              <ToothButton key={tooth.id} tooth={tooth} isUpper />
            ))}
          </View>

          <View style={[styles.divider, { borderColor: theme.border }]}>
            <Text style={[styles.dividerText, { color: theme.textLight }]}>👅</Text>
          </View>

          <View style={styles.teethRow}>
            {TEETH_MAP.lower.map((tooth) => (
              <ToothButton key={tooth.id} tooth={tooth} />
            ))}
          </View>
          <Text style={[styles.diagramLabel, { color: theme.textLight }]}>Mâchoire inférieure</Text>
        </View>

        <Text style={[styles.hint, { color: theme.textLight }]}>
          Touche une dent pour marquer sa sortie
        </Text>

        {/* Teeth list with dates */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Historique des poussées
        </Text>

        {babyTeeth.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.emptyText, { color: theme.textLight }]}>
              Aucune dent enregistrée
            </Text>
          </View>
        ) : (
          <View style={styles.teethList}>
            {babyTeeth
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((t) => {
                const toothInfo = [...TEETH_MAP.upper, ...TEETH_MAP.lower].find((x) => x.id === t.toothId);
                return (
                  <View key={t.id} style={[styles.toothItem, { backgroundColor: theme.card }]}>
                    <Text style={styles.toothItemEmoji}>🦷</Text>
                    <View style={styles.toothItemInfo}>
                      <Text style={[styles.toothItemName, { color: theme.textDark }]}>
                        {toothInfo?.name || t.toothId}
                      </Text>
                      <Text style={[styles.toothItemDate, { color: theme.textLight }]}>
                        {t.date}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleTooth(t.toothId)}>
                      <Ionicons name="close-circle" size={20} color={theme.textLight} />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        )}

        {/* Expected order info */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Ordre d'apparition habituel
        </Text>
        <View style={[styles.infoCard, { backgroundColor: theme.secondary + '40' }]}>
          <Text style={[styles.infoText, { color: theme.text }]}>
            🦷 Incisives centrales : 6-10 mois{'\n'}
            🦷 Incisives latérales : 9-16 mois{'\n'}
            🦷 Premières molaires : 13-19 mois{'\n'}
            🦷 Canines : 16-23 mois{'\n'}
            🦷 Deuxièmes molaires : 23-31 mois
          </Text>
          <Text style={[styles.infoNote, { color: theme.textLight }]}>
            Chaque bébé est différent, pas d'inquiétude si l'ordre varie !
          </Text>
        </View>
      </ScrollView>

      {/* Date Modal */}
      <Modal visible={showDateModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.primary }]}>
              {selectedTooth?.name}
            </Text>

            {isToothOut(selectedTooth?.id) ? (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>
                  Cette dent est déjà marquée comme sortie.
                </Text>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#EF5350' }]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalBtnText}>Retirer</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.label, { color: theme.text }]}>Date de sortie (JJ/MM/AAAA)</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                  value={date}
                  onChangeText={setDate}
                  placeholder="Aujourd'hui si vide"
                  placeholderTextColor={theme.textLight}
                  keyboardType="numbers-and-punctuation"
                />
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalBtnText}>🦷 Marquer comme sortie</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={() => setShowDateModal(false)}>
              <Text style={[styles.cancelText, { color: theme.textLight }]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  closeBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 40 },

  // Counter
  counterCard: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterNumber: { fontSize: 48, fontWeight: '700' },
  counterLabel: { fontSize: 14 },

  // Teeth diagram
  teethDiagram: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  diagramLabel: { fontSize: 12, marginBottom: 8 },
  teethRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  tooth: {
    width: 30,
    height: 36,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toothUpper: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  toothLower: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  toothText: { fontSize: 14 },
  divider: {
    width: '80%',
    borderTopWidth: 2,
    borderStyle: 'dashed',
    marginVertical: 12,
    alignItems: 'center',
  },
  dividerText: { marginTop: -12, fontSize: 20 },

  hint: { fontSize: 12, textAlign: 'center', marginBottom: 24 },

  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },

  // Empty state
  emptyCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: { fontSize: 14 },

  // Teeth list
  teethList: { gap: 8, marginBottom: 24 },
  toothItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  toothItemEmoji: { fontSize: 24 },
  toothItemInfo: { flex: 1 },
  toothItemName: { fontSize: 15, fontWeight: '600' },
  toothItemDate: { fontSize: 12, marginTop: 2 },

  // Info card
  infoCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoText: { fontSize: 14, lineHeight: 24 },
  infoNote: { fontSize: 12, marginTop: 12, fontStyle: 'italic' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  modalText: { fontSize: 14, textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, alignSelf: 'flex-start' },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 15,
    marginBottom: 16,
  },
  modalBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelText: { fontSize: 14, paddingVertical: 8 },
});
