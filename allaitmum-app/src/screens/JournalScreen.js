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

        {/* Don de lait maternel */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          🍼 Don de lait maternel
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.donText, { color: theme.text }]}>
            Tu as du lait en surplus ? Des bébés ont besoin de toi !
          </Text>
          {[
            { name: 'Trouver un lactarium', desc: 'Réseau français des lactariums', url: 'https://www.lactariums-de-france.fr', color: '#AB7058' },
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

        {/* Photographes partenaires */}
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          📸 Photographes partenaires
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.donText, { color: theme.text }]}>
            Des photographes spécialisées en allaitement et maternité, sélectionnées avec soin.
          </Text>
          <View style={[styles.photoCard, { backgroundColor: theme.background }]}>
            <View style={styles.photoHeader}>
              <View style={[styles.linkIcon, { backgroundColor: '#AB705820' }]}>
                <Ionicons name="camera-outline" size={20} color="#AB7058" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.linkTitle, { color: theme.textDark }]}>Lucie Reuil</Text>
                <Text style={[styles.linkDesc, { color: theme.textLight }]}>Photographie allaitement & naissance · Narbonne (11)</Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/descorpsquivivent')}>
                <Ionicons name="logo-instagram" size={22} color="#AB7058" />
              </TouchableOpacity>
            </View>
            <View style={[styles.promoRow, { backgroundColor: '#AB705815', borderColor: '#AB705840' }]}>
              <Ionicons name="pricetag-outline" size={16} color="#AB7058" />
              <Text style={[styles.promoLabel, { color: theme.text }]}>Code promo : </Text>
              <Text style={[styles.promoCode, { color: '#AB7058' }]}>MALO10</Text>
            </View>
          </View>
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
