import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from './storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [baby, setBaby] = useState({ name: '', birthDate: '', gender: 'fille', birthWeight: null, birthHeight: null });
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

  // Load data on mount
  useEffect(() => {
    const loadAll = async () => {
      const savedBaby = await storage.get('baby');
      const savedMethod = await storage.get('feedingMethod');
      const savedFeedings = await storage.get('feedingSessions', []);
      const savedDiapers = await storage.get('diaperEntries', []);
      const savedSleep = await storage.get('sleepSessions', []);
      const savedMoods = await storage.get('moodEntries', []);
      const savedVaccines = await storage.get('vaccinesDone', []);
      const savedGrowth = await storage.get('growthEntries', []);

      if (savedBaby && savedMethod) {
        setBaby(savedBaby);
        setFeedingMethod(savedMethod);
        setIsOnboarded(true);
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

  const completeOnboarding = async (babyData, method) => {
    setBaby(babyData);
    setFeedingMethod(method);
    await storage.set('baby', babyData);
    await storage.set('feedingMethod', method);
    setIsOnboarded(true);
  };

  const resetApp = async () => {
    await storage.clear();
    setBaby({ name: '', birthDate: '', gender: 'fille', birthWeight: null, birthHeight: null });
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
    setActiveFeeding({ side, type, startTime: new Date().toISOString() });
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
      type, // 'pipi', 'caca', 'mixte'
      notes,
      timestamp: new Date().toISOString(),
    };
    setDiaperEntries((prev) => [entry, ...prev]);
  };

  // Sleep actions
  const startSleep = () => {
    setActiveSleep({ startTime: new Date().toISOString() });
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
        feedingMethod,
        completeOnboarding,
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
