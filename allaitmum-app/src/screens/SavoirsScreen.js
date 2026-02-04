import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { storage } from '../utils/storage';
import { articles, categories } from '../data/articles';

export default function SavoirsScreen() {
  const { theme } = useTheme();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    storage.get('savedArticles', []).then(setSavedArticles);
  }, []);

  const toggleSave = (id) => {
    const newSaved = savedArticles.includes(id)
      ? savedArticles.filter((a) => a !== id)
      : [...savedArticles, id];
    setSavedArticles(newSaved);
    storage.set('savedArticles', newSaved);
  };

  const filtered =
    selectedCategory === 'Toutes'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  // Article detail view
  if (selectedArticle) {
    const article = articles.find((a) => a.id === selectedArticle);
    const isSaved = savedArticles.includes(article.id);

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedArticle(null)}
        >
          <Ionicons name="arrow-back" size={20} color={theme.primary} />
          <Text style={[styles.backText, { color: theme.primary }]}>Retour</Text>
        </TouchableOpacity>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.articleHeader}>
            <View style={{ flex: 1 }}>
              <View style={[styles.categoryTag, { backgroundColor: theme.primary + '20' }]}>
                <Text style={[styles.categoryTagText, { color: theme.primary }]}>
                  {article.category}
                </Text>
              </View>
              <Text style={[styles.articleTitle, { color: theme.primary }]}>
                {article.title}
              </Text>
              <Text style={[styles.articleIntro, { color: theme.text }]}>
                {article.intro}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="time" size={14} color={theme.textLight} />
                <Text style={[styles.metaText, { color: theme.textLight }]}>
                  {article.duration}
                </Text>
                <Ionicons name="document-text" size={14} color={theme.textLight} />
                <Text style={[styles.metaText, { color: theme.textLight }]}>
                  {article.source}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleSave(article.id)}>
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={28}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>

          {article.sections.map((section, idx) => (
            <View key={idx} style={styles.articleSection}>
              <Text style={[styles.sectionTitle, { color: theme.primary }]}>
                {section.title}
              </Text>
              <Text style={[styles.sectionContent, { color: theme.text }]}>
                {section.content}
              </Text>
            </View>
          ))}

          <View style={[styles.sourceBox, { backgroundColor: theme.secondary + '40' }]}>
            <Ionicons name="link" size={14} color={theme.primary} />
            <Text style={[styles.sourceText, { color: theme.text }]}>
              Sources : {article.source}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Articles list view
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.primary }]}>Savoirs</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Des infos honnêtes, sourcées, pour toutes les mamans
      </Text>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === cat ? theme.primary : theme.card,
                borderColor: theme.primary,
              },
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={{
                color: selectedCategory === cat ? '#fff' : theme.primary,
                fontSize: 13,
                fontWeight: '600',
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Saved articles */}
      {savedArticles.length > 0 && selectedCategory === 'Toutes' && (
        <View style={{ marginBottom: 16 }}>
          <Text style={[styles.sectionHeader, { color: theme.primary }]}>Mes favoris</Text>
          {articles
            .filter((a) => savedArticles.includes(a.id))
            .map((article) => (
              <TouchableOpacity
                key={article.id}
                style={[styles.articleCard, { backgroundColor: theme.primary + '10', borderColor: theme.primary + '30', borderWidth: 1 }]}
                onPress={() => setSelectedArticle(article.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.articleCardCategory, { color: theme.primary }]}>
                    {article.category}
                  </Text>
                  <Text style={[styles.articleCardTitle, { color: theme.primary }]}>
                    {article.title}
                  </Text>
                  <Text style={[styles.articleCardIntro, { color: theme.text }]} numberOfLines={2}>
                    {article.intro}
                  </Text>
                  <View style={styles.articleCardMeta}>
                    <Text style={[styles.metaText, { color: theme.textLight }]}>
                      {article.duration}
                    </Text>
                    {article.premium && (
                      <View style={[styles.premiumBadge, { backgroundColor: theme.warning }]}>
                        <Text style={styles.premiumText}>PREMIUM</Text>
                      </View>
                    )}
                  </View>
                </View>
                <Ionicons name="heart" size={20} color={theme.primary} />
              </TouchableOpacity>
            ))}
        </View>
      )}

      {/* All articles */}
      {filtered.map((article) => {
        const isSaved = savedArticles.includes(article.id);
        return (
          <TouchableOpacity
            key={article.id}
            style={[styles.articleCard, { backgroundColor: theme.card }]}
            onPress={() => setSelectedArticle(article.id)}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.articleCardCategory, { color: theme.primary }]}>
                {article.category}
              </Text>
              <Text style={[styles.articleCardTitle, { color: theme.primary }]}>
                {article.title}
              </Text>
              <Text style={[styles.articleCardIntro, { color: theme.text }]} numberOfLines={2}>
                {article.intro}
              </Text>
              <View style={styles.articleCardMeta}>
                <Text style={[styles.metaText, { color: theme.textLight }]}>
                  {article.duration} - {article.source}
                </Text>
                {article.premium && (
                  <View style={[styles.premiumBadge, { backgroundColor: theme.warning }]}>
                    <Text style={styles.premiumText}>PREMIUM</Text>
                  </View>
                )}
              </View>
            </View>
            {isSaved && <Ionicons name="heart" size={18} color={theme.primary} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 12 },
  categoryScroll: { marginBottom: 16 },
  categoryRow: { gap: 8, paddingRight: 20 },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  articleCardCategory: { fontSize: 11, fontWeight: '600', marginBottom: 4 },
  articleCardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  articleCardIntro: { fontSize: 13, lineHeight: 18, marginBottom: 6 },
  articleCardMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 11 },
  premiumBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  premiumText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  backText: { fontSize: 15, fontWeight: '500' },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  articleHeader: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  categoryTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  categoryTagText: { fontSize: 12, fontWeight: '600' },
  articleTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  articleIntro: { fontSize: 14, lineHeight: 22, marginBottom: 12 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  articleSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  sectionContent: { fontSize: 14, lineHeight: 22 },
  sourceBox: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 12, borderRadius: 10, marginTop: 8 },
  sourceText: { fontSize: 12 },
});
