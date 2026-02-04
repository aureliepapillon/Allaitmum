// Étapes de développement du bébé par tranche d'âge (en mois)
export const developmentMilestones = [
  {
    minMonths: 0,
    maxMonths: 1,
    title: "Nouveau-né",
    description: "Sa vision est encore floue (environ 20-30 cm) mais il reconnaît déjà ta voix et ton odeur. Il tète fréquemment (8 à 12 fois par jour) et alterne entre des éveils brefs et beaucoup de sommeil. Le peau à peau est essentiel pour le rassurer.",
    icon: "leaf-outline",
  },
  {
    minMonths: 1,
    maxMonths: 2,
    title: "1 mois",
    description: "Il commence à fixer ton visage et peut suivre un objet des yeux. Les premiers sourires apparaissent ! Il distingue mieux les contrastes. Les tétées restent fréquentes mais commencent à s'espacer légèrement la nuit pour certains bébés.",
    icon: "eye-outline",
  },
  {
    minMonths: 2,
    maxMonths: 3,
    title: "2 mois",
    description: "Il gazouille et fait ses premiers \"areuh\". Il tient mieux sa tête et découvre ses mains. C'est le pic des coliques pour certains. Il reconnaît les visages familiers et sourit en réponse. Le rythme jour/nuit commence à se mettre en place.",
    icon: "chatbubble-outline",
  },
  {
    minMonths: 3,
    maxMonths: 4,
    title: "3 mois",
    description: "Il rit aux éclats et adore les interactions ! Il attrape les objets volontairement et les porte à sa bouche. Sa vision des couleurs s'améliore. Les tétées sont plus efficaces et plus espacées. Il peut commencer à faire ses nuits.",
    icon: "happy-outline",
  },
  {
    minMonths: 4,
    maxMonths: 5,
    title: "4 mois",
    description: "Il se retourne du dos sur le ventre. Il babille de plus en plus et répond quand on lui parle. Il reconnaît son prénom. Attention aux pics de croissance qui augmentent temporairement la demande de tétées.",
    icon: "refresh-outline",
  },
  {
    minMonths: 5,
    maxMonths: 6,
    title: "5 mois",
    description: "Il tient assis avec appui et explore tout avec sa bouche. Il montre de l'intérêt pour la nourriture des adultes. C'est bientôt le début de la diversification alimentaire. Il différencie les personnes connues des étrangers.",
    icon: "restaurant-outline",
  },
  {
    minMonths: 6,
    maxMonths: 8,
    title: "6-7 mois",
    description: "Début de la diversification ! Il tient assis seul et commence peut-être à ramper. L'angoisse de séparation peut apparaître. Les premières dents percent souvent à cet âge. Il comprend le \"non\" et imite les sons.",
    icon: "nutrition-outline",
  },
  {
    minMonths: 8,
    maxMonths: 10,
    title: "8-9 mois",
    description: "Il rampe ou fait du quatre-pattes. Il dit peut-être \"mama\" ou \"papa\" ! Il adore le jeu du coucou-caché. Il peut manger des morceaux fondants. L'attachement aux parents est très fort.",
    icon: "walk-outline",
  },
  {
    minMonths: 10,
    maxMonths: 12,
    title: "10-11 mois",
    description: "Il se met debout en s'agrippant et fait ses premiers pas le long des meubles. Il pointe du doigt et comprend des mots simples. Il peut boire au verre avec aide. Son alimentation se diversifie de plus en plus.",
    icon: "footsteps-outline",
  },
  {
    minMonths: 12,
    maxMonths: 18,
    title: "1 an",
    description: "Premier anniversaire ! Il marche ou est sur le point de le faire. Son vocabulaire s'enrichit (5 à 10 mots). Il peut manger presque comme les grands. L'allaitement peut continuer aussi longtemps que vous le souhaitez.",
    icon: "gift-outline",
  },
  {
    minMonths: 18,
    maxMonths: 24,
    title: "18 mois",
    description: "Il court, grimpe et explore partout ! Son vocabulaire explose. Il commence à exprimer ses émotions et peut faire des \"crises\". C'est l'âge de l'affirmation de soi. Le sevrage naturel peut se faire progressivement.",
    icon: "rocket-outline",
  },
  {
    minMonths: 24,
    maxMonths: 999,
    title: "2 ans et +",
    description: "Il fait des phrases, pose des questions et développe son imagination. L'allaitement long est bénéfique et peut continuer. Il devient de plus en plus autonome tout en ayant encore besoin de beaucoup de réconfort.",
    icon: "star-outline",
  },
];

export function getDevelopmentInfo(birthDate) {
  if (!birthDate) return developmentMilestones[0];

  const birth = new Date(birthDate);
  const now = new Date();
  const ageInMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());

  const milestone = developmentMilestones.find(
    (m) => ageInMonths >= m.minMonths && ageInMonths < m.maxMonths
  );

  return milestone || developmentMilestones[developmentMilestones.length - 1];
}
