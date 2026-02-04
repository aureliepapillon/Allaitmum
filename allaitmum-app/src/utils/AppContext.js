import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storage } from './storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);

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

  // Computed: active baby (backward-compatible "baby" object)
  const baby = useMemo(() => {
    if (!babies.length) return { name: '', birthDate: '', gender: 'fille', birthWeight: null, birthHeight: null };
    return babies.find((b) => b.id === activeBabyId) || babies[0];
  }, [babies, activeBabyId]);

  // Load data on mount (with migration from old single-baby format)
  useEffect(() => {
    const loadAll = async () => {
      const savedBabies = await storage.get('babies');
      const savedActiveBabyId = await storage.get('activeBabyId');
      const savedMethod = await storage.get('feedingMethod');
      const savedFeedings = await storage.get('feedingSessions', []);
      const savedDiapers = await storage.get('diaperEntries', []);
      const savedSleep = await storage.get('sleepSessions', []);
      const savedMoods = await storage.get('moodEntries', []);
      const savedVaccines = await storage.get('vaccinesDone', []);
      const savedGrowth = await storage.get('growthEntries', []);

      if (savedBabies && savedBabies.length > 0 && savedMethod) {
        // New format: multi-baby
        setBabies(savedBabies);
        setActiveBabyId(savedActiveBabyId || savedBabies[0].id);
        setFeedingMethod(savedMethod);
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
      setIsLoading(false);
    };
    loadAll();
  }, []);

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
    if (!isLoading && babies.length > 0) storage.set('babies', babies);
  }, [babies]);

  useEffect(() => {
    if (!isLoading && activeBabyId) storage.set('activeBabyId', activeBabyId);
  }, [activeBabyId]);

  const completeOnboarding = async (babyData, method) => {
    const newBaby = { ...babyData, id: Date.now(), feedingMethod: method };
    const newBabies = [newBaby];
    setBabies(newBabies);
    setActiveBabyId(newBaby.id);
    setFeedingMethod(method);
    await storage.set('babies', newBabies);
    await storage.set('activeBabyId', newBaby.id);
    await storage.set('feedingMethod', method);
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
  const toggleVaccine = (vaccineId) => {
    setVaccinesDone((prev) =>
      prev.includes(vaccineId)
        ? prev.filter((id) => id !== vaccineId)
        : [...prev, vaccineId]
    );
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
        completeOnboarding,
        addBaby,
        switchBaby,
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
        // Growth
        growthEntries,
        setGrowthEntries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
