import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const botResponses = [
  {
    keywords: ['crevasse', 'mal', 'douleur', 'mamelon', 'fait mal'],
    answer:
      "Les crevasses sont souvent liées à une mauvaise prise du sein. Essaie la position biological nurturing (toi semi-allongée, bébé sur toi). Applique de la lanoline pure après chaque tétée. Si ça persiste 48h, consulte une IBCLC (consultante en lactation).\n\nSource : La Leche League France",
  },
  {
    keywords: ['engorgement', 'dur', 'gonflé', 'sein dur'],
    answer:
      "Avant la tétée : chaleur + massage doux. Pendant : laisse bébé téter, compression du sein. Après : froid + feuilles de chou. Ibuprofène OK (compatible allaitement). Ne saute jamais de tétée !\n\nSource : La Leche League",
  },
  {
    keywords: ['mastite', 'fièvre', 'rouge', 'infection'],
    answer:
      "Mastite = URGENCE. Consulte dans les 24h. CONTINUE d'allaiter (essentiel !). Repos total. Les antibiotiques pour mastite sont TOUS compatibles avec l'allaitement. Ne t'arrête pas !\n\nVérifie sur e-lactancia.org",
  },
  {
    keywords: ['médicament', 'medicament', 'prendre', 'compatible', 'antibiotique'],
    answer:
      "90% des médicaments sont compatibles avec l'allaitement. Vérifie TOUJOURS sur :\n\n• e-lactancia.org (référence mondiale)\n• lecrat.fr (CRAT, référence française)\n\nSi ton médecin te dit d'arrêter \"par précaution\", vérifie d'abord sur ces sites.",
  },
  {
    keywords: ['pas assez', 'production', 'manque', 'plus de lait', 'assez de lait'],
    answer:
      "Avant de paniquer : vérifie les VRAIS signes (poids de bébé, couches mouillées). Seins mous = NORMAL (pas un signe de manque).\n\nPour booster : tétées fréquentes, power pumping (20-10-10-10-10 min), avoine, fenouil, hydratation. Résultats en 48-72h.\n\nSource : La Leche League",
  },
  {
    keywords: ['tire-lait', 'tire lait', 'tirer', 'pompe', 'pompage'],
    answer:
      "Taille de téterelle = ESSENTIELLE (mamelon doit bouger librement). Mode stimulation puis expression. Compression du sein pendant le tirage. Regarde une photo de bébé.\n\nConservation : ambiante 4-6h, frigo 48h, congélo 4-6 mois.\n\nEn France : location en pharmacie remboursée sur ordonnance !",
  },
  {
    keywords: ['nuit', 'dort pas', 'réveille', 'sommeil', 'dodo'],
    answer:
      "Les tétées de nuit sont NORMALES et essentielles (prolactine max la nuit). Nouveau-né : 2-4 tétées/nuit. 3-6 mois : 1-3. Ne les supprime pas trop tôt.\n\nLe cododo sécuritaire facilite l'allaitement nocturne. Matelas ferme, pas de couette/oreiller près de bébé.",
  },
  {
    keywords: ['sevrage', 'arrêter', 'sevrer', 'stop'],
    answer:
      "Le bon moment pour sevrer = QUAND TU VEUX. Pas de jugement.\n\nComment : supprime UNE tétée à la fois, attends 3-5 jours entre chaque. Commence par la moins importante. Garde matin/soir en dernier.\n\nChaque goutte de lait que tu as donnée compte.",
  },
  {
    keywords: ['diversification', 'solide', 'manger', 'purée', 'dme'],
    answer:
      "OMS : 6 mois révolus. Signes de prêt : tient assis, plus de réflexe de poussée de langue, intéressé par la nourriture.\n\nPurées OU DME OU les deux ! Pas de \"meilleure\" méthode. Le lait reste l'aliment principal jusqu'à 1 an.",
  },
  {
    keywords: ['travail', 'reprise', 'boulot', 'employeur'],
    answer:
      "Tes droits (Code du travail, art. L1225-30) :\n• 1h/jour pour allaiter (pendant 1 an)\n• 2x30 min sur temps de travail\n• Local dédié obligatoire (>100 salariés)\n\nTon employeur NE PEUT PAS refuser. C'est la LOI.",
  },
  {
    keywords: ['vaccin', 'vaccination', 'piqûre'],
    answer:
      "Tous les vaccins classiques sont compatibles avec l'allaitement (COVID, grippe inclus). Tu peux allaiter juste après le vaccin pour réconforter bébé.\n\nPour le calendrier vaccinal de ton bébé, regarde l'onglet Vaccins de l'app.",
  },
  {
    keywords: ['culpab', 'nulle', 'mauvaise mère', 'échec'],
    answer:
      "Tu n'es PAS une mauvaise mère. Tu fais de ton mieux, et c'est déjà ÉNORME.\n\nQuel que soit ton parcours (sein, biberon, mixte), ton bébé est nourri, aimé, et c'est tout ce qui compte.\n\nSi tu te sens débordée, parle à quelqu'un. SOS Allaitement, ta sage-femme, ou une consultante en lactation sont là pour toi.",
  },
  {
    keywords: ['café', 'caféine', 'thé'],
    answer:
      "2-3 cafés par jour : OK pendant l'allaitement. Évite après 15h si bébé semble agité. Attention : le thé vert contient aussi de la caféine.",
  },
  {
    keywords: ['alcool', 'vin', 'bière'],
    answer:
      "Occasionnel : OK avec précautions. 1 verre = attends 2-3h avant la prochaine tétée. Ou tire AVANT de boire. Pas besoin de \"jeter\" le lait (c'est un mythe).",
  },
  {
    keywords: ['muguet', 'candida', 'blanc', 'bouche'],
    answer:
      "Si bébé a des plaques blanches dans la bouche + douleur brûlante pour toi = muguet (Candida). Traitement : Nystatine pour bébé ET toi. Stérilise tout. Traite les deux en même temps.",
  },
];

