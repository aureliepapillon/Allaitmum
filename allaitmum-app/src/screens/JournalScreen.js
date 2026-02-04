import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { postpartumArticles, friendlyPlaces, appointmentLinks, supportLines } from '../data/postpartum';

const moods = [
  { value: 1, emoji: '😢', label: 'Difficile' },
  { value: 2, emoji: '😔', label: 'Bof' },
  { value: 3, emoji: '😐', label: 'Ça va' },
  { value: 4, emoji: '🙂', label: 'Bien' },
  { value: 5, emoji: '😊', label: 'Super' },
];

const getSupportMessage = (mood) => {
  if (mood <= 2) {
    return {
      text: "Les jours difficiles font partie du parcours. Tu n'es pas seule. N'hésite pas à en parler.",
      showHelp: true,
    };
  }
  if (mood === 3) {
    return { text: "Parfois, 'ça va' c'est déjà beaucoup. Tu gères.", showHelp: false };
  }
  return { text: "Profite de ce moment de bien-être. Tu le mérites !", showHelp: false };
};

export default function JournalScreen() {
  const { theme } = useTheme();
  const { moodEntries, setMoodEntries } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = moodEntries.find((e) => e.date === todayStr);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const newEntries = moodEntries.filter((e) => e.date !== todayStr);
    newEntries.push({ date: todayStr, mood, timestamp: new Date().toISOString() });
    setMoodEntries(newEntries);
  };

  const currentMood = selectedMood || todayEntry?.mood;
  const support = currentMood ? getSupportMessage(currentMood) : null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>☕</Text>
          <Text style={[styles.title, { color: theme.primary }]}>Milk'Échange</Text>
        </View>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Ton espace ressources et soutien post-partum
        </Text>

        {/* Quick mood check */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.primary }]}>
            Comment tu te sens aujourd'hui ?
          </Text>
          <View style={styles.moodRow}>
            {moods.map((m) => (
              <TouchableOpacity
                key={m.value}
                style={[
                  styles.moodBtn,
                  {
                    backgroundColor: currentMood === m.value ? theme.primary + '20' : 'transparent',
                    borderColor: currentMood === m.value ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => handleMoodSelect(m.value)}
              >
                <Text style={styles.moodEmoji}>{m.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {support && (
            <View style={[styles.supportBox, { backgroundColor: theme.secondary + '40' }]}>
              <Text style={[styles.supportText, { color: theme.textDark }]}>{support.text}</Text>
              {support.showHelp && (
                <TouchableOpacity
                  style={[styles.helpBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setShowHelpModal(true)}
                >
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.helpBtnText}>Lignes d'écoute</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Articles post-partum */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          📚 Articles post-partum
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {postpartumArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={[styles.articleCard, { backgroundColor: article.color + '20' }]}
              onPress={() => setSelectedArticle(article)}
            >
              <Ionicons name={article.icon} size={28} color={article.color} />
              <Text style={[styles.articleTitle, { color: article.color }]} numberOfLines={2}>
                {article.title}
              </Text>
              <Text style={[styles.articleDesc, { color: theme.text }]} numberOfLines={2}>
                {article.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lieux baby-friendly */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          📍 Lieux baby-friendly
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          {friendlyPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.linkRow}
              onPress={() => Linking.openURL(place.url)}
            >
              <View style={[styles.linkIcon, { backgroundColor: place.color + '20' }]}>
                <Ionicons name={place.icon} size={20} color={place.color} />
              </View>
              <View style={styles.linkContent}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>{place.name}</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]} numberOfLines={1}>
                  {place.description}
                </Text>
              </View>
              <Ionicons name="open-outline" size={18} color={theme.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Prendre RDV */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          📅 Prendre rendez-vous
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          {appointmentLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.linkRow}
              onPress={() => Linking.openURL(link.url)}
            >
              <View style={[styles.linkIcon, { backgroundColor: link.color + '20' }]}>
                <Ionicons name={link.icon} size={20} color={link.color} />
              </View>
              <View style={styles.linkContent}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>{link.title}</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]} numberOfLines={1}>
                  {link.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Urgence */}
        <TouchableOpacity
          style={[styles.emergencyCard, { backgroundColor: '#FFEBEE', borderColor: '#EF5350' }]}
          onPress={() => setShowHelpModal(true)}
        >
          <Ionicons name="heart" size={24} color="#EF5350" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.emergencyTitle, { color: '#C62828' }]}>Besoin de parler ?</Text>
            <Text style={[styles.emergencyDesc, { color: '#E57373' }]}>
              Lignes d'écoute gratuites et anonymes
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#EF5350" />
        </TouchableOpacity>

      </ScrollView>

      {/* Article Modal */}
      <Modal visible={!!selectedArticle} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Ionicons name={selectedArticle?.icon} size={28} color={selectedArticle?.color} />
              <Text style={[styles.modalTitle, { color: theme.primary }]} numberOfLines={2}>
                {selectedArticle?.title}
              </Text>
              <TouchableOpacity onPress={() => setSelectedArticle(null)}>
                <Ionicons name="close" size={28} color={theme.textLight} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalText, { color: theme.text }]}>
                {selectedArticle?.content}
              </Text>
              <Text style={[styles.modalSource, { color: theme.textLight }]}>
                Source : {selectedArticle?.source}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Help Lines Modal */}
      <Modal visible={showHelpModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View style={styles.modalHeader}>
              <Ionicons name="call" size={28} color={theme.primary} />
              <Text style={[styles.modalTitle, { color: theme.primary }]}>Lignes d'écoute</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <Ionicons name="close" size={28} color={theme.textLight} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.helpIntro, { color: theme.text }]}>
                Tu n'es pas seule. Ces lignes sont gratuites, anonymes et là pour t'écouter.
              </Text>
              {supportLines.map((line, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.helpLineCard, { backgroundColor: theme.secondary + '30' }]}
                  onPress={() => Linking.openURL(`tel:${line.number.replace(/\s/g, '')}`)}
                >
                  <Text style={[styles.helpLineName, { color: theme.primary }]}>{line.name}</Text>
                  <Text style={[styles.helpLineNumber, { color: theme.textDark }]}>{line.number}</Text>
                  <Text style={[styles.helpLineDesc, { color: theme.text }]}>{line.description}</Text>
                  <Text style={[styles.helpLineHours, { color: theme.textLight }]}>{line.hours}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerEmoji: { fontSize: 32 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 16, marginTop: 4 },

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
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 14 },

  // Mood
  moodRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  moodBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
  },
  moodEmoji: { fontSize: 24 },
  supportBox: { marginTop: 14, padding: 14, borderRadius: 14 },
  supportText: { fontSize: 14, lineHeight: 20 },
  helpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  helpBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  // Section
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, marginTop: 8 },

  // Articles horizontal
  horizontalScroll: { marginBottom: 16, marginHorizontal: -20, paddingHorizontal: 20 },
  articleCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    gap: 8,
  },
  articleTitle: { fontSize: 14, fontWeight: '600' },
  articleDesc: { fontSize: 12 },

  // Links
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EED9C420',
  },
  linkIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  linkContent: { flex: 1 },
  linkTitle: { fontSize: 15, fontWeight: '600' },
  linkDesc: { fontSize: 12, marginTop: 2 },

  // Emergency
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  emergencyTitle: { fontSize: 16, fontWeight: '700' },
  emergencyDesc: { fontSize: 13, marginTop: 2 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  modalTitle: { flex: 1, fontSize: 20, fontWeight: '700' },
  modalText: { fontSize: 15, lineHeight: 24 },
  modalSource: { fontSize: 12, marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#EED9C4' },

  // Help lines
  helpIntro: { fontSize: 14, lineHeight: 22, marginBottom: 16 },
  helpLineCard: { padding: 16, borderRadius: 14, marginBottom: 12 },
  helpLineName: { fontSize: 16, fontWeight: '700' },
  helpLineNumber: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  helpLineDesc: { fontSize: 13, marginTop: 6 },
  helpLineHours: { fontSize: 12, marginTop: 4 },
});
