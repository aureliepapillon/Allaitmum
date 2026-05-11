import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../utils/AppContext';
import { getBabyAge } from '../utils/helpers';
import LionMascot from '../components/LionMascot';
import { validateBabyData, isValidEmail } from '../utils/validators';

export default function BabyProfileScreen({ onClose }) {
  const { theme } = useTheme();
  const { baby, activeBabyId, updateBaby, babies, deleteBaby, feedingMethod, userEmail, updateUserEmail } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(baby.name || '');
  const [birthDate, setBirthDate] = useState(baby.birthDate || '');
  const [gender, setGender] = useState(baby.gender || 'fille');
  const [birthWeight, setBirthWeight] = useState(baby.birthWeight?.toString() || '');
  const [birthHeight, setBirthHeight] = useState(baby.birthHeight?.toString() || '');
  const [momName, setMomName] = useState(baby.momName || '');
  const [email, setEmail] = useState(userEmail || '');

  const handleSave = async () => {
    // Validate data
    const validation = validateBabyData({
      name,
      birthDate,
      birthWeight,
      birthHeight,
      email,
    });

    if (!validation.isValid) {
      Alert.alert('Vérification', validation.errors[0]);
      return;
    }

    await updateBaby(activeBabyId, {
      name: name.trim(),
      birthDate,
      gender,
      birthWeight: birthWeight ? parseFloat(birthWeight.replace(',', '.')) : null,
      birthHeight: birthHeight ? parseFloat(birthHeight.replace(',', '.')) : null,
      momName: momName.trim(),
    });

    // Update email separately (global, not per baby)
    if (email.trim() !== (userEmail || '')) {
      await updateUserEmail(email.trim() || null);
    }

    setIsEditing(false);
    Alert.alert('Succès', 'Profil mis à jour !');
  };

  const handleCancel = () => {
    setName(baby.name || '');
    setBirthDate(baby.birthDate || '');
    setGender(baby.gender || 'fille');
    setBirthWeight(baby.birthWeight?.toString() || '');
    setBirthHeight(baby.birthHeight?.toString() || '');
    setMomName(baby.momName || '');
    setEmail(userEmail || '');
    setIsEditing(false);
  };

  const handleShare = async () => {
    const message = `Fiche de ${baby.name}

Prénom : ${baby.name}
Date de naissance : ${formatDisplayDate(baby.birthDate)}
Âge : ${getBabyAge(baby.birthDate)}
${baby.birthWeight ? `Poids de naissance : ${baby.birthWeight} kg` : ''}
${baby.birthHeight ? `Taille de naissance : ${baby.birthHeight} cm` : ''}
${momName ? `Maman : ${momName}` : ''}

Envoyé depuis l'app Malo`;

    try {
      await Share.share({
        message,
        title: `Fiche de ${baby.name}`,
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de partager');
    }
  };

  const handleDeleteBaby = () => {
    if (babies.length <= 1) {
      Alert.alert('Impossible', 'Vous ne pouvez pas supprimer le dernier bébé');
      return;
    }

    Alert.alert(
      'Supprimer le profil ?',
      `Êtes-vous sûr de vouloir supprimer le profil de ${baby.name} ? Cette action est irréversible.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteBaby(activeBabyId);
            onClose();
          },
        },
      ]
    );
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return '-';
    if (dateStr.includes('/')) return dateStr;
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <TouchableOpacity onPress={onClose} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Profil bébé</Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editBtn}>
            <Ionicons name="create-outline" size={24} color={theme.primary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Avatar section */}
          <View style={[styles.avatarSection, { backgroundColor: theme.card }]}>
            <LionMascot size={100} gender={gender} />
            <Text style={[styles.babyName, { color: theme.primary }]}>
              {baby.name || 'Bébé'}
            </Text>
            <Text style={[styles.babyAge, { color: theme.text }]}>
              {getBabyAge(baby.birthDate)}
            </Text>
          </View>

          {isEditing ? (
            /* Edit mode */
            <View style={[styles.formCard, { backgroundColor: theme.card }]}>
              <Text style={[styles.formTitle, { color: theme.primary }]}>
                Modifier le profil
              </Text>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Prénom *</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={name}
                onChangeText={setName}
                placeholder="Prénom du bébé"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Date de naissance</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="JJ/MM/AAAA ou AAAA-MM-JJ"
                placeholderTextColor={theme.textLight}
                keyboardType="numbers-and-punctuation"
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Genre</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    { borderColor: theme.border },
                    gender === 'fille' && { backgroundColor: '#FFCDD2', borderColor: '#E91E63' },
                  ]}
                  onPress={() => setGender('fille')}
                >
                  <Text style={[styles.genderText, gender === 'fille' && { color: '#E91E63' }]}>
                    Fille
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderBtn,
                    { borderColor: theme.border },
                    gender === 'garçon' && { backgroundColor: '#BBDEFB', borderColor: '#2196F3' },
                  ]}
                  onPress={() => setGender('garçon')}
                >
                  <Text style={[styles.genderText, gender === 'garçon' && { color: '#2196F3' }]}>
                    Garçon
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Poids de naissance (kg)</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={birthWeight}
                onChangeText={setBirthWeight}
                placeholder="Ex: 3.2"
                placeholderTextColor={theme.textLight}
                keyboardType="decimal-pad"
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Taille de naissance (cm)</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={birthHeight}
                onChangeText={setBirthHeight}
                placeholder="Ex: 50"
                placeholderTextColor={theme.textLight}
                keyboardType="decimal-pad"
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Prénom de maman</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={momName}
                onChangeText={setMomName}
                placeholder="Ton prénom"
                placeholderTextColor={theme.textLight}
              />

              <Text style={[styles.inputLabel, { color: theme.textDark }]}>Email</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.textDark, backgroundColor: theme.inputBg }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Ton email (optionnel)"
                placeholderTextColor={theme.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.formBtn, { backgroundColor: theme.background }]}
                  onPress={handleCancel}
                >
                  <Text style={[styles.formBtnText, { color: theme.textDark }]}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formBtn, { backgroundColor: theme.primary }]}
                  onPress={handleSave}
                >
                  <Text style={[styles.formBtnText, { color: '#fff' }]}>Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* View mode */
            <>
              <View style={[styles.infoCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.cardTitle, { color: theme.primary }]}>Informations</Text>

                <View style={styles.infoRow}>
                  <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name="calendar-outline" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.infoLabel, { color: theme.textLight }]}>Date de naissance</Text>
                    <Text style={[styles.infoValue, { color: theme.textDark }]}>
                      {formatDisplayDate(baby.birthDate)}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name="fitness-outline" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.infoLabel, { color: theme.textLight }]}>Poids de naissance</Text>
                    <Text style={[styles.infoValue, { color: theme.textDark }]}>
                      {baby.birthWeight ? `${baby.birthWeight} kg` : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name="resize-outline" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.infoLabel, { color: theme.textLight }]}>Taille de naissance</Text>
                    <Text style={[styles.infoValue, { color: theme.textDark }]}>
                      {baby.birthHeight ? `${baby.birthHeight} cm` : '-'}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name="nutrition-outline" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.infoLabel, { color: theme.textLight }]}>Mode d'alimentation</Text>
                    <Text style={[styles.infoValue, { color: theme.textDark }]}>
                      {feedingMethod === 'breast' ? 'Allaitement' : feedingMethod === 'bottle' ? 'Biberon' : feedingMethod === 'mixed' ? 'Mixte' : feedingMethod || '-'}
                    </Text>
                  </View>
                </View>

                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                  <View style={[styles.infoIcon, { backgroundColor: theme.secondary }]}>
                    <Ionicons name="mail-outline" size={18} color={theme.primary} />
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={[styles.infoLabel, { color: theme.textLight }]}>Email</Text>
                    <Text style={[styles.infoValue, { color: theme.textDark }]}>
                      {userEmail || 'Non renseigné'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View style={[styles.actionsCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.cardTitle, { color: theme.primary }]}>Actions</Text>

                <TouchableOpacity
                  style={styles.actionRow}
                  onPress={handleShare}
                >
                  <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="share-social-outline" size={20} color="#2196F3" />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={[styles.actionTitle, { color: theme.textDark }]}>
                      Partager le profil
                    </Text>
                    <Text style={[styles.actionSubtitle, { color: theme.textLight }]}>
                      Envoyer les infos à un proche
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.textLight} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionRow}
                  onPress={() => setIsEditing(true)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="create-outline" size={20} color="#4CAF50" />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={[styles.actionTitle, { color: theme.textDark }]}>
                      Modifier le profil
                    </Text>
                    <Text style={[styles.actionSubtitle, { color: theme.textLight }]}>
                      Mettre à jour les informations
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.textLight} />
                </TouchableOpacity>

                {babies.length > 1 && (
                  <TouchableOpacity
                    style={[styles.actionRow, { borderBottomWidth: 0 }]}
                    onPress={handleDeleteBaby}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: '#FFEBEE' }]}>
                      <Ionicons name="trash-outline" size={20} color="#F44336" />
                    </View>
                    <View style={styles.actionContent}>
                      <Text style={[styles.actionTitle, { color: '#F44336' }]}>
                        Supprimer le profil
                      </Text>
                      <Text style={[styles.actionSubtitle, { color: theme.textLight }]}>
                        Retirer ce bébé de l'app
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.textLight} />
                  </TouchableOpacity>
                )}
              </View>

              {/* Co-parent section */}
              <View style={[styles.coparentCard, { backgroundColor: theme.secondary + '40' }]}>
                <Ionicons name="people-outline" size={24} color={theme.primary} />
                <View style={styles.coparentContent}>
                  <Text style={[styles.coparentTitle, { color: theme.textDark }]}>
                    Partage avec un co-parent
                  </Text>
                  <Text style={[styles.coparentSubtitle, { color: theme.textLight }]}>
                    Bientôt disponible ! Invitez le papa ou un proche à suivre bébé ensemble.
                  </Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
  editBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { padding: 16, paddingBottom: 40 },

  avatarSection: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  babyName: { fontSize: 24, fontWeight: '700', marginTop: 12 },
  babyAge: { fontSize: 15, marginTop: 4 },

  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 17, fontWeight: '600', marginBottom: 16 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12 },
  infoValue: { fontSize: 15, fontWeight: '500', marginTop: 2 },

  actionsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: { flex: 1 },
  actionTitle: { fontSize: 15, fontWeight: '500' },
  actionSubtitle: { fontSize: 12, marginTop: 2 },

  coparentCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  coparentContent: { flex: 1 },
  coparentTitle: { fontSize: 15, fontWeight: '600' },
  coparentSubtitle: { fontSize: 13, marginTop: 4, lineHeight: 18 },

  formCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  formTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  inputLabel: { fontSize: 14, fontWeight: '500', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
  },
  genderText: { fontSize: 15, fontWeight: '600', color: '#666' },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  formBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  formBtnText: { fontSize: 16, fontWeight: '600' },
});