const getResponse = (input) => {
  const lower = input.toLowerCase();
  for (const r of botResponses) {
    if (r.keywords.some((k) => lower.includes(k))) {
      return r.answer;
    }
  }
  return "Je n'ai pas de réponse précise à cette question, mais voici mes conseils :\n\n• Vérifie sur e-lactancia.org (médicaments)\n• Vérifie sur lecrat.fr (CRAT)\n• Contacte La Leche League (lllfrance.org)\n• Consulte une IBCLC (consultante en lactation)\n\nN'hésite pas à reformuler ta question avec des mots-clés comme : crevasse, engorgement, médicament, production, tire-lait, sevrage...";
};

export default function ChatbotScreen({ onClose }) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Salut ! Je suis l'assistante Allait'mum. Pose-moi tes questions sur l'allaitement, les médicaments, le tire-lait, le sommeil... Je suis là pour t'aider !",
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    const botMsg = { id: Date.now() + 1, from: 'bot', text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles" size={24} color="#fff" />
          <View>
            <Text style={styles.headerTitle}>Assistante Allait'mum</Text>
            <Text style={styles.headerSub}>Questions allaitement</Text>
          </View>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.from === 'user'
                ? [styles.userBubble, { backgroundColor: theme.primary }]
                : [styles.botBubble, { backgroundColor: theme.card }],
            ]}
          >
            {msg.from === 'bot' && (
              <Ionicons
                name="heart-circle"
                size={20}
                color={theme.primary}
                style={{ marginBottom: 4 }}
              />
            )}
            <Text
              style={[
                styles.bubbleText,
                { color: msg.from === 'user' ? '#fff' : theme.textDark },
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick questions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickScroll}
        contentContainerStyle={styles.quickRow}
      >
        {['Crevasses', 'Médicaments', 'Production de lait', 'Tire-lait', 'Sommeil', 'Sevrage'].map(
          (q) => (
            <TouchableOpacity
              key={q}
              style={[styles.quickButton, { borderColor: theme.primary }]}
              onPress={() => {
                setInput(q);
                setTimeout(() => send(), 50);
              }}
            >
              <Text style={[styles.quickText, { color: theme.primary }]}>{q}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputRow, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.textDark, borderColor: theme.border }]}
          value={input}
          onChangeText={setInput}
          placeholder="Pose ta question..."
          placeholderTextColor={theme.textLight}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.primary }]}
          onPress={send}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  messages: { flex: 1 },
  messagesContent: { padding: 16, paddingBottom: 8 },
  bubble: { maxWidth: '85%', padding: 14, borderRadius: 18, marginBottom: 10 },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: { fontSize: 14, lineHeight: 22 },
  quickScroll: { maxHeight: 44 },
  quickRow: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  quickButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderWidth: 1.5 },
  quickText: { fontSize: 12, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
