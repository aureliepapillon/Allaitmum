// Guide de diversification alimentaire pour bébé
// Sources : OMS, PNNS, recommandations pédiatriques françaises

export const FOOD_CATEGORIES = [
  { id: 'legumes', label: 'Légumes', icon: 'leaf', color: '#4CAF50' },
  { id: 'fruits', label: 'Fruits', icon: 'nutrition', color: '#FF9800' },
  { id: 'feculents', label: 'Féculents', icon: 'restaurant', color: '#795548' },
  { id: 'proteines', label: 'Protéines', icon: 'fish', color: '#F44336' },
  { id: 'laitages', label: 'Produits laitiers', icon: 'water', color: '#2196F3' },
  { id: 'matieres-grasses', label: 'Matières grasses', icon: 'ellipse', color: '#FFC107' },
  { id: 'boissons', label: 'Boissons', icon: 'cafe', color: '#00BCD4' },
  { id: 'autres', label: 'Autres / Épices', icon: 'flask', color: '#9C27B0' },
];

// status: 'ok' = autorisé, 'prudence' = avec précaution, 'interdit' = interdit
export const FOODS = [
  // === LÉGUMES ===
  { name: 'Carotte', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse puis morceaux', note: 'Idéal pour commencer, goût doux et sucré' },
  { name: 'Courgette', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse', note: 'Très digeste, parfaite pour débuter' },
  { name: 'Haricots verts', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse bien mixée', note: 'Retirer les fils, bien mixer' },
  { name: 'Potiron / Courge', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse', note: 'Goût doux apprécié des bébés' },
  { name: 'Patate douce', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse', note: 'Naturellement sucrée' },
  { name: 'Épinards', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée lisse mélangée', note: 'Riche en fer, mélanger avec pomme de terre' },
  { name: 'Brocoli', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse puis fleurettes', note: 'Riche en vitamines C et K' },
  { name: 'Petits pois', category: 'legumes', fromMonths: 4, status: 'ok', texture: 'Purée bien lisse (enlever peaux)', note: 'Bien mixer pour retirer les peaux' },
  { name: 'Poireau', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse (partie blanche)', note: 'Uniquement la partie blanche au début' },
  { name: 'Artichaut', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse (fond et cœur)', note: 'Fond et cœur uniquement' },
  { name: 'Aubergine', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse sans peau', note: 'Retirer peau et graines' },
  { name: 'Betterave', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse', note: 'Cuite, en petite quantité (nitrates)' },
  { name: 'Tomate', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Cuite, sans peau ni pépins', note: 'Toujours cuite et pelée au début' },
  { name: 'Avocat', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Écrasé ou en morceaux', note: 'Bien mûr, riche en bonnes graisses' },
  { name: 'Poivron', category: 'legumes', fromMonths: 8, status: 'ok', texture: 'Cuit, sans peau', note: 'Cuit et pelé, bien toléré' },
  { name: 'Champignons', category: 'legumes', fromMonths: 8, status: 'ok', texture: 'Bien cuits et mixés', note: 'Champignons de Paris en priorité' },
  { name: 'Chou-fleur', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse', note: 'Peut provoquer des gaz, introduire doucement' },
  { name: 'Navet', category: 'legumes', fromMonths: 6, status: 'ok', texture: 'Purée lisse', note: 'Goût prononcé, mélanger au début' },
  { name: 'Céleri', category: 'legumes', fromMonths: 8, status: 'prudence', texture: 'Purée lisse', note: 'Allergène potentiel, introduire seul' },
  { name: 'Radis', category: 'legumes', fromMonths: 12, status: 'ok', texture: 'Cuit ou râpé fin', note: 'Cru seulement après 2-3 ans' },

  // === FRUITS ===
  { name: 'Pomme', category: 'fruits', fromMonths: 4, status: 'ok', texture: 'Compote lisse', note: 'Cuite en compote, fruit parfait pour débuter' },
  { name: 'Poire', category: 'fruits', fromMonths: 4, status: 'ok', texture: 'Compote lisse', note: 'Très douce et digeste' },
  { name: 'Banane', category: 'fruits', fromMonths: 4, status: 'ok', texture: 'Écrasée', note: 'Bien mûre, peut être donnée crue écrasée' },
  { name: 'Pêche / Nectarine', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Compote ou crue bien mûre', note: 'Sans peau, bien mûre' },
  { name: 'Abricot', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Compote', note: 'Cuit de préférence au début' },
  { name: 'Prune / Pruneau', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Compote', note: 'Bon pour le transit' },
  { name: 'Melon', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Écrasé ou petits morceaux', note: 'Bien mûr, en petits morceaux' },
  { name: 'Mangue', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Écrasée ou compote', note: 'Riche en vitamines A et C' },
  { name: 'Fraise', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'Écrasée ou petits morceaux', note: 'Bio de préférence, possible dès 6 mois' },
  { name: 'Framboise', category: 'fruits', fromMonths: 8, status: 'ok', texture: 'Écrasée (filtrer les graines)', note: 'Filtrer les petites graines' },
  { name: 'Myrtille', category: 'fruits', fromMonths: 8, status: 'ok', texture: 'Écrasée', note: 'Riche en antioxydants' },
  { name: 'Raisin', category: 'fruits', fromMonths: 8, status: 'prudence', texture: 'Coupé en 4, sans peau ni pépins', note: 'DANGER étouffement : toujours coupé en 4 dans la longueur' },
  { name: 'Agrumes (orange, clémentine)', category: 'fruits', fromMonths: 6, status: 'ok', texture: 'En jus dilué ou suprêmes', note: 'En petite quantité, peut irriter' },
  { name: 'Kiwi', category: 'fruits', fromMonths: 8, status: 'ok', texture: 'Écrasé', note: 'Bien mûr, riche en vitamine C' },
  { name: 'Ananas', category: 'fruits', fromMonths: 8, status: 'ok', texture: 'Petits morceaux bien mûrs', note: 'Acide, en petite quantité' },
  { name: 'Fruits à coque (noix, amandes)', category: 'fruits', fromMonths: 6, status: 'prudence', texture: 'En poudre ou purée uniquement', note: 'JAMAIS entiers avant 4-5 ans (étouffement). En poudre dès 6 mois pour prévention allergie' },
  { name: 'Fruits exotiques (litchi, papaye)', category: 'fruits', fromMonths: 12, status: 'ok', texture: 'Petits morceaux', note: 'Introduire tardivement, risque allergique' },

  // === FÉCULENTS ===
  { name: 'Pomme de terre', category: 'feculents', fromMonths: 4, status: 'ok', texture: 'Purée lisse', note: 'Épaissit les purées, très digeste' },
  { name: 'Céréales infantiles (sans gluten)', category: 'feculents', fromMonths: 4, status: 'ok', texture: 'Mélangées au lait', note: 'Riz, maïs, millet — sans gluten' },
  { name: 'Céréales avec gluten (blé, orge)', category: 'feculents', fromMonths: 4, status: 'ok', texture: 'Petites quantités progressives', note: 'Introduire le gluten entre 4 et 12 mois, progressivement' },
  { name: 'Pâtes', category: 'feculents', fromMonths: 7, status: 'ok', texture: 'Bien cuites, petites formes', note: 'Petites pâtes type étoiles ou coquillettes' },
  { name: 'Riz', category: 'feculents', fromMonths: 6, status: 'ok', texture: 'Bien cuit', note: 'Riz rond bien cuit' },
  { name: 'Semoule', category: 'feculents', fromMonths: 7, status: 'ok', texture: 'Fine, bien cuite', note: 'Semoule fine de blé dur' },
  { name: 'Pain / Croûte de pain', category: 'feculents', fromMonths: 7, status: 'ok', texture: 'Croûte à sucer, puis morceaux', note: 'Bon pour les gencives, surveiller' },
  { name: 'Quinoa', category: 'feculents', fromMonths: 8, status: 'ok', texture: 'Bien cuit', note: 'Sans gluten, riche en protéines' },
  { name: 'Légumineuses (lentilles, pois chiches)', category: 'feculents', fromMonths: 6, status: 'ok', texture: 'Purée bien lisse', note: 'Bien cuites et mixées, retirer les peaux' },

  // === PROTÉINES ===
  { name: 'Poulet', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Mixé puis haché', note: '10g/jour à 6 mois (2 c. à café)' },
  { name: 'Dinde', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Mixé puis haché', note: 'Viande maigre, très digeste' },
  { name: 'Bœuf', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Mixé', note: 'Riche en fer, bien cuit' },
  { name: 'Veau', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Mixé', note: 'Viande tendre' },
  { name: 'Jambon blanc', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Mixé', note: 'Découenné, dégraissé, sans sel ajouté de préférence' },
  { name: 'Porc', category: 'proteines', fromMonths: 8, status: 'ok', texture: 'Bien cuit, mixé', note: 'Parties maigres uniquement' },
  { name: 'Agneau', category: 'proteines', fromMonths: 8, status: 'ok', texture: 'Mixé', note: 'Plus gras, en petite quantité' },
  { name: 'Poisson blanc (colin, cabillaud)', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Émietté, sans arêtes', note: 'Vérifier soigneusement les arêtes' },
  { name: 'Saumon', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Émietté', note: 'Riche en oméga 3, 1-2x/semaine' },
  { name: 'Poissons gras (thon, espadon)', category: 'proteines', fromMonths: 12, status: 'prudence', texture: 'Émietté', note: 'Métaux lourds — limiter, éviter requin/espadon' },
  { name: 'Œuf (jaune)', category: 'proteines', fromMonths: 4, status: 'ok', texture: 'Dur, écrasé', note: 'Bien cuit. Introduire tôt pour prévention allergie' },
  { name: 'Œuf entier', category: 'proteines', fromMonths: 6, status: 'ok', texture: 'Dur ou en omelette', note: 'Introduire progressivement jaune puis blanc' },
  { name: 'Crustacés / Coquillages', category: 'proteines', fromMonths: 12, status: 'prudence', texture: 'Bien cuits, mixés', note: 'Allergène potentiel, introduire tardivement' },
  { name: 'Charcuterie (saucisson, pâté)', category: 'proteines', fromMonths: 36, status: 'interdit', texture: '', note: 'Trop salée et grasse, éviter avant 3 ans' },

  // === PRODUITS LAITIERS ===
  { name: 'Lait maternel', category: 'laitages', fromMonths: 0, status: 'ok', texture: 'Liquide', note: 'Aliment principal jusqu\'à 6 mois minimum' },
  { name: 'Lait infantile 1er âge', category: 'laitages', fromMonths: 0, status: 'ok', texture: 'Liquide', note: 'Alternative au lait maternel' },
  { name: 'Lait infantile 2e âge', category: 'laitages', fromMonths: 6, status: 'ok', texture: 'Liquide', note: 'De 6 à 12 mois, enrichi en fer' },
  { name: 'Lait de croissance', category: 'laitages', fromMonths: 12, status: 'ok', texture: 'Liquide', note: 'De 1 à 3 ans' },
  { name: 'Yaourt nature', category: 'laitages', fromMonths: 6, status: 'ok', texture: 'Lisse', note: 'Nature, sans sucre ajouté' },
  { name: 'Fromage blanc', category: 'laitages', fromMonths: 6, status: 'ok', texture: 'Lisse', note: 'Nature, au lait pasteurisé' },
  { name: 'Petits suisses', category: 'laitages', fromMonths: 6, status: 'ok', texture: 'Lisse', note: 'Nature de préférence' },
  { name: 'Fromage à pâte dure (emmental, comté)', category: 'laitages', fromMonths: 8, status: 'ok', texture: 'Râpé ou petits morceaux', note: 'Râpé dans les purées' },
  { name: 'Fromage à pâte molle pasteurisé', category: 'laitages', fromMonths: 8, status: 'ok', texture: 'Petits morceaux', note: 'Au lait pasteurisé uniquement' },
  { name: 'Fromage au lait cru', category: 'laitages', fromMonths: 60, status: 'interdit', texture: '', note: 'INTERDIT avant 5 ans (risque listeria, E. coli)' },
  { name: 'Lait de vache entier', category: 'laitages', fromMonths: 12, status: 'prudence', texture: 'Liquide', note: 'Pas avant 1 an, pauvre en fer. Préférer lait de croissance' },
  { name: 'Laits végétaux (amande, soja, avoine)', category: 'laitages', fromMonths: 36, status: 'interdit', texture: '', note: 'NE REMPLACENT PAS le lait infantile. Pas adaptés aux besoins du bébé' },

  // === MATIÈRES GRASSES ===
  { name: 'Huile d\'olive', category: 'matieres-grasses', fromMonths: 4, status: 'ok', texture: '1 c. à café dans la purée', note: 'Indispensable ! 1 c. à café par repas' },
  { name: 'Huile de colza', category: 'matieres-grasses', fromMonths: 4, status: 'ok', texture: '1 c. à café dans la purée', note: 'Riche en oméga 3, excellente pour bébé' },
  { name: 'Beurre', category: 'matieres-grasses', fromMonths: 6, status: 'ok', texture: 'Noisette de beurre', note: 'Petite quantité dans les purées' },
  { name: 'Crème fraîche', category: 'matieres-grasses', fromMonths: 8, status: 'ok', texture: '1 c. à café', note: 'En petite quantité, pasteurisée' },

  // === BOISSONS ===
  { name: 'Eau', category: 'boissons', fromMonths: 6, status: 'ok', texture: 'Liquide', note: 'Eau faiblement minéralisée, proposer à chaque repas à partir de 6 mois' },
  { name: 'Jus de fruits', category: 'boissons', fromMonths: 12, status: 'prudence', texture: 'Liquide', note: 'Déconseillé avant 1 an. Après : dilué, en petite quantité, pas au biberon' },
  { name: 'Sodas / Boissons sucrées', category: 'boissons', fromMonths: 36, status: 'interdit', texture: '', note: 'À éviter le plus longtemps possible' },
  { name: 'Thé / Tisane', category: 'boissons', fromMonths: 36, status: 'interdit', texture: '', note: 'Contient des tanins qui empêchent l\'absorption du fer' },

  // === AUTRES / ÉPICES ===
  { name: 'Sel', category: 'autres', fromMonths: 12, status: 'interdit', texture: '', note: 'NE PAS AJOUTER de sel avant 1 an. Après : très peu' },
  { name: 'Sucre', category: 'autres', fromMonths: 12, status: 'interdit', texture: '', note: 'NE PAS AJOUTER de sucre. Les fruits suffisent' },
  { name: 'Miel', category: 'autres', fromMonths: 12, status: 'interdit', texture: '', note: 'INTERDIT avant 1 an (risque botulisme infantile)' },
  { name: 'Herbes aromatiques (persil, basilic)', category: 'autres', fromMonths: 6, status: 'ok', texture: 'Hachées finement', note: 'Excellent pour éveiller le goût !' },
  { name: 'Épices douces (cannelle, vanille, cumin)', category: 'autres', fromMonths: 6, status: 'ok', texture: 'Pincée', note: 'En petite quantité pour varier les goûts' },
  { name: 'Ail / Oignon', category: 'autres', fromMonths: 6, status: 'ok', texture: 'Cuit dans les préparations', note: 'Cuit, en petite quantité pour parfumer' },
  { name: 'Chocolat', category: 'autres', fromMonths: 24, status: 'prudence', texture: 'Petite quantité', note: 'Après 2 ans, en petite quantité. Éviter le chocolat blanc' },
  { name: 'Bonbons / Sucreries', category: 'autres', fromMonths: 36, status: 'interdit', texture: '', note: 'Risque étouffement + mauvaises habitudes alimentaires' },
  { name: 'Saucisse (knacki, saucisse de Strasbourg)', category: 'proteines', fromMonths: 12, status: 'prudence', texture: 'JAMAIS en rondelles — toujours en longueur puis petits morceaux', note: 'DANGER N°1 d\'étouffement chez l\'enfant. Couper EN LONGUEUR puis en petits morceaux. Jamais en rondelles !' },
  { name: 'Saucisse sèche / Merguez', category: 'proteines', fromMonths: 36, status: 'interdit', texture: '', note: 'Trop salée, trop grasse, et risque étouffement' },
];

// Aliments à ABSOLUMENT éviter selon l'âge
export const DANGER_FOODS = [
  { name: 'Miel', beforeMonths: 12, reason: 'Risque de botulisme infantile (Clostridium botulinum)' },
  { name: 'Lait de vache (comme boisson principale)', beforeMonths: 12, reason: 'Pauvre en fer, pas adapté aux besoins du nourrisson' },
  { name: 'Sel ajouté', beforeMonths: 12, reason: 'Reins immatures, surcharge rénale' },
  { name: 'Sucre ajouté', beforeMonths: 24, reason: 'Favorise les caries et les mauvaises habitudes' },
  { name: 'Fruits à coque ENTIERS', beforeMonths: 60, reason: 'Risque d\'étouffement majeur (en poudre OK dès 6 mois)' },
  { name: 'Fromage au lait cru', beforeMonths: 60, reason: 'Risque de listéria et E. coli (syndrome hémolytique et urémique)' },
  { name: 'Viandes / poissons crus', beforeMonths: 36, reason: 'Risque bactérien (salmonelle, listéria)' },
  { name: 'Charcuterie', beforeMonths: 36, reason: 'Trop de sel et de graisses saturées' },
  { name: 'Sodas et boissons sucrées', beforeMonths: 36, reason: 'Sucre, acidité, zéro valeur nutritive' },
  { name: 'Laits végétaux (en remplacement)', beforeMonths: 36, reason: 'Ne couvrent pas les besoins nutritionnels du bébé' },
  { name: 'Poissons prédateurs (requin, espadon)', beforeMonths: 36, reason: 'Accumulation de mercure et métaux lourds' },
];

// Conseils de prévention étouffement et découpe
export const CHOKING_PREVENTION = [
  {
    food: 'Saucisses (knacki, cocktail, etc.)',
    danger: 'Aliment N°1 d\'étouffement chez l\'enfant',
    icon: 'alert-circle',
    color: '#F44336',
    howToCut: 'JAMAIS en rondelles ! Couper d\'abord en deux dans la longueur, puis en petits morceaux. La forme ronde et la texture glissante sont très dangereuses.',
    image: 'lengthwise',
  },
  {
    food: 'Raisin',
    danger: 'Forme ronde, peau glissante',
    icon: 'alert-circle',
    color: '#F44336',
    howToCut: 'Couper en 4 dans la LONGUEUR (pas en rondelles). Retirer la peau si possible pour les plus petits.',
    image: 'quarter',
  },
  {
    food: 'Tomates cerises',
    danger: 'Forme ronde, éclatent en bouche',
    icon: 'alert-circle',
    color: '#F44336',
    howToCut: 'Couper en 4 dans la longueur. Ne jamais donner entières.',
    image: 'quarter',
  },
  {
    food: 'Carottes crues',
    danger: 'Très dures, risque de blocage',
    icon: 'warning',
    color: '#FF9800',
    howToCut: 'Pas de bâtonnets de carotte crue avant 3 ans. Toujours cuites et molles. Râpées finement si cru après 2 ans.',
    image: 'grated',
  },
  {
    food: 'Pomme crue',
    danger: 'Morceaux durs',
    icon: 'warning',
    color: '#FF9800',
    howToCut: 'En compote ou cuite jusqu\'à 12 mois. Après : très fines lamelles ou râpée. Pas de quartiers durs.',
    image: 'thin-slices',
  },
  {
    food: 'Fruits à coque (noix, amandes, cacahuètes)',
    danger: 'Forme parfaite pour bloquer les voies respiratoires',
    icon: 'alert-circle',
    color: '#F44336',
    howToCut: 'JAMAIS entiers avant 4-5 ans. Uniquement en poudre ou en purée (beurre de cacahuète lisse).',
    image: 'powder',
  },
  {
    food: 'Fromage en cube / Mozzarella',
    danger: 'Texture élastique et collante',
    icon: 'warning',
    color: '#FF9800',
    howToCut: 'Râper ou couper en très fines lamelles. Éviter les cubes et la mozzarella en morceaux.',
    image: 'grated',
  },
  {
    food: 'Pop-corn',
    danger: 'Forme irrégulière, risque d\'inhalation',
    icon: 'alert-circle',
    color: '#F44336',
    howToCut: 'INTERDIT avant 4 ans. Les grains non éclatés sont très dangereux.',
    image: 'forbidden',
  },
  {
    food: 'Pain de mie / Mie de pain',
    danger: 'Forme une boule compacte dans la bouche',
    icon: 'warning',
    color: '#FF9800',
    howToCut: 'Griller légèrement le pain (toast). Couper en petits morceaux. Éviter les grosses bouchées de mie.',
    image: 'small-pieces',
  },
  {
    food: 'Viande en morceaux',
    danger: 'Filandreuse, difficile à mâcher',
    icon: 'information-circle',
    color: '#2196F3',
    howToCut: 'Couper en tout petits morceaux dans le SENS CONTRAIRE des fibres. Bien cuire pour attendrir.',
    image: 'small-pieces',
  },
];

// Règles d'or anti-étouffement
export const SAFETY_RULES = [
  'Toujours surveiller bébé pendant les repas — ne JAMAIS le laisser seul',
  'Bébé doit être assis bien droit, pas incliné en arrière',
  'Pas de nourriture en voiture, en poussette ou en marchant',
  'Couper les aliments ronds en LONGUEUR (jamais en rondelles)',
  'Retirer les noyaux, pépins, peaux dures et arêtes',
  'Pas d\'aliments durs et petits (cacahuètes, pop-corn) avant 4-5 ans',
  'Apprendre les gestes de premiers secours (claques dans le dos, Heimlich)',
  'Adapter la taille des morceaux à l\'âge et à la mastication de bébé',
];

// Étapes clés de la diversification
export const DIVERSIFICATION_STEPS = [
  {
    ageLabel: '4-6 mois',
    fromMonths: 4,
    toMonths: 6,
    title: 'Début de la diversification',
    description: 'Premiers légumes et fruits en purée très lisse. Un nouvel aliment à la fois, pendant 2-3 jours.',
    tips: [
      'Commencer par les légumes avant les fruits',
      'Texture très lisse (mixée finement)',
      'Proposer 1 seul nouvel aliment à la fois',
      'Petites quantités (quelques cuillères)',
      'Le lait reste l\'aliment principal',
      'Pas de sel, pas de sucre ajouté',
    ],
  },
  {
    ageLabel: '6-8 mois',
    fromMonths: 6,
    toMonths: 8,
    title: 'Élargissement',
    description: 'Introduction des protéines (viande, poisson, œuf), féculents et laitages. Textures plus épaisses.',
    tips: [
      'Viande/poisson : 10g par jour (2 cuillères à café)',
      'Proposer de l\'eau à chaque repas',
      'Textures plus épaisses, petits morceaux fondants',
      'Matières grasses : 1 c. à café d\'huile par repas',
      '2 repas solides + 3-4 tétées/biberons',
      'Introduire le gluten progressivement',
    ],
  },
  {
    ageLabel: '8-12 mois',
    fromMonths: 8,
    toMonths: 12,
    title: 'Morceaux et autonomie',
    description: 'Morceaux fondants, finger food. Bébé explore les textures et commence à manger seul.',
    tips: [
      'Morceaux fondants et finger food',
      'Viande/poisson : 20g par jour',
      'Encourager l\'autonomie (cuillère, main)',
      'Varier les textures et les goûts',
      '3 repas + 1 goûter + lait matin/soir',
      'Fromages à pâte dure (emmental râpé)',
    ],
  },
  {
    ageLabel: '12-24 mois',
    fromMonths: 12,
    toMonths: 24,
    title: 'Vers l\'alimentation familiale',
    description: 'Bébé mange presque comme les grands. Morceaux de plus en plus gros. Attention au sel.',
    tips: [
      'Viande/poisson : 30g par jour',
      'Peut boire du lait de vache (en complément)',
      'Toujours peu de sel',
      'Plus de miel possible (après 1 an)',
      'Continuer à proposer des légumes variés',
      'Attention aux aliments à risque d\'étouffement',
    ],
  },
];

// Get foods available for a given age in months
export const getFoodsForAge = (ageInMonths) => {
  return FOODS.filter(food => food.fromMonths <= ageInMonths);
};

// Get forbidden foods for a given age in months
export const getForbiddenFoods = (ageInMonths) => {
  return DANGER_FOODS.filter(food => ageInMonths < food.beforeMonths);
};

// Get current diversification step for a given age
export const getCurrentStep = (ageInMonths) => {
  return DIVERSIFICATION_STEPS.find(
    step => ageInMonths >= step.fromMonths && ageInMonths < step.toMonths
  ) || DIVERSIFICATION_STEPS[DIVERSIFICATION_STEPS.length - 1];
};
