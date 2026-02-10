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

const SLEEP_OPTIONS = [
  {
    id: 'cododo-lit',
    name: 'Cododo dans le lit parental',
    emoji: '🛏️',
    description: 'Bébé dort dans le même lit que les parents',
    safety: [
      'Matelas ferme et plat (pas de matelas mou)',
      'Pas d\'oreiller, couette ou couverture près de bébé',
      'Bébé sur le dos, jamais sur le ventre',
      'Pas de tour de lit, peluches ou jouets',
      'Parents non-fumeurs uniquement',
      'Pas d\'alcool ou de médicaments sédatifs',
      'Ne pas coincer bébé contre le mur',
      'Laisser de l\'espace, éviter la surchauffe',
    ],
    benefits: [
      'Facilite l\'allaitement nocturne',
      'Moins de réveils pour tous',
      'Renforce le lien parent-enfant',
      'Bébé se rendort plus facilement',
    ],
    considerations: [
      'Non recommandé avant 3-4 mois (risque MIN)',
      'Nécessite un grand lit',
      'Peut affecter l\'intimité du couple',
    ],
  },
  {
    id: 'side-car',
    name: 'Lit side-car / cododo',
    emoji: '🧸',
    description: 'Lit bébé attaché au lit parental, ouvert d\'un côté',
    safety: [
      'Fixer solidement au lit parental (pas d\'espace)',
      'Matelas à la même hauteur que celui des parents',
      'Matelas ferme adapté au lit',
      'Aucun espace entre les deux matelas',
    ],
    benefits: [
      'Proximité sans partager le même matelas',
      'Accès facile pour l\'allaitement',
      'Chacun son espace de sommeil',
      'Recommandé par de nombreux pédiatres',
    ],
    considerations: [
      'Nécessite un lit spécifique',
      'Vérifier la compatibilité avec votre lit',
    ],
  },
  {
    id: 'room-sharing',
    name: 'Chambre partagée',
    emoji: '🏠',
    description: 'Bébé dort dans sa propre couchette dans la chambre parentale',
    safety: [
      'Lit/berceau aux normes de sécurité',
      'À moins d\'un mètre du lit parental',
      'Température de la pièce : 18-20°C',
      'Pas de couverture, turbulette adaptée',
    ],
    benefits: [
      'Recommandé par l\'OMS jusqu\'à 6 mois minimum',
      'Réduit le risque de MIN de 50%',
      'Permet de surveiller bébé facilement',
      'Facilite les tétées nocturnes',
    ],
    considerations: [
      'Bébé peut réveiller les parents (et vice-versa)',
      'Transition vers sa chambre à prévoir',
    ],
  },
];

const FAQ = [
  {
    question: 'Jusqu\'à quel âge peut-on pratiquer le cododo ?',
    answer: 'Il n\'y a pas de limite stricte. Beaucoup de familles le pratiquent jusqu\'à 2-3 ans. L\'important est que cela convienne à tous. La transition vers un lit séparé peut se faire progressivement.',
  },
  {
    question: 'Le cododo crée-t-il une dépendance ?',
    answer: 'Non, le cododo répond au besoin de proximité naturel du bébé. Les enfants qui ont été proches de leurs parents la nuit développent souvent une meilleure autonomie plus tard.',
  },
  {
    question: 'Comment gérer le cododo avec des jumeaux ?',
    answer: 'Privilégiez le lit side-car avec deux espaces séparés, ou une chambre partagée avec deux berceaux. Le cododo dans le lit parental est déconseillé avec plusieurs bébés.',
  },
  {
    question: 'Mon pédiatre est contre le cododo, que faire ?',
    answer: 'Les recommandations varient selon les pays et les professionnels. Si vous souhaitez pratiquer le cododo, informez-vous sur les règles de sécurité et faites votre choix en conscience.',
  },
  {
    question: 'Comment faire la transition vers un lit séparé ?',
    answer: 'Allez-y progressivement : commencez par des siestes dans sa chambre, puis le début de nuit, et enfin la nuit complète. Restez à l\'écoute des besoins de votre enfant.',
  },
];

const SAFETY_ABSOLUTES = [
  { icon: '🚭', text: 'Parents non-fumeurs' },
  { icon: '🍷', text: 'Pas d\'alcool ni drogues' },
  { icon: '💊', text: 'Pas de médicaments sédatifs' },
  { icon: '🛋️', text: 'Jamais sur un canapé ou fauteuil' },
  { icon: '⬆️', text: 'Bébé toujours sur le dos' },
  { icon: '🌡️', text: 'Pas de surchauffe (18-20°C)' },
];

