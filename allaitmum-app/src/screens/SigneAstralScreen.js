import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { parseBirthDate } from '../utils/helpers';

const ZODIAC_SIGNS = [
  { name: 'Capricorne', image: require('../../assets/zodiac/capricorne.png'), start: [12, 22], end: [1, 19], element: 'Terre', trait: 'Déterminé et patient dès le berceau — un tempérament de bâtisseur qui prend son temps pour tout comprendre.' },
  { name: 'Verseau', image: require('../../assets/zodiac/verseau.png'), start: [1, 20], end: [2, 18], element: 'Air', trait: 'Curieux et indépendant, souvent captivé par ce qui sort de l\'ordinaire dès les premiers mois.' },
  { name: 'Poissons', image: require('../../assets/zodiac/poissons.png'), start: [2, 19], end: [3, 20], element: 'Eau', trait: 'Sensible et intuitif, un bébé qui capte vite les émotions de son entourage.' },
  { name: 'Bélier', image: require('../../assets/zodiac/belier.png'), start: [3, 21], end: [4, 19], element: 'Feu', trait: 'Énergique et impatient, veut tout découvrir tout de suite — pas du genre à attendre son tour.' },
  { name: 'Taureau', image: require('../../assets/zodiac/taureau.png'), start: [4, 20], end: [5, 20], element: 'Terre', trait: 'Calme et sensoriel, adore les câlins, les textures douces et une routine bien installée.' },
  { name: 'Gémeaux', image: require('../../assets/zodiac/gemeaux.png'), start: [5, 21], end: [6, 20], element: 'Air', trait: 'Éveillé et bavard très tôt, change d\'humeur vite, adore observer tout ce qui bouge autour de lui.' },
  { name: 'Cancer', image: require('../../assets/zodiac/cancer.png'), start: [6, 21], end: [7, 22], element: 'Eau', trait: 'Attaché et câlin, a besoin de repères stables et du contact rassurant de ses parents.' },
  { name: 'Lion', image: require('../../assets/zodiac/lion.png'), start: [7, 23], end: [8, 22], element: 'Feu', trait: 'Sourire facile et présence qui se fait remarquer — un tempérament qui aime être au centre de l\'attention.' },
  { name: 'Vierge', image: require('../../assets/zodiac/vierge.png'), start: [8, 23], end: [9, 22], element: 'Terre', trait: 'Observateur et minutieux, souvent sensible aux changements dans son environnement.' },
  { name: 'Balance', image: require('../../assets/zodiac/balance.png'), start: [9, 23], end: [10, 22], element: 'Air', trait: 'Sociable et sensible à l\'ambiance autour de lui, apprécie la douceur et l\'harmonie.' },
  { name: 'Scorpion', image: require('../../assets/zodiac/scorpion.png'), start: [10, 23], end: [11, 21], element: 'Eau', trait: 'Intense et déterminé, un petit caractère bien affirmé dès les premières semaines.' },
  { name: 'Sagittaire', image: require('../../assets/zodiac/sagittaire.png'), start: [11, 22], end: [12, 21], element: 'Feu', trait: 'Curieux et joueur, toujours partant pour explorer un nouvel espace ou un nouveau jouet.' },
];

function getZodiacSign(birthDate) {
  if (!birthDate) return null;
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  return ZODIAC_SIGNS.find(({ start, end }) => {
    const [startMonth, startDay] = start;
    const [endMonth, endDay] = end;
    // Every sign here spans exactly two consecutive months (Capricorn wraps Dec -> Jan)
    return (month === startMonth && day >= startDay) || (month === endMonth && day <= endDay);
  }) || null;
}

export default function SigneAstralScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby } = useApp();

  const birthDate = parseBirthDate(baby.birthDate);
  const sign = getZodiacSign(birthDate);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.backBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Signe astral</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!sign ? (
          <View style={[styles.emptyCard, { backgroundColor: theme.card }]}>
            <Ionicons name="calendar-outline" size={40} color={theme.textLight} />
            <Text style={[styles.emptyText, { color: theme.textLight }]}>
              Renseigne la date de naissance de {baby.name || 'bébé'} dans son profil pour découvrir son signe.
            </Text>
          </View>
        ) : (
          <>
            <View style={[styles.signCard, { backgroundColor: theme.primary + '15', borderColor: theme.primary }]}>
              <Image source={sign.image} style={styles.signImage} resizeMode="contain" />
              <Text style={[styles.signName, { color: theme.primary }]}>{sign.name}</Text>
              <Text style={[styles.babyLine, { color: theme.textDark }]}>
                {baby.name || 'Bébé'} est {sign.name === 'Verseau' || sign.name === 'Balance' || sign.name === 'Scorpion' ? '' : 'un·e '}{sign.name.toLowerCase()}
              </Text>
              <View style={[styles.elementTag, { backgroundColor: theme.secondary }]}>
                <Text style={[styles.elementText, { color: theme.primary }]}>Élément {sign.element}</Text>
              </View>
            </View>

            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.cardTitle, { color: theme.textDark }]}>Petit trait de caractère</Text>
              <Text style={[styles.traitText, { color: theme.text }]}>{sign.trait}</Text>
            </View>

            <View style={[styles.disclaimerCard, { backgroundColor: theme.secondary + '40' }]}>
              <Ionicons name="happy-outline" size={18} color={theme.primary} />
              <Text style={[styles.disclaimerText, { color: theme.textDark }]}>
                À prendre avec légèreté — c'est un petit clin d'œil amusant, pas une prédiction sérieuse sur la personnalité de {baby.name || 'bébé'} !
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.primary }]}>Les 12 signes</Text>
              <View style={styles.grid}>
                {ZODIAC_SIGNS.map((z) => (
                  <View
                    key={z.name}
                    style={[
                      styles.gridItem,
                      { backgroundColor: theme.card },
                      z.name === sign.name && { borderColor: theme.primary, borderWidth: 1.5 },
                    ]}
                  >
                    <Image source={z.image} style={styles.gridImage} resizeMode="contain" />
                    <Text style={[styles.gridName, { color: theme.textDark }]}>{z.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={[styles.credit, { color: theme.textLight }]}>
              Illustrations : © Agau | Dreamstime.com
            </Text>
          </>
        )}
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
    paddingTop: 22,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700' },

  content: { padding: 20, paddingBottom: 60 },

  emptyCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    gap: 12,
  },
  emptyText: { fontSize: 14, textAlign: 'center' },

  signCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 28,
    alignItems: 'center',
    marginBottom: 16,
  },
  signImage: { width: 110, height: 110 },
  signName: { fontSize: 24, fontWeight: '700', marginTop: 4 },
  babyLine: { fontSize: 14, marginTop: 6 },
  elementTag: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  elementText: { fontSize: 12, fontWeight: '600' },

  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  traitText: { fontSize: 14, lineHeight: 20 },

  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
  },
  disclaimerText: { flex: 1, fontSize: 13, lineHeight: 18 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '30%',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
  },
  gridImage: { width: 44, height: 44 },
  gridName: { fontSize: 11, textAlign: 'center' },

  credit: { fontSize: 11, textAlign: 'center', marginTop: 4 },
});
