import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

const { width } = Dimensions.get('window');

// Image du diagramme des dents
const teethChartImage = require('../../assets/teeth.chart.png');

// Dents organisées par type avec âges correspondants à l'image
const TEETH_BY_TYPE = [
  {
    type: 'Incisives centrales',
    emoji: '😁',
    teeth: [
      { id: 'U1L', name: 'Incisive centrale sup. G', jaw: 'upper', age: '8-12 mois' },
      { id: 'U1R', name: 'Incisive centrale sup. D', jaw: 'upper', age: '8-12 mois' },
      { id: 'L1L', name: 'Incisive centrale inf. G', jaw: 'lower', age: '6-10 mois' },
      { id: 'L1R', name: 'Incisive centrale inf. D', jaw: 'lower', age: '6-10 mois' },
    ],
  },
  {
    type: 'Incisives latérales',
    emoji: '😬',
    teeth: [
      { id: 'U2L', name: 'Incisive latérale sup. G', jaw: 'upper', age: '9-13 mois' },
      { id: 'U2R', name: 'Incisive latérale sup. D', jaw: 'upper', age: '9-13 mois' },
      { id: 'L2L', name: 'Incisive latérale inf. G', jaw: 'lower', age: '10-16 mois' },
      { id: 'L2R', name: 'Incisive latérale inf. D', jaw: 'lower', age: '10-16 mois' },
    ],
  },
  {
    type: 'Canines',
    emoji: '🧛',
    teeth: [
      { id: 'U3L', name: 'Canine sup. G', jaw: 'upper', age: '16-22 mois' },
      { id: 'U3R', name: 'Canine sup. D', jaw: 'upper', age: '16-22 mois' },
      { id: 'L3L', name: 'Canine inf. G', jaw: 'lower', age: '17-23 mois' },
      { id: 'L3R', name: 'Canine inf. D', jaw: 'lower', age: '17-23 mois' },
    ],
  },
  {
    type: 'Premières molaires',
    emoji: '🦷',
    teeth: [
      { id: 'U4L', name: '1ère molaire sup. G', jaw: 'upper', age: '13-19 mois' },
      { id: 'U4R', name: '1ère molaire sup. D', jaw: 'upper', age: '13-19 mois' },
      { id: 'L4L', name: '1ère molaire inf. G', jaw: 'lower', age: '14-18 mois' },
      { id: 'L4R', name: '1ère molaire inf. D', jaw: 'lower', age: '14-18 mois' },
    ],
  },
  {
    type: 'Deuxièmes molaires',
    emoji: '🔨',
    teeth: [
      { id: 'U5L', name: '2ème molaire sup. G', jaw: 'upper', age: '23-31 mois' },
      { id: 'U5R', name: '2ème molaire sup. D', jaw: 'upper', age: '23-31 mois' },
      { id: 'L5L', name: '2ème molaire inf. G', jaw: 'lower', age: '25-33 mois' },
      { id: 'L5R', name: '2ème molaire inf. D', jaw: 'lower', age: '25-33 mois' },
    ],
  },
];

