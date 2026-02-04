import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { todayString, formatDate } from '../utils/helpers';

const moods = [
  { value: 1, label: 'Difficile', icon: 'sad' },
  { value: 2, label: 'Compliqué', icon: 'sad-outline' },
  { value: 3, label: 'Ça va', icon: 'remove-circle-outline' },
  { value: 4, label: 'Bien', icon: 'happy-outline' },
  { value: 5, label: 'Super', icon: 'happy' },
];

const getMoodColor = (mood) => {
  const colors = { 1: '#AB7058', 2: '#B88268', 3: '#C89478', 4: '#D8A688', 5: '#E8B898' };
  return colors[mood] || '#EED9C4';
};

const getPrompt = (mood) => {
  const prompts = {
    1: "C'est dur aujourd'hui. Qu'est-ce qui te pèse ?",
    2: 'Les jours difficiles font partie du parcours. Comment te sens-tu ?',
    3: "Comment s'est passée ta journée ?",
    4: "C'est chouette ! Qu'est-ce qui t'a fait du bien ?",
    5: 'Quelle belle journée ! Raconte-moi ce qui te rend heureuse !',
  };
  return prompts[mood] || "Comment te sens-tu aujourd'hui ?";
};

const getSupportiveMessage = (mood) => {
  const messages = {
    1: "C'est dur aujourd'hui. Tu as le droit de te sentir comme ça. Tu n'es pas seule.",
    2: 'Les jours difficiles font partie du parcours. Demain sera peut-être plus doux.',
    3: "Parfois, 'ça va' c'est déjà beaucoup. Tu gères.",
    4: "C'est chouette de voir que ça se passe bien ! Continue comme ça.",
    5: 'Quelle belle journée ! Savoure ce moment. Tu le mérites tellement !',
  };
  return messages[mood];
};

const getTriggerMessage = (text) => {
  const t = text.toLowerCase();
  if (t.includes('coupable') || t.includes('culpabilité'))
    return "Tu n'as pas à te sentir coupable. Tu fais ce que tu peux. C'est déjà énorme.";
  if (t.includes('échec') || t.includes('échoué') || t.includes('raté'))
    return "Tu n'as pas échoué. Tu as pris les meilleures décisions possibles. C'est ça, être une bonne mère.";
  if (t.includes('fatigue') || t.includes('épuisée') || t.includes('crevée'))
    return 'La fatigue est réelle. Prendre soin de soi, ce n\'est pas égoïste. C\'est prendre soin de ton bébé aussi.';
  if (t.includes('pas assez') || t.includes('pas suffisant'))
    return 'Tu ES assez. Tu fais assez. Ton bébé a de la chance de t\'avoir.';
  return null;
};

