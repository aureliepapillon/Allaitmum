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
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { Ionicons } from '@expo/vector-icons';
import { validateBabyData, isValidEmail, isValidDate, isNotFutureDate, isValidBabyWeight, isValidBabyHeight } from '../utils/validators';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const logoImage = require('../../assets/logo-allaitmum.png');
const dashboardMascot = require('../../assets/dashboard-mascot.png');

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(1);
  const [momName, setMomName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('fille');
  const [birthWeight, setBirthWeight] = useState('');
  const [birthHeight, setBirthHeight] = useState('');
  const [method, setMethod] = useState(null);

  const methods = [
    { id: 'breast', label: 'Allaitement' },
    { id: 'pump', label: 'Tire-allaitement' },
    { id: 'bottle', label: 'Biberon' },
    { id: 'other', label: 'Autre' },
  ];

  const handleNextStep = () => {
    const validation = validateBabyData({ name, birthDate, birthWeight, birthHeight, email });
    if (!validation.isValid) {
      Alert.alert('Vérification', validation.errors[0]);
      return;
    }
    completeOnboarding(
      { name, birthDate, gender, birthWeight: birthWeight ? parseFloat(birthWeight.replace(',', '.')) : null, birthHeight: birthHeight ? parseFloat(birthHeight.replace(',', '.')) : null, momName },
      'all',
      email.trim() || null
    );
  };

  const handleComplete = (selectedMethod) => {
    completeOnboarding(
      { name, birthDate, gender, birthWeight: birthWeight ? parseFloat(birthWeight.replace(',', '.')) : null, birthHeight: birthHeight ? parseFloat(birthHeight.replace(',', '.')) : null, momName },
      selectedMethod,
      email.trim() || null
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundGradientStart }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Step 1: Welcome */}
      {step === 1 && (
        <View style={[styles.welcomeScreen, { backgroundColor: theme.backgroundGradientStart }]}>
          <Image source={logoImage} style={styles.welcomeLogo} resizeMode="contain" />
          <Text style={[styles.tagline, { color: theme.primary }]}>
            Né d'un bébé,{'\n'}pour tous les bébés
          </Text>
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: theme.primary }]}
            onPress={() => setStep(2)}
          >
            <Text style={styles.mainButtonText}>Créer mon espace</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Steps 2 & 3 */}
      {step > 1 && (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Step 2: Baby info */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            <View style={[styles.card, { backgroundColor: theme.cardTransparent }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>
                Bienvenue
              </Text>

              <Text style={[styles.label, { color: theme.text }]}>Ton prénom</Text>
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

              <Text style={[styles.label, { color: theme.text }]}>Ton email (optionnel)</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, backgroundColor: theme.inputBg, color: theme.textDark },
                ]}
                value={email}
                onChangeText={setEmail}
                placeholder="Pour recevoir les conseils et actus"
                placeholderTextColor={theme.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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

              <Text style={[styles.label, { color: theme.text }]}>Sa date de naissance (JJ/MM/AAAA)</Text>
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
                onPress={handleNextStep}
                disabled={!name || !birthDate}
              >
                <Text style={styles.mainButtonText}>Hop, on y va !</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  stepContainer: { alignItems: 'center' },

  welcomeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 60,
    gap: 24,
  },
  welcomeLogo: {
    width: 220,
    height: 220,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    textAlign: 'center',
    opacity: 0.8,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 8,
  },
  methodLabel: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
  stepIcon: { alignSelf: 'center', marginBottom: 16 },
  measureRow: { flexDirection: 'row', gap: 12 },
  step3Container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  peekMascot: {
    width: 40,
    height: '33%',
    minHeight: 200,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    left: -24,
    top: '50%',
    transform: [{ translateY: -100 }],
  },
  step3Card: {
    marginLeft: 20,
    flex: 1,
  },
});
