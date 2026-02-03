import React, { useState, useEffect } from 'react';
import { Heart, Clock, BookOpen, Moon, Settings } from 'lucide-react';

// SVG Illustrations
const HeartIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85C50 85 15 65 15 40C15 28 23 20 32 20C40 20 45 25 50 30C55 25 60 20 68 20C77 20 85 28 85 40C85 65 50 85 50 85Z" 
          fill="url(#heart)" stroke="#AB7058" strokeWidth="2"/>
    <circle cx="35" cy="35" r="3" fill="#fff" opacity="0.6"/>
    <defs>
      <linearGradient id="heart" x1="15" y1="20" x2="85" y2="85">
        <stop offset="0%" stopColor="#F5C6B8"/>
        <stop offset="100%" stopColor="#E8A896"/>
      </linearGradient>
    </defs>
  </svg>
);

const BabyIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="45" r="25" fill="#F9E8DC" stroke="#AB7058" strokeWidth="2"/>
    <circle cx="42" cy="42" r="3" fill="#AB7058"/>
    <circle cx="58" cy="42" r="3" fill="#AB7058"/>
    <path d="M42 52C45 55 55 55 58 52" stroke="#AB7058" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="38" cy="48" rx="2" ry="3" fill="#F5C6B8" opacity="0.6"/>
    <ellipse cx="62" cy="48" rx="2" ry="3" fill="#F5C6B8" opacity="0.6"/>
  </svg>
);

const BreastIcon = ({ side = "left", className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {side === "left" ? (
      <path d="M30 30C30 30 20 35 20 50C20 65 30 75 45 75C55 75 65 68 65 55C65 42 55 30 45 30C40 30 35 30 30 30Z" 
            fill="#F5E6D8" stroke="#AB7058" strokeWidth="2"/>
    ) : (
      <path d="M70 30C70 30 80 35 80 50C80 65 70 75 55 75C45 75 35 68 35 55C35 42 45 30 55 30C60 30 65 30 70 30Z" 
            fill="#F5E6D8" stroke="#AB7058" strokeWidth="2"/>
    )}
    <circle cx={side === "left" ? "48" : "52"} cy="55" r="4" fill="#C88A70"/>
    <circle cx={side === "left" ? "48" : "52"} cy="55" r="2" fill="#AB7058"/>
  </svg>
);

const BottleIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="15" width="30" height="10" rx="3" fill="#E8D4C0" stroke="#AB7058" strokeWidth="2"/>
    <path d="M40 25L40 35C40 35 38 35 38 38L38 80C38 85 42 88 50 88C58 88 62 85 62 80L62 38C62 35 60 35 60 35L60 25" 
          fill="url(#bottle)" stroke="#AB7058" strokeWidth="2"/>
    <circle cx="45" cy="40" r="2" fill="#fff" opacity="0.5"/>
    <defs>
      <linearGradient id="bottle" x1="38" y1="25" x2="62" y2="88">
        <stop offset="0%" stopColor="#F9E8DC"/>
        <stop offset="30%" stopColor="#A8C8D8" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#EED9C4"/>
      </linearGradient>
    </defs>
  </svg>
);

const PumpIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="35" r="18" fill="none" stroke="#AB7058" strokeWidth="2"/>
    <circle cx="50" cy="35" r="8" fill="#C88A70"/>
    <circle cx="50" cy="35" r="4" fill="#AB7058"/>
    <path d="M32 35C32 35 30 30 30 25C30 20 32 15 37 15L50 15" stroke="#AB7058" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="42" y="50" width="16" height="25" rx="3" fill="#F9E8DC" stroke="#AB7058" strokeWidth="2"/>
  </svg>
);

const FlowerIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="8" fill="#AB7058"/>
    <ellipse cx="50" cy="30" rx="12" ry="18" fill="#F5C6B8" opacity="0.8"/>
    <ellipse cx="70" cy="50" rx="18" ry="12" fill="#F5C6B8" opacity="0.8"/>
    <ellipse cx="50" cy="70" rx="12" ry="18" fill="#F5C6B8" opacity="0.8"/>
    <ellipse cx="30" cy="50" rx="18" ry="12" fill="#F5C6B8" opacity="0.8"/>
  </svg>
);

const BabyCrawlingIcon = ({ className = "w-32 h-32" }) => (
  <svg className={className} viewBox="0 0 140 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Baby head - left side */}
    <circle cx="35" cy="35" r="18" fill="#F9E8DC" stroke="#AB7058" strokeWidth="2.5"/>
    
    {/* Eyes */}
    <circle cx="30" cy="32" r="2.5" fill="#AB7058"/>
    <circle cx="40" cy="32" r="2.5" fill="#AB7058"/>
    
    {/* Smile */}
    <path d="M30 40C32 42 38 42 40 40" stroke="#AB7058" strokeWidth="2" strokeLinecap="round"/>
    
    {/* Rosy cheeks */}
    <circle cx="26" cy="37" r="3" fill="#F5C6B8" opacity="0.6"/>
    <circle cx="44" cy="37" r="3" fill="#F5C6B8" opacity="0.6"/>
    
    {/* Body */}
    <ellipse cx="75" cy="50" rx="28" ry="20" fill="#EED9C4" stroke="#AB7058" strokeWidth="2.5"/>
    
    {/* Front left arm */}
    <line x1="55" y1="45" x2="45" y2="65" stroke="#AB7058" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="45" cy="68" r="5" fill="#F5C6B8"/>
    
    {/* Front right arm */}
    <line x1="65" y1="45" x2="65" y2="65" stroke="#AB7058" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="65" cy="68" r="5" fill="#F5C6B8"/>
    
    {/* Back left leg */}
    <line x1="85" y1="55" x2="85" y2="72" stroke="#AB7058" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="85" cy="75" r="5" fill="#F5C6B8"/>
    
    {/* Back right leg */}
    <line x1="95" y1="55" x2="100" y2="70" stroke="#AB7058" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="100" cy="73" r="5" fill="#F5C6B8"/>
    
    {/* Cute little diaper/onesie detail */}
    <ellipse cx="90" cy="50" rx="14" ry="10" fill="white" opacity="0.5"/>
  </svg>
);

const ArrowIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 50L70 50M70 50L50 30M70 50L50 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="80" cy="50" r="8" fill="currentColor"/>
  </svg>
);

const MoodFace = ({ mood, className = "w-12 h-12" }) => {
  const faces = {
    1: { color: '#AB7058', mouth: 'M35 60C35 60 40 55 50 55C60 55 65 60 65 60' }, // Sad
    2: { color: '#B88268', mouth: 'M35 57C35 57 42 55 50 55C58 55 65 57 65 57' }, // Worried
    3: { color: '#C89478', mouth: 'M35 57L65 57' }, // Neutral
    4: { color: '#D8A688', mouth: 'M35 55C35 55 42 60 50 60C58 60 65 55 65 55' }, // Happy
    5: { color: '#E8B898', mouth: 'M35 52C35 52 40 65 50 65C60 65 65 52 65 52' } // Very happy
  };
  
  const face = faces[mood] || faces[3];
  
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill={face.color} opacity="0.2"/>
      <circle cx="50" cy="50" r="45" stroke={face.color} strokeWidth="3"/>
      <circle cx="38" cy="42" r="4" fill={face.color}/>
      <circle cx="62" cy="42" r="4" fill={face.color}/>
      <path d={face.mouth} stroke={face.color} strokeWidth="3" strokeLinecap="round"/>
      {mood === 5 && (
        <>
          <circle cx="32" cy="45" r="3" fill={face.color} opacity="0.3"/>
          <circle cx="68" cy="45" r="3" fill={face.color} opacity="0.3"/>
        </>
      )}
    </svg>
  );
};

const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch { return defaultValue; }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { console.error('Storage error:', e); }
  }
};