export default function JournalScreen() {
  const { theme } = useTheme();
  const { moodEntries, setMoodEntries } = useApp();
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [currentMood, setCurrentMood] = useState(null);
  const [currentNote, setCurrentNote] = useState('');
  const [viewMode, setViewMode] = useState('today');
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  useEffect(() => {
    const entry = moodEntries.find((e) => e.date === selectedDate);
    if (entry) {
      setCurrentMood(entry.mood);
      setCurrentNote(entry.note || '');
    } else {
      setCurrentMood(null);
      setCurrentNote('');
    }
  }, [selectedDate, moodEntries]);

  const saveEntry = () => {
    if (!currentMood) return;
    const newEntries = moodEntries.filter((e) => e.date !== selectedDate);
    newEntries.push({
      date: selectedDate,
      mood: currentMood,
      note: currentNote,
      timestamp: new Date().toISOString(),
    });
    setMoodEntries(newEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const deleteEntry = (date) => {
    Alert.alert('Supprimer', 'Supprimer cette entrée ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          setMoodEntries(moodEntries.filter((e) => e.date !== date));
          if (date === selectedDate) {
            setCurrentMood(null);
            setCurrentNote('');
          }
        },
      },
    ]);
  };

  // Auto-save after 2s of no typing
  useEffect(() => {
    if (currentMood && currentNote) {
      const timer = setTimeout(saveEntry, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentNote]);

  const triggerMessage = currentNote ? getTriggerMessage(currentNote) : null;
  const pastEntries = moodEntries.filter((e) => e.date !== selectedDate).slice(0, 10);

  // Calendar
  const getDaysInMonth = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    return {
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      startingDay: (new Date(y, m, 1).getDay() + 6) % 7, // Monday = 0
      year: y,
      month: m,
    };
  };

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(calendarMonth);
  const monthName = calendarMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>Journal</Text>
        <View style={styles.viewToggle}>
          {['today', 'calendar'].map((v) => (
            <TouchableOpacity
              key={v}
              style={[
                styles.toggleButton,
                {
                  backgroundColor: viewMode === v ? theme.primary : theme.card,
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => setViewMode(v)}
            >
              <Text style={{ color: viewMode === v ? '#fff' : theme.primary, fontSize: 12, fontWeight: '600' }}>
                {v === 'today' ? "Aujourd'hui" : 'Calendrier'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Ton espace, tes émotions, sans filtre
      </Text>

      {viewMode === 'calendar' ? (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={() => setCalendarMonth(new Date(year, month - 1))}>
              <Ionicons name="chevron-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={[styles.monthTitle, { color: theme.primary }]}>{monthName}</Text>
            <TouchableOpacity onPress={() => setCalendarMonth(new Date(year, month + 1))}>
              <Ionicons name="chevron-forward" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarGrid}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
              <Text key={i} style={[styles.dayHeader, { color: theme.text }]}>{d}</Text>
            ))}
            {Array.from({ length: startingDay }).map((_, i) => (
              <View key={`e-${i}`} style={styles.calendarCell} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const entry = moodEntries.find((e) => e.date === dateStr);
              const isToday = dateStr === todayString();
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.calendarCell,
                    {
                      backgroundColor: entry ? getMoodColor(entry.mood) : 'transparent',
                      borderWidth: isToday ? 2 : 0,
                      borderColor: theme.primary,
                    },
                  ]}
                  onPress={() => {
                    setSelectedDate(dateStr);
                    setViewMode('today');
                  }}
                >
                  <Text style={[styles.calendarDay, { color: entry ? '#fff' : theme.text }]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Legend */}
          <View style={styles.legend}>
            {moods.map((m) => (
              <View key={m.value} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: getMoodColor(m.value) }]} />
                <Text style={[styles.legendText, { color: theme.text }]}>{m.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View>
          {/* Mood selector */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.primary }]}>
              Comment te sens-tu aujourd'hui ?
            </Text>

            <View style={styles.moodRow}>
              {moods.map((m) => (
                <TouchableOpacity
                  key={m.value}
                  style={[
                    styles.moodButton,
                    {
                      opacity: currentMood === m.value ? 1 : 0.4,
                      transform: [{ scale: currentMood === m.value ? 1.15 : 1 }],
                    },
                  ]}
                  onPress={() => {
                    setCurrentMood(m.value);
                    setTimeout(saveEntry, 100);
                  }}
                >
                  <Ionicons name={m.icon} size={36} color={getMoodColor(m.value)} />
                  <Text style={[styles.moodLabel, { color: theme.text }]}>{m.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {currentMood && (
              <View style={[styles.supportBox, { backgroundColor: theme.secondary + '60' }]}>
                <Text style={[styles.supportText, { color: theme.primary }]}>
                  {getSupportiveMessage(currentMood)}
                </Text>
              </View>
            )}

            {currentMood && (
              <View style={{ marginTop: 12 }}>
                <Text style={[styles.promptText, { color: theme.text }]}>
                  {getPrompt(currentMood)}
                </Text>
                <TextInput
                  style={[
                    styles.noteInput,
                    { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                  ]}
                  value={currentNote}
                  onChangeText={setCurrentNote}
                  onBlur={saveEntry}
                  placeholder="Écris tout ce que tu veux... Tes joies, tes doutes, tes victoires."
                  placeholderTextColor={theme.textLight}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />

                {triggerMessage && (
                  <View style={[styles.triggerBox, { borderLeftColor: theme.primary, backgroundColor: theme.primary + '10' }]}>
                    <Text style={[styles.triggerText, { color: theme.primary }]}>
                      {triggerMessage}
                    </Text>
                  </View>
                )}

                <Text style={[styles.privacyNote, { color: theme.textLight }]}>
                  Tes notes sont sauvegardées sur ton appareil. Personne d'autre ne peut les voir.
                </Text>
              </View>
            )}
          </View>

          {/* Past entries */}
          {pastEntries.length > 0 && (
            <View>
              <Text style={[styles.sectionTitle, { color: theme.primary }]}>Tes notes précédentes</Text>
              {pastEntries.map((entry) => (
                <View key={entry.date} style={[styles.card, { backgroundColor: theme.card, marginBottom: 8 }]}>
                  <View style={styles.entryHeader}>
                    <Ionicons
                      name={moods.find((m) => m.value === entry.mood)?.icon || 'help'}
                      size={28}
                      color={getMoodColor(entry.mood)}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.entryDate, { color: theme.primary }]}>
                        {formatDate(entry.date)}
                      </Text>
                      <Text style={[styles.entryMood, { color: theme.text }]}>
                        {moods.find((m) => m.value === entry.mood)?.label}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteEntry(entry.date)}>
                      <Ionicons name="trash-outline" size={18} color={theme.danger} />
                    </TouchableOpacity>
                  </View>
                  {entry.note ? (
                    <Text style={[styles.entryNote, { color: theme.text }]} numberOfLines={3}>
                      {entry.note}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 16, marginTop: 4 },
  viewToggle: { flexDirection: 'row', gap: 6 },
  toggleButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1.5 },
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
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  moodButton: { alignItems: 'center', gap: 4 },
  moodLabel: { fontSize: 11 },
  supportBox: { padding: 14, borderRadius: 14, marginBottom: 4 },
  supportText: { fontSize: 14, lineHeight: 20 },
  promptText: { fontSize: 13, fontWeight: '500', marginBottom: 8 },
  noteInput: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    lineHeight: 22,
    minHeight: 120,
  },
  triggerBox: { borderLeftWidth: 4, borderRadius: 8, padding: 14, marginTop: 12 },
  triggerText: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  privacyNote: { fontSize: 11, fontStyle: 'italic', marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, marginTop: 8 },
  entryHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  entryDate: { fontSize: 14, fontWeight: '600' },
  entryMood: { fontSize: 12 },
  entryNote: { fontSize: 13, lineHeight: 20, marginTop: 10 },
  monthNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthTitle: { fontSize: 18, fontWeight: '600', textTransform: 'capitalize' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayHeader: { width: '14.28%', textAlign: 'center', fontSize: 12, fontWeight: '600', marginBottom: 8 },
  calendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 4,
  },
  calendarDay: { fontSize: 13, fontWeight: '500' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#EED9C4' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 11 },
});
