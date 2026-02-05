import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { Ionicons } from '@expo/vector-icons';

const logoImage = require('../../assets/logo-allaitmum.png');
const dashboardMascot = require('../../assets/dashboard-mascot.png');

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [momName, setMomName] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('fille');
  const [birthWeight, setBirthWeight] = useState('');
  const [birthHeight, setBirthHeight] = useState('');
  const [method, setMethod] = useState(null);

  const methods = [
    { id: 'breast', icon: 'heart', label: 'Allaitement au sein', desc: 'Tétées directes' },
    { id: 'pump', icon: 'water', label: 'Tire-allaitement', desc: 'Tire-lait + biberon' },
    { id: 'mixed', icon: 'git-merge', label: 'Mixte', desc: 'Combinaison sein/biberon' },
    { id: 'bottle-bm', icon: 'flask', label: 'Biberon lait maternel', desc: 'Exclusivement' },
    { id: 'bottle-formula', icon: 'flask-outline', label: 'Biberon formule', desc: 'Lait infantile' },
    { id: 'transition', icon: 'swap-horizontal', label: 'En transition', desc: 'Ça évolue' },
  ];

  const handleComplete = (selectedMethod) => {
    completeOnboarding(
      { name, birthDate, gender, birthWeight: birthWeight ? parseFloat(birthWeight) : null, birthHeight: birthHeight ? parseFloat(birthHeight) : null, momName },
      selectedMethod
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundGradientStart }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Welcome */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Image source={logoImage} style={styles.logo} resizeMode="contain" />
            <Text style={[styles.title, { color: theme.primary }]}>Allait'mum</Text>

            <View style={[styles.card, { backgroundColor: theme.cardTransparent }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>Bienvenue</Text>
              <Text style={[styles.cardText, { color: theme.text }]}>
                Ici, toutes les mamans sont les bienvenues. Sein, tire-lait, biberon, mixte...
                Ton parcours est unique. Ton choix est respecté.
              </Text>
              <Text style={[styles.cardSubtext, { color: theme.primary }]}>
                Aucun jugement. Juste du soutien.
              </Text>
              <TouchableOpacity
                style={[styles.mainButton, { backgroundColor: theme.primary }]}
                onPress={() => setStep(2)}
              >
                <Text style={styles.mainButtonText}>Créer mon espace</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 2: Baby info */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <View style={styles.mascotRow}>
              <Image source={dashboardMascot} style={styles.stepMascot} resizeMode="contain" />
            </View>
            <View style={[styles.card, { backgroundColor: theme.cardTransparent }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                Trop contente de te voir ici !
              </Text>

              <Text style={[styles.label, { color: theme.text }]}>Ton prénom (à toi maman)</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                ]}
                value={momName}
                onChangeText={setMomName}
                placeholder="Comment tu t'appelles ?"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.label, { color: theme.text }]}>Prénom de ton bébé</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                ]}
                value={name}
                onChangeText={setName}
                placeholder="Comment s'appelle ton bout'chou ?"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.label, { color: theme.text }]}>Date de naissance (JJ/MM/AAAA)</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                ]}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="15/01/2025"
                placeholderTextColor={theme.textLight}
                keyboardType="numbers-and-punctuation"
              />

              <Text style={[styles.label, { color: theme.text }]}>Sexe</Text>
              <View style={styles.genderRow}>
                {['fille', 'garçon'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderButton,
                      {
                        borderColor: theme.primary,
                        backgroundColor: gender === g ? theme.primary + '20' : theme.card,
                      },
                    ]}
                    onPress={() => setGender(g)}
                  >
                    <Text
                      style={[
                        styles.genderText,
                        { color: theme.primary, fontWeight: gender === g ? '700' : '500' },
                      ]}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.measureRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: theme.text }]}>Poids bébé (kg)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                    ]}
                    value={birthWeight}
                    onChangeText={setBirthWeight}
                    placeholder="3.2"
                    placeholderTextColor={theme.textLight}
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.label, { color: theme.text }]}>Taille bébé (cm)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                    ]}
                    value={birthHeight}
                    onChangeText={setBirthHeight}
                    placeholder="50"
                    placeholderTextColor={theme.textLight}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.mainButton,
                  {
                    backgroundColor: !name || !birthDate ? theme.textLight : theme.primary,
                  },
                ]}
                onPress={() => setStep(3)}
                disabled={!name || !birthDate}
              >
                <Text style={styles.mainButtonText}>Hop, on y va !</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3: Feeding method */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            <View style={[styles.card, { backgroundColor: theme.cardTransparent }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                Comment nourris-tu {name} aujourd'hui ?
              </Text>
              <Text style={[styles.cardSubtext, { color: theme.text }]}>
                Pas de bon ou mauvais choix. Juste ton choix.
              </Text>

              {methods.map((m) => (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodButton,
                    {
                      backgroundColor: method === m.id ? theme.primary : theme.card,
                      borderColor: method === m.id ? theme.primary : theme.border,
                    },
                  ]}
                  onPress={() => {
                    setMethod(m.id);
                    setTimeout(() => handleComplete(m.id), 300);
                  }}
                >
                  <Ionicons
                    name={m.icon}
                    size={28}
                    color={method === m.id ? '#fff' : theme.primary}
                  />
                  <View style={styles.methodTextContainer}>
                    <Text
                      style={[
                        styles.methodLabel,
                        { color: method === m.id ? '#fff' : theme.textDark },
                      ]}
                    >
                      {m.label}
                    </Text>
                    <Text
                      style={[
                        styles.methodDesc,
                        { color: method === m.id ? 'rgba(255,255,255,0.8)' : theme.text },
                      ]}
                    >
                      {m.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  stepContainer: { alignItems: 'center' },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: { width: 150, height: 150, marginBottom: 16, borderRadius: 20 },
  title: { fontSize: 42, fontWeight: '600', marginBottom: 24 },
  card: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  cardText: { fontSize: 15, lineHeight: 24, textAlign: 'center', marginBottom: 16 },
  cardSubtext: { fontSize: 13, fontWeight: '500', textAlign: 'center', marginBottom: 20 },
  mainButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  mainButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '500', marginBottom: 6, marginTop: 16 },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    fontSize: 15,
  },
  genderRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  genderButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  genderText: { fontSize: 15 },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 8,
    gap: 12,
  },
  methodTextContainer: { flex: 1 },
  methodLabel: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  methodDesc: { fontSize: 13 },
  stepIcon: { alignSelf: 'center', marginBottom: 16 },
  measureRow: { flexDirection: 'row', gap: 12 },
  mascotRow: { alignItems: 'flex-start', width: '100%', marginBottom: 12 },
  stepMascot: { width: 180, height: 70, borderRadius: 12 },
});
