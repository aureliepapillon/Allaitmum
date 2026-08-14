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
import { postpartumArticles, friendlyPlaces, appointmentLinks, supportLines } from '../data/postpartum';

export default function JournalScreen() {
  const { theme } = useTheme();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🤍</Text>
          <Text style={[styles.title, { color: theme.primary }]}>Ta Safe Place</Text>
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

        {/* Médicaments compatibles allaitement */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          💊 Médicaments & allaitement
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.donText, { color: theme.text }]}>
            Vérifie la compatibilité d'un médicament avec l'allaitement avant de le prendre :
          </Text>
          {[
            { name: 'CRAT', desc: 'Centre de Référence sur les Agents Tératogènes (France)', url: 'https://www.lecrat.fr', color: '#2E7D32' },
            { name: 'e-lactancia', desc: 'Base de données internationale sur l\'allaitement', url: 'https://e-lactancia.org/', color: '#2E7D32' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.linkRow}
              onPress={() => Linking.openURL(item.url)}
            >
              <View style={[styles.linkIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name="medical-outline" size={20} color={item.color} />
              </View>
              <View style={styles.linkContent}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>{item.name}</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]} numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
              <Ionicons name="open-outline" size={18} color={theme.textLight} />
            </TouchableOpacity>
          ))}
        </View>

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

        {/* Ondes & mode avion */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          ✈️ Réduire les ondes autour de bébé
        </Text>
        <View style={[styles.card, { backgroundColor: '#E3F2FD', shadowColor: '#90CAF9' }]}>
          <Text style={[styles.donText, { color: '#1E3A5F' }]}>
            Les ondes électromagnétiques (WiFi, 4G/5G) sont partout autour de nous. Si tu veux les limiter quand tu utilises l'app près de bébé, bonne nouvelle :
          </Text>
          <View style={{ gap: 10, marginBottom: 4 }}>
            {[
              { emoji: '🛫', text: 'Mode avion activé → toutes les fonctionnalités core fonctionnent (tétées, sommeil, couches, vaccins, courbes, souvenirs…)' },
              { emoji: '📵', text: 'Seuls les liens externes (partenaires, lactariums, RDV) nécessitent internet' },
              { emoji: '💾', text: 'Toutes tes données sont stockées localement, rien ne transite par un serveur' },
            ].map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 16 }}>{item.emoji}</Text>
                <Text style={[styles.donText, { color: '#1E3A5F', marginBottom: 0, flex: 1 }]}>{item.text}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.donText, { color: '#1565C0', fontWeight: '600', marginBottom: 0, marginTop: 8 }]}>
            💡 Astuce : active le mode avion et utilise le WiFi seul (sans données mobiles) pour une exposition encore plus réduite.
          </Text>
        </View>

        {/* Don de lait maternel */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          🍼 Don de lait maternel
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.donText, { color: theme.text }]}>
            Tu as du lait en surplus ? Des bébés ont besoin de toi !
          </Text>
          {[
            { name: 'Trouver un lactarium', desc: 'Réseau français des lactariums', url: 'https://www.google.com/maps/search/lactarium', color: '#AB7058' },
            { name: 'Association Solidarilait', desc: 'Soutien au don de lait', url: 'https://www.solidarilait.org', color: '#AB7058' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.linkRow}
              onPress={() => Linking.openURL(item.url)}
            >
              <View style={[styles.linkIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name="heart-outline" size={20} color={item.color} />
              </View>
              <View style={styles.linkContent}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>{item.name}</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]}>{item.desc}</Text>
              </View>
              <Ionicons name="open-outline" size={18} color={theme.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Espace partenaire */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          🤝 Espace partenaire
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.donText, { color: theme.text }]}>
            Des professionnelles spécialisées en maternité et allaitement, sélectionnées avec soin.
          </Text>
          {[
            { name: 'Photographe', desc: 'Portraits naissance, ADN bébé...', icon: 'camera-outline', color: '#7E57C2' },
            { name: 'Créatrice bijou', desc: 'Bijoux souvenir en lait maternel', icon: 'diamond-outline', color: '#D4A574' },
            { name: 'Bain enveloppé', desc: 'Détente et apaisement pour bébé', icon: 'water-outline', color: '#42A5F5' },
          ].map((item, i) => (
            <View key={i} style={styles.linkRow}>
              <View style={[styles.linkIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.linkContent}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>{item.name}</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]} numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
              <Text style={[styles.comingSoonText, { color: theme.textLight }]}>Bientôt</Text>
            </View>
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
  donText: { fontSize: 14, lineHeight: 21, marginBottom: 12 },
  photoCard: { borderRadius: 14, padding: 14, gap: 10 },
  photoHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promoLabel: { fontSize: 13 },
  promoCode: { fontSize: 15, fontWeight: '700', letterSpacing: 1 },
  comingSoonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  comingSoonText: { fontSize: 13, fontStyle: 'italic' },

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
