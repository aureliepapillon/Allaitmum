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
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { parseBirthDate } from '../utils/helpers';

const { width } = Dimensions.get('window');

// Image de la courbe
const courbeImage = require('../../assets/Courbe-taille.png');

export default function CroissanceScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, activeBabyId, growthEntries, setGrowthEntries } = useApp();

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [entryWeight, setEntryWeight] = useState('');
  const [entryHeight, setEntryHeight] = useState('');
  const [entryDate, setEntryDate] = useState('');

  // Filter entries for current baby and sort by date
  const babyEntries = growthEntries
    .filter((e) => e.babyId === activeBabyId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Get birth data
  const birthDate = parseBirthDate(baby.birthDate);
  const birthWeight = baby.birthWeight ? parseFloat(baby.birthWeight) : null;
  const birthHeight = baby.birthHeight ? parseFloat(baby.birthHeight) : null;

  // Build data with birth values included
  const allData = [];
  if (birthDate && (birthWeight || birthHeight)) {
    allData.push({
      id: 'birth',
      date: birthDate.toISOString().split('T')[0],
      weight: birthWeight,
      height: birthHeight,
      isBirth: true,
    });
  }
  babyEntries.forEach((e) => allData.push(e));

  // Calculate age in weeks/months for each entry
  const getAgeLabel = (dateStr) => {
    if (!birthDate) return '';
    const entryDate = new Date(dateStr);
    const days = Math.floor((entryDate - birthDate) / (1000 * 60 * 60 * 24));
    if (days < 0) return '';
    if (days === 0) return 'Naissance';
    if (days < 30) return `${days}j`;
    const weeks = Math.floor(days / 7);
    if (weeks < 12) return `${weeks} sem`;
    const months = Math.floor(days / 30);
    return `${months} mois`;
  };

  // Calculate statistics
  const latestEntry = allData.length > 0 ? allData[allData.length - 1] : null;
  const weightGain = latestEntry && birthWeight ? (latestEntry.weight - birthWeight).toFixed(1) : null;
  const heightGain = latestEntry && birthHeight ? (latestEntry.height - birthHeight).toFixed(1) : null;

  const handleAddEntry = () => {
    if (!entryWeight && !entryHeight) {
      Alert.alert('Erreur', 'Veuillez entrer au moins le poids ou la taille');
      return;
    }

    const weight = entryWeight ? parseFloat(entryWeight.replace(',', '.')) : null;
    const height = entryHeight ? parseFloat(entryHeight.replace(',', '.')) : null;

    if (entryWeight && (isNaN(weight) || weight <= 0 || weight > 30)) {
      Alert.alert('Erreur', 'Poids invalide (doit être entre 0 et 30 kg)');
      return;
    }
    if (entryHeight && (isNaN(height) || height <= 0 || height > 150)) {
      Alert.alert('Erreur', 'Taille invalide (doit être entre 0 et 150 cm)');
      return;
    }

    let date = new Date().toISOString().split('T')[0];
    if (entryDate) {
      const [day, month, year] = entryDate.split('/');
      if (day && month && year) {
        date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }

    const entry = {
      id: Date.now(),
      babyId: activeBabyId,
      date,
      weight,
      height,
      createdAt: new Date().toISOString(),
    };

    setGrowthEntries((prev) => [...prev, entry]);
    setEntryWeight('');
    setEntryHeight('');
    setEntryDate('');
    setShowAddEntry(false);
  };

  const handleDeleteEntry = (entry) => {
    if (entry.isBirth) {
      Alert.alert('Info', 'Les données de naissance ne peuvent pas être supprimées ici. Modifiez le profil du bébé.');
      return;
    }
    Alert.alert(
      'Supprimer',
      'Supprimer cette mesure ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => setGrowthEntries((prev) => prev.filter((e) => e.id !== entry.id)),
        },
      ]
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Simple chart component
  const SimpleChart = ({ data, dataKey, color, unit, label }) => {
    const values = data.filter((d) => d[dataKey]).map((d) => d[dataKey]);
    if (values.length < 2) return null;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const chartWidth = width - 80;
    const chartHeight = 120;

    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.chartLabel, { color: theme.textDark }]}>{label}</Text>
        <View style={[styles.chart, { backgroundColor: theme.card }]}>
          <View style={styles.chartInner}>
            {/* Y axis labels */}
            <View style={styles.yAxis}>
              <Text style={[styles.axisLabel, { color: theme.textLight }]}>{max.toFixed(1)}</Text>
              <Text style={[styles.axisLabel, { color: theme.textLight }]}>{min.toFixed(1)}</Text>
            </View>
            {/* Chart area */}
            <View style={[styles.chartArea, { width: chartWidth, height: chartHeight }]}>
              {/* Grid lines */}
              <View style={[styles.gridLine, { top: 0 }]} />
              <View style={[styles.gridLine, { top: chartHeight / 2 }]} />
              <View style={[styles.gridLine, { top: chartHeight }]} />

              {/* Data points and lines */}
              {data.filter((d) => d[dataKey]).map((point, index, arr) => {
                const x = (index / (arr.length - 1)) * (chartWidth - 20) + 10;
                const y = chartHeight - ((point[dataKey] - min) / range) * (chartHeight - 20) - 10;

                return (
                  <React.Fragment key={point.id}>
                    {/* Line to next point */}
                    {index < arr.length - 1 && arr[index + 1][dataKey] && (
                      <View
                        style={[
                          styles.chartLine,
                          {
                            left: x,
                            top: y,
                            width: Math.sqrt(
                              Math.pow((chartWidth - 20) / (arr.length - 1), 2) +
                              Math.pow(((arr[index + 1][dataKey] - point[dataKey]) / range) * (chartHeight - 20), 2)
                            ),
                            backgroundColor: color,
                            transform: [
                              {
                                rotate: `${Math.atan2(
                                  -((arr[index + 1][dataKey] - point[dataKey]) / range) * (chartHeight - 20),
                                  (chartWidth - 20) / (arr.length - 1)
                                )}rad`,
                              },
                            ],
                          },
                        ]}
                      />
                    )}
                    {/* Point */}
                    <View
                      style={[
                        styles.chartPoint,
                        {
                          left: x - 5,
                          top: y - 5,
                          backgroundColor: color,
                        },
                      ]}
                    />
                  </React.Fragment>
                );
              })}
            </View>
          </View>
          {/* X axis labels */}
          <View style={styles.xAxis}>
            {data.filter((d) => d[dataKey]).map((point, index, arr) => (
              <Text
                key={point.id}
                style={[
                  styles.xAxisLabel,
                  { color: theme.textLight },
                  index === 0 && { textAlign: 'left' },
                  index === arr.length - 1 && { textAlign: 'right' },
                ]}
              >
                {getAgeLabel(point.date)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Croissance</Text>
        <TouchableOpacity onPress={() => setShowAddEntry(true)} style={styles.addHeaderBtn}>
          <Ionicons name="add" size={24} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header image */}
        <View style={[styles.imageCard, { backgroundColor: theme.card }]}>
          <Image source={courbeImage} style={styles.headerImage} resizeMode="contain" />
        </View>

        {/* Stats cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <Text style={{ fontSize: 24 }}>⚖️</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {latestEntry?.weight ? `${latestEntry.weight} kg` : '-'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textLight }]}>Poids actuel</Text>
            {weightGain && (
              <Text style={[styles.statGain, { color: '#4CAF50' }]}>
                +{weightGain} kg
              </Text>
            )}
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.card }]}>
            <Text style={{ fontSize: 24 }}>📏</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {latestEntry?.height ? `${latestEntry.height} cm` : '-'}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textLight }]}>Taille actuelle</Text>
            {heightGain && (
              <Text style={[styles.statGain, { color: '#4CAF50' }]}>
                +{heightGain} cm
              </Text>
            )}
          </View>
        </View>

        {/* Charts */}
        {allData.length >= 2 && (
          <View style={styles.chartsSection}>
            <SimpleChart
              data={allData}
              dataKey="weight"
              color="#E91E63"
              unit="kg"
              label="Courbe de poids"
            />
            <SimpleChart
              data={allData}
              dataKey="height"
              color="#2196F3"
              unit="cm"
              label="Courbe de taille"
            />
          </View>
        )}

        {/* History */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Historique</Text>

          {allData.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
              <Text style={{ fontSize: 40 }}>📈</Text>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                Aucune mesure enregistrée
              </Text>
              <TouchableOpacity
                style={[styles.emptyBtn, { backgroundColor: theme.primary }]}
                onPress={() => setShowAddEntry(true)}
              >
                <Text style={styles.emptyBtnText}>Ajouter une mesure</Text>
              </TouchableOpacity>
            </View>
          ) : (
            [...allData].reverse().map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={[styles.entryCard, { backgroundColor: theme.card }]}
                onLongPress={() => handleDeleteEntry(entry)}
              >
                <View style={styles.entryLeft}>
                  <Text style={[styles.entryAge, { color: theme.primary }]}>
                    {getAgeLabel(entry.date)}
                  </Text>
                  <Text style={[styles.entryDate, { color: theme.textLight }]}>
                    {formatDate(entry.date)}
                  </Text>
                </View>
                <View style={styles.entryRight}>
                  {entry.weight && (
                    <View style={styles.entryValue}>
                      <Text style={{ fontSize: 16 }}>⚖️</Text>
                      <Text style={[styles.entryValueText, { color: theme.textDark }]}>
                        {entry.weight} kg
                      </Text>
                    </View>
                  )}
                  {entry.height && (
                    <View style={styles.entryValue}>
                      <Text style={{ fontSize: 16 }}>📏</Text>
                      <Text style={[styles.entryValueText, { color: theme.textDark }]}>
                        {entry.height} cm
                      </Text>
                    </View>
                  )}
                </View>
                {entry.isBirth && (
                  <View style={[styles.birthBadge, { backgroundColor: theme.secondary }]}>
                    <Text style={[styles.birthBadgeText, { color: theme.primary }]}>Naissance</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Tips */}
        <View style={[styles.tipCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="information-circle" size={20} color={theme.primary} />
          <Text style={[styles.tipText, { color: theme.textDark }]}>
            Pesez et mesurez {baby.name} régulièrement chez le pédiatre ou avec votre sage-femme.
            Les courbes de croissance sont un bon indicateur de santé !
          </Text>
        </View>
      </ScrollView>

      {/* Add Entry Modal */}
      <Modal visible={showAddEntry} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.primary }]}>
              Nouvelle mesure
            </Text>

            <Text style={[styles.inputLabel, { color: theme.textDark }]}>Date (JJ/MM/AAAA)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={entryDate}
              onChangeText={setEntryDate}
              placeholder="Aujourd'hui"
              placeholderTextColor={theme.textLight}
              keyboardType="numbers-and-punctuation"
            />

            <Text style={[styles.inputLabel, { color: theme.textDark }]}>Poids (kg)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={entryWeight}
              onChangeText={setEntryWeight}
              placeholder="Ex: 5.2"
              placeholderTextColor={theme.textLight}
              keyboardType="decimal-pad"
            />

            <Text style={[styles.inputLabel, { color: theme.textDark }]}>Taille (cm)</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
              value={entryHeight}
              onChangeText={setEntryHeight}
              placeholder="Ex: 58"
              placeholderTextColor={theme.textLight}
              keyboardType="decimal-pad"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.background }]}
                onPress={() => setShowAddEntry(false)}
              >
                <Text style={[styles.modalBtnText, { color: theme.textDark }]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                onPress={handleAddEntry}
              >
                <Text style={[styles.modalBtnText, { color: '#fff' }]}>Enregistrer</Text>
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
  addHeaderBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  imageCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerImage: {
    width: width - 64,
    height: 120,
  },

  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 12, marginTop: 4 },
  statGain: { fontSize: 13, fontWeight: '600', marginTop: 4 },

  chartsSection: { marginBottom: 20 },
  chartContainer: { marginBottom: 20 },
  chartLabel: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  chart: { borderRadius: 12, padding: 12 },
  chartInner: { flexDirection: 'row' },
  yAxis: { width: 40, justifyContent: 'space-between', paddingVertical: 5 },
  axisLabel: { fontSize: 10 },
  chartArea: { position: 'relative' },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    transformOrigin: 'left center',
  },
  chartPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginTop: 8,
  },
  xAxisLabel: { fontSize: 10 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },

  emptyCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
  },
  emptyText: { fontSize: 15, marginTop: 12, marginBottom: 16 },
  emptyBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  emptyBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  entryCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    alignItems: 'center',
  },
  entryLeft: { flex: 1 },
  entryAge: { fontSize: 16, fontWeight: '600' },
  entryDate: { fontSize: 12, marginTop: 2 },
  entryRight: { flexDirection: 'row', gap: 16 },
  entryValue: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  entryValueText: { fontSize: 15, fontWeight: '500' },
  birthBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  birthBadgeText: { fontSize: 10, fontWeight: '600' },

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
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
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
