// Conseils de la semaine - rotation automatique
export const weeklyTips = [
  {
    id: 1,
    icon: "heart",
    title: "Peau à peau",
    text: "Le peau à peau favorise la montée de lait, régule la température de bébé et renforce le lien d'attachement. N'hésite pas à le pratiquer souvent !",
    source: "OMS",
  },
  {
    id: 2,
    icon: "thermometer-outline",
    title: "Température de la chambre",
    text: "La chambre de bébé doit être aérée régulièrement et maintenue entre 18°C et 20°C maximum. Cela réduit le risque de mort subite du nourrisson.",
    source: "HAS",
  },
  {
    id: 3,
    icon: "body-outline",
    title: "Portage physiologique",
    text: "Le portage en écharpe ou porte-bébé physiologique respecte la position naturelle de bébé (dos arrondi, genoux plus hauts que les fesses) et libère tes mains.",
    source: "Réseau périnatal",
  },
  {
    id: 4,
    icon: "water",
    title: "Hydratation",
    text: "Pendant l'allaitement, pense à bien t'hydrater ! Garde une bouteille d'eau à portée de main pendant les tétées. 2 à 3 litres par jour sont recommandés.",
    source: "CRAT",
  },
  {
    id: 5,
    icon: "moon",
    title: "Sommeil sécuritaire",
    text: "Bébé doit dormir sur le dos, sur un matelas ferme, sans oreiller ni couette. La turbulette est l'option la plus sûre. Toujours dans son propre espace de couchage.",
    source: "HAS",
  },
  {
    id: 6,
    icon: "refresh",
    title: "Pics de croissance",
    text: "Vers 3 semaines, 6 semaines, 3 mois... bébé peut téter plus souvent. C'est normal ! Ça stimule ta production. Fais confiance à ton corps.",
    source: "La Leche League",
  },
  {
    id: 7,
    icon: "hand-left-outline",
    title: "Position d'allaitement",
    text: "Varie les positions d'allaitement (madone, ballon de rugby, allongée...) pour drainer tous les canaux et prévenir les engorgements.",
    source: "La Leche League",
  },
  {
    id: 8,
    icon: "medkit",
    title: "Crevasses",
    text: "En cas de crevasses, vérifie la prise du sein (bouche grande ouverte, lèvres retroussées). Le lait maternel en fin de tétée est un excellent cicatrisant naturel.",
    source: "CRAT",
  },
  {
    id: 9,
    icon: "restaurant",
    title: "Alimentation variée",
    text: "Pendant l'allaitement, mange varié et équilibré. Très peu d'aliments sont interdits. Le goût de ton lait change selon ce que tu manges et prépare bébé à la diversification.",
    source: "OMS",
  },
  {
    id: 10,
    icon: "fitness",
    title: "Repos",
    text: "Dors quand bébé dort, surtout les premières semaines. La fatigue impacte la lactation et ton moral. Demande de l'aide pour les tâches ménagères.",
    source: "Solidarilait",
  },
  {
    id: 11,
    icon: "timer",
    title: "Allaitement à la demande",
    text: "L'allaitement à la demande (pas d'horaires fixes) est recommandé. Bébé régule lui-même sa faim. Propose le sein aux premiers signes d'éveil.",
    source: "OMS",
  },
  {
    id: 12,
    icon: "ice-cream-outline",
    title: "Tire-lait et conservation",
    text: "Le lait maternel se conserve 4h à température ambiante, 4 jours au frigo, et 4 mois au congélateur. Règle des 4 facile à retenir !",
    source: "CRAT",
  },
  {
    id: 13,
    icon: "people",
    title: "Soutien",
    text: "Tu n'es pas seule ! Rejoins un groupe de soutien à l'allaitement (La Leche League, Solidarilait) ou parle à une consultante en lactation IBCLC si tu as des difficultés.",
    source: "La Leche League",
  },
  {
    id: 14,
    icon: "flash",
    title: "Confusion sein/tétine",
    text: "Les premières semaines, évite les tétines et biberons si possible pour que bébé apprenne bien à téter au sein. Après 4-6 semaines, le risque de confusion diminue.",
    source: "La Leche League",
  },
  {
    id: 15,
    icon: "sunny",
    title: "Vitamine D",
    text: "Tous les bébés allaités doivent recevoir un supplément de vitamine D (400 à 800 UI/jour selon les recommandations) jusqu'à 18 mois minimum.",
    source: "HAS",
  },
];

export function getTipOfTheWeek() {
  // Calcul basé sur le numéro de semaine de l'année
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
  const tipIndex = weekNumber % weeklyTips.length;
  return weeklyTips[tipIndex];
}

export function getRandomTip() {
  return weeklyTips[Math.floor(Math.random() * weeklyTips.length)];
}