export default function TeethScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, teeth, toggleTooth, activeBabyId } = useApp();

  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [date, setDate] = useState('');
  const [expandedType, setExpandedType] = useState(null);

  const babyTeeth = teeth.filter((t) => t.babyId === activeBabyId);
  const teethCount = babyTeeth.length;

  const isToothOut = (toothId) => babyTeeth.some((t) => t.toothId === toothId);
  const getToothDate = (toothId) => {
    const tooth = babyTeeth.find((t) => t.toothId === toothId);
    return tooth?.date || null;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleToothPress = (tooth) => {
    setSelectedTooth(tooth);
    setDate('');
    setShowDateModal(true);
  };

  const handleConfirm = () => {
    if (selectedTooth) {
      let formattedDate = null;
      if (date) {
        const [day, month, year] = date.split('/');
        if (day && month && year) {
          formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
      toggleTooth(selectedTooth.id, formattedDate);
    }
    setShowDateModal(false);
    setSelectedTooth(null);
  };

  // Count teeth out per type
  const getTypeCount = (typeObj) => {
    const out = typeObj.teeth.filter((t) => isToothOut(t.id)).length;
    return { out, total: typeObj.teeth.length };
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Dents de {baby.name || 'bébé'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Counter */}
        <View style={[styles.counterCard, { backgroundColor: theme.primary }]}>
          <Text style={styles.counterEmoji}>🦷</Text>
          <View>
            <Text style={styles.counterNumber}>{teethCount}/20</Text>
            <Text style={styles.counterLabel}>dents sorties</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(teethCount / 20) * 100}%` }]} />
          </View>
        </View>

        {/* Teeth Chart Image */}
        <View style={[styles.chartContainer, { backgroundColor: theme.card }]}>
          <Image
            source={teethChartImage}
            style={styles.chartImage}
            resizeMode="contain"
          />
        </View>

        {/* Interactive teeth list by type */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Suivi des poussées
        </Text>
        <Text style={[styles.sectionSubtitle, { color: theme.textLight }]}>
          Touche une dent pour la marquer
        </Text>

        {TEETH_BY_TYPE.map((typeObj) => {
          const counts = getTypeCount(typeObj);
          const isExpanded = expandedType === typeObj.type;
          const allOut = counts.out === counts.total;

          return (
            <View key={typeObj.type} style={[styles.typeCard, { backgroundColor: theme.card }]}>
              <TouchableOpacity
                style={styles.typeHeader}
                onPress={() => setExpandedType(isExpanded ? null : typeObj.type)}
              >
                <Text style={styles.typeEmoji}>{typeObj.emoji}</Text>
                <View style={styles.typeInfo}>
                  <Text style={[styles.typeName, { color: theme.textDark }]}>
                    {typeObj.type}
                  </Text>
                  <Text style={[styles.typeCount, { color: allOut ? '#4CAF50' : theme.textLight }]}>
                    {counts.out}/{counts.total} {allOut && '✓'}
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.textLight}
                />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.teethGrid}>
                  {typeObj.teeth.map((tooth) => {
                    const isOut = isToothOut(tooth.id);
                    const toothDate = getToothDate(tooth.id);

                    return (
                      <TouchableOpacity
                        key={tooth.id}
                        style={[
                          styles.toothBtn,
                          { borderColor: isOut ? theme.primary : theme.border },
                          isOut && { backgroundColor: theme.primary + '15' },
                        ]}
                        onPress={() => handleToothPress(tooth)}
                      >
                        <View style={styles.toothTop}>
                          <Text style={[styles.toothIcon, { color: isOut ? theme.primary : theme.textLight }]}>
                            {isOut ? '🦷' : '○'}
                          </Text>
                          {isOut && <Ionicons name="checkmark-circle" size={16} color={theme.primary} />}
                        </View>
                        <Text style={[styles.toothName, { color: isOut ? theme.primary : theme.textDark }]} numberOfLines={2}>
                          {tooth.jaw === 'upper' ? '↑' : '↓'} {tooth.name.replace(' sup.', '').replace(' inf.', '')}
                        </Text>
                        <Text style={[styles.toothAge, { color: theme.textLight }]}>
                          {isOut ? formatDate(toothDate) : tooth.age}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {/* Recent teeth history */}
        {babyTeeth.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.primary, marginTop: 20 }]}>
              Historique
            </Text>
            <View style={styles.historyList}>
              {babyTeeth
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((t) => {
                  const allTeeth = TEETH_BY_TYPE.flatMap((type) => type.teeth);
                  const toothInfo = allTeeth.find((x) => x.id === t.toothId);
                  return (
                    <View key={t.id} style={[styles.historyItem, { backgroundColor: theme.card }]}>
                      <Text style={styles.historyEmoji}>🦷</Text>
                      <View style={styles.historyInfo}>
                        <Text style={[styles.historyName, { color: theme.textDark }]}>
                          {toothInfo?.name || t.toothId}
                        </Text>
                        <Text style={[styles.historyDate, { color: theme.textLight }]}>
                          {formatDate(t.date)}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleTooth(t.toothId)}>
                        <Ionicons name="close-circle" size={20} color={theme.textLight} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </>
        )}

        {/* Tip */}
        <View style={[styles.tipCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="information-circle" size={18} color={theme.primary} />
          <Text style={[styles.tipText, { color: theme.textDark }]}>
            Les premières dents apparaissent généralement vers 6 mois. Chaque bébé est unique, pas d'inquiétude si l'ordre varie !
          </Text>
        </View>
      </ScrollView>

      {/* Date Modal */}
      <Modal visible={showDateModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.primary }]}>
              🦷 {selectedTooth?.name}
            </Text>

            {isToothOut(selectedTooth?.id) ? (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>
                  Cette dent est déjà marquée comme sortie le {formatDate(getToothDate(selectedTooth?.id))}.
                </Text>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: '#EF5350' }]}
                  onPress={handleConfirm}
                >
                  <Ionicons name="close-circle" size={20} color="#fff" />
                  <Text style={styles.modalBtnText}>Retirer</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.modalSubtext, { color: theme.textLight }]}>
                  Âge habituel : {selectedTooth?.age}
                </Text>
                <Text style={[styles.label, { color: theme.text }]}>Date de sortie</Text>
                <TextInput
                  style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                  value={date}
                  onChangeText={setDate}
                  placeholder="JJ/MM/AAAA (vide = aujourd'hui)"
                  placeholderTextColor={theme.textLight}
                  keyboardType="numbers-and-punctuation"
                />
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalBtnText}>Marquer comme sortie</Text>
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
  },
  closeBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 40 },

  // Counter
  counterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 12,
  },
  counterEmoji: { fontSize: 36 },
  counterNumber: { fontSize: 28, fontWeight: '700', color: '#fff' },
  counterLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginLeft: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },

  // Chart
  chartContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  chartImage: {
    width: width - 52,
    height: width - 52,
  },

  // Sections
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, marginBottom: 12 },

  // Type cards
  typeCard: {
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  typeEmoji: { fontSize: 24, marginRight: 12 },
  typeInfo: { flex: 1 },
  typeName: { fontSize: 15, fontWeight: '600' },
  typeCount: { fontSize: 12, marginTop: 2 },

  // Teeth grid
  teethGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingTop: 0,
    gap: 8,
  },
  toothBtn: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  toothTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  toothIcon: { fontSize: 20 },
  toothName: { fontSize: 12, fontWeight: '500', marginBottom: 4 },
  toothAge: { fontSize: 10 },

  // History
  historyList: { gap: 8 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  historyEmoji: { fontSize: 20 },
  historyInfo: { flex: 1 },
  historyName: { fontSize: 14, fontWeight: '500' },
  historyDate: { fontSize: 11, marginTop: 2 },

  // Tip
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  tipText: { flex: 1, fontSize: 12, lineHeight: 18 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  modalSubtext: { fontSize: 13, marginBottom: 16 },
  modalText: { fontSize: 14, textAlign: 'center', marginBottom: 16, lineHeight: 20 },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelText: { fontSize: 14, paddingVertical: 8 },
});
