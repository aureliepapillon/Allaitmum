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
import { parseBirthDate } from '../utils/helpers';

const { width } = Dimensions.get('window');
const headerImage = require('../../assets/Motricite.png');

const MILESTONES = [
  // 0-3 mois
  { id: 'head_control', label: 'Tient sa tête', emoji: '🙂', category: '0-3 mois', ageRange: '1-3 mois' },
  { id: 'first_smile', label: 'Premier sourire', emoji: '😊', category: '0-3 mois', ageRange: '1-2 mois' },
  { id: 'follows_eyes', label: 'Suit des yeux', emoji: '👀', category: '0-3 mois', ageRange: '1-2 mois' },
  { id: 'coos', label: 'Premiers gazouillis', emoji: '🗣️', category: '0-3 mois', ageRange: '2-3 mois' },

  // 3-6 mois
  { id: 'laughs', label: 'Premiers éclats de rire', emoji: '😂', category: '3-6 mois', ageRange: '3-4 mois' },
  { id: 'grabs_objects', label: 'Attrape les objets', emoji: '✋', category: '3-6 mois', ageRange: '3-4 mois' },
  { id: 'rolls_tummy_back', label: 'Se retourne ventre → dos', emoji: '🔄', category: '3-6 mois', ageRange: '4-5 mois' },
  { id: 'rolls_back_tummy', label: 'Se retourne dos → ventre', emoji: '🔁', category: '3-6 mois', ageRange: '5-6 mois' },

  // 6-9 mois
  { id: 'sits_supported', label: 'S\'assoit avec appui', emoji: '🪑', category: '6-9 mois', ageRange: '5-6 mois' },
  { id: 'sits_alone', label: 'S\'assoit seul(e)', emoji: '🧘', category: '6-9 mois', ageRange: '6-8 mois' },
  { id: 'babbles', label: 'Babille (ba-ba, ma-ma)', emoji: '👶', category: '6-9 mois', ageRange: '6-8 mois' },
  { id: 'stranger_anxiety', label: 'Peur des inconnus', emoji: '😰', category: '6-9 mois', ageRange: '7-9 mois' },

  // 9-12 mois
  { id: 'crawls', label: 'Rampe / 4 pattes', emoji: '🐛', category: '9-12 mois', ageRange: '7-10 mois' },
  { id: 'pulls_to_stand', label: 'Se met debout (appui)', emoji: '🧍', category: '9-12 mois', ageRange: '8-10 mois' },
  { id: 'cruises', label: 'Marche le long des meubles', emoji: '🚶', category: '9-12 mois', ageRange: '9-11 mois' },
  { id: 'pincer_grasp', label: 'Pince pouce-index', emoji: '🤏', category: '9-12 mois', ageRange: '9-10 mois' },
  { id: 'waves_bye', label: 'Fait "au revoir"', emoji: '👋', category: '9-12 mois', ageRange: '9-12 mois' },
  { id: 'first_word', label: 'Premier mot', emoji: '💬', category: '9-12 mois', ageRange: '10-12 mois' },

  // 12-18 mois
  { id: 'first_steps', label: 'Premiers pas', emoji: '🚶‍♂️', category: '12-18 mois', ageRange: '10-14 mois' },
  { id: 'walks_alone', label: 'Marche seul(e)', emoji: '🏃', category: '12-18 mois', ageRange: '12-15 mois' },
  { id: 'drinks_cup', label: 'Boit au verre', emoji: '🥤', category: '12-18 mois', ageRange: '12-15 mois' },
  { id: 'stacks_blocks', label: 'Empile des cubes', emoji: '🧱', category: '12-18 mois', ageRange: '12-18 mois' },
  { id: 'points', label: 'Montre du doigt', emoji: '👆', category: '12-18 mois', ageRange: '12-14 mois' },

  // 18-24 mois
  { id: 'runs', label: 'Court', emoji: '🏃‍♀️', category: '18-24 mois', ageRange: '16-20 mois' },
  { id: 'climbs', label: 'Monte les escaliers', emoji: '🪜', category: '18-24 mois', ageRange: '18-24 mois' },
  { id: 'kicks_ball', label: 'Tape dans un ballon', emoji: '⚽', category: '18-24 mois', ageRange: '18-24 mois' },
  { id: 'two_word_phrases', label: 'Phrases de 2 mots', emoji: '📝', category: '18-24 mois', ageRange: '18-24 mois' },
  { id: 'spoon_alone', label: 'Mange seul(e) à la cuillère', emoji: '🥄', category: '18-24 mois', ageRange: '18-24 mois' },
];

const CATEGORIES = ['0-3 mois', '3-6 mois', '6-9 mois', '9-12 mois', '12-18 mois', '18-24 mois'];