export default function AllaitMumFixed() {
  const [screen, setScreen] = useState('onboarding');
  const [step, setStep] = useState(1);
  const [baby, setBaby] = useState({ name: '', birthDate: '', gender: 'fille' });
  const [feedingMethod, setFeedingMethod] = useState(null);
  const [experience, setExperience] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [tab, setTab] = useState('dashboard');
  const [moodEntries, setMoodEntries] = useState([]);
  const [tempFormData, setTempFormData] = useState({ name: '', birthDate: '', gender: 'fille' });

  // Load ONCE on mount
  useEffect(() => {
    const savedBaby = storage.get('baby');
    const savedMethod = storage.get('feedingMethod');
    const savedSessions = storage.get('sessions', []);
    const savedMoodEntries = storage.get('moodEntries', []);
    
    if (savedBaby && savedMethod) {
      // Migration: ensure baby object has all required fields
      const migratedBaby = {
        name: savedBaby.name || '',
        birthDate: savedBaby.birthDate || '',
        gender: savedBaby.gender || 'fille'
      };
      setBaby(migratedBaby);
      storage.set('baby', migratedBaby); // Save migrated version
      setFeedingMethod(savedMethod);
      setScreen('app');
    }
    setSessions(savedSessions);
    setMoodEntries(savedMoodEntries);
  }, []);

  // Only save sessions when they change
  useEffect(() => {
    if (sessions.length > 0) {
      storage.set('sessions', sessions);
    }
  }, [sessions]);

  // Save mood entries when they change
  useEffect(() => {
    if (moodEntries.length > 0) {
      storage.set('moodEntries', moodEntries);
    }
  }, [moodEntries]);

  // Debug baby data
  useEffect(() => {
    console.log('Baby data:', baby);
  }, [baby]);

  // ONBOARDING
  const Onboarding = () => {
    // Use parent state instead of local state
    const [isTransitioning, setIsTransitioning] = useState(false);
    // Local controlled inputs to prevent cursor jump
    const [localName, setLocalName] = useState(tempFormData.name);
    const [localBirthDate, setLocalBirthDate] = useState(tempFormData.birthDate);
    
    const methods = [
      { id: 'breast', icon: <BreastIcon side="left" />, label: 'Allaitement au sein', desc: 'Tétées directes' },
      { id: 'pump', icon: <PumpIcon />, label: 'Tire-allaitement', desc: 'Tire-lait + biberon' },
      { id: 'mixed', icon: <><BreastIcon className="w-8 h-8" /><BottleIcon className="w-8 h-8" /></>, label: 'Mixte', desc: 'Combinaison sein/biberon' },
      { id: 'bottle-bm', icon: <BottleIcon />, label: 'Biberon lait maternel', desc: 'Exclusivement' },
      { id: 'bottle-formula', icon: <BottleIcon />, label: 'Biberon formule', desc: 'Lait infantile' },
      { id: 'transition', icon: <Heart className="w-12 h-12" />, label: 'En transition', desc: 'Ça évolue' }
    ];

    const experiences = [
      { id: 'first', label: 'C\'est mon premier bébé' },
      { id: 'same', label: 'Même parcours qu\'avant' },
      { id: 'different', label: 'Parcours différent cette fois' },
      { id: 'skip', label: 'Je préfère ne pas en parler' }
    ];

    const complete = () => {
      console.log('Saving tempFormData:', tempFormData);
      setBaby(tempFormData);
      storage.set('baby', tempFormData);
      storage.set('feedingMethod', feedingMethod);
      storage.set('experience', experience);
      console.log('Data saved to localStorage');
      setScreen('app');
    };

    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-[#EED9C4] via-[#F5E6D8] to-[#E8D4C0]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#AB7058] opacity-5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#AB7058] opacity-5 rounded-full blur-3xl" style={{animation: 'float 10s ease-in-out infinite'}} />
        <FlowerIcon className="absolute top-10 right-20 w-16 h-16 opacity-20 animate-float" />

        <div className="relative z-10 w-full max-w-md">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#AB7058] to-[#C88A70] rounded-3xl shadow-lg mb-6">
                <HeartIcon className="w-14 h-14" />
              </div>
              <h1 className="text-5xl font-serif text-[#AB7058] mb-8">Allait'mum</h1>

              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl text-[#AB7058] mb-4 font-serif">Bienvenue</h2>
                <p className="text-[#8B6552] leading-relaxed mb-6">
                  Ici, toutes les mamans sont les bienvenues. Sein, tire-lait, biberon, mixte... 
                  Ton parcours est unique. Ton choix est respecté.
                </p>
                <p className="text-[#AB7058] text-sm mb-6 font-medium">
                  Aucun jugement. Juste du soutien. 💛
                </p>
                <button
                  onClick={() => setStep(2)}
                  style={{ 
                    color: '#ffffff',
                    background: 'linear-gradient(to right, #AB7058, #C88A70)'
                  }}
                  className="w-full py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Créer mon espace
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Baby info */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <BabyIcon className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-2xl text-[#AB7058] mb-6 font-serif text-center">Parle-moi de ton bébé</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[#8B6552] mb-2 text-sm font-medium">Prénom</label>
                    <input
                      type="text"
                      value={localName}
                      onChange={(e) => setLocalName(e.target.value)}
                      onBlur={(e) => setTempFormData({...tempFormData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#EED9C4] focus:border-[#AB7058] focus:outline-none bg-white/50"
                      placeholder="Le prénom de ton bébé"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6552] mb-2 text-sm font-medium">Date de naissance</label>
                    <input
                      type="date"
                      value={localBirthDate}
                      onChange={(e) => {
                        setLocalBirthDate(e.target.value);
                        setTempFormData({...tempFormData, birthDate: e.target.value});
                      }}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#EED9C4] focus:border-[#AB7058] focus:outline-none bg-white/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8B6552] mb-3 text-sm font-medium">Sexe</label>
                    <div className="flex gap-3">
                      {['fille', 'garçon'].map((g) => (
                        <button
                          key={g}
                          onClick={() => setTempFormData({...tempFormData, gender: g})}
                          className={`flex-1 py-3 rounded-xl text-[#AB7058] transition-all border-2 border-[#AB7058] ${
                            tempFormData.gender === g
                              ? 'bg-[#AB7058]/10 font-bold shadow-lg scale-105'
                              : 'bg-white font-medium hover:bg-[#AB7058]/5'
                          }`}
                        >
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  disabled={!localName || !localBirthDate}
                  style={{ 
                    color: '#ffffff',
                    background: (!localName || !localBirthDate) 
                      ? '#D4BFA8' 
                      : 'linear-gradient(to right, #AB7058, #C88A70)'
                  }}
                  className={`w-full mt-8 py-4 rounded-2xl font-medium shadow-lg transition-all flex items-center justify-center gap-2 ${
                    !localName || !localBirthDate
                      ? 'cursor-not-allowed'
                      : 'hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  Hop, on y va !
                  <ArrowIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Feeding method */}
          {step === 3 && !isTransitioning && (
            <div className="animate-fade-in">
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl text-[#AB7058] mb-3 font-serif text-center">
                  Comment nourris-tu {tempFormData.name} aujourd'hui ?
                </h2>
                <p className="text-[#8B6552] text-sm text-center mb-6">
                  Pas de bon ou mauvais choix. Juste ton choix. 💛
                </p>
                
                <div className="space-y-3">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setFeedingMethod(m.id);
                          setStep(4);
                          setIsTransitioning(false);
                        }, 150);
                      }}
                      style={{
                        color: feedingMethod === m.id ? '#ffffff' : '#6B4E3D',
                        background: feedingMethod === m.id 
                          ? 'linear-gradient(to right, #AB7058, #C88A70)' 
                          : '#ffffff',
                        fontWeight: feedingMethod === m.id ? '600' : '500'
                      }}
                      className={`w-full p-4 rounded-2xl transition-all text-left border-2 ${
                        feedingMethod === m.id
                          ? 'border-transparent shadow-lg scale-105'
                          : 'border-[#EED9C4] hover:border-[#AB7058]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 flex items-center gap-1 ${m.id === 'mixed' ? '' : 'w-12 justify-center'}`}>
                          {m.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold mb-1">{m.label}</div>
                          <div className="text-sm" style={{ opacity: 0.8 }}>
                            {m.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Experience */}
          {step === 4 && !isTransitioning && (
            <div className="animate-fade-in">
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl">
                <h2 className="text-xl text-[#AB7058] mb-3 font-serif text-center">Une dernière chose...</h2>
                <p className="text-[#8B6552] text-sm text-center mb-6">
                  As-tu vécu d'autres expériences d'alimentation ?
                </p>
                <p className="text-[#8B6552] text-xs text-center mb-6 italic">
                  (Optionnel - pour mieux te comprendre)
                </p>
                
                <div className="space-y-3 mb-6">
                  {experiences.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setExperience(exp.id);
                          complete();
                          setIsTransitioning(false);
                        }, 150);
                      }}
                      style={{
                        color: experience === exp.id ? '#ffffff' : '#6B4E3D',
                        background: experience === exp.id 
                          ? 'linear-gradient(to right, #AB7058, #C88A70)' 
                          : '#ffffff',
                        fontWeight: experience === exp.id ? '600' : '500'
                      }}
                      className={`w-full p-4 rounded-2xl transition-all border-2 ${
                        experience === exp.id
                          ? 'border-transparent shadow-lg'
                          : 'border-[#EED9C4]'
                      }`}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // DASHBOARD
  const Dashboard = () => {
    const [side, setSide] = useState(null);
    const [type, setType] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('00:00');

    const deleteSession = (sessionId) => {
      if (window.confirm('Supprimer cette session ?')) {
        setSessions(sessions.filter(s => s.id !== sessionId));
      }
    };

    const getSessionLabel = (session) => {
      if (session.type === 'bottle') return 'Biberon';
      if (session.type === 'pump') {
        return session.side === 'left' ? 'Tire-lait gauche' : 'Tire-lait droit';
      }
      if (session.type === 'breast') {
        return session.side === 'left' ? 'Sein gauche' : 'Sein droit';
      }
      return 'Session';
    };

    // Update timer every second
    useEffect(() => {
      if (activeSession) {
        const interval = setInterval(() => {
          const elapsed = Math.floor((new Date() - new Date(activeSession.startTime)) / 1000);
          const mins = Math.floor(elapsed / 60);
          const secs = elapsed % 60;
          setElapsedTime(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [activeSession]);

    const start = (selectedSide, sessionType) => {
      setSide(selectedSide);
      setType(sessionType);
      setActiveSession({
        side: selectedSide,
        type: sessionType,
        startTime: new Date().toISOString()
      });
    };

    const stop = () => {
      if (!activeSession) return;
      const duration = Math.round((new Date() - new Date(activeSession.startTime)) / 60000);
      setSessions([{...activeSession, duration, id: Date.now()}, ...sessions]);
      setActiveSession(null);
      setSide(null);
      setType(null);
      setElapsedTime('00:00');
    };

    const showBreast = ['breast', 'mixed'].includes(feedingMethod);
    const showPump = ['pump', 'mixed'].includes(feedingMethod);
    const showBottle = ['bottle-bm', 'bottle-formula', 'mixed', 'transition'].includes(feedingMethod);

    return (
      <div className="pb-24 pt-16">
        <div className="px-6 mb-6">
          <h1 className="text-3xl font-serif text-[#AB7058] mb-2">Bonjour</h1>
          <p className="text-[#8B6552] text-sm">Tu fais du super boulot avec {baby.name}</p>
        </div>

        <div className="px-6 space-y-6">
          {activeSession ? (
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-[#AB7058]/20">
              <div className="text-center mb-6">
                <h3 className="text-xl text-[#AB7058] font-serif mb-4">Session en cours</h3>
                <div className="text-7xl font-bold text-[#AB7058] font-mono mb-2">{elapsedTime}</div>
                <p className="text-[#8B6552] text-sm">
                  Début : {new Date(activeSession.startTime).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={stop}
                  style={{ 
                    color: '#ffffff',
                    background: 'linear-gradient(to right, #AB7058, #C88A70)'
                  }}
                  className="w-full py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Terminer
                </button>
                <button
                  onClick={() => {
                    setActiveSession(null);
                    setSide(null);
                    setType(null);
                    setElapsedTime('00:00');
                  }}
                  style={{ 
                    color: '#AB7058',
                    background: '#ffffff'
                  }}
                  className="w-full py-3 rounded-2xl font-medium border-2 border-[#AB7058] hover:bg-[#AB7058]/5 transition-all"
                >
                  ← Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl text-[#AB7058] mb-4 font-serif">Nouvelle session</h3>
              
              {showBreast && (
                <div className="mb-6">
                  <p className="text-[#8B6552] mb-3 text-sm font-medium">Tétée au sein</p>
                  <div className="flex gap-4">
                    <button onClick={() => start('left', 'breast')} className="flex-1 bg-[#EED9C4] py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-3">
                      <BreastIcon side="left" className="w-16 h-16" />
                      <span className="font-semibold text-[#AB7058]">Gauche</span>
                    </button>
                    <button onClick={() => start('right', 'breast')} className="flex-1 bg-[#EED9C4] py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-3">
                      <BreastIcon side="right" className="w-16 h-16" />
                      <span className="font-semibold text-[#AB7058]">Droit</span>
                    </button>
                  </div>
                </div>
              )}

              {showPump && (
                <div className="mb-6">
                  <p className="text-[#8B6552] mb-3 text-sm font-medium">Tire-lait</p>
                  <div className="flex gap-4">
                    <button onClick={() => start('left', 'pump')} className="flex-1 bg-[#F5E6D8] py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-3">
                      <PumpIcon className="w-14 h-14" />
                      <span className="font-semibold text-[#AB7058]">Gauche</span>
                    </button>
                    <button onClick={() => start('right', 'pump')} className="flex-1 bg-[#F5E6D8] py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-3">
                      <PumpIcon className="w-14 h-14" />
                      <span className="font-semibold text-[#AB7058]">Droit</span>
                    </button>
                  </div>
                </div>
              )}

              {showBottle && (
                <div>
                  <p className="text-[#8B6552] mb-3 text-sm font-medium">Biberon</p>
                  <button onClick={() => start('none', 'bottle')} className="w-full bg-[#E8D4C0] py-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center gap-3">
                    <BottleIcon className="w-16 h-16" />
                    <span className="font-semibold text-[#AB7058]">Biberon</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Today's sessions */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl text-[#AB7058] mb-4 font-serif flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Aujourd'hui
            </h3>
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <Moon className="w-16 h-16 mx-auto mb-4 text-[#AB7058] opacity-30" />
                <p className="text-[#8B6552]">Aucune session aujourd'hui</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.slice(0, 5).map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-4 bg-[#EED9C4]/30 rounded-xl">
                    <div className="flex-1">
                      <div className="font-medium text-[#AB7058]">
                        {new Date(s.startTime).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
                      </div>
                      <div className="text-sm text-[#8B6552]">
                        {getSessionLabel(s)} • {s.duration} min
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="w-8 h-8 flex items-center justify-center text-[#AB7058] hover:bg-[#AB7058]/10 rounded-lg transition-all"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // JOURNAL TAB
  const Journal = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentMood, setCurrentMood] = useState(null);
    const [currentNote, setCurrentNote] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [viewMode, setViewMode] = useState('today'); // 'today' or 'calendar'
    const [calendarMonth, setCalendarMonth] = useState(new Date());
    
    // Load entry for selected date
    useEffect(() => {
      if (!isTyping) {
        const entry = moodEntries.find(e => e.date === selectedDate);
        if (entry) {
          setCurrentMood(entry.mood);
          setCurrentNote(entry.note || '');
        } else {
          setCurrentMood(null);
          setCurrentNote('');
        }
      }
    }, [selectedDate, moodEntries, isTyping]);

    const saveEntry = () => {
      if (!currentMood) return;
      
      const newEntries = moodEntries.filter(e => e.date !== selectedDate);
      newEntries.push({
        date: selectedDate,
        mood: currentMood,
        note: currentNote,
        timestamp: new Date().toISOString()
      });
      setMoodEntries(newEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setIsTyping(false);
    };

    const deleteEntry = (date) => {
      if (window.confirm('Supprimer cette entrée ?')) {
        setMoodEntries(moodEntries.filter(e => e.date !== date));
        if (date === selectedDate) {
          setCurrentMood(null);
          setCurrentNote('');
        }
      }
    };

    // Save after user stops typing for 2 seconds
    useEffect(() => {
      if (currentMood && isTyping) {
        const timer = setTimeout(() => {
          saveEntry();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [currentNote, isTyping]);

    const moods = [
      { value: 1, label: 'Difficile', color: '#C8A890' },
      { value: 2, label: 'Compliqué', color: '#D4BFA8' },
      { value: 3, label: 'Ça va', color: '#E8D4C0' },
      { value: 4, label: 'Bien', color: '#EED9C4' },
      { value: 5, label: 'Super', color: '#F5E6D8' }
    ];

    const getPrompt = (mood) => {
      const prompts = {
        1: "C'est dur aujourd'hui. Qu'est-ce qui te pèse ?",
        2: "Les jours difficiles font partie du parcours. Comment te sens-tu ?",
        3: "Comment s'est passée ta journée ?",
        4: "C'est chouette ! Qu'est-ce qui t'a fait du bien aujourd'hui ?",
        5: "Quelle belle journée ! Raconte-moi ce qui te rend heureuse !"
      };
      return prompts[mood] || "Comment te sens-tu aujourd'hui ?";
    };

    const getSupportiveMessage = (mood) => {
      const messages = {
        1: "C'est dur aujourd'hui. Tu as le droit de te sentir comme ça. Tu n'es pas seule. 💛",
        2: "Les jours difficiles font partie du parcours. Demain sera peut-être plus doux. Tu fais de ton mieux.",
        3: "Parfois, 'ça va' c'est déjà beaucoup. Tu gères.",
        4: "C'est chouette de voir que ça se passe bien aujourd'hui ! Continue comme ça.",
        5: "Quelle belle journée ! Savoure ce moment. Tu le mérites tellement ! ✨"
      };
      return messages[mood];
    };

    // Detect trigger words and show supportive messages
    const getTriggerMessage = (text) => {
      const lowerText = text.toLowerCase();
      if (lowerText.includes('coupable') || lowerText.includes('culpabilité')) {
        return "Tu n'as pas à te sentir coupable. Tu fais ce que tu peux avec ce que tu as. C'est déjà énorme. 💛";
      }
      if (lowerText.includes('échec') || lowerText.includes('échoué') || lowerText.includes('raté')) {
        return "Tu n'as pas échoué. Tu as pris les décisions qui te semblaient les meilleures. C'est ça, être une bonne mère.";
      }
      if (lowerText.includes('fatigue') || lowerText.includes('épuisée') || lowerText.includes('crevée')) {
        return "La fatigue est réelle. Prendre soin de soi, ce n'est pas de l'égoïsme. C'est prendre soin de ton bébé aussi.";
      }
      if (lowerText.includes('pas assez') || lowerText.includes('pas suffisant')) {
        return "Tu ES assez. Tu fais assez. Ton bébé a de la chance de t'avoir. 💛";
      }
      return null;
    };

    const triggerMessage = currentNote ? getTriggerMessage(currentNote) : null;

    const pastEntries = moodEntries.filter(e => e.date !== selectedDate).slice(0, 10);

    // Calendar helpers
    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      return { daysInMonth, startingDayOfWeek, year, month };
    };

    const navigateMonth = (direction) => {
      const newMonth = new Date(calendarMonth);
      newMonth.setMonth(newMonth.getMonth() + direction);
      setCalendarMonth(newMonth);
    };

    const getMoodColor = (mood) => {
      const colors = {
        1: '#AB7058', // Difficile - terracotta foncé
        2: '#B88268', // Compliqué
        3: '#C89478', // Ça va
        4: '#D8A688', // Bien
        5: '#E8B898'  // Super
      };
      return colors[mood] || '#EED9C4';
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(calendarMonth);
    const monthName = calendarMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const today = new Date().toISOString().split('T')[0];

    return (
      <div className="p-6 pb-24 pt-20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-serif text-[#AB7058]">Journal</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('today')}
              style={{
                color: viewMode === 'today' ? '#ffffff' : '#AB7058',
                background: viewMode === 'today' ? 'linear-gradient(to right, #AB7058, #C88A70)' : '#ffffff'
              }}
              className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#AB7058] transition-all"
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              style={{
                color: viewMode === 'calendar' ? '#ffffff' : '#AB7058',
                background: viewMode === 'calendar' ? 'linear-gradient(to right, #AB7058, #C88A70)' : '#ffffff'
              }}
              className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#AB7058] transition-all"
            >
              📅 Calendrier
            </button>
          </div>
        </div>
        <p className="text-[#8B6552] mb-6 text-sm">Ton espace, tes émotions, sans filtre</p>

        {viewMode === 'calendar' ? (
          /* CALENDAR VIEW */
          <div className="space-y-6">
            {/* Month navigation */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EED9C4] transition-all"
                >
                  ←
                </button>
                <h2 className="text-xl font-serif text-[#AB7058] capitalize">{monthName}</h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EED9C4] transition-all"
                  disabled={month >= new Date().getMonth() && year >= new Date().getFullYear()}
                >
                  →
                </button>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-[#8B6552] pb-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const entry = moodEntries.find(e => e.date === dateStr);
                  const isToday = dateStr === today;
                  const isSelected = dateStr === selectedDate;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setViewMode('today');
                      }}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm transition-all relative ${
                        isToday ? 'ring-2 ring-[#AB7058]' : ''
                      } ${
                        isSelected ? 'bg-[#AB7058]/20' : 'hover:bg-[#EED9C4]/50'
                      }`}
                      style={{
                        background: entry ? getMoodColor(entry.mood) : 'transparent',
                        color: entry ? '#ffffff' : '#8B6552'
                      }}
                    >
                      <span className={entry ? 'font-semibold' : ''}>{day}</span>
                      {entry && (
                        <div className="mt-1">
                          <MoodFace mood={entry.mood} className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-[#EED9C4]">
                <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-[#8B6552]">
                  {moods.map(m => (
                    <div key={m.value} className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ background: getMoodColor(m.value) }}
                      />
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TODAY VIEW */
          <div>
            {/* Date selector */}
            <div className="mb-6">
              <label className="block text-[#8B6552] mb-2 text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#EED9C4] focus:border-[#AB7058] focus:outline-none bg-white"
              />
            </div>

        {/* Today's entry */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <h3 className="text-lg font-serif text-[#AB7058] mb-4">
            {selectedDate === new Date().toISOString().split('T')[0] ? "Comment te sens-tu aujourd'hui ?" : "Comment t'es-tu sentie ce jour-là ?"}
          </h3>
          
          {/* Mood selector */}
          <div className="flex justify-between mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setCurrentMood(mood.value)}
                className={`flex flex-col items-center gap-2 transition-all ${
                  currentMood === mood.value ? 'scale-110' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <MoodFace mood={mood.value} className="w-12 h-12" />
                <span className="text-xs text-[#8B6552]">{mood.label}</span>
              </button>
            ))}
          </div>

          {/* Supportive message */}
          {currentMood && (
            <div className="bg-gradient-to-br from-[#EED9C4]/50 to-[#E8D4C0]/50 rounded-2xl p-4 mb-4">
              <p className="text-[#AB7058] text-sm leading-relaxed">
                {getSupportiveMessage(currentMood)}
              </p>
            </div>
          )}

          {/* Note area */}
          {currentMood && (
            <>
              <label className="block text-[#8B6552] mb-2 text-sm font-medium">
                {getPrompt(currentMood)}
              </label>
              <textarea
                value={currentNote}
                onChange={(e) => {
                  setCurrentNote(e.target.value);
                  setIsTyping(true);
                }}
                onBlur={saveEntry}
                placeholder="Écris tout ce que tu veux... Tes joies, tes doutes, tes victoires, tes galères. Ce qu'on t'a dit qui t'a blessée. Ce dont tu es fière. Tout. 💛"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#EED9C4] focus:border-[#AB7058] focus:outline-none bg-white/50 resize-none"
                rows="6"
              />

              {/* Trigger word detection */}
              {triggerMessage && (
                <div className="mt-4 bg-gradient-to-r from-[#AB7058]/10 to-[#C88A70]/10 border-l-4 border-[#AB7058] rounded-r-xl p-4">
                  <p className="text-[#AB7058] text-sm leading-relaxed font-medium">
                    {triggerMessage}
                  </p>
                </div>
              )}

              <p className="text-xs text-[#8B6552] mt-2 italic">
                Tes notes sont sauvegardées automatiquement sur ton appareil. Personne d'autre ne peut les voir.
              </p>
            </>
          )}
        </div>

        {/* Past entries */}
        {pastEntries.length > 0 && (
          <div>
            <h3 className="text-lg font-serif text-[#AB7058] mb-4">Tes notes précédentes</h3>
            <div className="space-y-3">
              {pastEntries.map((entry) => (
                <div key={entry.date} className="bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <MoodFace mood={entry.mood} className="w-10 h-10" />
                      <div>
                        <div className="font-medium text-[#AB7058]">
                          {new Date(entry.date).toLocaleDateString('fr-FR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </div>
                        <div className="text-xs text-[#8B6552]">
                          {moods.find(m => m.value === entry.mood)?.label}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.date)}
                      className="w-8 h-8 flex items-center justify-center text-[#AB7058] hover:bg-[#AB7058]/10 rounded-lg transition-all"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                  {entry.note && (
                    <p className="text-[#8B6552] text-sm leading-relaxed mt-2 line-clamp-3">
                      {entry.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        )}
      </div>
    );
  };

  // SAVOIRS TAB
  const Savoirs = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [savedArticles, setSavedArticles] = useState(storage.get('savedArticles', []));

    const toggleSave = (articleId) => {
      const newSaved = savedArticles.includes(articleId)
        ? savedArticles.filter(id => id !== articleId)
        : [...savedArticles, articleId];
      setSavedArticles(newSaved);
      storage.set('savedArticles', newSaved);
    };

    const articles = [
      {
        id: 1,
        category: 'Débuter',
        title: "Débuter l'allaitement : le guide complet",
        duration: '8 min',
        intro: "Tout ce qu'on aurait aimé savoir AVANT. Les vraies infos, les vraies techniques, les vrais conseils.",
        content: `# Débuter l'allaitement : le guide qu'on aurait aimé avoir

L'allaitement, c'est naturel. Mais ça s'apprend. Et personne ne te l'a dit.

## La première heure : le golden hour

**Dès la naissance (si possible) :**
- Peau à peau immédiat avec bébé
- Laisse-le ramper vers le sein (breast crawl)
- Pas de précipitation, il sait ce qu'il fait
- Cette première tétée aide à :
  - Établir le lien
  - Stimuler ta production
  - Faciliter l'expulsion du placenta
  - Donner le colostrum (or liquide !)

**Le colostrum, c'est quoi ?**
- Liquide épais, jaune/orange
- ULTRA concentré en anticorps
- Parfait pour l'estomac de bébé (taille d'une cerise J1)
- Quantité parfaite : quelques ml suffisent !

## Les positions qui sauvent

**Position classique (madone) :**
- Bébé face à toi, ventre contre ventre
- Sa tête dans le creux de ton coude
- Ton avant-bras soutient son dos
- ⚠️ PAS sa tête ! Il doit pouvoir basculer légèrement en arrière

**Position ballon de rugby :**
- Bébé sur le côté, sous ton bras
- Ses pieds vers ton dos
- TOP pour : césarienne, gros seins, jumeaux

**Position allongée :**
- Sur le côté, bébé face à toi
- TOP pour : nuits, césarienne, repos

**Biological nurturing (BN) :**
- Toi semi-allongée
- Bébé à plat ventre sur toi
- Il se débrouille seul !
- TOP pour : crevasses, bébé qui s'énerve

**LA CLÉ : ventre contre ventre, nez à hauteur du mamelon**

## La prise du sein (THE secret)

**Mauvaise prise = douleur**
**Bonne prise = confort**

**Comment faire :**
1. Attends que bébé ouvre GRAND la bouche (comme un bâillement)
2. Approche-le rapidement vers le sein
3. Son menton touche le sein en premier
4. Il attrape une grosse bouchée (pas juste le téton !)
5. Ses lèvres sont retroussées (comme un poisson)
6. Tu vois plus d'aréole au-dessus qu'en dessous

**Signes d'une bonne prise :**
- Pas de douleur (ou juste au début)
- Joues rondes (pas creuses)
- Tu entends déglutir
- Mouvements de mâchoire jusqu'aux oreilles
- Ses lèvres sont bien retroussées

**Si ça fait mal :**
1. Arrête la succion (doigt dans sa bouche pour casser l'aspiration)
2. Recommence
3. Si ça persiste : consulte une consultante en lactation IBCLC

## Les premiers jours : à quoi s'attendre

**J1-J3 : Colostrum**
- Petites quantités (NORMAL !)
- Bébé tète souvent (10-12 fois/24h minimum)
- Peut perdre 7-10% de son poids (normal)

**J3-J5 : Montée de lait**
- Seins gonflés, durs, chauds
- Lait qui passe du jaune au blanc
- Bébé tète super souvent
- Quantités qui augmentent

**J7-J14 : Stabilisation**
- Rythme qui se trouve
- Bébé reprend son poids de naissance
- Ta production s'ajuste

## Fréquence des tétées

**Nouveau-né :**
- 8 à 12 tétées par 24h (MINIMUM)
- Souvent plus (15-20 c'est possible !)
- Pas de limite de temps
- Tétées groupées le soir (cluster feeding = NORMAL)

**Pourquoi si souvent ?**
- Estomac minuscule
- Lait maternel digéré rapidement (1h30-2h)
- Stimule ta production
- Besoin de réassurance/chaleur

**Plus bébé tète = plus tu produis**

## Signes que ça se passe bien

**Bébé :**
- 5-6 couches lourdes par jour (après J5)
- Selles jaunes, liquides (après J5)
- Prise de poids : 150-200g/semaine
- Éveillé et tonique
- Peau rebondie

**Toi :**
- Seins qui se remplissent entre les tétées
- Sensation de "descente de lait" (picotements)
- Seins plus souples après la tétée

## Les erreurs classiques à éviter

❌ **Donner une tétine/biberon trop tôt** (avant 4-6 semaines)
❌ **Chronométrer les tétées** (laisse bébé finir le premier sein)
❌ **Sauter des tétées la nuit** (elles sont essentielles pour la production)
❌ **Espacer artificiellement** (c'est bébé qui décide)
❌ **Donner de l'eau** (le lait suffit, même en été)
❌ **Laver les seins avant/après** (ça assèche !)

## Ressources essentielles

**Sites fiables :**
- La Leche League France : [lllfrance.org](https://www.lllfrance.org)
- Coordination Française pour l'Allaitement Maternel (CoFAM)
- Santé Publique France : recommandations OMS

**Trouver de l'aide :**
- Consultante en lactation IBCLC (certification internationale)
- Sage-femme formée
- PMI
- Associations : LLL, Solidarilait, etc.

**Numéros utiles :**
- LLL : groupes de soutien gratuits partout en France
- SOS Allaitement (varie selon les régions)

## Ce qu'on veut que tu retiennes

Les premières semaines sont INTENSES. C'est normal.

**Tu n'es pas :**
- Mauvaise si ça te semble dur
- Anormale si tu galères
- Seule dans cette situation

**L'allaitement :**
- Ça s'apprend (toi ET bébé)
- Ça demande du soutien
- Ça peut vraiment marcher avec les bonnes infos

**Si tu galères : DEMANDE DE L'AIDE rapidement.**
Une consultante en lactation peut sauver ton allaitement en une séance.

*L'OMS recommande l'allaitement exclusif jusqu'à 6 mois, puis avec diversification jusqu'à 2 ans ou plus. Mais l'important, c'est que ÇA TE CONVIENNE.*`
      },
      {
        id: 2,
        category: 'SOS',
        title: 'SOS Galères : solutions qui marchent vraiment',
        duration: '10 min',
        intro: "Crevasses, engorgement, mastite... Les vraies solutions, pas les \"bois de l'eau et repose-toi\".",
        content: `# SOS Galères : les solutions qui marchent

Tu galères ? On va régler ça. Voici les solutions CONCRÈTES.

## 🩹 Crevasses / Mamelons douloureux

**Cause n°1 : Mauvaise prise du sein**

**SOLUTIONS IMMÉDIATES :**

1. **Vérifie la position :**
   - Biological nurturing (toi allongée, bébé sur toi)
   - Change de position à chaque tétée
   - Assure-toi qu'il prend une grosse bouchée

2. **Lanoline pure (Lansinoh, Purelan) :**
   - Après CHAQUE tétée
   - Pas besoin de rincer
   - Crée une barrière protectrice

3. **Coquillages d'allaitement :**
   - Protègent le mamelon entre les tétées
   - Ton lait cicatrise naturellement
   - Game changer pour beaucoup

4. **Lait maternel :**
   - Applique quelques gouttes après la tétée
   - Laisse sécher à l'air libre
   - Propriétés cicatrisantes

5. **Téterelles en silicone (temporaire) :**
   - Si douleur insupportable
   - Permet de continuer en cicatrisant
   - À utiliser avec une consultante (risque de baisse de production)

**⚠️ Si ça ne passe pas en 48h : consultante en lactation URGENTE**
Souvent c'est un frein de langue/lèvre chez bébé !

## 🔥 Engorgement

**Symptômes :**
- Seins durs comme des pierres
- Chauds, tendus
- Difficile pour bébé de prendre le sein
- Peut faire monter la fièvre

**SOLUTIONS :**

**AVANT la tétée (assouplir) :**
1. **Chaleur** (douche chaude, compresses)
2. **Massage doux** vers le mamelon
3. **Exprimer un peu de lait** (main ou tire-lait) pour assouplir l'aréole
4. **Technique du verre d'eau chaude** : 
   - Remplis un verre d'eau très chaude
   - Plonge ton sein dedans (crée une aspiration)
   - Le lait coule tout seul

**PENDANT :**
- Laisse bébé téter autant qu'il veut
- Masse doucement pendant la tétée
- Compression du sein pour aider l'écoulement

**APRÈS la tétée (soulager) :**
1. **Froid** (compresses froides, glace dans un linge)
2. **Feuilles de chou vert** :
   - Écrase-les légèrement
   - Mets-les dans ton soutien-gorge
   - Change toutes les 2h
   - Arrête dès amélioration
3. **Anti-inflammatoire** (ibuprofène compatible allaitement)

**⚠️ Prévention :**
- Ne saute JAMAIS de tétées
- Porte un soutien-gorge confortable (pas de baleine)
- Si trop de lait : tire juste ce qu'il faut pour être confortable

## 🦠 Mastite (infection du sein)

**Symptômes :**
- Zone rouge, chaude, douloureuse sur le sein
- Fièvre (>38,5°C)
- Symptômes grippaux (courbatures, fatigue)
- Sein très douloureux

**⚠️ MASTITE = URGENCE. Consulte dans les 24h.**

**TRAITEMENT :**

**1. CONTINUE D'ALLAITER** (ESSENTIEL !)
- Commence par le sein atteint
- Plus bébé draine, plus vite ça guérit
- Pas dangereux pour bébé

**2. Repos TOTAL**
- Au lit avec bébé
- Pas de tâches ménagères
- Quelqu'un qui t'aide

**3. Feuilles de chou** (anti-inflammatoire naturel)
- Entre les tétées
- Change toutes les 2-3h

**4. Chaleur avant, froid après**

**5. Massage lymphatique** :
- Vers l'aisselle (pas vers le mamelon)
- Drainage lymphatique

**6. Antibiotiques SI NÉCESSAIRE**
- **LA PLUPART SONT COMPATIBLES AVEC L'ALLAITEMENT**
- Vérifie sur e-lactancia.org ou CRAT (lecrat.fr)
- NE JAMAIS arrêter d'allaiter "par précaution"
- Si ton médecin dit d'arrêter : vérifie avec e-lactancia ET demande un autre avis

**Antibiotiques pour mastite :**
Les antibiotiques prescrits pour une mastite sont généralement tous compatibles avec l'allaitement. Si ton médecin te dit le contraire, vérifie sur les sites de référence.

**7. Probiotiques** :
- Lactobacillus fermentum ou salivarius
- Prévient les récidives

**⚠️ Si pas d'amélioration en 24-48h : re-consulte**

**PRÉVENTION :**
- Draine bien les seins
- Varie les positions
- Évite la pression sur les seins (soutien-gorge serré, ceinture de sécurité)
- Traite l'engorgement rapidement

## 🍄 Muguet (Candida)

**Symptômes :**
- Douleur brûlante, en coup de poignard
- Même entre les tétées
- Mamelons roses, brillants
- Bébé a des plaques blanches dans la bouche

**TRAITEMENT :**
- Nystatine (bébé ET toi)
- Ou violet de gentiane (old school mais efficace)
- Ou Daktarin gel oral
- Stériliser TOUT (tétines, tire-lait, etc.)
- Traiter BÉBÉ ET TOI en même temps

## 🚧 Canal lactifère bouché

**Symptômes :**
- Boule douloureuse dans le sein
- Pas de fièvre (sinon c'est une mastite)

**SOLUTIONS :**
1. **Chaleur + massage** avant la tétée
2. **Position bébé :** son menton vers la boule
3. **Peigne** : masse avec un peigne vers le mamelon sous la douche chaude
4. **Lécithine de soja** : 1200mg 3-4x/jour (prévient les récidives)

## 🩸 Vasospasme du mamelon

**Symptômes :**
- Mamelon qui blanchit puis devient bleu/violet
- Douleur intense après la tétée
- Liée au froid

**TRAITEMENT :**
- Chaleur immédiate après la tétée
- Magnésium + calcium
- Vitamine B6
- Évite le froid
- Parfois : médicament (nifédipine) sur prescription

## 💊 Médicaments et allaitement

**SITE ESSENTIEL : e-lactancia.org**

Comment l'utiliser :
1. Tape le nom de ton médicament
2. Regarde le niveau de risque :
   - Vert = compatible
   - Jaune = probablement compatible
   - Orange = risque élevé (cherche alternative)
   - Rouge = contre-indiqué

**90% des médicaments sont compatibles !**

**Antibiotiques :** Presque tous compatibles
**Antidépresseurs :** Beaucoup sont compatibles
**Antalgiques :** Paracétamol et ibuprofène OK

**⚠️ Si ton médecin te dit d'arrêter "par précaution" :**
1. Vérifie sur e-lactancia
2. Demande un deuxième avis
3. Contacte un référent en lactation

**Médecins formés sont rares. Vérifie TOUJOURS.**

## 🆘 Quand consulter EN URGENCE

- Fièvre >38,5°C avec sein rouge/dur
- Douleur insupportable qui ne passe pas
- Bébé qui ne mouille plus ses couches
- Bébé léthargique
- Perte de poids importante du bébé
- Saignement important du mamelon

## Ressources pour t'aider

**Sites :**
- e-lactancia.org (médicaments)
- lllfrance.org (La Leche League)
- coordination-allaitement.org

**Aide directe :**
- Consultante en lactation IBCLC : [find.ilca.org](https://www.ilca.org/why-ibclc/falbc)
- SOS Allaitement de ta région
- PMI
- Sage-femme libérale formée

**⚠️ N'attends pas que ça devienne invivable pour demander de l'aide.**

## Ce qu'on veut que tu retiennes

La plupart des problèmes d'allaitement ont une SOLUTION.

**Tu ne dois pas souffrir.**
**Il existe presque toujours un traitement compatible.**
**Arrêter n'est PAS toujours la seule option.**

Mais si vraiment ça ne marche pas malgré tout : ce n'est PAS un échec. Tu as tout essayé.

*L'important c'est que toi et ton bébé alliez bien.*`
      },
      {
        id: 3,
        category: 'Lactation',
        title: 'Booster sa production : ce qui marche vraiment',
        duration: '7 min',
        intro: 'Pas assez de lait ? Avant de paniquer, essaie ça. Des solutions naturelles et efficaces.',
        content: `# Booster ta production de lait

Tu as l'impression de ne pas avoir assez de lait ? Avant toute chose : ES-TU SÛRE ?

## Vrais signes de production insuffisante

**✅ VRAIS signes :**
- Bébé ne prend pas assez de poids (<150g/semaine)
- Moins de 5-6 couches lourdes par jour (après J5)
- Urines foncées, concentrées
- Bébé léthargique, faible

**❌ FAUX signes :**
- Seins mous (c'est juste qu'ils sont habitués !)
- Bébé tète souvent (c'est NORMAL)
- Bébé tète longtemps (c'est OK)
- Peu de lait au tire-lait (ça ne reflète PAS ta production !)
- Bébé agité le soir (cluster feeding = normal)

**La production fonctionne à l'offre et la demande.**
Plus bébé tète = plus tu produis.

## 1. Les bases ESSENTIELLES

**FRÉQUENCE :**
- Minimum 8-12 tétées par 24h
- Pas de limite de durée
- Ne saute JAMAIS la nuit
- Les tétées nocturnes = 📈 prolactine

**DRAINAGE EFFICACE :**
- Bébé bien positionné
- Bonne prise du sein
- Laisse-le finir le premier sein
- Propose le 2e (il peut refuser)
- Compression du sein pendant la tétée

**TON ÉTAT :**
- REPOS (impossible, on sait, mais essaie)
- Hydratation (2-3L d'eau/jour)
- Alimentation suffisante (pas de régime !)
- Peau à peau
- Moins de stress (facile à dire...)

## 2. Power pumping (tire-lait)

**C'est quoi ?**
Simuler un cluster feeding pour booster la production.

**Comment :**
- Choisis 1h dans la journée
- Tire 20 min → pause 10 min → tire 10 min → pause 10 min → tire 10 min
- 1 fois par jour pendant 3-4 jours
- Résultats en 48-72h généralement

**Meilleur moment :**
- Matin (taux de prolactine max)
- Ou quand tu as le plus de lait

## 3. Aliments galactogènes (qui boostent)

**CÉRÉALES :**
- **Avoine** : le champion (flocons, porridge, granola)
- Orge
- Quinoa

**LÉGUMES :**
- **Fenouil** : super efficace
- Épinards, bettes
- Patate douce
- Carottes

**PROTÉINES :**
- Légumineuses (pois chiches, lentilles)
- Amandes, noix de cajou
- Saumon

**GRAINES :**
- **Fenugrec** : le plus connu (prudence si diabète)
- Graines de lin
- Sésame
- Cumin

**FRUITS :**
- Dattes
- Abricots secs
- Figues

**ÉPICES/HERBES :**
- Cumin
- Anis
- Basilic
- Fenouil

## 4. Recettes booster lactation

**BOULES D'ÉNERGIE (lactation balls) :**

Ingrédients :
- 1 tasse flocons d'avoine
- 1/2 tasse beurre de cacahuète
- 1/3 tasse miel
- 1/2 tasse pépites de chocolat
- 1 c. à soupe graines de lin moulues
- 1 c. à soupe levure de bière

Mélange tout, forme des boules, au frigo.
2-3 par jour.

**PORRIDGE MAGIQUE :**

Ingrédients :
- Flocons d'avoine
- Lait (végétal ou non)
- Graines de lin
- Amandes
- Dattes
- Cannelle

Chaud le matin = combo gagnant

**TISANE ALLAITEMENT :**
- Fenouil + anis + cumin
- 3 tasses par jour
- Attention au goût (fort !)

## 5. Compléments alimentaires

**LEVURE DE BIÈRE :**
- Riche en vitamines B
- 2-3 c. à soupe par jour
- En paillettes sur les plats

**FENUGREC :**
- 3 gélules 3x/jour (ou 3-4g/jour)
- Résultats en 24-72h
- ⚠️ Contre-indiqué si : diabète, asthme, allergie aux arachides
- Peut donner une odeur de sirop d'érable à ta sueur !

**CHARDON-MARIE :**
- 300-400mg 3x/jour
- Souvent combiné au fenugrec

**MORINGA :**
- Super aliment
- Riche en fer et vitamines
- Augmente la production

**⚠️ Demande toujours l'avis d'un pro avant de prendre des compléments**

## 6. Médicaments (si vraiment nécessaire)

**DOMPÉRIDONE (Motilium) :**
- Sur ordonnance uniquement
- Augmente la prolactine
- Dosage : 10mg 3x/jour généralement
- Résultats en quelques jours
- ⚠️ Contre-indications cardiaques

**Toujours sous contrôle médical.**

## 7. Techniques de stimulation

**MASSAGE :**
- Massage des seins avant les tétées
- Mouvements circulaires
- Du bord vers le mamelon

**PEAU À PEAU :**
- Maximum de temps
- Stimule les hormones
- Favorise les tétées

**COMPRESSION DU SEIN :**
- Pendant que bébé tète
- Quand la succion ralentit
- Maintenir doucement pour faire couler le lait

**CHALEUR :**
- Douche chaude avant la tétée
- Compresse chaude
- Décontracte les canaux

## 8. Causes de baisse de production

**HORMONALES :**
- Retour de couches
- Pilule contraceptive (préfère progestatif seul)
- Grossesse
- SOPK, hypothyroïdie (traitable !)

**PRATIQUES :**
- Espacement trop grand entre tétées
- Suppléments de lait infantile sans tirer
- Mauvaise prise du sein (drainage inefficace)
- Tétines/sucettes trop tôt

**TOI :**
- Fatigue extrême
- Stress intense
- Déshydratation
- Sous-alimentation (régime)

## Planning type pour booster

**JOUR 1-3 :**
- 10-12 tétées minimum
- Power pumping 1x/jour
- Porridge d'avoine matin
- Lactation balls après-midi
- Tisane fenouil 3x

**JOUR 4-7 :**
- Continue les tétées fréquentes
- Ajoute fenugrec si tu veux
- Hydratation ++
- Repos maximum

**Résultats attendus sous 1 semaine généralement.**

## Ce qu'on veut que tu retiennes

**La production de lait se régule.**

Avant de paniquer :
1. Vérifie si c'est vraiment un problème (poids de bébé ?)
2. Optimise les bases (fréquence, position, drainage)
3. Essaie les galactogènes naturels
4. Demande de l'aide si besoin

**Dans 90% des cas, tu peux produire assez de lait.**

Mais si vraiment ce n'est pas le cas : ce n'est PAS ta faute. Certaines causes sont médicales.

*L'OMS recommande l'allaitement exclusif jusqu'à 6 mois. Mais chaque goutte de ton lait est précieuse, quelle que soit la quantité.*

## Ressources

- **Consultante en lactation** : Diagnostic précis
- **La Leche League** : Groupes de soutien
- **e-lactancia.org** : Vérifie les plantes/médocs`
      },
      {
        id: 4,
        category: 'Pratique',
        title: 'Médicaments et allaitement : la vérité',
        duration: '5 min',
        intro: "Ton médecin te dit d'arrêter ? Vérifie TOUJOURS. 9 fois sur 10, il existe une alternative compatible.",
        content: `# Médicaments et allaitement : arrête de te faire avoir

**Spoiler : 90% des médicaments sont compatibles avec l'allaitement.**

Ton médecin te dit d'arrêter "par précaution" ? Il se couvre. Pas de ta faute, mais vérifie TOUJOURS.

## Le site qui va te sauver : e-lactancia.org

**C'EST LE SITE DE RÉFÉRENCE MONDIAL.**

Créé par un hôpital espagnol, basé sur des études scientifiques, mis à jour constamment.

**Comment l'utiliser :**

1. Va sur [e-lactancia.org](http://www.e-lactancia.org)
2. Tape le nom de ton médicament (français ou DCI)
3. Regarde le code couleur :
   - **VERT (très faible risque)** = Compatible
   - **JAUNE (faible risque)** = Probablement compatible
   - **ORANGE (risque élevé)** = Cherche une alternative
   - **ROUGE** = Vraiment contre-indiqué

4. Lis les recommandations
5. Vérifie les alternatives compatibles

**EN CAS DE DOUTE : VÉRIFIE. NE TE FIE PAS À "par précaution".**

## Sites de référence pour vérifier

**e-lactancia.org** (International, référence mondiale)
**CRAT - Centre de Référence sur les Agents Tératogènes** (lecrat.fr - Français, très fiable)

Ces deux sites sont basés sur des études scientifiques et mis à jour régulièrement.

## Les grandes catégories (sans entrer dans les détails)

**ANTIBIOTIQUES :**
- La grande majorité sont compatibles
- Quelques exceptions rares existent
- Vérifie TOUJOURS sur e-lactancia ou CRAT

**ANTALGIQUES (anti-douleur) :**
- Les plus courants sont compatibles
- Certains nécessitent des précautions de dosage
- Vérifie avant de prendre

**ANTI-INFLAMMATOIRES :**
- Plusieurs options compatibles existent
- Certains sont plus recommandés que d'autres
- Demande conseil à ton médecin ou vérifie en ligne

**ANTIDÉPRESSEURS :**
- Beaucoup sont compatibles avec l'allaitement
- Le traitement de ta santé mentale est PRIORITAIRE
- Ne jamais arrêter sans avis médical
- Il existe presque toujours une option compatible

**ANTIHISTAMINIQUES (allergies) :**
- Plusieurs sont compatibles
- Certains peuvent légèrement diminuer la production chez certaines mamans
- Surveille ta production si tu en prends

**MÉDICAMENTS GASTRO :**
- La plupart sont compatibles
- Vérifie quand même sur les sites de référence

**CONTRACEPTION :**
- Pilule progestative : généralement compatible
- DIU (cuivre ou hormonal) : compatible
- Pilule combinée (avec œstrogènes) : peut diminuer la production de lait
- Implant : peut diminuer la production chez certaines femmes

## Cas particuliers : tu PEUX allaiter

**ANESTHÉSIE :**
- Générale : reprends dès que tu es réveillée
- Locale/péridurale : aucun souci
- Sédation légère : OK

**EXAMENS :**
- IRM avec produit de contraste : Compatible (ancienne recommandation d'attendre = obsolète)
- Scanner : Généralement OK
- Radio : Aucun problème

**VACCINS :**
- Tous les vaccins classiques ✅
- Vaccin COVID ✅
- Vaccin grippe ✅

**SOINS DENTAIRES :**
- Anesthésie locale ✅
- Antibios dentaires ✅
- Radio dentaire ✅

## Les VRAIES contre-indications (rares)

**CHIMIOTHÉRAPIE** : Contre-indiqué
**RADIOACTIVITÉ** (certains examens) : Attente nécessaire
**Quelques médics psychiatriques lourds** : Au cas par cas

**C'est VRAIMENT rare.**

## Mastite : LE cas classique où on te ment

**Scénario classique :**
- Tu as une mastite
- Médecin te prescrit antibio
- Te dit d'arrêter d'allaiter

**FAUX. ARCHI-FAUX.**

**LA VÉRITÉ :**
1. Les antibios pour mastite sont TOUS compatibles
2. Tu DOIS continuer à allaiter (ça guérit la mastite)
3. Pas dangereux pour bébé

**Antibios compatibles mastite :**
- Amoxicilline
- Amoxicilline + acide clavulanique
- Cloxacilline
- Céfalexine
- Clindamycine

**Si ton médecin insiste : vérifie sur e-lactancia et demande un autre avis.**

## Dépression post-partum : TU PEUX te soigner ET allaiter

**Beaucoup d'antidépresseurs sont compatibles avec l'allaitement.**

**TA SANTÉ MENTALE EST PRIORITAIRE.**

Si tu as besoin d'un traitement :
1. Explique à ton médecin que tu allaites
2. Demande les options compatibles avec l'allaitement
3. Vérifie la compatibilité sur e-lactancia ou CRAT
4. Ajuste le traitement si nécessaire avec ton médecin
5. Surveille bébé (rares cas de somnolence)

**Ne sacrifie JAMAIS ta santé mentale pour allaiter.**

Mais dans la grande majorité des cas : tu peux faire les deux.

## Stratégie si vraiment médoc incompatible

**COURT TERME (quelques jours) :**
1. Tire et jette ton lait (pour maintenir production)
2. Donne lait infantile temporairement
3. Reprends l'allaitement après

**PLUS LONG TERME :**
1. Cherche alternative compatible (souvent possible)
2. Si vraiment pas d'alternative : arrêt temporaire ou définitif
3. Ce n'est PAS un échec

## Ce qu'on veut que tu retiennes

**Le réflexe à avoir :**
1. Médecin te dit d'arrêter
2. Tu hoches la tête
3. Tu vas sur e-lactancia.org
4. Tu vérifies
5. Si c'est vert/jaune : tu continues en toute sécurité

**Beaucoup de médecins ne sont PAS formés à l'allaitement.**

Ce n'est pas de leur faute, mais c'est pas non plus à toi de payer les pots cassés.

**9 fois sur 10, il y a une solution compatible.**

**1 fois sur 10 où vraiment il n'y en a pas : tu as TOUT essayé. Ce n'est pas ta faute.**

## Ressources essentielles

**Vérifier la compatibilité :**
- **e-lactancia.org** (International, référence mondiale)
- **CRAT - lecrat.fr** (Français, Centre de Référence sur les Agents Tératogènes)

**Ces deux sites sont LES références. Utilise-les systématiquement.**

**Trouver de l'aide :**
- Consultante en lactation IBCLC
- Pharmacien spécialisé
- Groupe Facebook "Allaitement et médicaments"

**En cas de doute :**
1. e-lactancia.org OU lecrat.fr
2. Appelle une consultante en lactation
3. Demande un 2e avis médical

*Ta santé ET l'allaitement peuvent coexister dans 90% des cas.*

**Ne te laisse pas convaincre d'arrêter sans vérifier sur e-lactancia ou CRAT.**`
      },
      {
        id: 5,
        category: 'Nutrition',
        title: 'Ton alimentation : ce qui compte vraiment',
        duration: '6 min',
        intro: 'Faut-il manger pour deux ? Éviter certains aliments ? Tracker comme sur Yuka ? On fait le point.',
        content: `# Ton alimentation pendant l'allaitement

Spoiler : tu n'as pas besoin d'un régime spécial. Mais quelques ajustements peuvent t'aider.

## Les bases : ce dont TON CORPS a besoin

**CALORIES :**
- +500 kcal/jour environ
- Mais écoute ta faim (elle sait)
- Ne fais PAS de régime
- Ton corps a besoin d'énergie pour produire du lait

**HYDRATATION (crucial) :**
- 2,5 - 3L d'eau par jour
- Bois à chaque tétée
- Signe que tu bois assez : urines claires
- Déshydratation = baisse de production

**Astuce : Garde une bouteille d'eau près de ton spot allaitement**

## Les nutriments essentiels

**PROTÉINES (important) :**
- 1,3g/kg de poids corporel
- Sources : viande, poisson, œufs, légumineuses, tofu
- Chaque repas devrait en contenir

**CALCIUM :**
- 1000mg/jour
- Sources : produits laitiers, amandes, sardines, brocoli
- Si tu ne consommes pas de laitages : complément

**FER :**
- Viande rouge 1-2x/semaine
- Lentilles, pois chiches
- Épinards + vitamine C (meilleure absorption)
- Si anémie : complément sur prescription

**OMÉGA-3 (DHA) :**
- Essentiel pour le développement du cerveau de bébé
- Sources : poissons gras (saumon, maquereau), œufs enrichis, huile de lin
- Complémentation possible (algues DHA)

**VITAMINES :**
- B12 (si végétarienne/végane : COMPLÉMENT obligatoire)
- D (complément pour toi ET bébé en hiver)
- Folates (légumes verts)

## Aliments galactogènes (qui boostent le lait)

**TOP des boosters :**
- **Flocons d'avoine** : championne toute catégorie
- **Fenouil** : super efficace (attention au goût fort)
- Amandes, noix de cajou
- Dattes, abricots secs
- Patate douce
- Légumineuses (pois chiches, lentilles)
- Graines de lin, sésame

**ÉPICES :**
- Cumin
- Fenugrec (attention si diabète)
- Anis

## Aliments à limiter (mais pas interdire)

**CAFÉINE :**
- 2-3 cafés par jour : OK
- Évite après 15h si bébé agité
- Attention thé vert (aussi de la caféine)

**ALCOOL :**
- Occasionnel : OK avec précautions
- 1 verre : attendre 2-3h avant la tétée
- Ou tire AVANT de boire
- Pas besoin de "jeter" le lait (mythe)

**POISSONS :**
- Évite les gros poissons (mercure) : thon, espadon, requin
- Préfère saumon, sardines, maquereau
- 2-3 portions/semaine max

## Aliments "interdits" : démystifions

**ALIMENTS ÉPICÉS :**
- ✅ Tu PEUX en manger
- Ça change le goût du lait (mais ça va)
- Certains bébés s'en fichent, d'autres moins
- Teste

**CHOU, BROCOLI, LÉGUMES "qui donnent des gaz" :**
- ✅ Tu PEUX en manger
- Ce n'est PAS dans le lait que passent les gaz
- Si bébé a des coliques : ce n'est probablement pas ça

**PRODUITS LAITIERS :**
- ✅ OK sauf allergie avérée de bébé (rare)
- Si APLV (allergie protéines lait vache) : éviction totale nécessaire
- Mais diagnostic médical requis

**ALIMENTS "ALLERGÈNES" :**
- ✅ Tu PEUX manger arachides, œufs, etc.
- L'éviction ne prévient PAS les allergies
- Au contraire : exposition via le lait peut aider

## Compléments : lesquels prendre ?

**OBLIGATOIRES si tu es végétarienne/végane :**
- Vitamine B12
- DHA (algues)
- Possiblement fer et zinc

**RECOMMANDÉS pour toutes :**
- Vitamine D (1000-2000 UI/jour)
- DHA si tu manges peu de poisson
- Multivitamines post-partum (peut simplifier)

**SI BESOIN :**
- Fer (si anémie)
- Calcium (si tu ne consommes pas de laitages)

## Planning alimentaire type

**PETIT-DÉJEUNER (énergétique) :**
- Porridge flocons d'avoine
- Lait/boisson végétale
- Fruits frais ou secs
- Amandes
- Un grand verre d'eau

**DÉJEUNER (complet) :**
- Protéines (viande/poisson/légumineuses)
- Légumes verts
- Féculents complets
- Huile d'olive
- Eau

**COLLATION (boost) :**
- Lactation balls (recette dans article boost lactation)
- Ou : fruits + oléagineux
- Tisane fenouil
- Eau

**DÎNER (réparateur) :**
- Protéines
- Légumes
- Féculents
- Eau

**COLLATION NOCTURNE (si faim) :**
- Fruits secs
- Yaourt
- Biscuits maison avoine

## L'idée du "Yuka pour mamans allaitantes"

**Ce serait génial d'avoir :**
- Scanner un produit
- Voir si compatible allaitement
- Voir si c'est galactogène
- Suggestions alternatives

**En attendant cette app :**
- e-lactancia.org pour les médocs
- Bon sens pour l'alimentation
- Écoute ta faim

## Les pièges à éviter

❌ **Régime restrictif** (tu vas crever et ta production va chuter)
❌ **Manger pour deux** (non, c'est +500 kcal, pas X2)
❌ **Éviter plein d'aliments "par précaution"** (inutile)
❌ **Culpabiliser de manger "mal"** parfois (ta santé mentale > tout)

## Régimes particuliers

**VÉGÉTARIENNE :**
- ✅ Compatible
- Complément B12 OBLIGATOIRE
- Attention fer et DHA
- Protéines végétales suffisantes

**VÉGANE :**
- ✅ Compatible AVEC complémentation
- B12, D, DHA, calcium, zinc
- Suivi nutritionnel recommandé

**SANS GLUTEN :**
- ✅ Aucun problème
- Attention à diversifier les céréales
- Avoine sans gluten OK

**SANS LACTOSE :**
- ✅ OK
- Calcium via autres sources
- Compléments si besoin

## Ce qu'on veut que tu retiennes

**Ton alimentation n'a pas besoin d'être parfaite.**

Ce qui compte :
- Manger à ta faim
- Boire BEAUCOUP
- Varier un minimum
- Ne pas faire de régime

**Ton lait sera BON quoi qu'il arrive.**
Ton corps puise dans tes réserves si besoin.

**Prends soin de TOI en priorité.**

Si manger des pâtes au beurre tous les soirs te simplifie la vie et te permet de tenir : fais-le.

L'équilibre nutritionnel parfait peut attendre que tu aies l'énergie mentale pour t'en occuper.

## Ressources

**Nutritionniste spécialisée périnatal** : Si régime particulier ou questions
**La Leche League** : Infos fiables
**e-lactancia.org** : Vérifier plantes/compléments

*Mange, hydrate-toi, repose-toi quand tu peux. Le reste suivra.*`
      },
      {
        id: 6,
        category: 'Bébé',
        title: 'Diversification : DME ou purées ?',
        duration: '6 min',
        intro: 'Ton bébé va bientôt manger solide. Comment l\'introduire ? Quoi donner ? On te guide.',
        content: `# Diversification alimentaire : le guide

## Quand commencer ?

**L'OMS recommande : 6 mois révolus**

**Signes que bébé est prêt :**
- Tient assis seul (ou avec peu d'aide)
- A perdu le réflexe de poussée de la langue
- S'intéresse à ce que tu manges
- Porte des objets à sa bouche

**⚠️ PAS avant 4 mois (intestins immatures)**

## Les 2 méthodes

**PURÉES (traditionnelle) :**
- Tu prépares des purées lisses
- À la cuillère
- Texture qui évolue progressivement
- Plus de contrôle des quantités

**DME (Diversification Menée par l'Enfant) :**
- Bébé mange seul avec ses mains
- Morceaux adaptés
- Découverte autonome
- Plus "salissant" mais ludique

**TU PEUX MIXER LES DEUX !**

Il n'y a pas de "meilleure" méthode. C'est ce qui te convient.

## Premiers aliments (6 mois)

**LÉGUMES (un à la fois) :**
- Carotte, courgette, patate douce
- Brocoli, haricots verts
- Purée lisse OU gros morceaux fondants

**FRUITS :**
- Banane, poire, pomme cuite
- Avocat (super !)
- Pêche, abricot

**FÉCULENTS :**
- Pomme de terre
- Patate douce
- Riz, pâtes (bien cuits)

**PROTÉINES (10-15g/jour max) :**
- Viande bien cuite, mixée
- Poisson (sans arêtes)
- Œuf bien cuit
- Légumineuses (lentilles...)

## Introduction des allergènes

**NOUVEAU : on introduit TÔT (dès 6 mois)**

**Les 8 allergènes majeurs :**
- Lait de vache
- Œuf
- Arachide
- Fruits à coque
- Poisson
- Crustacés
- Soja
- Blé

**Comment introduire :**
- UN allergène à la fois
- En petite quantité
- Le matin (pour surveiller)
- 3 jours de suite
- Puis intègre régulièrement

**⚠️ Si antécédents allergiques familiaux : parles-en au pédiatre d'abord**

## Aliments à ÉVITER avant 1 an

❌ **Miel** (risque botulisme)
❌ **Lait de vache comme boisson principale** (lait maternel ou infantile jusqu'à 1 an)
❌ **Fruits de mer crus**
❌ **Viande/poisson crus**
❌ **Sel ajouté** (reins immatures)
❌ **Sucre ajouté** (inutile)

## Aliments à éviter avant 3 ans

❌ **Aliments durs et ronds** (risque étouffement) : raisins entiers, tomates cerises, cacahuètes entières
❌ **Aliments collants** : beurre de cacahuète en grosse quantité, guimauves

## DME : règles de sécurité

**FORMES ADAPTÉES :**
- Forme de "frite" (bébé peut saisir)
- Taille de ton poing
- Fondant (bébé écrase avec les gencives)

**EXEMPLES :**
- Bâtonnet de carotte cuite fondante
- Fleuron de brocoli
- Galette de patate douce
- Banane entière (épluchée sur 1/3)

**JAMAIS :**
- Aliments durs et ronds
- Bébé seul (toujours surveillance)
- Bébé très fatigué

## Planning type 6-8 mois

**MATIN :**
- Tétée/biberon

**MIDI :**
- 2-3 c. à soupe purée légumes
- + 10g viande/poisson OU 1/4 œuf dur
- Compote de fruits

**APRÈS-MIDI :**
- Tétée/biberon

**SOIR :**
- Purée légumes + féculents
- Compote

**NUIT :**
- Tétées à la demande

**Le lait reste l'aliment PRINCIPAL jusqu'à 1 an.**

## Planning type 8-12 mois

**Texture plus épaisse, petits morceaux**

**MATIN :**
- Tétée/biberon

**MIDI :**
- Légumes + féculents
- 20g viande/poisson OU 1/3 œuf
- Laitage (yaourt nature)
- Fruit

**GOÛTER :**
- Tétée/biberon
- Fruit ou compote

**SOIR :**
- Légumes + féculents
- Laitage ou fruit

## Le "Yuka bébé" : tracker d'introduction

**CE SERAIT GÉNIAL :**
- Tracker quel aliment introduit et quand
- Rappels pour réintroduire régulièrement
- Alertes allergènes
- Idées de repas selon âge
- Recettes adaptées

**En attendant :**
- Cahier ou notes téléphone
- Liste des aliments introduits
- Noter les réactions

## Quantités : arrête de stresser

**Bébé régule sa faim.**

**6-8 mois :** Découverte, quantités minimes (2-3 c. à soupe)
**8-12 mois :** Augmentation progressive
**12 mois+ :** Repas plus consistants

**Signes qu'il a assez mangé :**
- Tourne la tête
- Refuse la cuillère
- Joue avec la nourriture
- S'énerve

**NE FORCE JAMAIS.**

## L'allaitement continue !

**Le lait (maternel ou infantile) reste prioritaire jusqu'à 1 an.**

**Ordre recommandé :**
- D'abord la tétée/biberon
- PUIS les solides

**Ça évite que bébé se remplisse de solides et néglige le lait.**

## Ce qu'on veut que tu retiennes

**La diversification c'est :**
- De la découverte
- Pas une course
- Pas de pression sur les quantités
- Du fun (enfin... si tu aimes nettoyer 😅)

**Chaque bébé va à son rythme.**

Certains adorent manger dès le début.
D'autres mettent des mois à s'y intéresser vraiment.

**Les deux sont normaux.**

**Le lait reste l'aliment principal jusqu'à 1 an.**

## Ressources

**Infos fiables :**
- Mpedia (pédiatres)
- Cubes et petits pois (DME)
- Cooking for my baby (recettes)

**App utiles :**
- Petits Plats Grands (planning repas bébé)

**Livres :**
- "Petit guide de la DME" - Emilie Pinard
- "365 recettes pour bébé" - Cuisine AZ

*Détends-toi. Ton bébé ne va pas mourir de faim. Fais de ton mieux, ça ira.*`
      }
    ];

    const categories = ['Toutes', 'Débuter', 'SOS', 'Lactation', 'Pratique', 'Nutrition', 'Bébé'];
    const [selectedCategory, setSelectedCategory] = useState('Toutes');

    const filteredArticles = selectedCategory === 'Toutes' 
      ? articles 
      : articles.filter(a => a.category === selectedCategory);

    if (selectedArticle) {
      const article = articles.find(a => a.id === selectedArticle);
      const isSaved = savedArticles.includes(article.id);

      return (
        <div className="pb-24 pt-20">
          <div className="px-6 mb-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-[#AB7058] hover:text-[#8B6552] transition-all"
            >
              ← Retour
            </button>
          </div>
          
          <div className="px-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xs text-[#AB7058] font-medium mb-2">{article.category}</div>
                  <h1 className="text-3xl font-serif text-[#AB7058] mb-3">{article.title}</h1>
                  <p className="text-[#8B6552] mb-4">{article.intro}</p>
                  <div className="flex items-center gap-4 text-sm text-[#8B6552]">
                    <span>📚 {article.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleSave(article.id)}
                  className="ml-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EED9C4]/50 transition-all"
                  title={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  {isSaved ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="prose prose-lg max-w-none">
                {article.content.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('# ')) {
                    return <h2 key={idx} className="text-2xl font-serif text-[#AB7058] mt-8 mb-4">{paragraph.slice(2)}</h2>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h3 key={idx} className="text-xl font-serif text-[#AB7058] mt-6 mb-3">{paragraph.slice(3)}</h3>;
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <p key={idx} className="font-bold text-[#AB7058] mt-4 mb-2">{paragraph.slice(2, -2)}</p>;
                  }
                  if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                    return <p key={idx} className="italic text-[#8B6552] bg-gradient-to-r from-[#EED9C4]/30 to-transparent p-4 rounded-xl mt-4 mb-4 border-l-4 border-[#AB7058]">{paragraph.slice(1, -1)}</p>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={idx} className="text-[#8B6552] ml-4 mb-2">{paragraph.slice(2)}</li>;
                  }
                  if (paragraph.trim() === '') {
                    return <div key={idx} className="h-4" />;
                  }
                  return <p key={idx} className="text-[#8B6552] leading-relaxed mb-4">{paragraph}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 pb-24 pt-20">
        <h1 className="text-3xl font-serif text-[#AB7058] mb-2">Savoirs</h1>
        <p className="text-[#8B6552] mb-6 text-sm">Des infos honnêtes, pour toutes les mamans</p>

        {/* Category filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                color: selectedCategory === cat ? '#ffffff' : '#AB7058',
                background: selectedCategory === cat 
                  ? 'linear-gradient(to right, #AB7058, #C88A70)' 
                  : '#ffffff'
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border-2 transition-all ${
                selectedCategory === cat ? 'border-transparent shadow-lg' : 'border-[#AB7058]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Saved articles */}
        {savedArticles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-serif text-[#AB7058] mb-3">❤️ Mes favoris</h3>
            <div className="space-y-3">
              {articles.filter(a => savedArticles.includes(a.id)).map(article => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article.id)}
                  className="w-full bg-gradient-to-r from-[#AB7058]/10 to-[#C88A70]/10 rounded-2xl p-4 text-left hover:shadow-lg transition-all border-2 border-[#AB7058]/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs text-[#AB7058] font-medium mb-1">{article.category}</div>
                      <h4 className="font-semibold text-[#AB7058] mb-1">{article.title}</h4>
                      <p className="text-sm text-[#8B6552] mb-2">{article.intro}</p>
                      <div className="text-xs text-[#8B6552]">📚 {article.duration}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles list */}
        <div className="space-y-3">
          {filteredArticles.map(article => {
            const isSaved = savedArticles.includes(article.id);
            return (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article.id)}
                className="w-full bg-white rounded-2xl p-4 shadow-lg text-left hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-[#AB7058] font-medium mb-1">{article.category}</div>
                    <h4 className="font-semibold text-[#AB7058] mb-1">{article.title}</h4>
                    <p className="text-sm text-[#8B6552] mb-2">{article.intro}</p>
                    <div className="text-xs text-[#8B6552]">📚 {article.duration}</div>
                  </div>
                  <div className="ml-3 text-xl">{isSaved ? '❤️' : ''}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // SIMPLIFIED OTHER TABS
  const SimpleTab = ({ title, icon, message }) => (
    <div className="p-6 pb-24">
      <h1 className="text-3xl font-serif text-[#AB7058] mb-6 flex items-center gap-2">
        {icon}
        {title}
      </h1>
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
        <div className="text-6xl mb-4">💛</div>
        <p className="text-[#8B6552] leading-relaxed">{message}</p>
      </div>
    </div>
  );

  // PROFILE TAB
  const Profile = () => {
    const handleReset = () => {
      // Clear everything
      localStorage.clear();
      // Reset all states
      setBaby({ name: '', birthDate: '', gender: 'fille' });
      setTempFormData({ name: '', birthDate: '', gender: 'fille' });
      setFeedingMethod(null);
      setExperience(null);
      setSessions([]);
      setActiveSession(null);
      setMoodEntries([]);
      setStep(1);
      setScreen('onboarding');
      setTab('dashboard');
    };

    return (
      <div className="p-6 pb-24">
        <h1 className="text-3xl font-serif text-[#AB7058] mb-6 flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Profil
        </h1>

        {/* Baby info card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-4">
          <div className="flex items-center gap-3 mb-4">
            <BabyIcon className="w-12 h-12" />
            <div>
              <h2 className="text-xl font-serif text-[#AB7058]">{baby.name || "Bébé"}</h2>
              <p className="text-[#8B6552] text-sm">
                {baby.birthDate 
                  ? (() => {
                      const days = Math.floor((new Date() - new Date(baby.birthDate)) / (1000 * 60 * 60 * 24));
                      const years = Math.floor(days / 365);
                      const months = Math.floor((days % 365) / 30);
                      const remainingDays = days % 30;
                      
                      if (years > 0) {
                        return `${years} an${years > 1 ? 's' : ''} ${months > 0 ? `${months} mois` : ''}`;
                      } else if (months > 0) {
                        return `${months} mois ${remainingDays > 0 ? `${remainingDays} jour${remainingDays > 1 ? 's' : ''}` : ''}`;
                      } else {
                        return `${days} jour${days > 1 ? 's' : ''}`;
                      }
                    })()
                  : "Date de naissance non renseignée"
                }
              </p>
            </div>
          </div>
          <div className="text-[#8B6552] text-sm">
            <p>📊 {sessions.length} sessions enregistrées</p>
          </div>
        </div>

        {/* Reset button */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-serif text-[#AB7058] mb-3">Zone dangereuse</h3>
          <p className="text-[#8B6552] text-sm mb-4">
            Cette action supprimera toutes tes données et te ramènera à l'onboarding.
          </p>
          <button
            onClick={handleReset}
            style={{ 
              color: '#ffffff',
              background: '#D4757A'
            }}
            className="w-full py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            🔄 Réinitialiser l'application
          </button>
        </div>
      </div>
    );
  };

  // BOTTOM NAV
  const Nav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t-2 border-[#EED9C4] px-6 py-3 shadow-2xl">
      <div className="flex justify-around max-w-md mx-auto">
        {[
          { id: 'dashboard', icon: <Heart className="w-6 h-6" />, label: 'Suivi' },
          { id: 'journal', icon: <Moon className="w-6 h-6" />, label: 'Journal' },
          { id: 'savoirs', icon: <BookOpen className="w-6 h-6" />, label: 'Savoirs' },
          { id: 'profil', icon: <Settings className="w-6 h-6" />, label: 'Profil' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              color: tab === t.id ? '#AB7058' : '#8B6552'
            }}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
              tab === t.id ? 'bg-[#EED9C4]/50 scale-105' : ''
            }`}
          >
            {t.icon}
            <span className="text-xs font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Crimson Pro', serif; }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
      `}</style>
      
      {screen === 'onboarding' ? (
        <Onboarding />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-[#EED9C4] to-[#F5E6D8] flex justify-center">
          <div className="w-full max-w-2xl relative">
            {/* Navigation arrows */}
            <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none z-10">
              <button
                onClick={() => {
                  const tabs = ['dashboard', 'journal', 'savoirs', 'profil'];
                  const currentIndex = tabs.indexOf(tab);
                  if (currentIndex > 0) setTab(tabs[currentIndex - 1]);
                }}
                disabled={tab === 'dashboard'}
                style={{
                  color: tab === 'dashboard' ? '#D4BFA8' : '#AB7058'
                }}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ←
              </button>
              <button
                onClick={() => {
                  const tabs = ['dashboard', 'journal', 'savoirs', 'profil'];
                  const currentIndex = tabs.indexOf(tab);
                  if (currentIndex < tabs.length - 1) setTab(tabs[currentIndex + 1]);
                }}
                disabled={tab === 'profil'}
                style={{
                  color: tab === 'profil' ? '#D4BFA8' : '#AB7058'
                }}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
            
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'journal' && <Journal />}
            {tab === 'savoirs' && <Savoirs />}
            {tab === 'profil' && <Profile />}
          </div>
          <Nav />
        </div>
      )}
    </div>
  );
}