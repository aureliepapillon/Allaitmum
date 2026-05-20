import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { storage } from '../utils/storage';

const SITES = [
  { id: 'frontale', label: 'Frontale' },
  { id: 'axillaire', label: 'Axillaire' },
  { id: 'rectale', label: 'Rectale' },
];

function getTempColor(temp) {
  if (temp >= 39) return { bg: '#FFEBEE', text: '#E53935', label: 'Fièvre élevée' };
  if (temp >= 38) return { bg: '#FFF3E0', text: '#F57C00', label: 'Fièvre' };
  return { bg: '#E8F5E9', text: '#388E3C', label: 'Normal' };
}

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) +
    ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function FeverScreen({ onClose }) {
  const { theme } = useTheme();
  const { activeBabyId } = useApp();
  const storageKey = `fever_${activeBabyId}`;

  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [temp, setTemp] = useState('');
  const [site, setSite] = useState('frontale');
  const [note, setNote] = useState('');

  useEffect(() => {
    storage.get(storageKey, []).then(setEntries);
  }, [activeBabyId]);

  const handleAdd = async () => {
    const parsed = parseFloat(temp.replace(',', '.'));
    if (!temp || isNaN(parsed) || parsed < 35 || parsed > 42) {
      Alert.alert('Température invalide', 'Entre une valeur entre 35 et 42°C.');
      return;
    }
    const entry = {
      id: Date.now().toString(),
      temp: parsed,
      site,
      note: note.trim(),
      date: new Date().toISOString(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    await storage.set(storageKey, updated);
    setTemp('');
    setNote('');
    setSite('frontale');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Supprimer', 'Supprimer cette mesure ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer', style: 'destructive', onPress: async () => {
          const updated = entries.filter(e => e.id !== id);
          setEntries(updated);
          await storage.set(storageKey, updated);
        }
      },
    ]);
  };

  const colors = getTempColor(parseFloat(temp.replace(',', '.')) || 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Suivi de la fièvre</Text>
        <TouchableOpacity onPress={() => setShowForm(true)} style={styles.addBtn}>
          <Ionicons name="add" size={28} color={theme.primary} />
        </TouchableOpacity>
      </View>

      {/* Légende */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#388E3C' }]} />
          <Text style={[styles.legendText, { color: theme.text }]}>{'< 38°C Normal'}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F57C00' }]} />
          <Text style={[styles.legendText, { color: theme.text }]}>38–39°C Fièvre</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#E53935' }]} />
          <Text style={[styles.legendText, { color: theme.text }]}>{'>39°C Élevée'}</Text>
        </View>
      </View>

      {/* Liste */}
      <ScrollView contentContainerStyle={styles.list}>
        {entries.length === 0 && (
          <Text style={[styles.empty, { color: theme.textLight }]}>
            Aucune mesure enregistrée.{'\n'}Appuie sur + pour commencer.
          </Text>
        )}
        {entries.map(e => {
          const c = getTempColor(e.temp);
          return (
            <View key={e.id} style={[styles.entry, { backgroundColor: theme.card }]}>
              <View style={[styles.tempBadge, { backgroundColor: c.bg }]}>
                <Text style={[styles.tempValue, { color: c.text }]}>{e.temp.toFixed(1)}°</Text>
                <Text style={[styles.tempLabel, { color: c.text }]}>{c.label}</Text>
              </View>
              <View style={styles.entryInfo}>
                <Text style={[styles.entryDate, { color: theme.textDark }]}>{formatDateTime(e.date)}</Text>
                <Text style={[styles.entrySite, { color: theme.textLight }]}>{e.site.charAt(0).toUpperCase() + e.site.slice(1)}</Text>
                {e.note ? <Text style={[styles.entryNote, { color: theme.text }]}>{e.note}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => handleDelete(e.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={18} color={theme.textLight} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Formulaire ajout */}
      {showForm && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formOverlay}
        >
          <TouchableOpacity style={styles.formBackdrop} onPress={() => setShowForm(false)} />
          <View style={[styles.formSheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.formTitle, { color: theme.primary }]}>Nouvelle mesure</Text>

            <Text style={[styles.formLabel, { color: theme.text }]}>Température (°C)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={temp}
              onChangeText={setTemp}
              placeholder="38.5"
              placeholderTextColor={theme.textLight}
              keyboardType="decimal-pad"
              autoFocus
            />

            <Text style={[styles.formLabel, { color: theme.text }]}>Site de mesure</Text>
            <View style={styles.siteRow}>
              {SITES.map(s => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.siteBtn, {
                    backgroundColor: site === s.id ? theme.primary : theme.background,
                    borderColor: theme.primary,
                  }]}
                  onPress={() => setSite(s.id)}
                >
                  <Text style={[styles.siteBtnText, { color: site === s.id ? '#fff' : theme.primary }]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.formLabel, { color: theme.text }]}>Note (optionnel)</Text>
            <TextInput
              style={[styles.input, styles.noteInput, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={note}
              onChangeText={setNote}
              placeholder="Ex : Doliprane 250mg à 14h30"
              placeholderTextColor={theme.textLight}
              multiline
            />

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: theme.primary }]}
              onPress={handleAdd}
            >
              <Text style={styles.saveBtnText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  backBtn: { padding: 4 },
  addBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11 },
  list: { padding: 16, gap: 10 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 15, lineHeight: 24 },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  tempBadge: {
    width: 70,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tempValue: { fontSize: 20, fontWeight: '700' },
  tempLabel: { fontSize: 10, fontWeight: '600', marginTop: 2 },
  entryInfo: { flex: 1 },
  entryDate: { fontSize: 14, fontWeight: '600' },
  entrySite: { fontSize: 12, marginTop: 2 },
  entryNote: { fontSize: 13, marginTop: 4, fontStyle: 'italic' },
  deleteBtn: { padding: 4 },
  formOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end' },
  formBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  formSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    gap: 8,
  },
  formTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  formLabel: { fontSize: 13, fontWeight: '500', marginTop: 8 },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  noteInput: { minHeight: 70, textAlignVertical: 'top' },
  siteRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  siteBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  siteBtnText: { fontSize: 13, fontWeight: '600' },
  saveBtn: {
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