export default function EtapesMotricesScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, activeBabyId, milestones, toggleMilestone } = useApp();

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [dateInput, setDateInput] = useState('');

  const birthDate = parseBirthDate(baby.birthDate);

  // Get achieved milestones for this baby
  const achievedMilestones = milestones.filter((m) => m.babyId === activeBabyId);
  const achievedIds = achievedMilestones.map((m) => m.milestoneId);

  // Calculate baby age in months
  const getBabyAgeMonths = () => {
    if (!birthDate) return 0;
    const now = new Date();
    const months = (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth());
    return Math.max(0, months);
  };

  const babyAgeMonths = getBabyAgeMonths();

  // Determine current category based on age
  const getCurrentCategory = () => {
    if (babyAgeMonths < 3) return '0-3 mois';
    if (babyAgeMonths < 6) return '3-6 mois';
    if (babyAgeMonths < 9) return '6-9 mois';
    if (babyAgeMonths < 12) return '9-12 mois';
    if (babyAgeMonths < 18) return '12-18 mois';
    return '18-24 mois';
  };

  const currentCategory = getCurrentCategory();

  const handleMilestonePress = (milestone) => {
    if (achievedIds.includes(milestone.id)) {
      // Already achieved, toggle off
      toggleMilestone(milestone.id);
    } else {
      // Show date picker
      setSelectedMilestone(milestone);
      setDateInput('');
      setShowDateModal(true);
    }
  };

  const handleConfirmDate = () => {
    if (selectedMilestone) {
      let date = null;
      if (dateInput) {
        const [day, month, year] = dateInput.split('/');
        if (day && month && year) {
          date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
      }
      toggleMilestone(selectedMilestone.id, date);
    }
    setShowDateModal(false);
    setSelectedMilestone(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Aujourd'hui";
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getMilestoneDate = (milestoneId) => {
    const achieved = achievedMilestones.find((m) => m.milestoneId === milestoneId);
    return achieved ? formatDate(achieved.date) : null;
  };

  // Count achieved per category
  const countByCategory = (category) => {
    const categoryMilestones = MILESTONES.filter((m) => m.category === category);
    const achieved = categoryMilestones.filter((m) => achievedIds.includes(m.id));
    return { achieved: achieved.length, total: categoryMilestones.length };
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Étapes motrices</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Header image */}
      <View style={[styles.imageCard, { backgroundColor: theme.card }]}>
        <Image source={headerImage} style={styles.headerImage} resizeMode="contain" />
      </View>

      {/* Progress summary */}
      <View style={[styles.progressCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.progressTitle, { color: theme.textDark }]}>
          Progression de {baby.name}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${(achievedIds.length / MILESTONES.length) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.textLight }]}>
          {achievedIds.length} / {MILESTONES.length} étapes franchies
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {CATEGORIES.map((category) => {
          const categoryMilestones = MILESTONES.filter((m) => m.category === category);
          const counts = countByCategory(category);
          const isCurrentCategory = category === currentCategory;

          return (
            <View key={category} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Text
                  style={[
                    styles.categoryTitle,
                    { color: isCurrentCategory ? theme.primary : theme.textDark },
                  ]}
                >
                  {category}
                  {isCurrentCategory && ' ← maintenant'}
                </Text>
                <Text style={[styles.categoryCount, { color: theme.textLight }]}>
                  {counts.achieved}/{counts.total}
                </Text>
              </View>

              <View style={[styles.milestonesGrid, { backgroundColor: theme.card }]}>
                {categoryMilestones.map((milestone) => {
                  const isAchieved = achievedIds.includes(milestone.id);
                  const date = getMilestoneDate(milestone.id);

                  return (
                    <TouchableOpacity
                      key={milestone.id}
                      style={[
                        styles.milestoneCard,
                        isAchieved && { backgroundColor: theme.primary + '15' },
                      ]}
                      onPress={() => handleMilestonePress(milestone)}
                    >
                      <View style={styles.milestoneTop}>
                        <Text style={styles.milestoneEmoji}>{milestone.emoji}</Text>
                        {isAchieved && (
                          <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.milestoneLabel,
                          { color: isAchieved ? theme.primary : theme.textDark },
                        ]}
                        numberOfLines={2}
                      >
                        {milestone.label}
                      </Text>
                      <Text style={[styles.milestoneAge, { color: theme.textLight }]}>
                        {isAchieved ? date : milestone.ageRange}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Info card */}
        <View style={[styles.infoCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="information-circle" size={20} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.textDark }]}>
            Chaque bébé évolue à son rythme ! Les âges indiqués sont des moyennes.
            En cas de doute, parlez-en à votre pédiatre.
          </Text>
        </View>
      </ScrollView>

      {/* Date Modal */}
      <Modal visible={showDateModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.primary }]}>
              {selectedMilestone?.emoji} {selectedMilestone?.label}
            </Text>
            <Text style={[styles.modalSubtitle, { color: theme.textLight }]}>
              Quand est-ce arrivé ?
            </Text>

            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={dateInput}
              onChangeText={setDateInput}
              placeholder="JJ/MM/AAAA (ou vide = aujourd'hui)"
              placeholderTextColor={theme.textLight}
              keyboardType="numbers-and-punctuation"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.background }]}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                onPress={handleConfirmDate}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>Valider</Text>
              </TouchableOpacity>
            </View>
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
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  imageCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  headerImage: {
    width: width - 64,
    height: 100,
  },

  progressCard: {
    margin: 16,
    marginBottom: 0,
    borderRadius: 16,
    padding: 16,
  },
  progressTitle: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 13, marginTop: 8, textAlign: 'center' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  categorySection: { marginBottom: 20 },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: { fontSize: 16, fontWeight: '600' },
  categoryCount: { fontSize: 13 },

  milestonesGrid: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  milestoneCard: {
    width: '31%',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  milestoneTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  milestoneEmoji: { fontSize: 24 },
  milestoneLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  milestoneAge: { fontSize: 9, textAlign: 'center' },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: { flex: 1, fontSize: 13, lineHeight: 18 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', textAlign: 'center' },
  modalSubtitle: { fontSize: 14, textAlign: 'center', marginTop: 8, marginBottom: 20 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBtnText: { fontSize: 16, fontWeight: '600' },
});
