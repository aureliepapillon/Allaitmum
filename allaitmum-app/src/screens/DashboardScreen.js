import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Linking,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { formatTime, formatTimeOfDay, todayString, getBabyAge } from '../utils/helpers';
import { getTipOfTheWeek } from '../data/tips';
import { getDevelopmentInfo } from '../data/development';
import LionMascot from '../components/LionMascot';

const dashboardMascot = require('../../assets/dashboard-mascot.png');

export default function DashboardScreen() {
  const { theme } = useTheme();
  const {
    baby, babies, activeBabyId, switchBaby, feedingMethod,
    feedingSessions, setFeedingSessions, activeFeeding, startFeeding, stopFeeding, cancelFeeding,
    diaperEntries, setDiaperEntries, addDiaper,
    sleepSessions, setSleepSessions, activeSleep, startSleep, stopSleep, cancelSleep,
  } = useApp();

  const [showMenu, setShowMenu] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sleepElapsed, setSleepElapsed] = useState(0);
  const [pumpVolume, setPumpVolume] = useState('');
  const [sleepType, setSleepType] = useState(null); // 'sieste' or 'dodo'

  const tip = getTipOfTheWeek();
  const devInfo = getDevelopmentInfo(baby.birthDate);

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

  // Today's entries
  const todaySessions = feedingSessions.filter((s) => s.startTime?.startsWith(todayString()) && (!s.babyId || s.babyId === activeBabyId));
  const todayDiapers = diaperEntries.filter((d) => d.timestamp?.startsWith(todayString()) && (!d.babyId || d.babyId === activeBabyId));
  const todaySleep = sleepSessions.filter((s) => s.startTime?.startsWith(todayString()) && (!s.babyId || s.babyId === activeBabyId));

  const totalFeedingMins = Math.floor(todaySessions.reduce((acc, s) => acc + (s.duration || 0), 0) / 60);
  const totalSleepMins = Math.floor(todaySleep.reduce((acc, s) => acc + (s.duration || 0), 0) / 60);

  const handleStopFeeding = () => {
    const vol = pumpVolume ? parseInt(pumpVolume, 10) : null;
    stopFeeding(vol);
    setPumpVolume('');
  };

  const handleStartSleep = (type) => {
    setSleepType(type);
    startSleep();
  };

  const deleteEntry = (type, id) => {
    Alert.alert('Supprimer', 'Supprimer cet enregistrement ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: () => {
          if (type === 'feeding') setFeedingSessions((prev) => prev.filter((s) => s.id !== id));
          if (type === 'diaper') setDiaperEntries((prev) => prev.filter((d) => d.id !== id));
          if (type === 'sleep') setSleepSessions((prev) => prev.filter((s) => s.id !== id));
        },
      },
    ]);
  };

  const getSessionLabel = (s) => {
    if (s.type === 'bottle') return 'Biberon';
    if (s.type === 'pump-double') return 'Double pompage';
    if (s.type === 'pump') return s.side === 'left' ? 'Tire-lait G' : 'Tire-lait D';
    if (s.type === 'breast') return s.side === 'left' ? 'Sein G' : 'Sein D';
    return 'Session';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(true)}>
          <Ionicons name="menu" size={28} color={theme.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <LionMascot size={60} gender={baby.gender} />
          <Text style={[styles.babyName, { color: theme.primary }]}>{baby.name || 'Bébé'}</Text>
          <Text style={[styles.babyAge, { color: theme.text }]}>{getBabyAge(baby.birthDate)}</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Dashboard mascot - aligned left */}
        <View style={styles.mascotContainer}>
          <Image source={dashboardMascot} style={styles.dashboardMascot} resizeMode="contain" />
        </View>

        {/* ========== TRACKING TOOLS ========== */}

        {/* Active session banner */}
        {(activeFeeding || activeSleep) && (
          <View style={[styles.activeBanner, { backgroundColor: theme.primary }]}>
            <Ionicons name={activeFeeding ? 'heart' : 'moon'} size={20} color="#fff" />
            <Text style={styles.activeBannerText}>
              {activeFeeding ? 'Tétée en cours' : (sleepType === 'sieste' ? 'Sieste' : 'Dodo')} — {formatTime(activeFeeding ? elapsed : sleepElapsed)}
            </Text>
            <TouchableOpacity onPress={activeFeeding ? handleStopFeeding : stopSleep}>
              <Ionicons name="stop-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Alimentation */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="restaurant" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Alimentation</Text>
          </View>

          {activeFeeding ? (
            <View style={styles.activeSession}>
              <Text style={[styles.timer, { color: theme.primary }]}>{formatTime(elapsed)}</Text>
              <Text style={[styles.timerSub, { color: theme.text }]}>
                Début : {formatTimeOfDay(activeFeeding.startTime)}
              </Text>
              {activeFeeding.type?.startsWith('pump') && (
                <View style={styles.volumeRow}>
                  <Text style={[styles.label, { color: theme.text }]}>Volume (ml) :</Text>
                  <TextInput
                    style={[styles.volumeInput, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                    value={pumpVolume}
                    onChangeText={setPumpVolume}
                    keyboardType="numeric"
                    placeholder="120"
                    placeholderTextColor={theme.textLight}
                  />
                </View>
              )}
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary }]} onPress={handleStopFeeding}>
                  <Ionicons name="checkmark" size={20} color="#fff" />
                  <Text style={styles.actionBtnText}>Terminer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: theme.textLight }]} onPress={cancelFeeding}>
                  <Text style={[styles.actionBtnOutlineText, { color: theme.textLight }]}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.toolGrid}>
              <TouchableOpacity style={[styles.toolBtn, { backgroundColor: '#FFEBEE' }]} onPress={() => startFeeding('left', 'breast')}>
                <Ionicons name="heart" size={28} color="#E57373" />
                <Text style={[styles.toolLabel, { color: '#E57373' }]}>Sein G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolBtn, { backgroundColor: '#FFEBEE' }]} onPress={() => startFeeding('right', 'breast')}>
                <Ionicons name="heart" size={28} color="#E57373" />
                <Text style={[styles.toolLabel, { color: '#E57373' }]}>Sein D</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolBtn, { backgroundColor: '#E3F2FD' }]} onPress={() => startFeeding('none', 'bottle')}>
                <Text style={styles.toolEmoji}>🍼</Text>
                <Text style={[styles.toolLabel, { color: '#42A5F5' }]}>Biberon</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolBtn, { backgroundColor: '#E8F5E9' }]} onPress={() => startFeeding('both', 'pump-double')}>
                <Ionicons name="water" size={28} color="#66BB6A" />
                <Text style={[styles.toolLabel, { color: '#66BB6A' }]}>Tire-lait</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Sommeil */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="moon" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Sommeil</Text>
          </View>

          {activeSleep ? (
            <View style={styles.activeSession}>
              <View style={styles.sleepIconRow}>
                {sleepType === 'sieste' ? (
                  <Text style={styles.sleepEmoji}>🌤️</Text>
                ) : (
                  <Text style={styles.sleepEmoji}>🌙</Text>
                )}
              </View>
              <Text style={[styles.timer, { color: theme.primary }]}>{formatTime(sleepElapsed)}</Text>
              <Text style={[styles.timerSub, { color: theme.text }]}>
                {sleepType === 'sieste' ? 'Sieste' : 'Dodo'} depuis {formatTimeOfDay(activeSleep.startTime)}
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.primary }]} onPress={stopSleep}>
                  <Ionicons name="sunny" size={20} color="#fff" />
                  <Text style={styles.actionBtnText}>Réveillé(e) !</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtnOutline, { borderColor: theme.textLight }]} onPress={cancelSleep}>
                  <Text style={[styles.actionBtnOutlineText, { color: theme.textLight }]}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.sleepButtons}>
              <TouchableOpacity
                style={[styles.sleepBtn, { backgroundColor: '#FFF8E1' }]}
                onPress={() => handleStartSleep('sieste')}
              >
                <Text style={styles.sleepBtnEmoji}>🌤️</Text>
                <Text style={[styles.sleepBtnLabel, { color: '#FFA000' }]}>Sieste</Text>
                <Text style={[styles.sleepBtnSub, { color: '#FFA000' }]}>Journée</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sleepBtn, { backgroundColor: '#E8EAF6' }]}
                onPress={() => handleStartSleep('dodo')}
              >
                <Text style={styles.sleepBtnEmoji}>🌙</Text>
                <Text style={[styles.sleepBtnLabel, { color: '#5C6BC0' }]}>Dodo</Text>
                <Text style={[styles.sleepBtnSub, { color: '#5C6BC0' }]}>Nuit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Couches */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="layers" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Couches</Text>
          </View>
          <View style={styles.diaperGrid}>
            <TouchableOpacity style={[styles.diaperBtn, { backgroundColor: '#E3F2FD' }]} onPress={() => addDiaper('pipi')}>
              <Ionicons name="water" size={28} color="#42A5F5" />
              <Text style={[styles.diaperLabel, { color: '#42A5F5' }]}>Pipi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.diaperBtn, { backgroundColor: '#FFF3E0' }]} onPress={() => addDiaper('caca')}>
              <Text style={styles.diaperEmoji}>💩</Text>
              <Text style={[styles.diaperLabel, { color: '#FF9800' }]}>Caca</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.diaperBtn, { backgroundColor: '#F3E5F5' }]} onPress={() => addDiaper('mixte')}>
              <Ionicons name="git-merge" size={28} color="#AB47BC" />
              <Text style={[styles.diaperLabel, { color: '#AB47BC' }]}>Mixte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========== TIP OF THE WEEK ========== */}
        <View style={[styles.tipCard, { backgroundColor: theme.secondary + '40', borderColor: theme.primary + '30' }]}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color={theme.primary} />
            <Text style={[styles.tipTitle, { color: theme.primary }]}>Conseil de la semaine</Text>
          </View>
          <Text style={[styles.tipText, { color: theme.textDark }]}>{tip.text}</Text>
          <Text style={[styles.tipSource, { color: theme.textLight }]}>Source : {tip.source}</Text>
        </View>

        {/* ========== DEVELOPMENT INFO ========== */}
        <View style={[styles.devCard, { backgroundColor: theme.card }]}>
          <View style={styles.devHeader}>
            <Ionicons name={devInfo.icon} size={22} color={theme.primary} />
            <Text style={[styles.devTitle, { color: theme.primary }]}>{devInfo.title}</Text>
          </View>
          <Text style={[styles.devText, { color: theme.text }]}>{devInfo.description}</Text>
        </View>

        {/* ========== SUMMARY / HISTORY ========== */}
        <View style={[styles.summaryCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.summaryTitle, { color: theme.primary }]}>Résumé du jour</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Ionicons name="heart" size={18} color="#E57373" />
              <Text style={[styles.summaryValue, { color: theme.textDark }]}>{todaySessions.length}</Text>
              <Text style={[styles.summaryLabel, { color: theme.textLight }]}>tétées</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="moon" size={18} color="#5C6BC0" />
              <Text style={[styles.summaryValue, { color: theme.textDark }]}>{totalSleepMins} min</Text>
              <Text style={[styles.summaryLabel, { color: theme.textLight }]}>sommeil</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="layers" size={18} color="#AB47BC" />
              <Text style={[styles.summaryValue, { color: theme.textDark }]}>{todayDiapers.length}</Text>
              <Text style={[styles.summaryLabel, { color: theme.textLight }]}>couches</Text>
            </View>
          </View>
        </View>

        {/* Recent entries */}
        <View style={[styles.historyCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.historyTitle, { color: theme.primary }]}>Dernières entrées</Text>
          {[...todaySessions.slice(0, 3), ...todayDiapers.slice(0, 2), ...todaySleep.slice(0, 2)]
            .sort((a, b) => new Date(b.startTime || b.timestamp) - new Date(a.startTime || a.timestamp))
            .slice(0, 5)
            .map((entry) => {
              const isFeeding = entry.type && ['breast', 'bottle', 'pump', 'pump-double'].includes(entry.type);
              const isDiaper = entry.type && ['pipi', 'caca', 'mixte'].includes(entry.type);
              const isSleep = entry.duration && !isFeeding;

              return (
                <View key={entry.id} style={[styles.historyItem, { backgroundColor: theme.secondary + '30' }]}>
                  <Ionicons
                    name={isFeeding ? 'heart' : isDiaper ? 'layers' : 'moon'}
                    size={16}
                    color={isFeeding ? '#E57373' : isDiaper ? '#AB47BC' : '#5C6BC0'}
                  />
                  <Text style={[styles.historyTime, { color: theme.primary }]}>
                    {formatTimeOfDay(entry.startTime || entry.timestamp)}
                  </Text>
                  <Text style={[styles.historyLabel, { color: theme.text }]} numberOfLines={1}>
                    {isFeeding ? getSessionLabel(entry) : isDiaper ? entry.type : `${Math.floor(entry.duration / 60)} min`}
                    {entry.volumeMl ? ` — ${entry.volumeMl} ml` : ''}
                    {isFeeding && entry.duration ? ` — ${Math.floor(entry.duration / 60)} min` : ''}
                  </Text>
                  <TouchableOpacity onPress={() => deleteEntry(isFeeding ? 'feeding' : isDiaper ? 'diaper' : 'sleep', entry.id)}>
                    <Ionicons name="close-circle" size={18} color={theme.textLight} />
                  </TouchableOpacity>
                </View>
              );
            })}
          {todaySessions.length === 0 && todayDiapers.length === 0 && todaySleep.length === 0 && (
            <Text style={[styles.emptyText, { color: theme.textLight }]}>Aucune entrée aujourd'hui</Text>
          )}
        </View>

      </ScrollView>

      {/* ========== MENU DRAWER ========== */}
      <Modal visible={showMenu} animationType="fade" transparent>
        <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={() => setShowMenu(false)}>
          <View style={[styles.menuDrawer, { backgroundColor: theme.card }]}>
            <View style={styles.menuHeader}>
              <LionMascot size={50} gender={baby.gender} />
              <Text style={[styles.menuTitle, { color: theme.primary }]}>Menu</Text>
            </View>

            {/* Baby selector */}
            {babies.length > 1 && (
              <View style={styles.menuSection}>
                <Text style={[styles.menuSectionTitle, { color: theme.textLight }]}>Mes bébés</Text>
                {babies.map((b) => (
                  <TouchableOpacity
                    key={b.id}
                    style={[styles.menuItem, b.id === activeBabyId && { backgroundColor: theme.primary + '15' }]}
                    onPress={() => { switchBaby(b.id); setShowMenu(false); }}
                  >
                    <Text style={{ fontSize: 18 }}>{b.gender === 'fille' ? '👧' : '👦'}</Text>
                    <Text style={[styles.menuItemText, { color: theme.textDark }]}>{b.name}</Text>
                    {b.id === activeBabyId && <Ionicons name="checkmark" size={18} color={theme.primary} />}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem} onPress={() => setShowMenu(false)}>
                <Ionicons name="person" size={20} color={theme.primary} />
                <Text style={[styles.menuItemText, { color: theme.textDark }]}>Profil bébé</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="star" size={20} color="#FFB300" />
                <Text style={[styles.menuItemText, { color: theme.textDark }]}>Mon abonnement</Text>
                <View style={[styles.planBadge, { backgroundColor: theme.secondary }]}>
                  <Text style={[styles.planBadgeText, { color: theme.primary }]}>Gratuit</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.primary }]}>
                <Ionicons name="rocket" size={18} color="#fff" />
                <Text style={styles.upgradeBtnText}>Passer à Premium</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuSection}>
              <TouchableOpacity style={styles.menuItem} onPress={() => Linking.openURL('mailto:support@allaitmum.app')}>
                <Ionicons name="help-buoy" size={20} color={theme.primary} />
                <Text style={[styles.menuItemText, { color: theme.textDark }]}>SAV / Support</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.closeMenuBtn} onPress={() => setShowMenu(false)}>
              <Ionicons name="close" size={24} color={theme.textLight} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerCenter: { alignItems: 'center', flex: 1 },
  babyName: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  babyAge: { fontSize: 13, marginTop: 2 },
  scrollContent: { padding: 16, paddingBottom: 100 },

  // Dashboard mascot
  mascotContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
    marginLeft: -8,
  },
  dashboardMascot: {
    width: 200,
    height: 80,
    borderRadius: 12,
  },

  // Active banner
  activeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  activeBannerText: { color: '#fff', fontSize: 15, fontWeight: '600', flex: 1, marginLeft: 10 },

  // Section cards
  sectionCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '600' },

  // Tool grid (feeding)
  toolGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  toolBtn: {
    width: '48%',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    gap: 6,
  },
  toolLabel: { fontSize: 13, fontWeight: '600' },
  toolEmoji: { fontSize: 26 },

  // Active session
  activeSession: { alignItems: 'center', paddingVertical: 8 },
  timer: { fontSize: 42, fontWeight: '700' },
  timerSub: { fontSize: 13, marginTop: 4, marginBottom: 12 },
  volumeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  label: { fontSize: 14 },
  volumeInput: { width: 80, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, fontSize: 15, textAlign: 'center' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  actionBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  actionBtnOutline: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5 },
  actionBtnOutlineText: { fontSize: 14, fontWeight: '500' },

  // Sleep buttons
  sleepButtons: { flexDirection: 'row', gap: 12 },
  sleepBtn: { flex: 1, paddingVertical: 20, borderRadius: 16, alignItems: 'center', gap: 4 },
  sleepBtnEmoji: { fontSize: 32 },
  sleepBtnLabel: { fontSize: 16, fontWeight: '700' },
  sleepBtnSub: { fontSize: 12 },
  sleepIconRow: { marginBottom: 8 },
  sleepEmoji: { fontSize: 48 },

  // Diapers
  diaperGrid: { flexDirection: 'row', gap: 10 },
  diaperBtn: { flex: 1, paddingVertical: 18, borderRadius: 14, alignItems: 'center', gap: 6 },
  diaperLabel: { fontSize: 13, fontWeight: '600' },
  diaperEmoji: { fontSize: 28 },

  // Tip card
  tipCard: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  tipTitle: { fontSize: 15, fontWeight: '600' },
  tipText: { fontSize: 14, lineHeight: 20 },
  tipSource: { fontSize: 11, marginTop: 8 },

  // Development card
  devCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  devHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  devTitle: { fontSize: 15, fontWeight: '600' },
  devText: { fontSize: 13, lineHeight: 20 },

  // Summary
  summaryCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  summaryTitle: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center', gap: 4 },
  summaryValue: { fontSize: 18, fontWeight: '700' },
  summaryLabel: { fontSize: 11 },

  // History
  historyCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  historyTitle: { fontSize: 15, fontWeight: '600', marginBottom: 12 },
  historyItem: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, marginBottom: 6 },
  historyTime: { fontSize: 13, fontWeight: '600', width: 50 },
  historyLabel: { flex: 1, fontSize: 13 },
  emptyText: { fontSize: 13, textAlign: 'center', paddingVertical: 12 },

  // Menu drawer
  menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start' },
  menuDrawer: {
    width: '75%',
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  menuTitle: { fontSize: 22, fontWeight: '700' },
  menuSection: { marginBottom: 20 },
  menuSectionTitle: { fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 10 },
  menuItemText: { flex: 1, fontSize: 16, fontWeight: '500' },
  planBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  planBadgeText: { fontSize: 12, fontWeight: '600' },
  upgradeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, marginTop: 8 },
  upgradeBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  closeMenuBtn: { position: 'absolute', top: 50, right: 16 },
});
