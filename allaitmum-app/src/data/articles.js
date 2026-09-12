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

Ce n'est pas une solution miracle — si bébé ne prend pas bien le sein, une consultante en lactation (IBCLC) doit être consultée en priorité.`,
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
        content: `La téterelle peut réduire la stimulation du sein et donc ta production si mal utilisée.

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

Ne pas confondre avec les téterelles (portées PENDANT la tétée).`,
      },
      {
        title: 'Les coussinets d\'allaitement',
        content: `Indispensables pour les fuites de lait, surtout les premières semaines.

Jetables : pratiques en voyage, à l'hôpital, les premières semaines.
Lavables : économiques et écologiques sur le long terme.

Change-les souvent — un coussinet humide peut favoriser les mycoses.

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
        content: `Commence léger et ajoute au fur et à mesure selon tes besoins.

• Soutien-gorge d'allaitement : 2-3 suffisent pour commencer, choisis sans armatures
• Tire-lait : attends de voir si tu en as besoin avant d'investir dans un haut de gamme
• Coussinets lavables : économiques et écologiques sur la durée
• Lanoline pure : indispensable pour les mamelons douloureux les premiers jours

L'allaitement c'est avant tout une relation entre toi et bébé — le matériel est là pour t'accompagner, pas pour te compliquer la vie !`,
      },
    ],
  },
  {
    id: 13,
    category: 'Éveil',
    title: 'Le langage des signes avec bébé',
    duration: '7 min',
    premium: false,
    source: 'Monica Companys (Signe avec Bébé), Dr Linda Acredolo & Susan Goodwyn (UC Davis)',
    intro: "Communiquer avec bébé avant qu'il ne parle : moins de frustration, plus de complicité. Le guide pour démarrer sans pression.",
    sections: [
      {
        title: "C'est quoi, le signe avec bébé ?",
        content: `Il s'agit d'apprendre à bébé quelques gestes simples (inspirés de la langue des signes) pour qu'il puisse exprimer ses besoins avant de savoir parler.

Bébé comprend bien plus de mots qu'il ne peut en prononcer — ses mains sont prêtes à communiquer avant sa bouche. Le signe vient combler cet écart.

Ça ne retarde PAS le langage oral. Les études (Acredolo & Goodwyn, université de Californie) montrent au contraire que les bébés qui signent parlent souvent plus tôt et ont un vocabulaire plus riche — signer, c'est déjà communiquer.`,
      },
      {
        title: 'À partir de quel âge ?',
        content: `Tu peux commencer dès 6-8 mois, quand bébé a un bon contrôle de ses mains et te regarde attentivement.

Les premiers signes apparaîtront en retour généralement entre 8 et 12 mois — chaque bébé a son rythme, certains signent tôt, d'autres beaucoup plus tard (ou pas du tout, et c'est OK aussi !).

Pas besoin d'attendre un "bon moment" particulier : plus tôt tu commences à signer devant lui, plus vite il aura l'occasion de s'imprégner du geste.`,
      },
      {
        title: 'Comment démarrer sans se prendre la tête',
        content: `1. Choisis 2-3 signes maximum au début, liés à son quotidien (ex : "manger", "encore", "dodo")
2. Fais le signe EN MÊME TEMPS que tu dis le mot à voix haute — toujours associer les deux
3. Répète dans le contexte réel, au bon moment (signe "manger" juste avant/pendant le repas)
4. Sois patiente : il peut se passer plusieurs semaines avant le premier signe en retour
5. Célèbre chaque tentative, même approximative — un geste vague qui ressemble au signe compte déjà !

Pas besoin de suivre un programme strict. La régularité compte plus que la quantité de signes.`,
      },
      {
        title: 'Les signes de base pour commencer',
        content: `🍼 Manger / lait : porter le poing fermé à la bouche, comme si on tétait
🔁 Encore : rassembler le bout des doigts des deux mains et les toucher plusieurs fois
😴 Dodo : poser sa joue sur ses mains jointes, comme un oreiller
✅ Fini / terminé : secouer les deux mains ouvertes de chaque côté
🧸 Doudou : caresser son propre bras ou son épaule
🤲 Aide / s'il te plaît : frotter le plat de la main en cercle sur la poitrine
👋 Encore un classique : le signe "au revoir" avec la main, souvent le tout premier maîtrisé

Ces signes sont inspirés de la méthode "Signe avec Bébé" de Monica Companys, adaptée en France à partir de la Langue des Signes Française.`,
      },
      {
        title: 'Ce que ça change au quotidien',
        content: `Moins de pleurs de frustration : bébé peut dire "encore faim" ou "j'en ai marre" sans crier.

Plus de complicité : tu comprends ce qu'il veut dire avant même qu'il sache le prononcer — un vrai moment de connexion.

Une transition en douceur vers la parole : le signe n'est qu'une étape, il disparaît naturellement quand le mot parlé prend le relais, souvent vers 18-24 mois.

N'en fait pas un objectif de performance. Certains bébés adorent signer, d'autres préfèrent pointer du doigt ou babiller — chaque mode de communication est valable.`,
      },
    ],
  },
  {
    id: 14,
    category: 'Post-partum',
    title: 'Baby blues et dépression post-partum : faire la différence',
    duration: '8 min',
    premium: false,
    source: 'Santé Publique France, Haute Autorité de Santé (HAS)',
    intro: "Pleurer sans raison à J3, ce n'est pas pareil que ne plus réussir à se lever à 2 mois. Apprends à repérer la différence — et à demander de l'aide sans honte.",
    sections: [
      {
        title: 'Le baby blues : bref et normal',
        content: `Touche 60 à 80% des mamans, entre J2 et J5 après l'accouchement.

Symptômes : hypersensibilité, larmes faciles, irritabilité, anxiété passagère. Lié à la chute brutale des hormones + fatigue + bouleversement de vie.

Ça dure quelques jours et ça passe seul. Le principal besoin : du repos, du soutien, ne pas rester isolée.`,
      },
      {
        title: 'La dépression post-partum : ce n\'est pas "juste être fatiguée"',
        content: `Elle peut apparaître à tout moment dans les 12 mois après la naissance, pas seulement les premières semaines.

Signes qui doivent alerter (au-delà de 2 semaines) :
• Tristesse ou vide qui ne passe pas
• Perte d'intérêt pour bébé ou culpabilité excessive d'être mère
• Troubles du sommeil AU-DELÀ de la fatigue liée à bébé
• Pensées noires, sentiment de ne jamais y arriver
• Anxiété envahissante, crises de panique

Ce n'est ni une faiblesse, ni un manque d'amour pour ton bébé. C'est une maladie qui se soigne.`,
      },
      {
        title: 'Vers qui te tourner',
        content: `• Ta sage-femme (jusqu'à 1 an post-accouchement, elle assure ton suivi)
• Ton médecin traitant ou un psychiatre périnatal
• PMI (Protection Maternelle et Infantile) — gratuit, sans avance de frais
• Numéro national : 3114 (numéro national de prévention du suicide, 24h/24)
• Allo Parents Bébé : 0 800 00 3456 (gratuit et anonyme)

En parler à ton entourage n'est pas un échec. Plus tôt c'est pris en charge, plus vite ça va mieux.`,
      },
      {
        title: 'Et le papa / le co-parent ?',
        content: `La dépression post-partum touche aussi les pères et co-parents (environ 1 sur 10), souvent moins repérée car moins recherchée.

Les mêmes signes s'appliquent : repli, irritabilité inhabituelle, désintérêt, épuisement qui ne passe pas. N'hésite pas à en parler aussi pour lui/elle.`,
      },
    ],
  },
  {
    id: 15,
    category: 'Droits',
    title: 'Congés de naissance et parentaux : ce qui change',
    duration: '6 min',
    premium: false,
    source: 'service-public.fr, Ameli.fr',
    intro: "Congé maternité, paternité, parental d'éducation... Le paysage des congés autour de la naissance évolue régulièrement. Voici les repères à connaître et où vérifier les montants à jour.",
    sections: [
      {
        title: 'Les briques de base',
        content: `Congé maternité : durée variable selon le nombre d'enfants déjà à charge et le nombre d'enfants attendus (environ 16 semaines pour un 1er ou 2e enfant, plus long à partir du 3e ou en cas de grossesse multiple).

Congé paternité et d'accueil de l'enfant : 25 jours calendaires (32 en cas de naissances multiples), dont 4 jours obligatoires pris juste après la naissance, cumulables avec le congé de naissance de 3 jours pris en charge par l'employeur.

Congé parental d'éducation : possible jusqu'aux 3 ans de l'enfant, non rémunéré par l'employeur mais ouvrant droit à une prestation de la CAF sous conditions.`,
      },
      {
        title: 'Une réforme en mouvement',
        content: `Un projet de "congé de naissance" plus court mais mieux rémunéré que l'actuel congé parental est en discussion/déploiement ces dernières années en France, avec l'objectif de le rendre plus attractif pour les deux parents et de réduire les écarts de recours entre mères et pères.

Les montants, durées et conditions évoluent régulièrement selon les décrets d'application. Vérifie toujours l'information à jour sur service-public.fr ou directement auprès de ta CAF avant de prendre une décision.`,
      },
      {
        title: 'Nos conseils pratiques',
        content: `• Anticipe tes démarches dès le 2e trimestre de grossesse (déclaration à l'employeur, CPAM, CAF)
• Simule ton allocation sur caf.fr avant de choisir la durée de ton congé parental
• Le congé parental peut être partagé et pris de façon fractionnée entre les deux parents
• Pense à vérifier les accords de ta convention collective — certaines entreprises offrent des conditions plus favorables que le minimum légal`,
      },
    ],
  },
  {
    id: 16,
    category: 'Bébé',
    title: 'Écrans et tout-petits : les repères à connaître',
    duration: '6 min',
    premium: false,
    source: 'Santé Publique France, recommandations OMS',
    intro: "Pas de culpabilisation, juste les repères actuels pour faire des choix éclairés sur les écrans avec un bébé ou un jeune enfant.",
    sections: [
      {
        title: 'Les repères par âge',
        content: `Avant 2-3 ans : l'OMS et Santé Publique France recommandent d'éviter les écrans, y compris en arrière-plan (télé allumée dans la pièce).

Le cerveau d'un tout-petit se développe grâce aux interactions réelles (voix, regard, toucher) — l'écran, même "éducatif", ne remplace pas ces échanges pour les tout-petits.

À partir de 3 ans : usage possible, encadré, limité, et toujours accompagné plutôt qu'en solo.`,
      },
      {
        title: 'Pourquoi c\'est plus une question de contexte que de minutage strict',
        content: `Un écran en fond sonore pendant le repas ou le jeu libre a plus d'impact négatif documenté qu'un moment ponctuel et accompagné.

Ce qui compte le plus : la qualité de l'interaction autour de l'écran (en parler ensemble) plutôt que le nombre de minutes exact.`,
      },
      {
        title: 'Des alternatives concrètes',
        content: `Les fameux "4 pas" recommandés par les pédiatres : pas d'écran le matin, pas pendant les repas, pas avant de dormir, pas dans la chambre.

Pour les moments où tu as besoin de souffler (douche, appel important) : un jouet sensoriel, un mobile, une chanson, ou simplement le laisser en sécurité quelques minutes sont des alternatives sans culpabilité à avoir.`,
      },
    ],
  },
  {
    id: 17,
    category: 'Sommeil',
    title: 'Cododo : les règles pour le pratiquer en sécurité',
    duration: '6 min',
    premium: false,
    source: 'Santé Publique France, Académie Américaine de Pédiatrie (AAP)',
    intro: "Partager le lit ou la chambre avec bébé, oui — mais avec des règles précises pour réduire au maximum les risques.",
    sections: [
      {
        title: 'Cododo dans la même chambre : la recommandation officielle',
        content: `Dormir dans la même chambre que bébé (dans son propre lit, à côté du lit parental) est recommandé jusqu'à 6 mois minimum : ça facilite l'allaitement nocturne et réduit le risque de mort inattendue du nourrisson (MIN).`,
      },
      {
        title: 'Partage du lit : les conditions de sécurité strictes',
        content: `Si tu choisis le partage du lit (bed-sharing), certaines conditions réduisent significativement les risques :

• JAMAIS si toi ou ton/ta partenaire fumez, avez bu de l'alcool ou pris des médicaments sédatifs
• JAMAIS sur un canapé ou un fauteuil (risque majeur d'étouffement)
• Matelas ferme, sans oreillers ni couettes près de bébé
• Bébé sur le dos, jamais entre deux adultes (plutôt côté mur ou côté d'un seul parent)
• Cheveux longs attachés, pas de bijoux
• Jamais si bébé est né prématuré ou avec un petit poids de naissance

En cas de doute, le lit cododo accolé au lit parental (sans partage du même matelas) est l'option la plus sûre.`,
      },
      {
        title: 'Pourquoi ces précautions existent',
        content: `Le risque principal est l'étouffement accidentel et la surchauffe, surtout dans les premiers mois où bébé ne peut pas se dégager seul.

Ce n'est pas un jugement sur les familles qui pratiquent le cododo — c'est une pratique ancestrale et répandue dans le monde — mais des règles qui, appliquées, réduisent vraiment les risques documentés.`,
      },
    ],
  },
  {
    id: 18,
    category: 'Lactation',
    title: 'Allaitement mixte : bien le mettre en place',
    duration: '7 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Sein et biberon, ce n'est pas 'tout ou rien'. Voici comment conjuguer les deux sans casser ta lactation ni culpabiliser.",
    sections: [
      {
        title: 'Pourquoi passer au mixte',
        content: `Reprise du travail, besoin de partager les biberons avec le co-parent, fatigue, production insuffisante, ou simplement un choix personnel — toutes les raisons sont valables.

L'allaitement mixte n'est pas un échec de l'allaitement, c'est une autre façon de le poursuivre.`,
      },
      {
        title: 'Comment préserver ta lactation',
        content: `La production de lait fonctionne à la demande : moins tu stimules, moins tu produis.

Pour limiter la baisse de lactation :
• Remplace progressivement une tétée à la fois, pas toutes d'un coup
• Privilégie de garder les tétées du matin et de la nuit (prolactine plus élevée à ces moments)
• Tire ton lait au moment du biberon donné par quelqu'un d'autre, si tu veux maintenir ta production
• Laisse 3-5 jours entre chaque suppression de tétée pour laisser ton corps s'adapter`,
      },
      {
        title: 'Le choix du lait et du biberon',
        content: `Avant 6 mois : lait infantile 1er âge en complément (le lait de vache n'est pas adapté avant 1 an).

Pour limiter la confusion sein-tétine chez un bébé encore jeune : tétine à débit lent, biberon proposé par quelqu'un d'autre que toi si possible (bébé associe moins bien ton odeur au biberon).

Pas de règle universelle sur les quantités — observe les signes de faim et de satiété de bébé plutôt qu'un tableau générique.`,
      },
    ],
  },
  {
    id: 19,
    category: 'Post-partum',
    title: 'Charge mentale et épuisement parental : en parler',
    duration: '7 min',
    premium: false,
    source: 'Association Française de Pédiatrie Ambulatoire, Santé Publique France',
    intro: "Tu gères, tu anticipes, tu penses à tout — et tu es épuisée. La charge mentale et le burn-out parental sont réels, reconnus, et on peut agir dessus.",
    sections: [
      {
        title: 'C\'est quoi la charge mentale ?',
        content: `C'est le travail invisible de planification, d'anticipation et de gestion permanente (le prochain repas, le stock de couches, le rendez-vous vaccin, le linge propre) qui tourne en fond, même quand on ne "fait" rien physiquement.

Elle repose encore très souvent, statistiquement, davantage sur les mères — ce qui explique une fatigue qui ne se voit pas toujours de l'extérieur.`,
      },
      {
        title: 'Reconnaître le burn-out parental',
        content: `Différent de la simple fatigue : épuisement émotionnel intense, distance affective avec ses enfants (culpabilisante mais réelle), sentiment de ne plus être un parent efficace, contraste avec le parent qu'on était avant.

Ce n'est pas un manque d'amour. C'est un signal d'épuisement des ressources qui nécessite du répit, pas de la volonté supplémentaire.`,
      },
    ],
  },
  {
    id: 20,
    category: 'Nutrition',
    title: 'Perturbateurs endocriniens : réduire l\'exposition simplement',
    duration: '6 min',
    premium: false,
    source: 'ANSES, Santé Publique France',
    intro: "Impossible d'éliminer tous les perturbateurs endocriniens du quotidien — mais quelques gestes simples réduisent vraiment l'exposition pendant la grossesse et l'allaitement.",
    sections: [
      {
        title: 'Les gestes qui comptent le plus',
        content: `• Aère ton logement 10 min par jour, même en hiver
• Évite de faire chauffer les aliments dans du plastique (privilégie verre ou céramique)
• Limite les emballages plastiques au contact direct des aliments chauds ou gras
• Privilégie les cosmétiques avec peu d'ingrédients, évite les parfums synthétiques forts en début de grossesse
• Aère et dépoussière régulièrement (la poussière concentre certains polluants domestiques)`,
      },
      {
        title: 'Pas de panique, une hiérarchie existe',
        content: `L'exposition ponctuelle n'a pas le même impact que l'exposition chronique répétée. Pas besoin de tout changer d'un coup ni de viser le zéro absolu.

Priorise : ce qui touche directement les aliments et l'air respiré au quotidien (cuisine, chambre) plutôt que de te stresser sur chaque produit de la maison.`,
      },
    ],
  },
  {
    id: 21,
    category: 'Droits',
    title: 'Reprendre le travail en allaitant : tes droits',
    duration: '6 min',
    premium: false,
    source: 'Code du travail, La Leche League France',
    intro: "Tirer son lait au bureau n'est pas un service que ton employeur te rend — c'est un droit encadré par la loi.",
    sections: [
      {
        title: 'Ce que dit la loi en France',
        content: `Pendant 1 an après la naissance, tu as droit à 1 heure par jour pour allaiter ou tirer ton lait, répartie en deux pauses de 30 minutes (matin et après-midi), sur ton temps de travail.

Ce temps peut être non rémunéré sauf accord d'entreprise ou convention collective plus favorable — renseigne-toi sur celle de ton secteur.

Dans les entreprises de plus de 100 salariés, un local dédié à l'allaitement doit théoriquement être mis à disposition.`,
      },
      {
        title: 'Organiser concrètement le tire-lait au travail',
        content: `• Prépare-toi en amont : tire-lait portable, glacière, sacs de conservation
• Prévois un stock de lait constitué avant la reprise (le lait se congèle jusqu'à 6 mois)
• Parle à ton employeur en amont pour organiser un espace privé et calme
• Un rythme de tire toutes les 3h environ pendant les heures de travail maintient généralement bien la production`,
      },
      {
        title: 'Et si ta production baisse un peu ?',
        content: `C'est fréquent et normal au moment de la reprise (stress, changement de rythme). Les tétées du matin, du soir et de la nuit à la maison aident à compenser.

Le corps s'adapte en 1 à 2 semaines généralement. Reste hydratée, et ne culpabilise pas si le rendement au tire-lait est moins bon qu'au sein — c'est normal, pas un signe de manque de lait.`,
      },
    ],
  },
  {
    id: 22,
    category: 'Débuter',
    title: 'Les 100 premiers jours : à quoi s\'attendre',
    duration: '7 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Personne ne te prévient vraiment. Voici à quoi ressemble le quatrième trimestre, sans filtre et sans dramatiser.",
    sections: [
      {
        title: 'Le "quatrième trimestre"',
        content: `Les 3 premiers mois de bébé sont parfois décrits comme un prolongement de la grossesse hors du ventre : bébé a besoin de contact permanent, de succion, de bruit blanc, de mouvement — comme avant la naissance.

Comprendre ça aide à relativiser : ce n'est pas "un problème à résoudre", c'est une étape de développement normale.`,
      },
      {
        title: 'Ce qui est normal (même si personne n\'en parle)',
        content: `• Ne pas se reconnaître dans le miroir les premières semaines
• Pleurer sans raison précise (voir l'article sur le baby blues)
• Douter en permanence de tes choix
• Trouver le temps long ET court à la fois
• Ne pas ressentir "l'amour instantané" — il vient souvent avec le temps, pas au premier regard`,
      },
      {
        title: 'S\'organiser sans se mettre la pression',
        content: `Le seul objectif réaliste des 100 premiers jours : nourrir bébé, dormir un peu, et tenir.

Accepte l'aide qu'on te propose (repas, ménage, garde d'un aîné). Dis oui aux visites courtes plutôt qu'aux visites qui s'éternisent. Le rangement et les tâches ménagères peuvent attendre.`,
      },
    ],
  },
  {
    id: 23,
    category: 'Débuter',
    title: 'La liste de naissance : l\'essentiel, pas le superflu',
    duration: '6 min',
    premium: false,
    source: 'Retours de mamans et professionnels de la petite enfance',
    intro: "Pas besoin de la moitié de ce qu'on te vend. Voici ce qui sert vraiment les premiers mois.",
    sections: [
      {
        title: 'Ce qui sert vraiment',
        content: `• Bodies et pyjamas en plusieurs tailles (bébé grandit vite les 3 premiers mois)
• Un moyen de portage (écharpe ou porte-bébé physiologique)
• Un lit conforme aux normes de sécurité (matelas ferme, pas de tour de lit ni coussin)
• Couches et produits de toilette basiques
• Un thermomètre et une solution physiologique pour le nez`,
      },
      {
        title: 'Ce qu\'on peut attendre de voir venir',
        content: `Chauffe-biberon, stérilisateur électrique, transat multifonction, chaussures avant la marche : tout ça peut souvent attendre — ou ne jamais servir selon les besoins réels de ton bébé.

Le tire-lait haut de gamme : attends de voir si tu en as vraiment besoin avant d'investir (voir l'article dédié tire-lait).`,
      },
      {
        title: 'Privilégier l\'occasion',
        content: `Vêtements, transats, jouets d'éveil : le marché de l'occasion est immense pour la puériculture (bébé n'use presque rien).

Seule exception à toujours acheter neuf : le siège auto (l'historique de choc n'est jamais garanti sur un modèle d'occasion).`,
      },
    ],
  },
  {
    id: 24,
    category: 'SOS',
    title: 'Maman épuisée : les vrais réflexes qui aident',
    duration: '6 min',
    premium: false,
    source: 'Santé Publique France',
    intro: "Avant de craquer, quelques réflexes concrets pour souffler — sans culpabiliser de les utiliser.",
    sections: [
      {
        title: 'Reconnaître le seuil critique',
        content: `Si tu ressens l'envie de poser bébé quelque part en sécurité et de sortir de la pièce pour respirer : fais-le. Pose bébé dans son lit, ferme la porte, respire 2 minutes. Ce n'est pas abandonner, c'est se protéger pour mieux revenir.

Un bébé qui pleure quelques minutes de plus pendant que tu te régules ne subit aucun dommage. Toi qui craques, si.`,
      },
      {
        title: 'Les relais à activer sans culpabiliser',
        content: `• Demande à ton entourage un vrai relais de quelques heures, pas juste "dis-moi si tu as besoin"
• PMI et sages-femmes libérales peuvent orienter vers des solutions locales (TISF, aide à domicile)
• Le congé paternité/co-parent existe justement pour ça — encourage à le prendre en entier`,
      },
      {
        title: 'Quand ça dépasse la simple fatigue',
        content: `Si l'épuisement s'accompagne de pensées noires ou d'un sentiment de ne plus pouvoir fonctionner du tout, ce n'est plus "juste être fatiguée" — regarde l'article sur la dépression post-partum et les numéros à contacter.`,
      },
    ],
  },
  {
    id: 25,
    category: 'SOS',
    title: 'Reflux et coliques : faire la différence',
    duration: '6 min',
    premium: false,
    source: 'Association Française de Pédiatrie Ambulatoire',
    intro: "Bébé pleure après les repas ou en soirée ? Voici comment distinguer les deux causes les plus fréquentes.",
    sections: [
      {
        title: 'Le reflux : régurgitations et inconfort',
        content: `Signes : régurgitations fréquentes, bébé qui se cambre ou pleure pendant/juste après les repas, hoquets fréquents.

À essayer : portage vertical 20-30 min après les repas, buste légèrement surélevé pendant le sommeil (jamais avec un coussin, mais en inclinant le matelas), fractionner les repas si besoin.

Si les régurgitations s'accompagnent d'une mauvaise prise de poids ou de pleurs constants : consulte, un reflux plus marqué peut nécessiter un traitement.`,
      },
      {
        title: 'Les coliques : pleurs de fin de journée',
        content: `Signes : pleurs intenses, souvent entre 17h et 22h, bébé qui recroqueville les jambes, ventre parfois dur. Pic vers 6 semaines, s'améliore généralement vers 3-4 mois.

Ce n'est pas lié à ton lait ni à ta façon de nourrir bébé. Les causes exactes restent mal comprises (immaturité digestive probable).`,
      },
      {
        title: 'Ce qui aide dans les deux cas',
        content: `Peau à peau, portage, bruit blanc, mouvement rythmé (balancement, voiture), position "tiger in the tree" (bébé à plat ventre sur ton avant-bras).

Dans le doute, ou si les pleurs sont associés à de la fièvre, des vomissements en jet, ou une altération de l'état général : consulte sans attendre.`,
      },
    ],
  },
  {
    id: 26,
    category: 'Médicaments',
    title: 'Vaccins de bébé et allaitement : compatible à 100%',
    duration: '5 min',
    premium: false,
    source: 'Haute Autorité de Santé, CRAT',
    intro: "Aucun vaccin du calendrier français n'impose d'arrêter ou de suspendre l'allaitement — ni pour bébé, ni pour toi.",
    sections: [
      {
        title: 'Vacciner bébé pendant qu\'il est allaité',
        content: `Tous les vaccins du calendrier vaccinal français sont compatibles avec l'allaitement. Certains sont même mieux tolérés grâce à l'effet apaisant de la tétée pendant ou juste après l'injection.

L'allaitement au moment du vaccin peut réduire la douleur ressentie par bébé — n'hésite pas à le proposer pendant l'injection si le professionnel de santé l'accepte.`,
      },
      {
        title: 'Se faire vacciner soi-même en allaitant',
        content: `Grippe, COVID, coqueluche (rappel), tétanos : tous compatibles avec l'allaitement selon le CRAT.

Les anticorps que tu développes après ta vaccination passent même en partie dans ton lait et peuvent apporter une protection supplémentaire à bébé les premiers mois.`,
      },
      {
        title: 'En cas de doute sur un vaccin spécifique',
        content: `Vérifie toujours sur lecrat.fr (Centre de Référence sur les Agents Tératogènes) ou demande confirmation à ta sage-femme ou ton médecin — le réflexe "par précaution, on arrête d'allaiter" est presque toujours injustifié pour les vaccins.`,
      },
    ],
  },
  {
    id: 27,
    category: 'Médicaments',
    title: 'Fièvre, douleur, rhume : que prendre en allaitant',
    duration: '5 min',
    premium: false,
    source: 'CRAT (lecrat.fr), e-lactancia.org',
    intro: "Les traitements du quotidien contre la douleur et les petits maux d'hiver sont, pour la grande majorité, parfaitement compatibles avec l'allaitement.",
    sections: [
      {
        title: 'Douleur et fièvre',
        content: `Paracétamol : compatible sans restriction, en première intention.
Ibuprofène : compatible également, utile en cas d'engorgement ou de douleurs inflammatoires.

Évite l'aspirine à dose antalgique répétée (utilisable ponctuellement à faible dose sur avis médical uniquement).`,
      },
      {
        title: 'Rhume, toux, mal de gorge',
        content: `Sprays de lavage nasal, pastilles pour la gorge, solutions salines : compatibles sans restriction.

Pour les sirops contre la toux et décongestionnants : vérifie systématiquement sur e-lactancia ou le CRAT, certaines molécules (notamment la pseudoéphédrine) peuvent réduire la production de lait.`,
      },
      {
        title: 'Le réflexe à avoir',
        content: `Avant tout traitement, même en vente libre : vérifie sur lecrat.fr ou e-lactancia.org plutôt que de te fier uniquement à la notice, qui recommande souvent l'arrêt de l'allaitement "par précaution" sans que ce soit justifié scientifiquement.`,
      },
    ],
  },
  {
    id: 28,
    category: 'Tire-lait',
    title: 'Bien choisir son tire-lait',
    duration: '6 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Manuel, électrique simple ou double pompe : le bon choix dépend de ton usage réel, pas du modèle le plus cher.",
    sections: [
      {
        title: 'Tire-lait manuel',
        content: `Idéal pour : un usage occasionnel (soulager un engorgement, tirer quelques ml de temps en temps).

Avantages : léger, silencieux, pas cher, pas besoin de prise électrique.
Limite : fatigant pour tirer de grandes quantités régulièrement.`,
      },
      {
        title: 'Tire-lait électrique simple',
        content: `Idéal pour : un usage régulier mais pas quotidien intensif (quelques fois par semaine).

Bon compromis entre confort, prix et discrétion. Certains modèles se portent directement dans le soutien-gorge (tire-lait "mains libres").`,
      },
      {
        title: 'Tire-lait électrique double pompe',
        content: `Idéal pour : reprise du travail avec tire quotidien, constitution d'un stock, allaitement exclusif au tire-lait, prématurité.

Tire les deux seins simultanément : gain de temps réel et stimulation hormonale plus efficace pour maintenir la production sur le long terme.

Souvent le mieux remboursé/loué en pharmacie sur prescription — demande à ta sage-femme.`,
      },
    ],
  },
  {
    id: 29,
    category: 'Tire-lait',
    title: 'Conservation du lait tiré : les règles à connaître',
    duration: '5 min',
    premium: false,
    source: 'La Leche League France, ANSES',
    intro: "Les durées de conservation exactes selon la température, pour ne rien gâcher et rester en sécurité.",
    sections: [
      {
        title: 'Les durées de conservation',
        content: `À température ambiante (moins de 19-22°C) : 4 heures.
Au réfrigérateur (4°C ou moins) : 4 jours.
Au congélateur (compartiment du réfrigérateur) : 2 semaines.
Au congélateur séparé (-18°C) : 6 mois, jusqu'à 12 mois en conditions optimales.

Une fois décongelé : à utiliser dans les 24h, jamais recongelé.`,
      },
      {
        title: 'Bonnes pratiques de stockage',
        content: `• Étiquette chaque contenant avec la date et l'heure du tirage
• Utilise le lait le plus ancien en premier (méthode FIFO)
• Ne remplis pas les contenants à ras bord (le lait se dilate en congelant)
• Décongèle au réfrigérateur ou sous l'eau tiède, jamais au micro-ondes (détruit des anticorps et crée des zones de surchauffe dangereuses)`,
      },
      {
        title: 'Un dépôt qui se sépare, c\'est normal',
        content: `Le lait maternel se sépare naturellement en couches (crème au-dessus) au repos — un simple mélange doux avant utilisation suffit à l'homogénéiser. Ce n'est pas un signe que le lait est périmé.`,
      },
    ],
  },
  {
    id: 30,
    category: 'Sevrage',
    title: 'Sevrage nocturne : arrêter les tétées de nuit en douceur',
    duration: '6 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Envie de récupérer tes nuits sans tout arrêter d'un coup ? Voici une méthode progressive et respectueuse.",
    sections: [
      {
        title: 'Pourquoi y aller progressivement',
        content: `Arrêter brutalement les tétées de nuit peut entraîner engorgement, baisse rapide de production en journée, et beaucoup de frustration pour bébé.

Une approche progressive protège ta lactation et laisse à bébé le temps de s'adapter émotionnellement.`,
      },
      {
        title: 'La méthode par paliers',
        content: `1. Espace progressivement les tétées de nuit de 15-20 minutes supplémentaires chaque nuit
2. Raccourcis la durée de chaque tétée nocturne avant de la supprimer
3. Propose d'autres formes de réconfort la nuit (portage, bercement, présence) avant de proposer le sein systématiquement
4. Le co-parent peut prendre le relais pour certains réveils — bébé associe moins la tétée à ce moment-là`,
      },
      {
        title: 'Et si bébé résiste beaucoup',
        content: `C'est normal, la tétée de nuit est aussi un moment de réconfort, pas seulement alimentaire. Ralentis le rythme si besoin — il n'y a pas d'urgence, chaque famille avance à son tempo.`,
      },
    ],
  },
  {
    id: 31,
    category: 'Sevrage',
    title: 'Éviter l\'engorgement pendant le sevrage',
    duration: '5 min',
    premium: false,
    source: 'La Leche League France',
    intro: "Réduire les tétées trop vite peut faire mal. Voici comment sevrer sans finir avec des seins douloureux.",
    sections: [
      {
        title: 'La règle d\'or : une tétée à la fois',
        content: `Supprime une seule tétée tous les 3 à 5 jours minimum, en laissant le temps à ta production de s'ajuster progressivement à la baisse.

Commence par la tétée à laquelle bébé semble le moins attaché (souvent celle de milieu de journée), garde les tétées du matin et du coucher pour la fin.`,
      },
      {
        title: 'Si les seins deviennent tendus malgré tout',
        content: `Exprime juste assez de lait à la main ou au tire-lait pour te soulager (sans vider complètement le sein, ce qui relancerait la production).

Applique du froid entre les tétées, des feuilles de chou vert, et espace un peu plus la prochaine étape du sevrage si besoin.`,
      },
      {
        title: 'Signes qui doivent alerter',
        content: `Zone rouge, chaude, douloureuse accompagnée de fièvre : possible mastite, consulte rapidement (voir l'article dédié). Continuer à drainer le sein concerné, même en cours de sevrage, fait partie du traitement.`,
      },
    ],
  },
  {
    id: 32,
    category: 'Éveil',
    title: 'Motricité libre : laisser bébé bouger à son rythme',
    duration: '6 min',
    premium: false,
    source: 'Approche Emmi Pikler',
    intro: "Pas besoin de lui apprendre à s'asseoir ou à marcher. Bébé sait faire — à condition qu'on lui laisse l'espace et le temps.",
    sections: [
      {
        title: 'Le principe',
        content: `La motricité libre part du constat que bébé développe ses mouvements dans un ordre naturel et à son propre rythme, sans qu'on ait besoin de le "mettre" dans des positions qu'il n'a pas encore acquises seul (assis, debout).

Développée par la pédiatre Emmi Pikler, cette approche a largement influencé la puériculture actuelle.`,
      },
      {
        title: 'Concrètement, au quotidien',
        content: `• Pose toujours bébé sur le dos au sol (jamais assis avant qu'il s'assoie seul)
• Un espace de jeu au sol sécurisé, largement dégagé, plutôt que multipliés les transats et cocons
• Des vêtements souples qui ne contraignent pas les mouvements
• Le laisser essayer, se tromper, recommencer sans intervenir trop vite`,
      },
      {
        title: 'Pourquoi ne pas "l\'aider" à s\'asseoir ou marcher',
        content: `Forcer une position que bébé n'a pas encore les muscles/l'équilibre pour tenir seul peut créer un faux sentiment de sécurité et parfois freiner l'acquisition naturelle du mouvement suivant.

Chaque étape franchie seul renforce la confiance de bébé en ses propres capacités.`,
      },
    ],
  },
  {
    id: 33,
    category: 'Éveil',
    title: 'Lire à bébé dès la naissance : jamais trop tôt',
    duration: '5 min',
    premium: false,
    source: 'Santé Publique France (programme "Premières Pages")',
    intro: "Bébé ne comprend pas encore les mots, mais la lecture partagée construit déjà énormément — bien avant qu'il ne parle.",
    sections: [
      {
        title: 'Pourquoi si tôt',
        content: `Dès les premières semaines, bébé est sensible à ta voix, ses intonations et le rythme des phrases. La lecture partagée stimule le développement du langage bien avant que bébé ne comprenne le sens des mots.

Ce n'est pas une question de "faire un lecteur précoce" — c'est un moment de lien et de calme partagé.`,
      },
      {
        title: 'Comment faire concrètement',
        content: `• Livres cartonnés, résistants, avec de gros contrastes (noir/blanc/rouge) les premiers mois — la vue de bébé est encore floue
• Pas besoin de suivre le texte mot à mot : commente les images, invente, chante
• Quelques minutes suffisent, pas besoin d'un "vrai" moment lecture structuré au début
• Les livres tissus ou en bain sont parfaits pour la découverte sensorielle dès quelques mois`,
      },
      {
        title: 'Un rituel qui grandit avec bébé',
        content: `Vers 6-9 mois, bébé commence à tourner les pages lui-même et à pointer des images. Vers 12-18 mois, il réclame souvent les mêmes histoires en boucle — c'est excellent pour la mémorisation du langage, même si ça peut sembler répétitif pour toi !`,
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
  'Éveil',
  'Post-partum',
  'Tire-lait',
  'Sommeil',
  'Droits',
  'Sevrage',
  'Accessoires',
];
