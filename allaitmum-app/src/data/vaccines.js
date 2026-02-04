// Calendrier vaccinal français officiel (source: solidarites-sante.gouv.fr)
export const vaccineSchedule = [
  {
    id: 'bcg',
    name: 'BCG',
    disease: 'Tuberculose',
    ageMonths: 1,
    ageLabel: 'Dès la naissance',
    mandatory: false,
    notes: 'Recommandé pour les enfants à risque (Île-de-France, Guyane, etc.)',
  },
  {
    id: 'hepb-1',
    name: 'Hépatite B (1ère dose)',
    disease: 'Hépatite B',
    ageMonths: 2,
    ageLabel: '2 mois',
    mandatory: true,
    notes: 'Vaccin hexavalent (combiné)',
  },
  {
    id: 'dtcp-1',
    name: 'DTP-Coqueluche-Hib (1ère dose)',
    disease: 'Diphtérie, Tétanos, Polio, Coqueluche, Haemophilus',
    ageMonths: 2,
    ageLabel: '2 mois',
    mandatory: true,
    notes: 'Vaccin hexavalent',
  },
  {
    id: 'pneumo-1',
    name: 'Pneumocoque (1ère dose)',
    disease: 'Infections à pneumocoque',
    ageMonths: 2,
    ageLabel: '2 mois',
    mandatory: true,
    notes: 'Prevenar 13',
  },
  {
    id: 'hepb-2',
    name: 'Hépatite B (2ème dose)',
    disease: 'Hépatite B',
    ageMonths: 4,
    ageLabel: '4 mois',
    mandatory: true,
    notes: 'Vaccin hexavalent',
  },
  {
    id: 'dtcp-2',
    name: 'DTP-Coqueluche-Hib (2ème dose)',
    disease: 'Diphtérie, Tétanos, Polio, Coqueluche, Haemophilus',
    ageMonths: 4,
    ageLabel: '4 mois',
    mandatory: true,
    notes: 'Vaccin hexavalent',
  },
  {
    id: 'pneumo-2',
    name: 'Pneumocoque (2ème dose)',
    disease: 'Infections à pneumocoque',
    ageMonths: 4,
    ageLabel: '4 mois',
    mandatory: true,
    notes: 'Prevenar 13',
  },
  {
    id: 'meningo-b1',
    name: 'Méningocoque B (1ère dose)',
    disease: 'Méningite B',
    ageMonths: 3,
    ageLabel: '3 mois',
    mandatory: true,
    notes: 'Bexsero',
  },
  {
    id: 'meningo-b2',
    name: 'Méningocoque B (2ème dose)',
    disease: 'Méningite B',
    ageMonths: 5,
    ageLabel: '5 mois',
    mandatory: true,
    notes: 'Bexsero',
  },
  {
    id: 'rotavirus-1',
    name: 'Rotavirus (1ère dose)',
    disease: 'Gastro-entérite à rotavirus',
    ageMonths: 2,
    ageLabel: '2 mois',
    mandatory: false,
    notes: 'Vaccin oral, recommandé',
  },
  {
    id: 'rotavirus-2',
    name: 'Rotavirus (2ème dose)',
    disease: 'Gastro-entérite à rotavirus',
    ageMonths: 3,
    ageLabel: '3 mois',
    mandatory: false,
    notes: 'Vaccin oral',
  },
  {
    id: 'hepb-3',
    name: 'Hépatite B (3ème dose)',
    disease: 'Hépatite B',
    ageMonths: 11,
    ageLabel: '11 mois',
    mandatory: true,
    notes: 'Rappel hexavalent',
  },
  {
    id: 'dtcp-3',
    name: 'DTP-Coqueluche-Hib (rappel)',
    disease: 'Diphtérie, Tétanos, Polio, Coqueluche, Haemophilus',
    ageMonths: 11,
    ageLabel: '11 mois',
    mandatory: true,
    notes: 'Rappel hexavalent',
  },
  {
    id: 'pneumo-3',
    name: 'Pneumocoque (rappel)',
    disease: 'Infections à pneumocoque',
    ageMonths: 11,
    ageLabel: '11 mois',
    mandatory: true,
    notes: 'Rappel Prevenar 13',
  },
  {
    id: 'meningo-c',
    name: 'Méningocoque C',
    disease: 'Méningite C',
    ageMonths: 5,
    ageLabel: '5 mois',
    mandatory: true,
    notes: 'Vaccin conjugué',
  },
  {
    id: 'meningo-b3',
    name: 'Méningocoque B (rappel)',
    disease: 'Méningite B',
    ageMonths: 12,
    ageLabel: '12 mois',
    mandatory: true,
    notes: 'Rappel Bexsero',
  },
  {
    id: 'ror-1',
    name: 'ROR (1ère dose)',
    disease: 'Rougeole, Oreillons, Rubéole',
    ageMonths: 12,
    ageLabel: '12 mois',
    mandatory: true,
    notes: 'Priorix ou M-M-RVAXPRO',
  },
  {
    id: 'meningo-c2',
    name: 'Méningocoque C (rappel)',
    disease: 'Méningite C',
    ageMonths: 12,
    ageLabel: '12 mois',
    mandatory: true,
    notes: 'Rappel',
  },
  {
    id: 'ror-2',
    name: 'ROR (2ème dose)',
    disease: 'Rougeole, Oreillons, Rubéole',
    ageMonths: 16,
    ageLabel: '16-18 mois',
    mandatory: true,
    notes: 'Au moins 6 mois après la 1ère dose',
  },
  {
    id: 'meningo-acwy',
    name: 'Méningocoque ACWY',
    disease: 'Méningites A, C, W, Y',
    ageMonths: 12,
    ageLabel: '12 mois',
    mandatory: false,
    notes: 'Recommandé, Nimenrix ou Menveo',
  },
  {
    id: 'dtcp-rappel-6',
    name: 'DTP-Coqueluche (rappel)',
    disease: 'Diphtérie, Tétanos, Polio, Coqueluche',
    ageMonths: 72,
    ageLabel: '6 ans',
    mandatory: true,
    notes: 'Rappel',
  },
];

export const getVaccinesByAge = () => {
  const groups = {};
  vaccineSchedule.forEach((v) => {
    if (!groups[v.ageLabel]) groups[v.ageLabel] = [];
    groups[v.ageLabel].push(v);
  });
  return Object.entries(groups).map(([age, vaccines]) => ({
    age,
    ageMonths: vaccines[0].ageMonths,
    vaccines,
  }));
};

export const getUpcomingVaccines = (birthDate, vaccinesDone) => {
  if (!birthDate) return [];
  const ageInMonths = Math.floor(
    (new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24 * 30.44)
  );
  return vaccineSchedule
    .filter((v) => !vaccinesDone.includes(v.id) && v.ageMonths >= ageInMonths - 1)
    .sort((a, b) => a.ageMonths - b.ageMonths)
    .slice(0, 5);
};
