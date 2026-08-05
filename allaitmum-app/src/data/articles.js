export const articles = [
  {
    id: 1,
    category: 'Débuter',
    title: "Débuter l'allaitement : le guide complet",
    duration: '8 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Tout ce qu'on aurait aimé savoir AVANT. Les vraies infos, les vraies techniques.",
    sections: [
      {
        title: 'La première heure : le golden hour',
        content: `Dès la naissance (si possible) :
• Peau à peau immédiat avec bébé
• Laisse-le ramper vers le sein (breast crawl)
• Pas de précipitation, il sait ce qu'il fait
• Cette première tétée aide à établir le lien, stimuler ta production, donner le colostrum

Le colostrum, c'est quoi ?
Liquide épais, jaune/orange, ULTRA concentré en anticorps. Parfait pour l'estomac de bébé (taille d'une cerise J1). Quelques ml suffisent !`,
      },
      {
        title: 'Les positions qui sauvent',
        content: `Position classique (madone) : Bébé face à toi, ventre contre ventre. Sa tête dans le creux de ton coude.

Position ballon de rugby : Bébé sur le côté, sous ton bras. TOP pour césarienne, gros seins, jumeaux.

Position allongée : Sur le côté, bébé face à toi. TOP pour les nuits et le repos.

Biological nurturing : Toi semi-allongée, bébé à plat ventre sur toi. TOP pour les crevasses.

LA CLÉ : ventre contre ventre, nez à hauteur du mamelon.`,
      },
      {
        title: 'La prise du sein',
        content: `Mauvaise prise = douleur. Bonne prise = confort.

Comment faire :
1. Attends que bébé ouvre GRAND la bouche
2. Approche-le rapidement vers le sein
3. Son menton touche le sein en premier
4. Il attrape une grosse bouchée (pas juste le téton !)
5. Ses lèvres sont retroussées (comme un poisson)

Si ça fait mal : arrête la succion (doigt dans sa bouche), recommence. Si ça persiste : consultante en lactation IBCLC.`,
      },
      {
        title: 'Les premiers jours',
        content: `J1-J3 : Colostrum - petites quantités (NORMAL !), bébé tète 10-12x/24h minimum.

J3-J5 : Montée de lait - seins gonflés, durs, chauds. Lait qui passe du jaune au blanc.

J7-J14 : Stabilisation - rythme qui se trouve, bébé reprend son poids.

Fréquence : 8-12 tétées/24h MINIMUM. Cluster feeding le soir = NORMAL. Plus bébé tète = plus tu produis.`,
      },
    ],
  },
  {
    id: 2,
    category: 'SOS',
    title: 'SOS Galères : solutions qui marchent',
    duration: '10 min',
    premium: false,
    source: 'La Leche League, e-lactancia',
    intro: "Crevasses, engorgement, mastite... Les vraies solutions concrètes.",
    sections: [
      {
        title: 'Crevasses / Mamelons douloureux',
        content: `Cause n°1 : Mauvaise prise du sein

Solutions immédiates :
1. Vérifie la position (biological nurturing)
2. Lanoline pure après CHAQUE tétée
3. Coquillages d'allaitement
4. Lait maternel : quelques gouttes, sécher à l'air
5. Téterelles en silicone (temporaire, avec consultante)

Si ça ne passe pas en 48h : consultante en lactation URGENTE. Souvent c'est un frein de langue chez bébé !`,
      },
      {
        title: 'Engorgement',
        content: `AVANT la tétée : chaleur (douche, compresses), massage doux, exprimer un peu de lait.

PENDANT : laisse bébé téter, masse doucement, compression du sein.

APRÈS : froid (compresses), feuilles de chou vert (change toutes les 2h), ibuprofène (compatible allaitement).

Prévention : ne saute JAMAIS de tétées, soutien-gorge confortable.`,
      },
      {
        title: 'Mastite',
        content: `MASTITE = URGENCE. Consulte dans les 24h.

1. CONTINUE D'ALLAITER (ESSENTIEL !)
2. Repos TOTAL
3. Feuilles de chou entre les tétées
4. Chaleur avant, froid après
5. Antibiotiques SI NÉCESSAIRE (compatibles allaitement !)

Les antibios pour mastite sont TOUS compatibles. Si ton médecin dit d'arrêter : vérifie sur e-lactancia.org.`,
      },
      {
        title: 'Muguet (Candida)',
        content: `Douleur brûlante même entre les tétées. Mamelons roses, brillants. Bébé a des plaques blanches dans la bouche.

Traitement : Nystatine (bébé ET toi), stériliser TOUT. Traiter bébé ET toi en même temps.`,
      },
    ],
  },
  {
    id: 3,
    category: 'Lactation',
    title: 'Booster sa production',
    duration: '7 min',
    premium: false,
    source: 'La Leche League',
    intro: 'Pas assez de lait ? Avant de paniquer, essaie ça.',
    sections: [
      {
        title: 'Vrais vs faux signes',
        content: `VRAIS signes de production insuffisante :
• Prise de poids < 150g/semaine
• Moins de 5-6 couches lourdes/jour (après J5)
• Urines foncées
• Bébé léthargique

FAUX signes :
• Seins mous (ils sont juste habitués !)
• Bébé tète souvent (c'est NORMAL)
• Peu de lait au tire-lait (ne reflète PAS ta production)`,
      },
      {
        title: 'Power pumping',
        content: `Simule un cluster feeding :
• Tire 20 min → pause 10 min → tire 10 min → pause 10 min → tire 10 min
• 1 fois/jour pendant 3-4 jours
• Résultats en 48-72h

Meilleur moment : le matin (prolactine max).`,
      },
      {
        title: 'Aliments galactogènes',
        content: `Champions : avoine (flocons, porridge), fenouil, amandes, dattes, patate douce, légumineuses.

Recette lactation balls : 1 tasse flocons d'avoine + 1/2 tasse beurre de cacahuète + 1/3 tasse miel + graines de lin + levure de bière. Forme des boules, au frigo. 2-3/jour.

Tisane : fenouil + anis + cumin, 3 tasses/jour.`,
      },
    ],
  },
  {
    id: 4,
    category: 'Médicaments',
    title: 'Médicaments et allaitement',
    duration: '5 min',
    premium: true,
    source: 'CRAT (lecrat.fr), e-lactancia.org',
    intro: "Ton médecin te dit d'arrêter ? Vérifie TOUJOURS. 9 fois sur 10, il existe une alternative.",
    sections: [
      {
        title: 'e-lactancia.org : ton allié',
        content: `LE SITE DE RÉFÉRENCE MONDIAL. Créé par un hôpital espagnol, basé sur des études scientifiques.

Code couleur :
• VERT = Compatible
• JAUNE = Probablement compatible
• ORANGE = Risque élevé (cherche alternative)
• ROUGE = Contre-indiqué

90% des médicaments sont compatibles !`,
      },
      {
        title: 'CRAT : la référence française',
        content: `Centre de Référence sur les Agents Tératogènes (lecrat.fr). Site français très fiable, basé sur des études scientifiques.

Utilise les DEUX sites (e-lactancia + CRAT) pour une double vérification.

Si ton médecin te dit d'arrêter "par précaution" :
1. Vérifie sur e-lactancia
2. Vérifie sur CRAT
3. Demande un 2ème avis`,
      },
      {
        title: 'Tu PEUX allaiter avec',
        content: `Anesthésie : reprends dès que tu es réveillée.
IRM avec produit de contraste : compatible.
Tous les vaccins classiques : compatible.
Soins dentaires : compatible.

VRAIES contre-indications (rares) : chimiothérapie, radioactivité.`,
      },
    ],
  },
  {
    id: 5,
    category: 'Nutrition',
    title: 'Ton alimentation',
    duration: '6 min',
    premium: false,
    source: 'La Leche League',
    intro: "Faut-il manger pour deux ? On fait le point.",
    sections: [
      {
        title: 'Les bases',
        content: `Calories : +500 kcal/jour environ. Écoute ta faim. NE FAIS PAS de régime.

Hydratation : 2,5-3L d'eau/jour. Bois à chaque tétée. Déshydratation = baisse de production.

Astuce : garde une bouteille d'eau près de ton spot allaitement.`,
      },
      {
        title: 'Aliments "interdits" : démystifions',
        content: `Aliments épicés : tu PEUX en manger.
Chou, brocoli : tu PEUX. Les gaz ne passent PAS dans le lait.
Produits laitiers : OK sauf allergie avérée (APLV).
Arachides, œufs : tu PEUX. L'exposition via le lait peut même aider.

Café : 2-3 par jour OK. Évite après 15h si bébé agité.
Alcool : occasionnel OK. 1 verre = attendre 2-3h.`,
      },
    ],
  },
  {
    id: 6,
    category: 'Bébé',
    title: 'Diversification : DME ou purées ?',
    duration: '6 min',
    premium: true,
    source: 'OMS, Mpedia',
    intro: "Ton bébé va manger solide. Comment l'introduire ?",
    sections: [
      {
        title: 'Quand commencer ?',
        content: `OMS recommande : 6 mois révolus.

Signes que bébé est prêt :
• Tient assis seul
• A perdu le réflexe de poussée de la langue
• S'intéresse à ce que tu manges
• Porte des objets à sa bouche

PAS avant 4 mois.`,
      },
      {
        title: 'Les 2 méthodes',
        content: `Purées : tu prépares, à la cuillère, texture évolutive.
DME : bébé mange seul avec ses mains, morceaux adaptés.

TU PEUX MIXER LES DEUX ! Pas de "meilleure" méthode.

Le lait reste l'aliment PRINCIPAL jusqu'à 1 an.`,
      },
    ],
  },
  {
    id: 7,
    category: 'Tire-lait',
    title: 'Tire-lait : le guide complet',
    duration: '8 min',
    premium: true,
    source: 'La Leche League',
    intro: 'Choisir, utiliser, optimiser ton tire-lait.',
    sections: [
      {
        title: 'Quel tire-lait choisir ?',
        content: `Manuel : pour un usage occasionnel. Pratique, silencieux, pas cher.

Électrique simple : usage régulier. Bon rapport qualité/prix.

Électrique double : tire-allaitement exclusif. Gain de temps énorme. Remboursé par la Sécu sur ordonnance !

Tire-lait mains-libres : discret, pratique, mais souvent moins efficace.

En France : location en pharmacie sur ordonnance = remboursée !`,
      },
      {
        title: 'Optimiser ses tirages',
        content: `Taille de téterelle : ESSENTIELLE. Ton mamelon doit bouger librement sans frotter.

Technique :
1. Commence en mode stimulation (rapide)
2. Passe en mode expression quand le lait coule
3. Compression du sein pendant le tirage
4. Regarde une photo/vidéo de bébé (stimule l'ocytocine)

Conservation du lait :
• Température ambiante : 4-6h
• Réfrigérateur : 48h (fond du frigo)
• Congélateur : 4-6 mois`,
      },
    ],
  },
  {
    id: 8,
    category: 'Sommeil',
    title: 'Sommeil de bébé et allaitement',
    duration: '5 min',
    premium: true,
    source: 'La Leche League, OMS',
    intro: "Les tétées de nuit et le sommeil de bébé allaité.",
    sections: [
      {
        title: 'Les tétées de nuit sont NORMALES',
        content: `Nouveau-né : 2-4 tétées/nuit minimum.
3-6 mois : 1-3 tétées/nuit.
6-12 mois : 1-2 tétées/nuit.
12 mois+ : variable.

Les tétées nocturnes sont ESSENTIELLES pour la production (prolactine max la nuit).

Ne les supprime pas trop tôt !`,
      },
      {
        title: 'Conseils pour les nuits',
        content: `Pour faciliter les tétées nocturnes :
• Garde bébé à proximité dans son propre lit
• Prépare tout le nécessaire avant de te coucher
• Limite les stimulations (lumière, bruit)
• Allaite en position allongée si tu le souhaites
• Accepte de l'aide pour te reposer la journée

Les nuits s'améliorent progressivement avec le temps.`,
      },
    ],
  },
  {
    id: 9,
    category: 'Droits',
    title: 'Tes droits de maman allaitante',
    duration: '5 min',
    premium: false,
    source: 'Code du travail français',
    intro: 'Allaiter au travail, en public, tes droits légaux.',
    sections: [
      {
        title: 'Au travail',
        content: `Article L1225-30 du Code du travail :
• 1h par jour pour allaiter (pendant 1 an après la naissance)
• Répartie en 2x30 min
• Sur le temps de travail
• Local dédié obligatoire (entreprises > 100 salariés)

Ton employeur NE PEUT PAS te le refuser. C'est la LOI.`,
      },
      {
        title: 'En public',
        content: `Allaiter en public est un DROIT en France.

Personne ne peut te demander de partir, te couvrir, ou aller aux toilettes.

Si quelqu'un te fait une remarque : tu es dans ton droit. Point.`,
      },
    ],
  },
  {
    id: 10,
    category: 'Sevrage',
    title: 'Le sevrage : à ton rythme',
    duration: '6 min',
    premium: true,
    source: 'La Leche League, OMS',
    intro: 'Quand et comment sevrer. Sans culpabilité.',
    sections: [
      {
        title: 'Quand sevrer ?',
        content: `OMS recommande : allaitement jusqu'à 2 ans ou plus.

MAIS : le bon moment, c'est QUAND TU VEUX.

Sevrage naturel : bébé arrête de lui-même (souvent entre 2-4 ans).
Sevrage initié par la mère : progressif, à ton rythme.

Aucun jugement. Chaque goutte de lait que tu as donnée compte.`,
      },
      {
        title: 'Comment sevrer en douceur',
        content: `1. Supprime UNE tétée à la fois
2. Attends 3-5 jours entre chaque suppression
3. Commence par la tétée la moins importante
4. Garde les tétées du matin et du soir en dernier
5. Propose le biberon/tasse à la place

Si engorgement : tire juste assez pour soulager (pas complètement).

Le sevrage PEUT prendre des semaines/mois. C'est normal.`,
      },
    ],
  },
  {
    id: 11,
    category: 'Accessoires',
    title: 'Téterelles : quand et comment les utiliser',
    duration: '6 min',
    premium: false,
    source: 'La Leche League France, IBCLC',
    intro: 'Les téterelles peuvent être une aide précieuse — à condition de les utiliser correctement et au bon moment.',
    sections: [
      {
        title: 'C\'est quoi une téterelle ?',
        content: `Une téterelle (aussi appelée "bout de sein") est un capuchon en silicone souple que tu places sur ton mamelon pendant la tétée.

Elle imite la forme d'un téton allongé pour aider bébé à prendre le sein.

Il en existe en différentes tailles (S, M, L) — la taille compte beaucoup pour l'efficacité !`,
      },
      {
        title: 'Quand peut-elle aider ?',
        content: `✅ Mamelons plats ou ombiliqués (qui ne ressortent pas)
✅ Mamelons très douloureux ou crevassés (en transition)
✅ Bébé prématuré ou avec un frein de langue
✅ Bébé habitué au biberon qui a du mal à revenir au sein
✅ Sein trop engorgé et dur (bébé n'arrive pas à saisir)

⚠️ Ce n'est pas une solution miracle — si bébé ne prend pas bien le sein, une consultante en lactation (IBCLC) doit être consultée en priorité.`,
      },
      {
        title: 'Comment bien l\'utiliser',
        content: `1. Choisis la bonne taille : le mamelon doit bouger librement dans le tunnel sans être serré
2. Humidifie-la avant de la poser (lait maternel ou eau tiède)
3. Retourne-la à moitié comme un bonnet, pose sur le mamelon, laisse revenir en place
4. Vérifie que bébé attrape aussi l'aréole, pas juste la téterelle
5. Tu dois entendre bébé déglutir — signe qu'il boit vraiment

Nettoie-la après chaque tétée à l'eau chaude savonneuse ou stérilise-la.`,
      },
      {
        title: 'Les points de vigilance',
        content: `⚠️ La téterelle peut réduire la stimulation du sein et donc ta production si mal utilisée.

Surveille ces signes que tout va bien :
• Bébé prend du poids correctement
• Tu entends des déglutitions
• Bébé semble rassasié après la tétée
• Tes seins se vident bien

Si tu utilises une téterelle, fais des pesées régulières chez la PMI ou ton pédiatre.`,
      },
      {
        title: 'Sevrage de la téterelle',
        content: `L'objectif : utiliser la téterelle le moins possible et sevrer progressivement.

Comment :
• Commence chaque tétée sans téterelle, mets-la seulement si bébé décroche
• Propose le sein nu en fin de tétée quand bébé est détendu
• Alterne tétées avec et sans

Beaucoup de mamans arrivent à s'en passer en quelques semaines. D'autres en ont besoin plus longtemps — et c'est OK !`,
      },
    ],
  },
  {
    id: 12,
    category: 'Accessoires',
    title: 'Bouts de sein & accessoires d\'allaitement',
    duration: '5 min',
    premium: false,
    source: 'La Leche League France',
    intro: 'Coquillages, protège-mamelons, coussinets... Le guide des accessoires utiles (et ceux dont tu peux te passer).',
    sections: [
      {
        title: 'Les coquillages d\'allaitement',
        content: `Ce sont des coupelles en silicone ou en plastique que tu portes dans ton soutien-gorge ENTRE les tétées (pas pendant).

À quoi ça sert ?
• Recueillir le lait qui coule du sein opposé pendant une tétée
• Protéger des mamelons douloureux du frottement du tissu
• Aider les mamelons plats à ressortir (à porter quelques heures par jour)

⚠️ Ne pas confondre avec les téterelles (portées PENDANT la tétée).`,
      },
      {
        title: 'Les coussinets d\'allaitement',
        content: `Indispensables pour les fuites de lait, surtout les premières semaines.

Jetables : pratiques en voyage, à l'hôpital, les premières semaines.
Lavables : économiques et écologiques sur le long terme.

💡 Change-les souvent — un coussinet humide peut favoriser les mycoses.

Évite les coussinets avec couche plastique qui retiennent l'humidité contre la peau.`,
      },
      {
        title: 'Les protège-mamelons (cold packs)',
        content: `Des disques de gel que tu mets au froid et que tu appliques sur les mamelons douloureux après la tétée.

Très efficaces pour :
• Soulager les crevasses
• Calmer les mamelons en feu les premiers jours
• Réduire l'inflammation en cas d'engorgement

Tu peux aussi les utiliser chauds pour favoriser l'écoulement du lait avant la tétée.`,
      },
      {
        title: 'Nos conseils pour bien choisir',
        content: `💡 Commence léger et ajoute au fur et à mesure selon tes besoins.

• Soutien-gorge d'allaitement : 2-3 suffisent pour commencer, choisis sans armatures
• Tire-lait : attends de voir si tu en as besoin avant d'investir dans un haut de gamme
• Coussinets lavables : économiques et écologiques sur la durée
• Lanoline pure : indispensable pour les mamelons douloureux les premiers jours

L'allaitement c'est avant tout une relation entre toi et bébé — le matériel est là pour t'accompagner, pas pour te compliquer la vie !`,
      },
    ],
  },
];

export const categories = [
  'Toutes',
  'Débuter',
  'SOS',
  'Lactation',
  'Médicaments',
  'Nutrition',
  'Bébé',
  'Tire-lait',
  'Sommeil',
  'Droits',
  'Sevrage',
  'Accessoires',
];
