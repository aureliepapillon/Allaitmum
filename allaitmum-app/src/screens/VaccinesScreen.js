import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { getVaccinesByAge, getUpcomingVaccines } from '../data/vaccines';
import { getBabyAgeInMonths } from '../utils/helpers';

export default function VaccinesScreen() {
  const { theme } = useTheme();
  const { baby, vaccinesDone, toggleVaccine } = useApp();
  const [expandedGroup, setExpandedGroup] = useState(null);

  const groups = getVaccinesByAge();
  const upcoming = getUpcomingVaccines(baby.birthDate, vaccinesDone);
  const babyAgeMonths = getBabyAgeInMonths(baby.birthDate);

  const totalVaccines = groups.reduce((acc, g) => acc + g.vaccines.length, 0);
  const doneCount = vaccinesDone.length;
  const progress = totalVaccines > 0 ? Math.round((doneCount / totalVaccines) * 100) : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Vaccins</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Calendrier vaccinal de {baby.name}
      </Text>

      {/* Progress card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.progressHeader}>
          <Ionicons name="shield-checkmark" size={24} color={theme.success} />
          <Text style={[styles.progressTitle, { color: theme.primary }]}>Progression</Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.secondary }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.success, width: `${progress}%` },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.text }]}>
          {doneCount}/{totalVaccines} vaccins effectués ({progress}%)
        </Text>
      </View>

      {/* Upcoming vaccines */}
      {upcoming.length > 0 && (
        <View style={[styles.card, { backgroundColor: theme.warning + '15', borderColor: theme.warning, borderWidth: 1 }]}>
          <View style={styles.upcomingHeader}>
            <Ionicons name="notifications" size={20} color={theme.warning} />
            <Text style={[styles.upcomingTitle, { color: theme.warning }]}>Prochains vaccins</Text>
          </View>
          {upcoming.map((v) => (
            <View key={v.id} style={styles.upcomingItem}>
              <View style={styles.upcomingDot}>
                <Ionicons name="alert-circle" size={16} color={theme.warning} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.upcomingName, { color: theme.textDark }]}>{v.name}</Text>
                <Text style={[styles.upcomingAge, { color: theme.text }]}>
                  {v.ageLabel} {v.mandatory ? '(obligatoire)' : '(recommandé)'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Vaccine groups by age */}
      {groups.map((group) => {
        const isExpanded = expandedGroup === group.age;
        const groupDone = group.vaccines.filter((v) => vaccinesDone.includes(v.id)).length;
        const allDone = groupDone === group.vaccines.length;
        const isPast = group.ageMonths < babyAgeMonths;
        const isCurrent = Math.abs(group.ageMonths - babyAgeMonths) <= 1;

        return (
          <View key={group.age}>
            <TouchableOpacity
              style={[
                styles.groupHeader,
                {
                  backgroundColor: isCurrent ? theme.primary + '15' : theme.card,
                  borderColor: isCurrent ? theme.primary : 'transparent',
                  borderWidth: isCurrent ? 1.5 : 0,
                },
              ]}
              onPress={() => setExpandedGroup(isExpanded ? null : group.age)}
            >
              <View style={styles.groupLeft}>
                <Ionicons
                  name={allDone ? 'checkmark-circle' : isPast ? 'alert-circle' : 'time'}
                  size={22}
                  color={allDone ? theme.success : isPast ? theme.danger : theme.primary}
                />
                <View>
                  <Text style={[styles.groupAge, { color: theme.primary }]}>{group.age}</Text>
                  <Text style={[styles.groupCount, { color: theme.text }]}>
                    {groupDone}/{group.vaccines.length} effectués
                  </Text>
                </View>
              </View>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={theme.primary}
              />
            </TouchableOpacity>

            {isExpanded && (
              <View style={[styles.groupContent, { backgroundColor: theme.card }]}>
                {group.vaccines.map((v) => {
                  const isDone = vaccinesDone.includes(v.id);
                  return (
                    <TouchableOpacity
                      key={v.id}
                      style={[styles.vaccineItem, { backgroundColor: isDone ? theme.success + '10' : 'transparent' }]}
                      onPress={() => toggleVaccine(v.id)}
                    >
                      <Ionicons
                        name={isDone ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={isDone ? theme.success : theme.textLight}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            styles.vaccineName,
                            {
                              color: isDone ? theme.success : theme.textDark,
                              textDecorationLine: isDone ? 'line-through' : 'none',
                            },
                          ]}
                        >
                          {v.name}
                        </Text>
                        <Text style={[styles.vaccineDisease, { color: theme.text }]}>
                          {v.disease}
                        </Text>
                        <View style={styles.vaccineTagRow}>
                          <View style={[styles.tag, { backgroundColor: v.mandatory ? theme.primary + '20' : theme.secondary }]}>
                            <Text style={[styles.tagText, { color: v.mandatory ? theme.primary : theme.text }]}>
                              {v.mandatory ? 'Obligatoire' : 'Recommandé'}
                            </Text>
                          </View>
                        </View>
                        {v.notes ? (
                          <Text style={[styles.vaccineNotes, { color: theme.textLight }]}>
                            {v.notes}
                          </Text>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}

      {/* Source */}
      <View style={[styles.sourceBox, { backgroundColor: theme.secondary + '40' }]}>
        <Ionicons name="information-circle" size={16} color={theme.primary} />
        <Text style={[styles.sourceText, { color: theme.text }]}>
          Source : Calendrier vaccinal français officiel.
          Parlez-en à votre pédiatre pour un suivi personnalisé.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 16 },
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
  progressHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  progressTitle: { fontSize: 18, fontWeight: '600' },
  progressBar: { height: 10, borderRadius: 5, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 5 },
  progressText: { fontSize: 13 },
  upcomingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  upcomingTitle: { fontSize: 16, fontWeight: '600' },
  upcomingItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  upcomingDot: { marginTop: 2 },
  upcomingName: { fontSize: 14, fontWeight: '600' },
  upcomingAge: { fontSize: 12, marginTop: 2 },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 4,
  },
  groupLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  groupAge: { fontSize: 16, fontWeight: '600' },
  groupCount: { fontSize: 12 },
  groupContent: { borderRadius: 16, padding: 12, marginBottom: 12 },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  vaccineName: { fontSize: 14, fontWeight: '600' },
  vaccineDisease: { fontSize: 12, marginTop: 2 },
  vaccineTagRow: { flexDirection: 'row', gap: 6, marginTop: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  vaccineNotes: { fontSize: 11, fontStyle: 'italic', marginTop: 4 },
  sourceBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  sourceText: { fontSize: 12, flex: 1, lineHeight: 18 },
});
