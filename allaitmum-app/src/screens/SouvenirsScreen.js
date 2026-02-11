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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';

const SOUVENIR_TYPES = [
  { id: 'premier_mot', label: 'Premier mot', icon: 'chatbubble', emoji: '💬' },
  { id: 'expression', label: 'Expression', icon: 'happy', emoji: '😄' },
  { id: 'premiere_fois', label: 'Première fois', icon: 'star', emoji: '⭐' },
  { id: 'moment', label: 'Moment précieux', icon: 'heart', emoji: '💕' },
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          📖 Bébé Book
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Les souvenirs précieux de {baby.name || 'bébé'}
        </Text>

        {/* Quick add buttons */}
        <View style={styles.quickAddRow}>
          {SOUVENIR_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[styles.quickAddBtn, { backgroundColor: theme.card }]}
              onPress={() => {
                setSelectedType(type.id);
                setShowAddModal(true);
              }}
            >
              <Text style={styles.quickAddEmoji}>{type.emoji}</Text>
              <Text style={[styles.quickAddLabel, { color: theme.textDark }]} numberOfLines={1}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Souvenirs list */}
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
          <View style={styles.souvenirsList}>
            {babySouvenirs.map((souvenir) => {
              const typeInfo = getTypeInfo(souvenir.type);
              return (
                <View key={souvenir.id} style={[styles.souvenirCard, { backgroundColor: theme.card }]}>
                  <View style={styles.souvenirHeader}>
                    <Text style={styles.souvenirEmoji}>{typeInfo.emoji}</Text>
                    <View style={styles.souvenirInfo}>
                      <Text style={[styles.souvenirTitle, { color: theme.textDark }]}>
                        {souvenir.title}
                      </Text>
                      <Text style={[styles.souvenirDate, { color: theme.textLight }]}>
                        {souvenir.date}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(souvenir.id)}>
                      <Ionicons name="trash-outline" size={20} color={theme.textLight} />
                    </TouchableOpacity>
                  </View>
                  {souvenir.description ? (
                    <Text style={[styles.souvenirDesc, { color: theme.text }]}>
                      {souvenir.description}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.primary }]}>
                {selectedType ? getTypeInfo(selectedType).emoji : '✨'} Nouveau souvenir
              </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={theme.textLight} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {/* Type selector */}
              <Text style={[styles.label, { color: theme.text }]}>Type</Text>
              <View style={styles.typeRow}>
                {SOUVENIR_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeBtn,
                      {
                        backgroundColor: selectedType === type.id ? theme.primary + '20' : theme.background,
                        borderColor: selectedType === type.id ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <Text style={styles.typeEmoji}>{type.emoji}</Text>
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

              <Text style={[styles.label, { color: theme.text }]}>Titre</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={title}
                onChangeText={setTitle}
                placeholder={selectedType === 'premier_mot' ? 'Ex: Maman !' : 'Ex: Premier sourire'}
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.label, { color: theme.text }]}>Description (optionnel)</Text>
              <TextInput
                style={[styles.input, styles.textArea, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Raconte ce moment..."
                placeholderTextColor={theme.textLight}
                multiline
                numberOfLines={3}
              />

              <Text style={[styles.label, { color: theme.text }]}>Date (JJ/MM/AAAA)</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark }]}
                value={date}
                onChangeText={setDate}
                placeholder="Aujourd'hui si vide"
                placeholderTextColor={theme.textLight}
                keyboardType="numbers-and-punctuation"
              />

              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: theme.primary }]}
                onPress={handleAdd}
              >
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addBtnText}>Ajouter ce souvenir</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  closeBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  content: { padding: 20, paddingBottom: 40 },
  subtitle: { fontSize: 14, marginBottom: 20, textAlign: 'center' },

  // Quick add
  quickAddRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  quickAddBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    gap: 6,
  },
  quickAddEmoji: { fontSize: 24 },
  quickAddLabel: { fontSize: 11, fontWeight: '600' },

  // Empty state
  emptyCard: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptySubtext: { fontSize: 13, textAlign: 'center', lineHeight: 20 },

  // Souvenirs list
  souvenirsList: { gap: 12 },
  souvenirCard: {
    padding: 16,
    borderRadius: 16,
  },
  souvenirHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  souvenirEmoji: { fontSize: 28 },
  souvenirInfo: { flex: 1 },
  souvenirTitle: { fontSize: 16, fontWeight: '600' },
  souvenirDate: { fontSize: 12, marginTop: 2 },
  souvenirDesc: { fontSize: 14, marginTop: 10, lineHeight: 20 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
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
  modalTitle: { fontSize: 20, fontWeight: '700' },

  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, marginTop: 12 },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 15,
  },
  textArea: { height: 80, textAlignVertical: 'top' },

  typeRow: { flexDirection: 'row', gap: 10 },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  typeEmoji: { fontSize: 24 },

  suggestionsRow: { marginTop: 12, marginBottom: 4 },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  suggestionText: { fontSize: 13, fontWeight: '500' },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