export default function CododoScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby } = useApp();

  const [expandedOption, setExpandedOption] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Cododo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={[styles.introCard, { backgroundColor: theme.primary + '15' }]}>
          <Text style={{ fontSize: 40, marginBottom: 10 }}>🌙</Text>
          <Text style={[styles.introTitle, { color: theme.primary }]}>
            Sommeil partagé
          </Text>
          <Text style={[styles.introText, { color: theme.textDark }]}>
            Le cododo est une pratique naturelle dans de nombreuses cultures.
            Pratiqué en sécurité, il peut faciliter l'allaitement et le sommeil de toute la famille.
          </Text>
        </View>

        {/* Safety absolutes */}
        <View style={[styles.warningCard, { backgroundColor: '#FFF3E0', borderColor: '#FF9800' }]}>
          <View style={styles.warningHeader}>
            <Ionicons name="warning" size={24} color="#FF9800" />
            <Text style={[styles.warningTitle, { color: '#E65100' }]}>
              Règles de sécurité absolues
            </Text>
          </View>
          <View style={styles.safetyGrid}>
            {SAFETY_ABSOLUTES.map((item, index) => (
              <View key={index} style={styles.safetyItem}>
                <Text style={styles.safetyIcon}>{item.icon}</Text>
                <Text style={[styles.safetyText, { color: '#5D4037' }]}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sleep options */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Options de couchage
          </Text>
          {SLEEP_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionCard, { backgroundColor: theme.card }]}
              onPress={() => setExpandedOption(expandedOption === option.id ? null : option.id)}
            >
              <View style={styles.optionHeader}>
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <View style={styles.optionInfo}>
                  <Text style={[styles.optionName, { color: theme.textDark }]}>{option.name}</Text>
                  <Text style={[styles.optionDesc, { color: theme.textLight }]}>{option.description}</Text>
                </View>
                <Ionicons
                  name={expandedOption === option.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.textLight}
                />
              </View>

              {expandedOption === option.id && (
                <View style={styles.optionDetails}>
                  <View style={[styles.detailSection, { borderLeftColor: '#4CAF50' }]}>
                    <Text style={[styles.detailTitle, { color: '#4CAF50' }]}>Avantages</Text>
                    {option.benefits.map((item, i) => (
                      <Text key={i} style={[styles.detailItem, { color: theme.textDark }]}>
                        • {item}
                      </Text>
                    ))}
                  </View>

                  <View style={[styles.detailSection, { borderLeftColor: '#2196F3' }]}>
                    <Text style={[styles.detailTitle, { color: '#2196F3' }]}>Sécurité</Text>
                    {option.safety.map((item, i) => (
                      <Text key={i} style={[styles.detailItem, { color: theme.textDark }]}>
                        • {item}
                      </Text>
                    ))}
                  </View>

                  <View style={[styles.detailSection, { borderLeftColor: '#FF9800' }]}>
                    <Text style={[styles.detailTitle, { color: '#FF9800' }]}>À considérer</Text>
                    {option.considerations.map((item, i) => (
                      <Text key={i} style={[styles.detailItem, { color: theme.textDark }]}>
                        • {item}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Questions fréquentes
          </Text>
          {FAQ.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.faqCard, { backgroundColor: theme.card }]}
              onPress={() => setExpandedFaq(expandedFaq === index ? null : index)}
            >
              <View style={styles.faqHeader}>
                <Text style={[styles.faqQuestion, { color: theme.textDark }]}>
                  {item.question}
                </Text>
                <Ionicons
                  name={expandedFaq === index ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={theme.textLight}
                />
              </View>
              {expandedFaq === index && (
                <Text style={[styles.faqAnswer, { color: theme.text }]}>
                  {item.answer}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <View style={[styles.resourceCard, { backgroundColor: theme.secondary + '40' }]}>
          <Ionicons name="book-outline" size={20} color={theme.primary} />
          <View style={styles.resourceContent}>
            <Text style={[styles.resourceTitle, { color: theme.primary }]}>
              Pour aller plus loin
            </Text>
            <Text style={[styles.resourceText, { color: theme.textDark }]}>
              Consultez les recommandations de l'OMS et de votre pédiatre pour un sommeil sécuritaire adapté à {baby.name}.
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
    marginBottom: 16,
  },
  introTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  introText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },

  warningCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  warningTitle: { fontSize: 15, fontWeight: '600' },
  safetyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  safetyItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  safetyIcon: { fontSize: 18 },
  safetyText: { flex: 1, fontSize: 12 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '600', marginBottom: 12 },

  optionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionEmoji: { fontSize: 32, marginRight: 12 },
  optionInfo: { flex: 1 },
  optionName: { fontSize: 16, fontWeight: '600' },
  optionDesc: { fontSize: 12, marginTop: 2 },
  optionDetails: {
    marginTop: 16,
    gap: 12,
  },
  detailSection: {
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  detailTitle: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  detailItem: { fontSize: 13, lineHeight: 20, paddingVertical: 1 },

  faqCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  faqQuestion: { flex: 1, fontSize: 14, fontWeight: '500' },
  faqAnswer: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
  },

  resourceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  resourceContent: { flex: 1 },
  resourceTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  resourceText: { fontSize: 13, lineHeight: 18 },
});
