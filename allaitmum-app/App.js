import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
import { storage } from './src/utils/storage';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { AppProvider, useApp } from './src/utils/AppContext';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DisclaimerScreen from './src/screens/DisclaimerScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import JournalScreen from './src/screens/JournalScreen';
import RendezVousScreen from './src/screens/RendezVousScreen';
import SavoirsScreen from './src/screens/SavoirsScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { theme, isDark } = useTheme();
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBg,
            borderTopColor: theme.border,
            borderTopWidth: 1,
            height: 85,
            paddingBottom: 25,
            paddingTop: 8,
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textLight,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Suivi: 'heart',
              'Safe Place': 'cafe',
              RDV: 'calendar',
              Savoirs: 'library',
              Profil: 'person',
            };
            return <Ionicons name={icons[route.name]} size={22} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Suivi" component={DashboardScreen} />
        <Tab.Screen name="Safe Place" component={JournalScreen} />
        <Tab.Screen name="RDV" component={RendezVousScreen} />
        <Tab.Screen name="Savoirs" component={SavoirsScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>

      {/* Floating chatbot button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => setShowChatbot(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Chatbot modal */}
      <Modal
        visible={showChatbot}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowChatbot(false)}
      >
        <ChatbotScreen onClose={() => setShowChatbot(false)} />
      </Modal>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

function AppContent() {
  const { isLoading, isOnboarded } = useApp();
  const { theme } = useTheme();
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(null);

  useEffect(() => {
    storage.get('disclaimer_accepted', false).then(setDisclaimerAccepted);
  }, []);

  const handleAcceptDisclaimer = async () => {
    await storage.set('disclaimer_accepted', true);
    setDisclaimerAccepted(true);
  };

  if (isLoading || disclaimerAccepted === null) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.primary }]}>Malo</Text>
      </View>
    );
  }

  if (!disclaimerAccepted) {
    return <DisclaimerScreen onAccept={handleAcceptDisclaimer} />;
  }

  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 28,
    fontWeight: '600',
  },
});
