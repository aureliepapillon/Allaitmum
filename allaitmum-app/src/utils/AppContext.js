import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';
import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';
import { storage } from './storage';

const AppContext = createContext();

// RevenueCat API Keys (à remplacer par tes vraies clés)
const REVENUECAT_API_KEY_IOS = 'appl_XXXXXXXXXXXXXXXXXXXXXXXXX';
const REVENUECAT_API_KEY_ANDROID = 'goog_XXXXXXXXXXXXXXXXXXXXXXXXX';

// Entitlement ID configuré dans RevenueCat dashboard
const PREMIUM_ENTITLEMENT_ID = 'premium';

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // User email (global, not per baby)
  const [userEmail, setUserEmail] = useState(null);

  // Subscription / Premium status
  const [isPremium, setIsPremium] = useState(true); // Toutes les fonctionnalités gratuites en v1.0
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [offerings, setOfferings] = useState(null);
  const [trialEndDate, setTrialEndDate] = useState(null);

  // Multi-baby support
  const [babies, setBabies] = useState([]);
  const [activeBabyId, setActiveBabyId] = useState(null);
  const [feedingMethod, setFeedingMethod] = useState(null);

  // Feeding
  const [feedingSessions, setFeedingSessions] = useState([]);
  const [activeFeeding, setActiveFeeding] = useState(null);

  // Diapers
  const [diaperEntries, setDiaperEntries] = useState([]);

  // Sleep
  const [sleepSessions, setSleepSessions] = useState([]);
  const [activeSleep, setActiveSleep] = useState(null);

  // Journal
  const [moodEntries, setMoodEntries] = useState([]);

  // Vaccines
  const [vaccinesDone, setVaccinesDone] = useState([]);

  // Growth
  const [growthEntries, setGrowthEntries] = useState([]);

  // Souvenirs / Bébé Book
  const [souvenirs, setSouvenirs] = useState([]);

  // Dents / Teeth
  const [teeth, setTeeth] = useState([]);

  // Médicaments & Allergies
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);

  // Étapes motrices
  const [milestones, setMilestones] = useState([]);

  // Reminders (notifications)
  const [reminders, setReminders] = useState({ vitaminD: null, medications: [] });

  // Rendez-vous (appointments)
  const [appointments, setAppointments] = useState([]);

  // Computed: active baby (backward-compatible "baby" object)
  const baby = useMemo(() => {
    if (!babies.length) return { name: '', birthDate: '', gender: 'fille', birthWeight: null, birthHeight: null, momName: '' };
    return babies.find((b) => b.id === activeBabyId) || babies[0];
  }, [babies, activeBabyId]);

  // Load data on mount (with migration from old single-baby format)
  useEffect(() => {
    const loadAll = async () => {
      const savedBabies = await storage.get('babies');
      const savedActiveBabyId = await storage.get('activeBabyId');
      const savedMethod = await storage.get('feedingMethod');
      const savedEmail = await storage.get('userEmail');
      const savedFeedings = await storage.get('feedingSessions', []);
      const savedDiapers = await storage.get('diaperEntries', []);
      const savedSleep = await storage.get('sleepSessions', []);
      const savedMoods = await storage.get('moodEntries', []);
      const savedVaccines = await storage.get('vaccinesDone', []);
      const savedGrowth = await storage.get('growthEntries', []);
      const savedSouvenirs = await storage.get('souvenirs', []);
      const savedTeeth = await storage.get('teeth', []);
      const savedMedications = await storage.get('medications', []);
      const savedAllergies = await storage.get('allergies', []);
      const savedMilestones = await storage.get('milestones', []);
      const savedReminders = await storage.get('reminders', { vitaminD: null, medications: [] });
      const savedAppointments = await storage.get('appointments', []);
      const savedTrialEndDate = await storage.get('trialEndDate');

      // Check trial status
      if (savedTrialEndDate) {
        setTrialEndDate(savedTrialEndDate);
        if (new Date(savedTrialEndDate) > new Date()) {
          setIsPremium(true);
        }
      }

      if (savedBabies && savedBabies.length > 0 && savedMethod) {
        // New format: multi-baby
        setBabies(savedBabies);
        setActiveBabyId(savedActiveBabyId || savedBabies[0].id);
        setFeedingMethod(savedMethod);
        setUserEmail(savedEmail);
        setIsOnboarded(true);
      } else {
        // Migration from old single-baby format
        const savedBaby = await storage.get('baby');
        if (savedBaby && savedMethod) {
          const migratedBaby = { ...savedBaby, id: 1, feedingMethod: savedMethod };
          const newBabies = [migratedBaby];
          setBabies(newBabies);
          setActiveBabyId(1);
          setFeedingMethod(savedMethod);
          setIsOnboarded(true);
          // Save in new format
          await storage.set('babies', newBabies);
          await storage.set('activeBabyId', 1);
          // Tag existing entries with babyId
          const taggedFeedings = savedFeedings.map((e) => ({ ...e, babyId: e.babyId || 1 }));
          const taggedDiapers = savedDiapers.map((e) => ({ ...e, babyId: e.babyId || 1 }));
          const taggedSleep = savedSleep.map((e) => ({ ...e, babyId: e.babyId || 1 }));
          const taggedMoods = savedMoods.map((e) => ({ ...e, babyId: e.babyId || 1 }));
          const taggedVaccines = savedVaccines; // vaccines are just IDs, will handle per-baby later
          const taggedGrowth = savedGrowth.map((e) => ({ ...e, babyId: e.babyId || 1 }));
          setFeedingSessions(taggedFeedings);
          setDiaperEntries(taggedDiapers);
          setSleepSessions(taggedSleep);
          setMoodEntries(taggedMoods);
          setVaccinesDone(taggedVaccines);
          setGrowthEntries(taggedGrowth);
          setIsLoading(false);
          return;
        }
      }

      setFeedingSessions(savedFeedings);
      setDiaperEntries(savedDiapers);
      setSleepSessions(savedSleep);
      setMoodEntries(savedMoods);
      setVaccinesDone(savedVaccines);
      setGrowthEntries(savedGrowth);
      setSouvenirs(savedSouvenirs);
      setTeeth(savedTeeth);
      setMedications(savedMedications);
      setAllergies(savedAllergies);
      setMilestones(savedMilestones);
      setReminders(savedReminders);
      setAppointments(savedAppointments);
      setIsLoading(false);
    };
    loadAll();
  }, []);

  // Initialize RevenueCat
  useEffect(() => {
    const initRevenueCat = async () => {
      if (isExpoGo) return; // RevenueCat ne fonctionne pas dans Expo Go
      try {
        const apiKey = Platform.OS === 'ios' ? REVENUECAT_API_KEY_IOS : REVENUECAT_API_KEY_ANDROID;

        await Purchases.configure({ apiKey });

        // Check current subscription status
        const customerInfo = await Purchases.getCustomerInfo();
        checkPremiumStatus(customerInfo);

        // Get available offerings (products)
        const offeringsResult = await Purchases.getOfferings();
        if (offeringsResult.current) {
          setOfferings(offeringsResult.current);
        }

        // Listen for subscription changes
        Purchases.addCustomerInfoUpdateListener((info) => {
          checkPremiumStatus(info);
        });
      } catch (error) {
        // RevenueCat not available (Expo Go) - use dev mode
        console.log('RevenueCat init error (normal in Expo Go):', error.message);
      }
    };

    initRevenueCat();
  }, []);

  const checkPremiumStatus = (customerInfo) => {
    const isPremiumActive = customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined;
    setIsPremium(isPremiumActive);
    setSubscriptionInfo(customerInfo);
  };

  // Purchase a package
  const purchasePackage = async (packageToPurchase) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
      checkPremiumStatus(customerInfo);
      return { success: true };
    } catch (error) {
      if (!error.userCancelled) {
        console.error('Purchase error:', error);
        return { success: false, error: error.message };
      }
      return { success: false, cancelled: true };
    }
  };

  // Restore purchases
  const restorePurchases = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      checkPremiumStatus(customerInfo);
      return {
        success: true,
        isPremium: customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined
      };
    } catch (error) {
      console.error('Restore error:', error);
      return { success: false, error: error.message };
    }
  };

  // Set user ID for RevenueCat (when user provides email)
  const setRevenueCatUserId = async (userId) => {
    try {
      await Purchases.logIn(userId);
    } catch (error) {
      console.log('RevenueCat login error:', error.message);
    }
  };

  // Auto-save
  useEffect(() => {
    if (!isLoading) storage.set('feedingSessions', feedingSessions);
  }, [feedingSessions]);

  useEffect(() => {
    if (!isLoading) storage.set('diaperEntries', diaperEntries);
  }, [diaperEntries]);

  useEffect(() => {
    if (!isLoading) storage.set('sleepSessions', sleepSessions);
  }, [sleepSessions]);

  useEffect(() => {
    if (!isLoading) storage.set('moodEntries', moodEntries);
  }, [moodEntries]);

  useEffect(() => {
    if (!isLoading) storage.set('vaccinesDone', vaccinesDone);
  }, [vaccinesDone]);

  useEffect(() => {
    if (!isLoading) storage.set('growthEntries', growthEntries);
  }, [growthEntries]);

  useEffect(() => {
    if (!isLoading) storage.set('souvenirs', souvenirs);
  }, [souvenirs]);

  useEffect(() => {
    if (!isLoading) storage.set('teeth', teeth);
  }, [teeth]);

  useEffect(() => {
    if (!isLoading) storage.set('medications', medications);
  }, [medications]);

  useEffect(() => {
    if (!isLoading) storage.set('allergies', allergies);
  }, [allergies]);

  useEffect(() => {
    if (!isLoading) storage.set('milestones', milestones);
  }, [milestones]);

  useEffect(() => {
    if (!isLoading) storage.set('reminders', reminders);
  }, [reminders]);

  useEffect(() => {
    if (!isLoading) storage.set('appointments', appointments);
  }, [appointments]);

  useEffect(() => {
    if (!isLoading && babies.length > 0) storage.set('babies', babies);
  }, [babies]);

  useEffect(() => {
    if (!isLoading && activeBabyId) storage.set('activeBabyId', activeBabyId);
  }, [activeBabyId]);

  const completeOnboarding = async (babyData, method, email = null) => {
    const newBaby = { ...babyData, id: Date.now(), feedingMethod: method };
    const newBabies = [newBaby];
    setBabies(newBabies);
    setActiveBabyId(newBaby.id);
    setFeedingMethod(method);
    setUserEmail(email);
    await storage.set('babies', newBabies);
    await storage.set('activeBabyId', newBaby.id);
    await storage.set('feedingMethod', method);
    if (email) await storage.set('userEmail', email);

    // Démarrer le trial 30 jours
    const existingTrial = await storage.get('trialEndDate');
    if (!existingTrial) {
      const end = new Date();
      end.setDate(end.getDate() + 30);
      const endStr = end.toISOString();
      await storage.set('trialEndDate', endStr);
      setTrialEndDate(endStr);
      setIsPremium(true);
    }

    setIsOnboarded(true);
  };

  const addBaby = async (babyData, method) => {
    const newBaby = { ...babyData, id: Date.now(), feedingMethod: method };
    const updated = [...babies, newBaby];
    setBabies(updated);
    setActiveBabyId(newBaby.id);
    setFeedingMethod(method);
    await storage.set('babies', updated);
    await storage.set('activeBabyId', newBaby.id);
    await storage.set('feedingMethod', method);
  };

  const switchBaby = async (babyId) => {
    const targetBaby = babies.find((b) => b.id === babyId);
    if (targetBaby) {
      setActiveBabyId(babyId);
      setFeedingMethod(targetBaby.feedingMethod || feedingMethod);
      await storage.set('activeBabyId', babyId);
    }
  };

  const updateBaby = async (babyId, updates) => {
    const updated = babies.map((b) => (b.id === babyId ? { ...b, ...updates } : b));
    setBabies(updated);
    await storage.set('babies', updated);
  };

  const deleteBaby = async (babyId) => {
    if (babies.length <= 1) return; // Cannot delete the last baby
    const updated = babies.filter((b) => b.id !== babyId);
    setBabies(updated);
    if (activeBabyId === babyId) {
      setActiveBabyId(updated[0].id);
      await storage.set('activeBabyId', updated[0].id);
    }
    await storage.set('babies', updated);
  };

  const updateUserEmail = async (email) => {
    setUserEmail(email);
    await storage.set('userEmail', email);
  };

  const resetApp = async () => {
    await storage.clear();
    setBabies([]);
    setActiveBabyId(null);
    setFeedingMethod(null);
    setFeedingSessions([]);
    setActiveFeeding(null);
    setDiaperEntries([]);
    setSleepSessions([]);
    setActiveSleep(null);
    setMoodEntries([]);
    setVaccinesDone([]);
    setGrowthEntries([]);
    setSouvenirs([]);
    setTeeth([]);
    setMedications([]);
    setAllergies([]);
    setMilestones([]);
    setReminders({ vitaminD: null, medications: [] });
    setIsOnboarded(false);
  };

  // Feeding actions
  const startFeeding = (side, type) => {
    setActiveFeeding({ side, type, startTime: new Date().toISOString(), babyId: activeBabyId });
  };

  const stopFeeding = (volumeMl = null) => {
    if (!activeFeeding) return;
    const duration = Math.round((new Date() - new Date(activeFeeding.startTime)) / 1000);
    const entry = {
      ...activeFeeding,
      duration,
      volumeMl,
      id: Date.now(),
      endTime: new Date().toISOString(),
    };
    setFeedingSessions((prev) => [entry, ...prev]);
    setActiveFeeding(null);
  };

  const cancelFeeding = () => setActiveFeeding(null);

  // Diaper actions
  const addDiaper = (type, notes = '') => {
    const entry = {
      id: Date.now(),
      babyId: activeBabyId,
      type, // 'pipi', 'caca', 'mixte'
      notes,
      timestamp: new Date().toISOString(),
    };
    setDiaperEntries((prev) => [entry, ...prev]);
  };

  // Sleep actions
  const startSleep = () => {
    setActiveSleep({ startTime: new Date().toISOString(), babyId: activeBabyId });
  };

  const stopSleep = () => {
    if (!activeSleep) return;
    const duration = Math.round((new Date() - new Date(activeSleep.startTime)) / 1000);
    const entry = {
      ...activeSleep,
      duration,
      id: Date.now(),
      endTime: new Date().toISOString(),
    };
    setSleepSessions((prev) => [entry, ...prev]);
    setActiveSleep(null);
  };

  const cancelSleep = () => setActiveSleep(null);

  // Vaccine actions
  const toggleVaccine = (vaccineId, date = null) => {
    setVaccinesDone((prev) => {
      // Migration: si c'est un simple ID string, on garde la compatibilité
      const isAlreadyDone = prev.some(v =>
        (typeof v === 'string' && v === vaccineId) ||
        (v && v.vaccineId === vaccineId)
      );

      if (isAlreadyDone) {
        return prev.filter(v =>
          (typeof v === 'string' && v !== vaccineId) &&
          (!v || v.vaccineId !== vaccineId)
        );
      } else {
        return [...prev, { vaccineId, date: date || new Date().toISOString().split('T')[0], babyId: activeBabyId }];
      }
    });
  };

  // Helper to check if vaccine is done
  const isVaccineDone = (vaccineId) => {
    return vaccinesDone.some(v =>
      (typeof v === 'string' && v === vaccineId) ||
      (v && v.vaccineId === vaccineId && (!v.babyId || v.babyId === activeBabyId))
    );
  };

  // Get vaccine date if done
  const getVaccineDate = (vaccineId) => {
    const found = vaccinesDone.find(v =>
      (v && v.vaccineId === vaccineId && (!v.babyId || v.babyId === activeBabyId))
    );
    return found ? found.date : null;
  };

  // Souvenir actions
  const addSouvenir = (type, title, description = '', date = null) => {
    const entry = {
      id: Date.now(),
      babyId: activeBabyId,
      type, // 'premier_mot', 'premiere_fois', 'expression', 'moment'
      title,
      description,
      date: date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setSouvenirs((prev) => [entry, ...prev]);
  };

  const deleteSouvenir = (id) => {
    setSouvenirs((prev) => prev.filter((s) => s.id !== id));
  };

  // Teeth actions
  const toggleTooth = (toothId, date = null) => {
    setTeeth((prev) => {
      const existing = prev.find((t) => t.toothId === toothId && t.babyId === activeBabyId);
      if (existing) {
        return prev.filter((t) => !(t.toothId === toothId && t.babyId === activeBabyId));
      }
      return [...prev, {
        id: Date.now(),
        babyId: activeBabyId,
        toothId,
        date: date || new Date().toISOString().split('T')[0],
      }];
    });
  };

  // Medication actions
  const addMedication = (name, dosage, frequency, startDate, endDate = null, notes = '') => {
    const entry = {
      id: Date.now(),
      babyId: activeBabyId,
      name,
      dosage,
      frequency,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate,
      notes,
      active: true,
      createdAt: new Date().toISOString(),
    };
    setMedications((prev) => [entry, ...prev]);
  };

  const updateMedication = (id, updates) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteMedication = (id) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  // Allergy actions
  const addAllergy = (name, severity, reaction = '', discoveredDate = null) => {
    const entry = {
      id: Date.now(),
      babyId: activeBabyId,
      name,
      severity, // 'légère', 'modérée', 'sévère'
      reaction,
      discoveredDate: discoveredDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setAllergies((prev) => [entry, ...prev]);
  };

  const deleteAllergy = (id) => {
    setAllergies((prev) => prev.filter((a) => a.id !== id));
  };

  // Reminder actions
  const updateReminders = (newReminders) => {
    setReminders(newReminders);
  };

  // Milestone actions
  const toggleMilestone = (milestoneId, date = null) => {
    setMilestones((prev) => {
      const existing = prev.find((m) => m.milestoneId === milestoneId && m.babyId === activeBabyId);
      if (existing) {
        return prev.filter((m) => !(m.milestoneId === milestoneId && m.babyId === activeBabyId));
      }
      return [...prev, {
        id: Date.now(),
        babyId: activeBabyId,
        milestoneId,
        date: date || new Date().toISOString().split('T')[0],
      }];
    });
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isOnboarded,
        baby,
        babies,
        activeBabyId,
        feedingMethod,
        userEmail,
        completeOnboarding,
        addBaby,
        switchBaby,
        updateBaby,
        deleteBaby,
        updateUserEmail,
        resetApp,
        // Feeding
        feedingSessions,
        setFeedingSessions,
        activeFeeding,
        startFeeding,
        stopFeeding,
        cancelFeeding,
        // Diapers
        diaperEntries,
        setDiaperEntries,
        addDiaper,
        // Sleep
        sleepSessions,
        setSleepSessions,
        activeSleep,
        startSleep,
        stopSleep,
        cancelSleep,
        // Journal
        moodEntries,
        setMoodEntries,
        // Vaccines
        vaccinesDone,
        toggleVaccine,
        isVaccineDone,
        getVaccineDate,
        // Growth
        growthEntries,
        setGrowthEntries,
        // Souvenirs
        souvenirs,
        addSouvenir,
        deleteSouvenir,
        // Teeth
        teeth,
        toggleTooth,
        // Medications
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        // Allergies
        allergies,
        addAllergy,
        deleteAllergy,
        // Milestones
        milestones,
        toggleMilestone,
        // Reminders
        reminders,
        updateReminders,
        // Appointments
        appointments,
        setAppointments,
        // Subscription / Premium
        isPremium,
        subscriptionInfo,
        offerings,
        purchasePackage,
        restorePurchases,
        setRevenueCatUserId,
        trialEndDate,
        trialDaysLeft: trialEndDate
          ? Math.max(0, Math.ceil((new Date(trialEndDate) - new Date()) / (1000 * 60 * 60 * 24)))
          : 0,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
