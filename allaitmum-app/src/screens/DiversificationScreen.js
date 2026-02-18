import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import {
  FOOD_CATEGORIES,
  FOODS,
  DANGER_FOODS,
  DIVERSIFICATION_STEPS,
  CHOKING_PREVENTION,
  SAFETY_RULES,
  getCurrentStep,
  getForbiddenFoods,
} from '../data/diversification';

export default function DiversificationScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby } = useApp();

  const [activeTab, setActiveTab] = useState('guide'); // 'guide', 'aliments', 'interdits', 'decoupe'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Calculate baby age in months
  const babyAgeMonths = useMemo(() => {
    if (!baby.birthDate) return 6;
    const birth = new Date(baby.birthDate);
    const now = new Date();
    return Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 30.44));
  }, [baby.birthDate]);

  const currentStep = getCurrentStep(babyAgeMonths);
  const forbiddenFoods = getForbiddenFoods(babyAgeMonths);

  // Filter foods based on category and search
  const filteredFoods = useMemo(() => {
    let result = FOODS;

    if (selectedCategory) {
      result = result.filter(f => f.category === selectedCategory);
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase().trim();
      result = result.filter(f =>
        f.name.toLowerCase().includes(search) ||
        f.note.toLowerCase().includes(search)
      );
    }

    // Sort: available first, then by fromMonths
    return result.sort((a, b) => {
      const aAvailable = a.fromMonths <= babyAgeMonths;
      const bAvailable = b.fromMonths <= babyAgeMonths;
      if (aAvailable && !bAvailable) return -1;
      if (!aAvailable && bAvailable) return 1;
      return a.fromMonths - b.fromMonths;
    });
  }, [selectedCategory, searchText, babyAgeMonths]);

  const getStatusColor = (food) => {
    if (food.fromMonths > babyAgeMonths) return '#9E9E9E';
    if (food.status === 'interdit') return '#F44336';
    if (food.status === 'prudence') return '#FF9800';
    return '#4CAF50';
  };

  const getStatusLabel = (food) => {
    if (food.fromMonths > babyAgeMonths) return `À partir de ${food.fromMonths} mois`;
    if (food.status === 'interdit') return 'Interdit';
    if (food.status === 'prudence') return 'Avec prudence';
    return 'Autorisé';
  };

  const getStatusIcon = (food) => {
    if (food.fromMonths > babyAgeMonths) return 'time-outline';
    if (food.status === 'interdit') return 'close-circle';
    if (food.status === 'prudence') return 'alert-circle';
    return 'checkmark-circle';
  };

  const renderGuideTab = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Current step highlight */}
      <View style={[styles.currentStepCard, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]}>
        <Text style={[styles.currentStepAge, { color: theme.primary }]}>
          {baby.name || 'Bébé'} — {babyAgeMonths} mois
        </Text>
        <Text style={[styles.currentStepTitle, { color: theme.primary }]}>
          {currentStep.title}
        </Text>
        <Text style={[styles.currentStepDesc, { color: theme.textDark }]}>
          {currentStep.description}
        </Text>

        <View style={styles.tipsList}>
          {currentStep.tips.map((tip, i) => (
            <View key={i} style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={theme.primary} />
              <Text style={[styles.tipText, { color: theme.textDark }]}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Danger foods for current age */}
      {forbiddenFoods.length > 0 && (
        <View style={[styles.dangerCard, { backgroundColor: '#FFEBEE' }]}>
          <View style={styles.dangerHeader}>
            <Ionicons name="warning" size={22} color="#F44336" />
            <Text style={styles.dangerTitle}>À éviter avant cet âge</Text>
          </View>
          {forbiddenFoods.map((food, i) => (
            <View key={i} style={styles.dangerItem}>
              <Ionicons name="close-circle" size={16} color="#F44336" />
              <View style={styles.dangerContent}>
                <Text style={styles.dangerFoodName}>
                  {food.name} <Text style={styles.dangerAge}>(avant {food.beforeMonths} mois)</Text>
                </Text>
                <Text style={styles.dangerReason}>{food.reason}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* All steps timeline */}
      <Text style={[styles.timelineTitle, { color: theme.primary }]}>
        Les étapes de la diversification
      </Text>
      {DIVERSIFICATION_STEPS.map((step, i) => {
        const isActive = babyAgeMonths >= step.fromMonths && babyAgeMonths < step.toMonths;
        const isPast = babyAgeMonths >= step.toMonths;

        return (
          <View key={i} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={[
                styles.timelineDot,
                { backgroundColor: isActive ? theme.primary : isPast ? '#4CAF50' : '#E0E0E0' },
              ]}>
                {isPast && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              {i < DIVERSIFICATION_STEPS.length - 1 && (
                <View style={[styles.timelineConnector, { backgroundColor: isPast ? '#4CAF50' : '#E0E0E0' }]} />
              )}
            </View>
            <View style={[
              styles.timelineCard,
              { backgroundColor: theme.card },
              isActive && { borderColor: theme.primary, borderWidth: 2 },
            ]}>
              <Text style={[styles.timelineAge, { color: isActive ? theme.primary : theme.textLight }]}>
                {step.ageLabel}
              </Text>
              <Text style={[styles.timelineStepTitle, { color: theme.textDark }]}>
                {step.title}
              </Text>
              <Text style={[styles.timelineDesc, { color: theme.text }]}>
                {step.description}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );

  const renderAlimentsTab = () => (
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      <View style={[styles.searchBar, { backgroundColor: theme.card }]}>
        <Ionicons name="search" size={20} color={theme.textLight} />
        <TextInput
          style={[styles.searchInput, { color: theme.textDark }]}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Rechercher un aliment..."
          placeholderTextColor={theme.textLight}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color={theme.textLight} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={styles.categoriesContent}>
        <TouchableOpacity
          style={[styles.categoryPill, !selectedCategory && { backgroundColor: theme.primary }]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryPillText, !selectedCategory && { color: '#fff' }]}>Tous</Text>
        </TouchableOpacity>
        {FOOD_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryPill,
              { borderColor: cat.color },
              selectedCategory === cat.id && { backgroundColor: cat.color },
            ]}
            onPress={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
          >
            <Ionicons name={cat.icon} size={14} color={selectedCategory === cat.id ? '#fff' : cat.color} />
            <Text style={[
              styles.categoryPillText,
              { color: selectedCategory === cat.id ? '#fff' : cat.color },
            ]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Food list */}
      <ScrollView contentContainerStyle={styles.foodList}>
        {filteredFoods.map((food, i) => {
          const available = food.fromMonths <= babyAgeMonths;
          return (
            <View
              key={i}
              style={[
                styles.foodCard,
                { backgroundColor: theme.card },
                !available && { opacity: 0.5 },
              ]}
            >
              <View style={[styles.foodStatus, { backgroundColor: getStatusColor(food) }]}>
                <Ionicons name={getStatusIcon(food)} size={18} color="#fff" />
              </View>
              <View style={styles.foodInfo}>
                <Text style={[styles.foodName, { color: theme.textDark }]}>{food.name}</Text>
                <Text style={[styles.foodMeta, { color: getStatusColor(food) }]}>
                  {getStatusLabel(food)} {available && food.texture ? `· ${food.texture}` : ''}
                </Text>
                <Text style={[styles.foodNote, { color: theme.textLight }]}>{food.note}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderDecoupeTab = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Safety rules */}
      <View style={[styles.safetyCard, { backgroundColor: '#FFF3E0', borderColor: '#FF9800' }]}>
        <View style={styles.safetyHeader}>
          <Ionicons name="shield-checkmark" size={24} color="#FF9800" />
          <Text style={styles.safetyTitle}>Règles d'or anti-étouffement</Text>
        </View>
        {SAFETY_RULES.map((rule, i) => (
          <View key={i} style={styles.safetyRule}>
            <Text style={styles.safetyNumber}>{i + 1}</Text>
            <Text style={styles.safetyRuleText}>{rule}</Text>
          </View>
        ))}
      </View>

      {/* Choking prevention tips */}
      <Text style={[styles.chokingTitle, { color: theme.primary }]}>
        Comment bien couper les aliments
      </Text>

      {CHOKING_PREVENTION.map((item, i) => (
        <View key={i} style={[styles.chokingCard, { backgroundColor: theme.card }]}>
          <View style={[styles.chokingIconBox, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          <View style={styles.chokingContent}>
            <Text style={[styles.chokingFood, { color: theme.textDark }]}>{item.food}</Text>
            <View style={[styles.chokingDangerBadge, { backgroundColor: item.color + '20' }]}>
              <Text style={[styles.chokingDangerText, { color: item.color }]}>{item.danger}</Text>
            </View>
            <View style={[styles.chokingHowTo, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="cut" size={16} color="#4CAF50" />
              <Text style={styles.chokingHowToText}>{item.howToCut}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Emergency info */}
      <View style={[styles.emergencyCard, { backgroundColor: '#FFEBEE', borderColor: '#F44336' }]}>
        <Ionicons name="call" size={24} color="#F44336" />
        <View style={styles.emergencyContent}>
          <Text style={styles.emergencyTitle}>En cas d'étouffement</Text>
          <Text style={styles.emergencyText}>
            Appeler le 15 (SAMU) ou le 112 immédiatement.{'\n\n'}
            Moins de 1 an : 5 claques dans le dos (entre les omoplates) puis 5 compressions thoraciques.{'\n\n'}
            Plus de 1 an : claques dans le dos puis manœuvre de Heimlich (compressions abdominales).{'\n\n'}
            Ne JAMAIS mettre les doigts dans la bouche à l'aveugle.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderInterditsTab = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.warningBanner, { backgroundColor: '#FFF3E0' }]}>
        <Ionicons name="warning" size={24} color="#FF9800" />
        <Text style={styles.warningText}>
          Ces aliments sont à éviter ou interdits pour {baby.name || 'bébé'} ({babyAgeMonths} mois)
        </Text>
      </View>

      {DANGER_FOODS
        .filter(f => babyAgeMonths < f.beforeMonths)
        .sort((a, b) => a.beforeMonths - b.beforeMonths)
        .map((food, i) => (
          <View key={i} style={[styles.dangerFullCard, { backgroundColor: theme.card }]}>
            <View style={[styles.dangerIcon, { backgroundColor: '#F44336' }]}>
              <Ionicons name="close" size={20} color="#fff" />
            </View>
            <View style={styles.dangerFullContent}>
              <Text style={[styles.dangerFullName, { color: theme.textDark }]}>{food.name}</Text>
              <View style={[styles.dangerAgeBadge, { backgroundColor: '#FFEBEE' }]}>
                <Text style={styles.dangerAgeBadgeText}>Interdit avant {food.beforeMonths} mois</Text>
              </View>
              <Text style={[styles.dangerFullReason, { color: theme.text }]}>{food.reason}</Text>
            </View>
          </View>
        ))}

      {/* Also show 'prudence' foods */}
      <Text style={[styles.prudenceTitle, { color: '#FF9800' }]}>
        Avec prudence
      </Text>
      {FOODS
        .filter(f => f.status === 'prudence' && f.fromMonths <= babyAgeMonths)
        .map((food, i) => (
          <View key={i} style={[styles.prudenceCard, { backgroundColor: theme.card }]}>
            <View style={[styles.dangerIcon, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="alert" size={20} color="#fff" />
            </View>
            <View style={styles.dangerFullContent}>
              <Text style={[styles.dangerFullName, { color: theme.textDark }]}>{food.name}</Text>
              <Text style={[styles.dangerFullReason, { color: theme.text }]}>{food.note}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      {/* Header */}
      {onClose && (
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primary }]}>Diversification</Text>
          <View style={{ width: 40 }} />
        </View>
      )}

      {/* Tab bar */}
      <View style={[styles.tabBar, { backgroundColor: theme.card }]}>
        {[
          { id: 'guide', label: 'Guide', icon: 'book' },
          { id: 'aliments', label: 'Aliments', icon: 'nutrition' },
          { id: 'decoupe', label: 'Découpe', icon: 'cut' },
          { id: 'interdits', label: 'Interdits', icon: 'warning' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && { borderBottomColor: theme.primary, borderBottomWidth: 3 }]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.id ? theme.primary : theme.textLight}
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === tab.id ? theme.primary : theme.textLight },
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'guide' && renderGuideTab()}
      {activeTab === 'aliments' && renderAlimentsTab()}
      {activeTab === 'decoupe' && renderDecoupeTab()}
      {activeTab === 'interdits' && renderInterditsTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabText: { fontSize: 13, fontWeight: '600' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  // Current step
  currentStepCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  currentStepAge: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  currentStepTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  currentStepDesc: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  tipsList: { gap: 8 },
  tipItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  tipText: { fontSize: 13, flex: 1, lineHeight: 18 },

  // Danger card
  dangerCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dangerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  dangerTitle: { fontSize: 16, fontWeight: '700', color: '#F44336' },
  dangerItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingVertical: 6 },
  dangerContent: { flex: 1 },
  dangerFoodName: { fontSize: 14, fontWeight: '600', color: '#333' },
  dangerAge: { fontSize: 12, fontWeight: '400', color: '#999' },
  dangerReason: { fontSize: 12, color: '#666', marginTop: 2 },

  // Timeline
  timelineTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  timelineItem: { flexDirection: 'row', marginBottom: 12 },
  timelineLine: { width: 30, alignItems: 'center' },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineConnector: { width: 2, flex: 1, marginTop: 4 },
  timelineCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    marginLeft: 8,
  },
  timelineAge: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  timelineStepTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  timelineDesc: { fontSize: 13, lineHeight: 18 },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchInput: { flex: 1, fontSize: 15 },

  // Categories
  categoriesScroll: { maxHeight: 50 },
  categoriesContent: { paddingHorizontal: 16, gap: 8 },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  categoryPillText: { fontSize: 12, fontWeight: '600', color: '#666' },

  // Food list
  foodList: { padding: 16, paddingTop: 12, gap: 8 },
  foodCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  foodStatus: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
    padding: 12,
  },
  foodName: { fontSize: 15, fontWeight: '600' },
  foodMeta: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  foodNote: { fontSize: 12, marginTop: 4, lineHeight: 16 },

  // Warning banner
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  warningText: { flex: 1, fontSize: 13, color: '#E65100', lineHeight: 18 },

  // Danger full cards
  dangerFullCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  dangerIcon: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dangerFullContent: {
    flex: 1,
    padding: 12,
  },
  dangerFullName: { fontSize: 15, fontWeight: '600' },
  dangerAgeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  dangerAgeBadgeText: { fontSize: 11, fontWeight: '600', color: '#F44336' },
  dangerFullReason: { fontSize: 12, marginTop: 6, lineHeight: 16 },

  // Prudence section
  prudenceTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 12 },
  prudenceCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },

  // Découpe / Choking prevention
  safetyCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  safetyTitle: { fontSize: 17, fontWeight: '700', color: '#E65100' },
  safetyRule: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 6,
  },
  safetyNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF9800',
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
    overflow: 'hidden',
  },
  safetyRuleText: { flex: 1, fontSize: 13, lineHeight: 18, color: '#333' },

  chokingTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  chokingCard: {
    flexDirection: 'row',
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    gap: 12,
  },
  chokingIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chokingContent: { flex: 1 },
  chokingFood: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  chokingDangerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  chokingDangerText: { fontSize: 11, fontWeight: '600' },
  chokingHowTo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: 10,
  },
  chokingHowToText: { flex: 1, fontSize: 13, lineHeight: 18, color: '#2E7D32' },

  emergencyCard: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 2,
  },
  emergencyContent: { flex: 1 },
  emergencyTitle: { fontSize: 16, fontWeight: '700', color: '#F44336', marginBottom: 8 },
  emergencyText: { fontSize: 13, lineHeight: 20, color: '#333' },
});
