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
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

const headerImage = require('../../assets/book-view.png');

const SOUVENIR_TYPES = [
  { id: 'premier_mot', label: 'Premier mot', icon: 'chatbubble-outline', color: '#E91E63' },
  { id: 'expression', label: 'Expression', icon: 'happy-outline', color: '#FF9800' },
  { id: 'premiere_fois', label: 'Première fois', icon: 'star-outline', color: '#9C27B0' },
  { id: 'moment', label: 'Moment précieux', icon: 'heart-outline', color: '#F44336' },
];

const PREMIERES_FOIS = [
  'Premier sourire',
  'Premier rire',
  'Première dent',
  'Premiers pas',
  'Premier "maman"',
  'Premier "papa"',
  'Première nuit complète',
  'Premier repas solide',
  'Premier bain (aimé)',
  'Autre...',
];

export default function SouvenirsScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, souvenirs, addSouvenir, deleteSouvenir, activeBabyId } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const babySouvenirs = souvenirs.filter((s) => s.babyId === activeBabyId);

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Oups', 'Ajoute un titre pour ce souvenir');
      return;
    }
    addSouvenir(selectedType, title.trim(), description.trim(), date || null);
    setShowAddModal(false);
    setSelectedType(null);
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Supprimer ce souvenir ?',
      'Cette action est irréversible',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteSouvenir(id) },
      ]
    );
  };

  const getTypeInfo = (typeId) => SOUVENIR_TYPES.find((t) => t.id === typeId) || SOUVENIR_TYPES[3];

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '';
    // If already in DD/MM/YYYY format
    if (dateStr.includes('/')) return dateStr;
    // If in YYYY-MM-DD format
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
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Souvenirs</Text>
        <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addHeaderBtn}>
          <Ionicons name="add" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header image */}
        <View style={[styles.imageCard, { backgroundColor: theme.card }]}>
          <Image source={headerImage} style={styles.headerImage} resizeMode="contain" />
        </View>

        {/* Stats card */}
        <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.statsTitle, { color: theme.textDark }]}>
            Les souvenirs de {baby.name || 'bébé'}
          </Text>
          <Text style={[styles.statsCount, { color: theme.primary }]}>
            {babySouvenirs.length} souvenir{babySouvenirs.length !== 1 ? 's' : ''} enregistré{babySouvenirs.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Quick add buttons */}
        <View style={styles.quickAddSection}>
          <Text style={[styles.sectionTitle, { color: theme.textDark }]}>Ajouter un souvenir</Text>
          <View style={styles.quickAddGrid}>
            {SOUVENIR_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.quickAddBtn, { backgroundColor: theme.card }]}
                onPress={() => {
                  setSelectedType(type.id);
                  setShowAddModal(true);
                }}
              >
                <View style={[styles.quickAddIconCircle, { backgroundColor: type.color + '15' }]}>
                  <Ionicons name={type.icon} size={22} color={type.color} />
                </View>
                <Text style={[styles.quickAddLabel, { color: theme.textDark }]} numberOfLines={1}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Souvenirs list */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textDark }]}>Historique</Text>

          {babySouvenirs.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
              <Ionicons name="book-outline" size={48} color={theme.textLight} />
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                Aucun souvenir pour l'instant
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.textLight }]}>
                Capture les premiers mots, les expressions rigolotes, les grandes premières...
              </Text>
            </View>
          ) : (
            <View style={[styles.souvenirsList, { backgroundColor: theme.card }]}>
              {babySouvenirs.map((souvenir, index) => {
                const typeInfo = getTypeInfo(souvenir.type);
                const isLast = index === babySouvenirs.length - 1;
                return (
                  <View
                    key={souvenir.id}
                    style={[
                      styles.souvenirRow,
                      !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border },
                    ]}
                  >
                    <View style={[styles.souvenirIcon, { backgroundColor: typeInfo.color + '15' }]}>
                      <Ionicons name={typeInfo.icon} size={20} color={typeInfo.color} />
                    </View>
                    <View style={styles.souvenirContent}>
                      <Text style={[styles.souvenirTitle, { color: theme.textDark }]}>
                        {souvenir.title}
                      </Text>
                      {souvenir.description ? (
                        <Text style={[styles.souvenirDesc, { color: theme.text }]} numberOfLines={2}>
                          {souvenir.description}
                        </Text>
                      ) : null}
                      <Text style={[styles.souvenirDate, { color: theme.textLight }]}>
                        {formatDisplayDate(souvenir.date)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDelete(souvenir.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color={theme.textLight} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Tips */}
        <View style={[styles.tipCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="bulb-outline" size={20} color={theme.primary} />
          <Text style={[styles.tipText, { color: theme.textDark }]}>
            Notez les petits moments du quotidien : un mot rigolo, une expression adorable,
            une grande première... Ce sont des trésors à relire plus tard !
          </Text>
        </View>
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <ScrollView
            contentContainerStyle={styles.modalScrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.primary }]}>
                  Nouveau souvenir
                </Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <Ionicons name="close" size={24} color={theme.textLight} />
                </TouchableOpacity>
              </View>

              {/* Type selector */}
              <Text style={[styles.label, { color: theme.textDark }]}>Type de souvenir</Text>
              <View style={styles.typeRow}>
                {SOUVENIR_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeBtn,
                      {
                        backgroundColor: selectedType === type.id ? type.color + '15' : theme.background,
                        borderColor: selectedType === type.id ? type.color : theme.border,
                      },
                    ]}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <Ionicons
                      name={type.icon}
                      size={20}
                      color={selectedType === type.id ? type.color : theme.textLight}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Quick suggestions for première fois */}
              {selectedType === 'premiere_fois' && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsRow}>
                  {PREMIERES_FOIS.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={[styles.suggestionChip, { backgroundColor: theme.secondary }]}
                      onPress={() => setTitle(suggestion === 'Autre...' ? '' : suggestion)}
                    >
                      <Text style={[styles.suggestionText, { color: theme.primary }]}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              <Text style={[styles.label, { color: theme.textDark }]}>Titre</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={title}
                onChangeText={setTitle}
                placeholder={selectedType === 'premier_mot' ? 'Ex: Maman !' : 'Ex: Premier sourire'}
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.label, { color: theme.textDark }]}>Description (optionnel)</Text>
              <TextInput
                style={[styles.input, styles.textArea, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Raconte ce moment..."
                placeholderTextColor={theme.textLight}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.label, { color: theme.textDark }]}>Date (JJ/MM/AAAA)</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={date}
                onChangeText={setDate}
                placeholder="Aujourd'hui si vide"
                placeholderTextColor={theme.textLight}
                keyboardType="numbers-and-punctuation"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.background }]}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                  onPress={handleAdd}
                >
                  <Text style={[styles.modalBtnText, { color: '#fff' }]}>Enregistrer</Text>
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
  addHeaderBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  imageCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerImage: {
    width: 200,
    height: 100,
  },

  statsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  statsTitle: { fontSize: 15, fontWeight: '500' },
  statsCount: { fontSize: 24, fontWeight: '700', marginTop: 4 },

  quickAddSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  quickAddGrid: { flexDirection: 'row', gap: 10 },
  quickAddBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    gap: 8,
  },
  quickAddIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAddLabel: { fontSize: 11, fontWeight: '600' },

  section: { marginBottom: 20 },

  emptyCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptySubtext: { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  souvenirsList: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  souvenirRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  souvenirIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  souvenirContent: { flex: 1 },
  souvenirTitle: { fontSize: 15, fontWeight: '600' },
  souvenirDesc: { fontSize: 13, marginTop: 2, lineHeight: 18 },
  souvenirDate: { fontSize: 12, marginTop: 4 },
  deleteBtn: { padding: 8 },

  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
  },
  tipText: { flex: 1, fontSize: 13, lineHeight: 18 },

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
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '700' },

  label: { fontSize: 14, fontWeight: '500', marginBottom: 8, marginTop: 16 },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 15,
  },
  textArea: { height: 80, textAlignVertical: 'top' },

  typeRow: { flexDirection: 'row', gap: 10 },
  typeBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },

  suggestionsRow: { marginTop: 12, marginBottom: 4 },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  suggestionText: { fontSize: 13, fontWeight: '500' },

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
