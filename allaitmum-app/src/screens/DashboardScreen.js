import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { formatTime, formatTimeOfDay, todayString } from '../utils/helpers';

export default function DashboardScreen() {
  const { theme } = useTheme();
  const {
    baby, feedingMethod,
    feedingSessions, setFeedingSessions, activeFeeding, startFeeding, stopFeeding, cancelFeeding,
    diaperEntries, setDiaperEntries, addDiaper,
    sleepSessions, setSleepSessions, activeSleep, startSleep, stopSleep, cancelSleep,
  } = useApp();

  const [subTab, setSubTab] = useState('feeding');
  const [elapsed, setElapsed] = useState(0);
  const [sleepElapsed, setSleepElapsed] = useState(0);
  const [pumpVolume, setPumpVolume] = useState('');

  // Feeding timer
  useEffect(() => {
    if (activeFeeding) {
      const interval = setInterval(() => {
        setElapsed(Math.floor((new Date() - new Date(activeFeeding.startTime)) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setElapsed(0);
    }
  }, [activeFeeding]);

  // Sleep timer
  useEffect(() => {
    if (activeSleep) {
      const interval = setInterval(() => {
        setSleepElapsed(Math.floor((new Date() - new Date(activeSleep.startTime)) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setSleepElapsed(0);
    }
  }, [activeSleep]);

  const showBreast = ['breast', 'mixed'].includes(feedingMethod);
  const showPump = ['pump', 'mixed'].includes(feedingMethod);
  const showBottle = ['bottle-bm', 'bottle-formula', 'mixed', 'transition'].includes(feedingMethod);

  const getSessionLabel = (s) => {
    if (s.type === 'bottle') return 'Biberon';
    if (s.type === 'pump-double') return 'Tire-lait double';
    if (s.type === 'pump') return s.side === 'left' ? 'Tire-lait G' : 'Tire-lait D';
    if (s.type === 'breast') return s.side === 'left' ? 'Sein G' : 'Sein D';
    return 'Session';
  };

  const getSessionIcon = (s) => {
    if (s.type === 'bottle') return 'flask';
    if (s.type?.startsWith('pump')) return 'water';
    return 'heart';
  };

  const todaySessions = feedingSessions.filter(
    (s) => s.startTime?.startsWith(todayString())
  );
  const todayDiapers = diaperEntries.filter(
    (d) => d.timestamp?.startsWith(todayString())
  );
  const todaySleep = sleepSessions.filter(
    (s) => s.startTime?.startsWith(todayString())
  );

  const deleteFeeding = (id) => {
    Alert.alert('Supprimer', 'Supprimer cette session ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => setFeedingSessions((prev) => prev.filter((s) => s.id !== id)) },
    ]);
  };

  const deleteDiaper = (id) => {
    Alert.alert('Supprimer', 'Supprimer ce change ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => setDiaperEntries((prev) => prev.filter((d) => d.id !== id)) },
    ]);
  };

  const deleteSleep = (id) => {
    Alert.alert('Supprimer', 'Supprimer ce dodo ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => setSleepSessions((prev) => prev.filter((s) => s.id !== id)) },
    ]);
  };

  const handleStopFeeding = () => {
    const vol = pumpVolume ? parseInt(pumpVolume, 10) : null;
    stopFeeding(vol);
    setPumpVolume('');
  };

  const subTabs = [
    { id: 'feeding', icon: 'heart', label: 'Tétées' },
    { id: 'diapers', icon: 'water-outline', label: 'Couches' },
    { id: 'sleep', icon: 'moon', label: 'Sommeil' },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={[styles.greeting, { color: theme.primary }]}>Bonjour</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Tu fais du super boulot avec {baby.name}
      </Text>

      {/* Sub-tabs */}
      <View style={styles.subTabRow}>
        {subTabs.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[
              styles.subTab,
              {
                backgroundColor: subTab === t.id ? theme.primary : theme.card,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => setSubTab(t.id)}
          >
            <Ionicons
              name={t.icon}
              size={16}
              color={subTab === t.id ? '#fff' : theme.primary}
            />
            <Text
              style={[
                styles.subTabText,
                { color: subTab === t.id ? '#fff' : theme.primary },
              ]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* =================== FEEDING TAB =================== */}
      {subTab === 'feeding' && (
        <View>
          {activeFeeding ? (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.primary + '30' }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>Session en cours</Text>
              <Text style={[styles.timer, { color: theme.primary }]}>{formatTime(elapsed)}</Text>
              <Text style={[styles.timerSub, { color: theme.text }]}>
                Début : {formatTimeOfDay(activeFeeding.startTime)}
              </Text>

              {/* Volume input for pump */}
              {activeFeeding.type?.startsWith('pump') && (
                <View style={styles.volumeRow}>
                  <Text style={[styles.label, { color: theme.text }]}>Volume (ml) :</Text>
                  <TextInput
                    style={[styles.volumeInput, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                    value={pumpVolume}
                    onChangeText={setPumpVolume}
                    keyboardType="numeric"
                    placeholder="ex: 120"
                    placeholderTextColor={theme.textLight}
                  />
                </View>
              )}

              <TouchableOpacity
                style={[styles.mainButton, { backgroundColor: theme.primary }]}
                onPress={handleStopFeeding}
              >
                <Ionicons name="stop-circle" size={20} color="#fff" />
                <Text style={styles.mainButtonText}>Terminer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: theme.primary }]}
                onPress={cancelFeeding}
              >
                <Text style={[styles.cancelText, { color: theme.primary }]}>Annuler</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>Nouvelle session</Text>

              {showBreast && (
                <View style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: theme.text }]}>Tétée au sein</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.bigButton, { backgroundColor: theme.secondary }]}
                      onPress={() => startFeeding('left', 'breast')}
                    >
                      <Ionicons name="heart" size={32} color={theme.primary} />
                      <Text style={[styles.bigButtonText, { color: theme.primary }]}>Gauche</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bigButton, { backgroundColor: theme.secondary }]}
                      onPress={() => startFeeding('right', 'breast')}
                    >
                      <Ionicons name="heart" size={32} color={theme.primary} />
                      <Text style={[styles.bigButtonText, { color: theme.primary }]}>Droit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {showPump && (
                <View style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: theme.text }]}>Tire-lait</Text>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.bigButton, { backgroundColor: theme.secondaryLight }]}
                      onPress={() => startFeeding('left', 'pump')}
                    >
                      <Ionicons name="water" size={32} color={theme.primary} />
                      <Text style={[styles.bigButtonText, { color: theme.primary }]}>Gauche</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.bigButton, { backgroundColor: theme.secondaryLight }]}
                      onPress={() => startFeeding('right', 'pump')}
                    >
                      <Ionicons name="water" size={32} color={theme.primary} />
                      <Text style={[styles.bigButtonText, { color: theme.primary }]}>Droit</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[styles.doubleButton, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]}
                    onPress={() => startFeeding('both', 'pump-double')}
                  >
                    <Ionicons name="water" size={24} color={theme.primary} />
                    <Text style={[styles.doubleButtonText, { color: theme.primary }]}>Double pompage</Text>
                  </TouchableOpacity>
                </View>
              )}

              {showBottle && (
                <View style={styles.section}>
                  <Text style={[styles.sectionLabel, { color: theme.text }]}>Biberon</Text>
                  <TouchableOpacity
                    style={[styles.bigButton, { backgroundColor: theme.secondary, width: '100%' }]}
                    onPress={() => startFeeding('none', 'bottle')}
                  >
                    <Ionicons name="flask" size={32} color={theme.primary} />
                    <Text style={[styles.bigButtonText, { color: theme.primary }]}>Biberon</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {/* Today's feeding sessions */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="time" size={18} color={theme.primary} />
              <Text style={[styles.cardTitle, { color: theme.primary, marginBottom: 0 }]}>Aujourd'hui</Text>
              <Text style={[styles.badge, { backgroundColor: theme.primary }]}>{todaySessions.length}</Text>
            </View>
            {todaySessions.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="moon" size={40} color={theme.textLight} />
                <Text style={[styles.emptyText, { color: theme.text }]}>Aucune session aujourd'hui</Text>
              </View>
            ) : (
              todaySessions.slice(0, 8).map((s) => (
                <View key={s.id} style={[styles.historyItem, { backgroundColor: theme.secondary + '40' }]}>
                  <Ionicons name={getSessionIcon(s)} size={18} color={theme.primary} />
                  <View style={styles.historyContent}>
                    <Text style={[styles.historyTime, { color: theme.primary }]}>
                      {formatTimeOfDay(s.startTime)}
                    </Text>
                    <Text style={[styles.historyLabel, { color: theme.text }]}>
                      {getSessionLabel(s)} - {Math.floor(s.duration / 60)} min
                      {s.volumeMl ? ` - ${s.volumeMl} ml` : ''}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteFeeding(s.id)}>
                    <Ionicons name="trash-outline" size={18} color={theme.danger} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}

      {/* =================== DIAPERS TAB =================== */}
      {subTab === 'diapers' && (
        <View>
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.cardTitle, { color: theme.primary }]}>Nouveau change</Text>
            <View style={styles.diaperRow}>
              <TouchableOpacity
                style={[styles.diaperButton, { backgroundColor: '#E3F2FD' }]}
                onPress={() => addDiaper('pipi')}
              >
                <Ionicons name="water" size={32} color="#42A5F5" />
                <Text style={[styles.diaperLabel, { color: '#42A5F5' }]}>Pipi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.diaperButton, { backgroundColor: '#FFF3E0' }]}
                onPress={() => addDiaper('caca')}
              >
                <Ionicons name="ellipse" size={32} color="#FF9800" />
                <Text style={[styles.diaperLabel, { color: '#FF9800' }]}>Caca</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.diaperButton, { backgroundColor: '#F3E5F5' }]}
                onPress={() => addDiaper('mixte')}
              >
                <Ionicons name="git-merge" size={32} color="#AB47BC" />
                <Text style={[styles.diaperLabel, { color: '#AB47BC' }]}>Mixte</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="time" size={18} color={theme.primary} />
              <Text style={[styles.cardTitle, { color: theme.primary, marginBottom: 0 }]}>Aujourd'hui</Text>
              <Text style={[styles.badge, { backgroundColor: theme.primary }]}>{todayDiapers.length}</Text>
            </View>
            {todayDiapers.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="happy" size={40} color={theme.textLight} />
                <Text style={[styles.emptyText, { color: theme.text }]}>Aucun change aujourd'hui</Text>
              </View>
            ) : (
              todayDiapers.slice(0, 10).map((d) => (
                <View key={d.id} style={[styles.historyItem, { backgroundColor: theme.secondary + '40' }]}>
                  <Ionicons
                    name={d.type === 'pipi' ? 'water' : d.type === 'caca' ? 'ellipse' : 'git-merge'}
                    size={18}
                    color={d.type === 'pipi' ? '#42A5F5' : d.type === 'caca' ? '#FF9800' : '#AB47BC'}
                  />
                  <View style={styles.historyContent}>
                    <Text style={[styles.historyTime, { color: theme.primary }]}>
                      {formatTimeOfDay(d.timestamp)}
                    </Text>
                    <Text style={[styles.historyLabel, { color: theme.text }]}>
                      {d.type.charAt(0).toUpperCase() + d.type.slice(1)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteDiaper(d.id)}>
                    <Ionicons name="trash-outline" size={18} color={theme.danger} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}

      {/* =================== SLEEP TAB =================== */}
      {subTab === 'sleep' && (
        <View>
          {activeSleep ? (
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.primary + '30' }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>Dodo en cours</Text>
              <Ionicons name="moon" size={40} color={theme.primary} style={{ alignSelf: 'center', marginBottom: 8 }} />
              <Text style={[styles.timer, { color: theme.primary }]}>{formatTime(sleepElapsed)}</Text>
              <Text style={[styles.timerSub, { color: theme.text }]}>
                Endormi(e) à {formatTimeOfDay(activeSleep.startTime)}
              </Text>
              <TouchableOpacity
                style={[styles.mainButton, { backgroundColor: theme.primary }]}
                onPress={stopSleep}
              >
                <Ionicons name="sunny" size={20} color="#fff" />
                <Text style={styles.mainButtonText}>Réveillé(e) !</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: theme.primary }]}
                onPress={cancelSleep}
              >
                <Text style={[styles.cancelText, { color: theme.primary }]}>Annuler</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>Sommeil</Text>
              <TouchableOpacity
                style={[styles.bigButton, { backgroundColor: theme.secondary, width: '100%', paddingVertical: 28 }]}
                onPress={startSleep}
              >
                <Ionicons name="moon" size={40} color={theme.primary} />
                <Text style={[styles.bigButtonText, { color: theme.primary, fontSize: 18 }]}>
                  {baby.name} s'endort
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="time" size={18} color={theme.primary} />
              <Text style={[styles.cardTitle, { color: theme.primary, marginBottom: 0 }]}>Aujourd'hui</Text>
              <Text style={[styles.badge, { backgroundColor: theme.primary }]}>{todaySleep.length}</Text>
            </View>
            {todaySleep.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="sunny" size={40} color={theme.textLight} />
                <Text style={[styles.emptyText, { color: theme.text }]}>Aucun dodo enregistré</Text>
              </View>
            ) : (
              todaySleep.slice(0, 8).map((s) => (
                <View key={s.id} style={[styles.historyItem, { backgroundColor: theme.secondary + '40' }]}>
                  <Ionicons name="moon" size={18} color={theme.primary} />
                  <View style={styles.historyContent}>
                    <Text style={[styles.historyTime, { color: theme.primary }]}>
                      {formatTimeOfDay(s.startTime)}
                    </Text>
                    <Text style={[styles.historyLabel, { color: theme.text }]}>
                      {Math.floor(s.duration / 3600)}h{Math.floor((s.duration % 3600) / 60).toString().padStart(2, '0')} de dodo
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteSleep(s.id)}>
                    <Ionicons name="trash-outline" size={18} color={theme.danger} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  greeting: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 16 },
  subTabRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  subTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  subTabText: { fontSize: 13, fontWeight: '600' },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, color: '#fff', fontSize: 12, fontWeight: '700', overflow: 'hidden' },
  timer: { fontSize: 56, fontWeight: '700', textAlign: 'center', fontVariant: ['tabular-nums'], marginVertical: 8 },
  timerSub: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  mainButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: { fontSize: 15, fontWeight: '500' },
  section: { marginBottom: 16 },
  sectionLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  bigButton: {
    flex: 1,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bigButtonText: { fontSize: 15, fontWeight: '600' },
  doubleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    marginTop: 8,
  },
  doubleButtonText: { fontSize: 14, fontWeight: '600' },
  volumeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12 },
  label: { fontSize: 14, fontWeight: '500' },
  volumeInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    fontSize: 15,
  },
  emptyState: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  emptyText: { fontSize: 14 },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  historyContent: { flex: 1 },
  historyTime: { fontSize: 14, fontWeight: '600' },
  historyLabel: { fontSize: 12, marginTop: 2 },
  diaperRow: { flexDirection: 'row', gap: 12 },
  diaperButton: {
    flex: 1,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  diaperLabel: { fontSize: 14, fontWeight: '600' },
});
