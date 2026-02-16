import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../utils/AppContext';
import { useTheme } from '../theme/ThemeContext';

/**
 * PremiumGate component - wraps premium features and shows upgrade prompt if not premium
 * Usage:
 *   <PremiumGate featureName="Export PDF" onUpgrade={() => setActiveScreen('subscription')}>
 *     <MyPremiumFeature />
 *   </PremiumGate>
 */
export function PremiumGate({ children, featureName, onUpgrade }) {
  const { isPremium } = useApp();
  const { theme } = useTheme();

  // If user is premium, just render the children
  if (isPremium) {
    return children;
  }

  // Otherwise show upgrade prompt
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { backgroundColor: theme.card }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed" size={50} color="#FFB300" />
        </View>
        <Text style={[styles.title, { color: theme.primary }]}>
          Fonctionnalité Premium
        </Text>
        <Text style={[styles.description, { color: theme.textDark }]}>
          {featureName ? `"${featureName}" est` : 'Cette fonctionnalité est'} réservée aux abonnés Premium.
        </Text>
        <Text style={[styles.price, { color: theme.textDark }]}>
          À partir de 2,99 € / mois
        </Text>
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={onUpgrade}
        >
          <Ionicons name="star" size={20} color="#fff" />
          <Text style={styles.upgradeBtnText}>Passer à Premium</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * PremiumModal - shows a modal prompt to upgrade
 * Usage:
 *   <PremiumModal
 *     visible={showPremiumModal}
 *     onClose={() => setShowPremiumModal(false)}
 *     onUpgrade={() => { setShowPremiumModal(false); setActiveScreen('subscription'); }}
 *     featureName="Export PDF"
 *   />
 */
export function PremiumModal({ visible, onClose, onUpgrade, featureName }) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.textDark} />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <Ionicons name="star" size={50} color="#FFB300" />
          </View>

          <Text style={[styles.modalTitle, { color: theme.primary }]}>
            Passe à Premium
          </Text>

          <Text style={[styles.modalDescription, { color: theme.textDark }]}>
            {featureName ? `"${featureName}" est une` : 'C\'est une'} fonctionnalité Premium.
          </Text>

          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={18} color="#FFB300" />
              <Text style={[styles.benefitText, { color: theme.textDark }]}>
                Bébé Book complet
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={18} color="#FFB300" />
              <Text style={[styles.benefitText, { color: theme.textDark }]}>
                Export PDF
              </Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={18} color="#FFB300" />
              <Text style={[styles.benefitText, { color: theme.textDark }]}>
                Sans publicité
              </Text>
            </View>
          </View>

          <Text style={[styles.modalPrice, { color: theme.textDark }]}>
            À partir de 2,99 € / mois
          </Text>

          <TouchableOpacity style={styles.upgradeBtn} onPress={onUpgrade}>
            <Ionicons name="rocket" size={20} color="#fff" />
            <Text style={styles.upgradeBtnText}>Voir les offres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.laterBtn} onPress={onClose}>
            <Text style={[styles.laterBtnText, { color: theme.textDark }]}>
              Plus tard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/**
 * Hook to check premium status and trigger upgrade modal
 */
export function usePremiumFeature() {
  const { isPremium } = useApp();
  const [showModal, setShowModal] = React.useState(false);

  const checkPremium = (callback) => {
    if (isPremium) {
      callback();
      return true;
    }
    setShowModal(true);
    return false;
  };

  return {
    isPremium,
    showModal,
    setShowModal,
    checkPremium,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  price: {
    fontSize: 14,
    marginBottom: 24,
    opacity: 0.7,
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFB300',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: '100%',
  },
  upgradeBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },
  benefitsList: {
    width: '100%',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  benefitText: {
    fontSize: 14,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  laterBtn: {
    marginTop: 12,
    paddingVertical: 10,
  },
  laterBtnText: {
    fontSize: 14,
  },
});
