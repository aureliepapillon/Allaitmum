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
import { parseBirthDate } from '../utils/helpers';

const CARRIER_TYPES = [
  {
    id: 'echarpe',
    name: 'Écharpe de portage',
    emoji: '🧣',
    description: 'Tissu long et souple à nouer',
    pros: ['Très polyvalent', 'Positions variées', 'Ajustable à la taille', 'Économique'],
    cons: ['Apprentissage nécessaire', 'Peut être long à installer'],
    ageRange: 'Dès la naissance',
  },
  {
    id: 'sling',
    name: 'Ring Sling',
    emoji: '⭕',
    description: 'Écharpe avec anneaux pour ajustement rapide',
    pros: ['Installation rapide', 'Compact', 'Idéal pour allaiter', 'Portage côté'],
    cons: ['Un seul côté', 'Moins de maintien pour bébé lourd'],
    ageRange: 'Dès la naissance',
  },
  {
    id: 'mei-tai',
    name: 'Mei-Tai',
    emoji: '🎀',
    description: 'Porte-bébé asiatique traditionnel avec pans à nouer',
    pros: ['Plus simple que l\'écharpe', 'Dos et ventre', 'Bonne répartition du poids'],
    cons: ['Moins ajustable qu\'une écharpe', 'Peut être chaud'],
    ageRange: 'Dès 3-4 mois (ou avec réducteur)',
  },
  {
    id: 'preclip',
    name: 'Porte-bébé préformé',
    emoji: '🎒',
    description: 'Porte-bébé avec clips et sangles',
    pros: ['Très facile d\'utilisation', 'Installation rapide', 'Confortable pour longs portages'],
    cons: ['Plus encombrant', 'Prix plus élevé', 'Moins de positions'],
    ageRange: 'Selon modèle (certains dès la naissance)',
  },
  {
    id: 'peau-a-peau',
    name: 'Peau à peau',
    emoji: '💗',
    description: 'Contact direct peau contre peau',
    pros: ['Régule la température', 'Favorise l\'allaitement', 'Crée du lien', 'Apaise bébé'],
    cons: ['Difficile en déplacement', 'Nécessite d\'être déshabillé'],
    ageRange: 'Dès la naissance',
  },
];

const TIPS_BY_AGE = [
  {
    ageRange: '0-3 mois',
    title: 'Nouveau-né',
    tips: [
      'Position physiologique : grenouille avec genoux plus hauts que les fesses',
      'La tête doit être soutenue et visible à tout moment',
      'Privilégiez le peau-à-peau et l\'écharpe tissée',
      'Portez souvent et longtemps : bébé en a besoin !',
      'Le portage favorise le développement des hanches',
    ],
  },
  {
    ageRange: '3-6 mois',
    title: 'Bébé',
    tips: [
      'Bébé peut aller face au porteur ou sur la hanche',
      'Vérifiez que les voies respiratoires sont dégagées',
      'Évitez le portage face au monde (surstimulation)',
      'Testez différents types de portage',
      'Commencez les portages dos si bébé tient sa tête',
    ],
  },
  {
    ageRange: '6-12 mois',
    title: 'Grand bébé',
    tips: [
      'Le portage dos devient idéal pour les longues balades',
      'Bébé peut regarder par-dessus votre épaule',
      'Adaptez la tension de l\'assise : genoux au nombril',
      'Attention au poids : pensez à votre dos !',
      'Alternez portage et poussette selon la situation',
    ],
  },
  {
    ageRange: '12+ mois',
    title: 'Bambin',
    tips: [
      'Privilégiez les porte-bébés avec bon support lombaire',
      'Le portage reste un outil de réconfort précieux',
      'Idéal pour les randonnées et voyages',
      'Respectez les envies de votre enfant (descendre/monter)',
      'Le portage peut continuer jusqu\'à 3-4 ans occasionnellement',
    ],
  },
];

const SAFETY_RULES = [
  { icon: '👀', rule: 'Voies respiratoires toujours visibles' },
  { icon: '💋', rule: 'Assez près pour l\'embrasser' },
  { icon: '🦵', rule: 'Position grenouille (genoux > fesses)' },
  { icon: '📏', rule: 'Dos arrondi naturellement' },
  { icon: '🔒', rule: 'Bien serré, sans jeu' },
  { icon: '❄️', rule: 'Éviter de surchauffer bébé' },
];

