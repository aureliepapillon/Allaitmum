import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const FREE_FEATURES = [
  { label: 'Suivi tétées & biberons', included: true },
  { label: 'Suivi couches', included: true },
  { label: 'Suivi sommeil', included: true },
  { label: 'Conseil de la semaine', included: true },
  { label: 'Multi-bébé', included: true },
];

const PREMIUM_FEATURES = [
  { label: 'Tout le contenu gratuit', included: true },
  { label: 'Bébé Book complet', included: true, highlight: true },
  { label: 'Souvenirs illimités', included: true },
  { label: 'Courbes de croissance', included: true },
  { label: 'Étapes motrices', included: true },
  { label: 'Suivi dents', included: true },
  { label: 'Médicaments & Allergies', included: true },
  { label: 'Articles conseils exclusifs', included: true, highlight: true },
  { label: 'Export PDF des données', included: true },
  { label: 'Partage co-parent', included: true, soon: true },
  { label: 'Prise de RDV en ligne', included: true, soon: true },
  { label: 'Sans publicité', included: true },
];

export default function SubscriptionScreen({ onClose }) {
  const { theme } = useTheme();

  const handleSubscribe = () => {
    Alert.alert(
      'Bientôt disponible',
      'L\'abonnement Premium sera disponible très prochainement ! Merci de ton intérêt.',
      [{ text: 'OK' }]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      'Restaurer',
      'Aucun achat trouvé à restaurer.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Mon abonnement</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Current plan */}
        <View style={[styles.currentPlan, { backgroundColor: theme.card }]}>
          <View style={[styles.planBadge, { backgroundColor: theme.secondary }]}>
            <Text style={[styles.planBadgeText, { color: theme.primary }]}>Actuel</Text>
          </View>
          <Ionicons name="gift-outline" size={40} color={theme.primary} />
          <Text style={[styles.planName, { color: theme.primary }]}>Gratuit</Text>
          <Text style={[styles.planPrice, { color: theme.textDark }]}>0 € / mois</Text>
        </View>

        {/* Free features */}
        <View style={[styles.featuresCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.textDark }]}>Inclus dans le plan gratuit</Text>
          {FREE_FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons
                name={feature.included ? 'checkmark-circle' : 'close-circle'}
                size={20}
                color={feature.included ? '#4CAF50' : '#F44336'}
              />
              <Text style={[styles.featureText, { color: theme.textDark }]}>
                {feature.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Premium card */}
        <View style={[styles.premiumCard, { backgroundColor: '#FFF8E1', borderColor: '#FFB300' }]}>
          <View style={styles.premiumHeader}>
            <Ionicons name="star" size={28} color="#FFB300" />
            <Text style={styles.premiumTitle}>Premium</Text>
            <View style={[styles.priceBadge, { backgroundColor: '#FFB300' }]}>
              <Text style={styles.priceBadgeText}>1,99 € / mois</Text>
            </View>
          </View>

          <Text style={styles.premiumSubtitle}>
            Débloquez toutes les fonctionnalités
          </Text>

          <View style={styles.premiumFeatures}>
            {PREMIUM_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#FFB300"
                />
                <Text style={[
                  styles.featureText,
                  { color: '#333' },
                  feature.highlight && styles.featureHighlight,
                ]}>
                  {feature.label}
                  {feature.soon && <Text style={styles.soonBadge}> (bientôt)</Text>}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.subscribeBtn}
            onPress={handleSubscribe}
          >
            <Ionicons name="rocket" size={20} color="#fff" />
            <Text style={styles.subscribeBtnText}>Passer à Premium</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Annulable à tout moment. Renouvellement automatique.
          </Text>
        </View>

        {/* Restore purchases */}
        <TouchableOpacity style={styles.restoreBtn} onPress={handleRestore}>
          <Text style={[styles.restoreBtnText, { color: theme.primary }]}>
            Restaurer mes achats
          </Text>
        </TouchableOpacity>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="heart" size={20} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.textDark }]}>
            Ton abonnement aide à maintenir Allaitmum sans pub et à développer de nouvelles fonctionnalités.
            Merci de ton soutien !
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

  currentPlan: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  planBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planBadgeText: { fontSize: 12, fontWeight: '600' },
  planName: { fontSize: 24, fontWeight: '700', marginTop: 12 },
  planPrice: { fontSize: 16, marginTop: 4 },

  featuresCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  featureText: { fontSize: 15, flex: 1 },
  featureHighlight: { fontWeight: '600' },
  soonBadge: { fontSize: 12, color: '#999', fontStyle: 'italic' },

  premiumCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFB300',
    flex: 1,
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  premiumFeatures: {
    marginBottom: 20,
  },
  subscribeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFB300',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  subscribeBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  restoreBtn: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  restoreBtnText: {
    fontSize: 15,
    fontWeight: '500',
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
  },
  infoText: { flex: 1, fontSize: 13, lineHeight: 18 },
});
