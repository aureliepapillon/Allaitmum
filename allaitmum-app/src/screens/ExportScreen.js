import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { PDFExportService } from '../utils/PDFExportService';

const PERIOD_OPTIONS = [
  { id: 'week', label: 'Cette semaine', days: 7 },
  { id: 'month', label: 'Ce mois', days: 30 },
  { id: 'three_months', label: '3 derniers mois', days: 90 },
  { id: 'all', label: 'Tout', days: null },
];

export default function ExportScreen({ onClose }) {
  const { theme } = useTheme();
  const {
    baby,
    feedingMethod,
    feedingSessions,
    sleepSessions,
    diaperEntries,
    growthEntries,
    vaccinesDone,
    medications,
    allergies,
    teeth,
    milestones,
    activeBabyId,
  } = useApp();

  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  // Filter data for current baby
  const filterForBaby = (items) => {
    return items.filter((item) => !item.babyId || item.babyId === activeBabyId);
  };

  // Get date range based on selected period
  const getDateRange = () => {
    const option = PERIOD_OPTIONS.find((o) => o.id === selectedPeriod);
    if (!option || !option.days) return null;

    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - option.days);

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    };
  };

  const handleExport = async () => {
    setIsExporting(true);

    const data = {
      baby,
      feedingMethod,
      feedingSessions: filterForBaby(feedingSessions),
      sleepSessions: filterForBaby(sleepSessions),
      diaperEntries: filterForBaby(diaperEntries),
      growthEntries: filterForBaby(growthEntries),
      vaccinesDone,
      medications: filterForBaby(medications),
      allergies: filterForBaby(allergies),
      teeth: filterForBaby(teeth),
      milestones: filterForBaby(milestones),
      dateRange: getDateRange(),
    };

    const result = await PDFExportService.exportPDF(data);

    setIsExporting(false);

    if (!result.success) {
      Alert.alert('Erreur', result.error || 'Une erreur est survenue lors de l\'export');
    }
  };

  const handlePreview = async () => {
    setIsExporting(true);

    const data = {
      baby,
      feedingMethod,
      feedingSessions: filterForBaby(feedingSessions),
      sleepSessions: filterForBaby(sleepSessions),
      diaperEntries: filterForBaby(diaperEntries),
      growthEntries: filterForBaby(growthEntries),
      vaccinesDone,
      medications: filterForBaby(medications),
      allergies: filterForBaby(allergies),
      teeth: filterForBaby(teeth),
      milestones: filterForBaby(milestones),
      dateRange: getDateRange(),
    };

    const result = await PDFExportService.previewPDF(data);

    setIsExporting(false);

    if (!result.success) {
      Alert.alert('Erreur', result.error || 'Une erreur est survenue');
    }
  };

  // Calculate stats for preview
  const dateRange = getDateRange();
  const filterByDate = (items, dateField = 'startTime') => {
    if (!dateRange) return filterForBaby(items);
    return filterForBaby(items).filter((item) => {
      const itemDate = item[dateField] || item.timestamp || item.date;
      if (!itemDate) return true;
      const date = itemDate.split('T')[0];
      return date >= dateRange.start && date <= dateRange.end;
    });
  };

  const statsFeedings = filterByDate(feedingSessions).length;
  const statsSleep = filterByDate(sleepSessions).length;
  const statsDiapers = filterByDate(diaperEntries, 'timestamp').length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Exporter en PDF</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={[styles.introCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="document-text" size={24} color={theme.primary} />
          <View style={styles.introContent}>
            <Text style={[styles.introTitle, { color: theme.textDark }]}>
              Carnet de {baby.name}
            </Text>
            <Text style={[styles.introText, { color: theme.text }]}>
              Génère un PDF avec toutes les données de suivi pour tes RDV médicaux.
            </Text>
          </View>
        </View>

        {/* Period selection */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Période</Text>

          {PERIOD_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.periodOption,
                { borderColor: theme.border },
                selectedPeriod === option.id && { borderColor: theme.primary, backgroundColor: theme.primary + '10' },
              ]}
              onPress={() => setSelectedPeriod(option.id)}
            >
              <View style={styles.periodRadio}>
                {selectedPeriod === option.id && (
                  <View style={[styles.periodRadioInner, { backgroundColor: theme.primary }]} />
                )}
              </View>
              <Text
                style={[
                  styles.periodLabel,
                  { color: theme.textDark },
                  selectedPeriod === option.id && { fontWeight: '600' },
                ]}
              >
                {option.label}
              </Text>
              {option.days && (
                <Text style={[styles.periodDays, { color: theme.textLight }]}>
                  {option.days} jours
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview stats */}
        <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Aperçu du contenu</Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statItem, { backgroundColor: theme.background }]}>
              <Ionicons name="heart" size={20} color="#E57373" />
              <Text style={[styles.statValue, { color: theme.textDark }]}>{statsFeedings}</Text>
              <Text style={[styles.statLabel, { color: theme.textLight }]}>tétées</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: theme.background }]}>
              <Ionicons name="moon" size={20} color="#5C6BC0" />
              <Text style={[styles.statValue, { color: theme.textDark }]}>{statsSleep}</Text>
              <Text style={[styles.statLabel, { color: theme.textLight }]}>siestes</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: theme.background }]}>
              <Ionicons name="layers" size={20} color="#AB47BC" />
              <Text style={[styles.statValue, { color: theme.textDark }]}>{statsDiapers}</Text>
              <Text style={[styles.statLabel, { color: theme.textLight }]}>couches</Text>
            </View>
          </View>

          <View style={styles.contentList}>
            <View style={styles.contentItem}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={[styles.contentText, { color: theme.text }]}>Informations générales</Text>
            </View>
            <View style={styles.contentItem}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={[styles.contentText, { color: theme.text }]}>Résumé des activités</Text>
            </View>
            {filterForBaby(allergies).length > 0 && (
              <View style={styles.contentItem}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={[styles.contentText, { color: theme.text }]}>
                  Allergies ({filterForBaby(allergies).length})
                </Text>
              </View>
            )}
            {filterForBaby(medications).filter((m) => m.active).length > 0 && (
              <View style={styles.contentItem}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={[styles.contentText, { color: theme.text }]}>
                  Médicaments en cours ({filterForBaby(medications).filter((m) => m.active).length})
                </Text>
              </View>
            )}
            {filterForBaby(growthEntries).length > 0 && (
              <View style={styles.contentItem}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={[styles.contentText, { color: theme.text }]}>
                  Courbe de croissance ({filterForBaby(growthEntries).length} mesures)
                </Text>
              </View>
            )}
            {vaccinesDone.length > 0 && (
              <View style={styles.contentItem}>
                <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                <Text style={[styles.contentText, { color: theme.text }]}>
                  Vaccins ({vaccinesDone.length})
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.previewBtn, { borderColor: theme.primary }]}
            onPress={handlePreview}
            disabled={isExporting}
          >
            <Ionicons name="eye-outline" size={20} color={theme.primary} />
            <Text style={[styles.previewBtnText, { color: theme.primary }]}>Aperçu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.exportBtn, { backgroundColor: theme.primary }]}
            onPress={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="share-outline" size={20} color="#fff" />
                <Text style={styles.exportBtnText}>Exporter et partager</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.secondary + '30' }]}>
          <Ionicons name="information-circle" size={18} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.text }]}>
            Le PDF généré peut être envoyé par email, message ou enregistré dans tes fichiers.
          </Text>
        </View>
      </ScrollView>
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

  scrollContent: { padding: 16, paddingBottom: 40 },

  // Intro
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  introContent: { flex: 1 },
  introTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  introText: { fontSize: 13, lineHeight: 18 },

  // Section
  sectionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 14 },

  // Period options
  periodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  periodRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  periodRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  periodLabel: { flex: 1, fontSize: 15 },
  periodDays: { fontSize: 12 },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 4,
  },
  statValue: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 11 },

  // Content list
  contentList: { gap: 8 },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contentText: { fontSize: 14 },

  // Buttons
  buttonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  previewBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
  },
  previewBtnText: { fontSize: 15, fontWeight: '600' },
  exportBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  exportBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },

  // Info
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
  },
  infoText: { flex: 1, fontSize: 12, lineHeight: 17 },
});