export default function PortageScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby } = useApp();

  const [selectedCarrier, setSelectedCarrier] = useState(null);

  const birthDate = parseBirthDate(baby.birthDate);
  const getBabyAgeMonths = () => {
    if (!birthDate) return 0;
    const now = new Date();
    return Math.max(0, (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth()));
  };
  const ageMonths = getBabyAgeMonths();

  // Determine current age tips
  const getCurrentAgeTips = () => {
    if (ageMonths < 3) return TIPS_BY_AGE[0];
    if (ageMonths < 6) return TIPS_BY_AGE[1];
    if (ageMonths < 12) return TIPS_BY_AGE[2];
    return TIPS_BY_AGE[3];
  };
  const currentTips = getCurrentAgeTips();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Portage</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={[styles.introCard, { backgroundColor: theme.primary + '15' }]}>
          <Text style={{ fontSize: 40, marginBottom: 10 }}>🧣</Text>
          <Text style={[styles.introTitle, { color: theme.primary }]}>
            Le portage physiologique
          </Text>
          <Text style={[styles.introText, { color: theme.textDark }]}>
            Porter bébé favorise son développement, renforce le lien parent-enfant
            et facilite le quotidien. Découvrez les différentes options !
          </Text>
        </View>

        {/* Safety rules */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Règles de sécurité
          </Text>
          <View style={[styles.safetyCard, { backgroundColor: theme.card }]}>
            {SAFETY_RULES.map((item, index) => (
              <View key={index} style={styles.safetyItem}>
                <Text style={styles.safetyIcon}>{item.icon}</Text>
                <Text style={[styles.safetyText, { color: theme.textDark }]}>{item.rule}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips for current age */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Conseils pour {baby.name} ({currentTips.ageRange})
          </Text>
          <View style={[styles.tipsCard, { backgroundColor: theme.card }]}>
            {currentTips.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
                <Text style={[styles.tipText, { color: theme.textDark }]}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Carrier types */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Types de portage
          </Text>
          {CARRIER_TYPES.map((carrier) => (
            <TouchableOpacity
              key={carrier.id}
              style={[styles.carrierCard, { backgroundColor: theme.card }]}
              onPress={() => setSelectedCarrier(selectedCarrier === carrier.id ? null : carrier.id)}
            >
              <View style={styles.carrierHeader}>
                <Text style={styles.carrierEmoji}>{carrier.emoji}</Text>
                <View style={styles.carrierInfo}>
                  <Text style={[styles.carrierName, { color: theme.textDark }]}>{carrier.name}</Text>
                  <Text style={[styles.carrierDesc, { color: theme.textLight }]}>{carrier.description}</Text>
                </View>
                <Ionicons
                  name={selectedCarrier === carrier.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.textLight}
                />
              </View>

              {selectedCarrier === carrier.id && (
                <View style={styles.carrierDetails}>
                  <Text style={[styles.carrierAge, { color: theme.primary }]}>
                    {carrier.ageRange}
                  </Text>

                  <Text style={[styles.prosConsTitle, { color: '#4CAF50' }]}>Avantages</Text>
                  {carrier.pros.map((pro, i) => (
                    <View key={i} style={styles.prosConsItem}>
                      <Text style={{ color: '#4CAF50' }}>+</Text>
                      <Text style={[styles.prosConsText, { color: theme.textDark }]}>{pro}</Text>
                    </View>
                  ))}

                  <Text style={[styles.prosConsTitle, { color: '#FF9800', marginTop: 10 }]}>
                    Inconvénients
                  </Text>
                  {carrier.cons.map((con, i) => (
                    <View key={i} style={styles.prosConsItem}>
                      <Text style={{ color: '#FF9800' }}>−</Text>
                      <Text style={[styles.prosConsText, { color: theme.textDark }]}>{con}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Partner placeholder */}
        <View style={[styles.partnerCard, { backgroundColor: theme.secondary + '30', borderColor: theme.primary + '40' }]}>
          <Ionicons name="storefront-outline" size={24} color={theme.primary} />
          <View style={styles.partnerContent}>
            <Text style={[styles.partnerTitle, { color: theme.primary }]}>
              Espace partenaires
            </Text>
            <Text style={[styles.partnerText, { color: theme.textLight }]}>
              Bientôt : découvrez nos partenaires spécialisés en portage !
            </Text>
          </View>
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

  introCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  introTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  introText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },

  safetyCard: {
    borderRadius: 16,
    padding: 16,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  safetyIcon: { fontSize: 20 },
  safetyText: { flex: 1, fontSize: 14 },

  tipsCard: {
    borderRadius: 16,
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 6,
  },
  tipText: { flex: 1, fontSize: 14, lineHeight: 20 },

  carrierCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  carrierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carrierEmoji: { fontSize: 32, marginRight: 12 },
  carrierInfo: { flex: 1 },
  carrierName: { fontSize: 16, fontWeight: '600' },
  carrierDesc: { fontSize: 12, marginTop: 2 },
  carrierDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  carrierAge: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  prosConsTitle: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  prosConsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 2,
  },
  prosConsText: { flex: 1, fontSize: 13 },

  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  partnerContent: { flex: 1 },
  partnerTitle: { fontSize: 14, fontWeight: '600' },
  partnerText: { fontSize: 12, marginTop: 4 },
});
