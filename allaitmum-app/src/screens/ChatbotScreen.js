import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const botResponses = [
  // === PROBLÈMES DE SEIN / DOULEUR ===
  {
    keywords: ['crevasse', 'mal', 'douleur', 'mamelon', 'fait mal'],
    answer:
      "Les crevasses sont souvent liées à une mauvaise prise du sein. Essaie la position biological nurturing (toi semi-allongée, bébé sur toi). Applique de la lanoline pure après chaque tétée. Si ça persiste 48h, consulte une IBCLC (consultante en lactation).\n\nSource : La Leche League France",
  },
  {
    keywords: ['engorgement', 'dur', 'gonflé', 'sein dur'],
    answer:
      "Avant la tétée : chaleur + massage doux. Pendant : laisse bébé téter, compression du sein. Après : froid + feuilles de chou. Ibuprofène OK (compatible allaitement). Ne saute jamais de tétée !\n\nSource : La Leche League",
  },
  {
    keywords: ['mastite', 'fièvre', 'rouge', 'infection'],
    answer:
      "Mastite = URGENCE. Consulte dans les 24h. CONTINUE d'allaiter (essentiel !). Repos total. Les antibiotiques pour mastite sont TOUS compatibles avec l'allaitement. Ne t'arrête pas !\n\nVérifie sur e-lactancia.org",
  },
  {
    keywords: ['muguet', 'candida', 'blanc', 'bouche'],
    answer:
      "Si bébé a des plaques blanches dans la bouche + douleur brûlante pour toi = muguet (Candida). Traitement : Nystatine pour bébé ET toi. Stérilise tout. Traite les deux en même temps.",
  },
  {
    keywords: ['canal', 'bouché', 'boule', 'nodule'],
    answer:
      "Canal bouché : masse sensible sans fièvre. Traitement :\n• Chaleur avant tétée\n• Massage vers le mamelon pendant la tétée\n• Menton de bébé vers la boule\n• Vibrations (brosse à dents électrique)\n\nSi fièvre ou rougeur → mastite, consulte vite !",
  },
  {
    keywords: ['ampoule', 'point blanc', 'bleb'],
    answer:
      "Point blanc sur le mamelon (ampoule de lait) :\n• Compresse chaude 10 min avant tétée\n• Laisse bébé téter (la succion peut l'ouvrir)\n• NE PERCE PAS toi-même (risque d'infection)\n• Si persiste > 48h : sage-femme ou IBCLC",
  },
  {
    keywords: ['vasospasme', 'blanc mamelon', 'raynaud', 'froid mamelon'],
    answer:
      "Mamelon qui blanchit après tétée + douleur = vasospasme (syndrome de Raynaud).\n\nSolutions :\n• Garde les seins au chaud\n• Évite le froid après la tétée\n• Massage doux\n• Parfois : magnésium ou vitamine B6\n\nConsulte si très douloureux.",
  },

  // === PRODUCTION DE LAIT ===
  {
    keywords: ['pas assez', 'production', 'manque', 'plus de lait', 'assez de lait'],
    answer:
      "Avant de paniquer : vérifie les VRAIS signes (poids de bébé, couches mouillées). Seins mous = NORMAL (pas un signe de manque).\n\nPour booster : tétées fréquentes, power pumping (20-10-10-10-10 min), avoine, fenouil, hydratation. Résultats en 48-72h.\n\nSource : La Leche League",
  },
  {
    keywords: ['ref', 'réflexe éjection', 'fort', 'trop de lait', 'hyperlactation'],
    answer:
      "REF (réflexe d'éjection fort) : bébé s'étouffe, s'énerve, claque le sein.\n\nSolutions :\n• Position inclinée en arrière (biological nurturing)\n• Retire bébé au 1er jet et recueille dans un tissu\n• Un seul sein par tétée\n• Le REF se régule souvent vers 3 mois",
  },
  {
    keywords: ['montée de lait', 'montee', 'j3', 'jour 3'],
    answer:
      "Montée de lait = J2 à J5. Seins tendus, chauds, parfois douloureux.\n\nC'est NORMAL ! Mets bébé au sein très souvent (8-12x/jour minimum). Massage doux. Douche chaude.\n\nLe colostrum des premiers jours est suffisant pour bébé, ne t'inquiète pas.",
  },
  {
    keywords: ['colostrum', 'premier lait', 'jaune'],
    answer:
      "Le colostrum (premiers jours) est un SUPER ALIMENT :\n• Ultra concentré en anticorps\n• Parfait pour le petit estomac de bébé\n• Quelques ml suffisent !\n\nEstomac de bébé J1 = taille d'une cerise. Pas besoin de compléments si bébé tète bien.",
  },
  {
    keywords: ['galactogène', 'fenugrec', 'tisane', 'booster'],
    answer:
      "Galactogènes naturels :\n• Avoine (flocons, porridge)\n• Fenouil\n• Amandes\n• Levure de bière\n\nLe PLUS efficace : tétées fréquentes + peau à peau + repos.\n\nLe fenugrec peut aider mais attention aux contre-indications.",
  },

  // === COMPORTEMENT BÉBÉ ===
  {
    keywords: ['grappe', 'tétées groupées', 'tout le temps', 'constamment', 'non stop'],
    answer:
      "Tétées en grappe (cluster feeding) = bébé veut téter non-stop pendant des heures, souvent le soir.\n\nC'est NORMAL et TEMPORAIRE ! Ça booste ta production. Bébé prépare souvent une grosse nuit.\n\nInstalle-toi confortablement, série Netflix, et laisse-le faire !",
  },
  {
    keywords: ['poussée', 'croissance', 'pic', 'saut'],
    answer:
      "Pics de croissance classiques : 3 semaines, 6 semaines, 3 mois, 6 mois.\n\nBébé tète plus souvent pendant 2-3 jours = il booste ta production pour ses nouveaux besoins.\n\nC'est temporaire ! Tétées à la demande = la solution.",
  },
  {
    keywords: ['colique', 'pleur', 'cri', 'inconsolable', 'soir'],
    answer:
      "Pleurs du soir (\"coliques\") : souvent entre 18h et 22h, pic vers 6 semaines.\n\nCe n'est PAS ton lait ! Essaie :\n• Peau à peau\n• Portage\n• Bruit blanc\n• Mouvement (balancement)\n• Position tiger in the tree\n\nÇa passe vers 3-4 mois.",
  },
  {
    keywords: ['grève', 'refuse', 'veut plus', 'repousse'],
    answer:
      "Grève de la tétée : bébé refuse soudainement le sein. Causes possibles :\n• Otite, rhume, poussée dentaire\n• Parfum/savon différent\n• Stress (déménagement, reprise travail)\n• Morsure = ta réaction l'a surpris\n\nSolutions : peau à peau, proposer en demi-sommeil, patience. Rarement un sevrage naturel avant 1 an.",
  },
  {
    keywords: ['mord', 'morsure', 'dent', 'mordre'],
    answer:
      "Bébé mord ? C'est une PHASE. Que faire :\n• Réaction calme mais ferme : \"Non, on ne mord pas\"\n• Retire du sein immédiatement\n• Reprends après 30 sec\n• Surveille les signes de fin de tétée (bébé mord souvent quand il n'a plus faim)\n\nLes dents NE SONT PAS une raison de sevrer !",
  },
  {
    keywords: ['distrait', 'regarde', 'curieux', 'décroche'],
    answer:
      "Vers 3-4 mois, bébé devient TRÈS curieux et se distrait facilement.\n\nSolutions :\n• Allaite dans un endroit calme et sombre\n• Collier d'allaitement\n• Laisse-le explorer pendant la tétée\n• Les tétées efficaces deviennent plus courtes\n\nC'est normal, pas un signe de sevrage !",
  },
  {
    keywords: ['confusion', 'tétine', 'sucette', 'biberon'],
    answer:
      "Confusion sein/tétine : la succion au biberon est différente du sein.\n\nSi problème :\n• Évite biberon avant 4-6 semaines si possible\n• Utilise méthode paced bottle feeding\n• Tétines débit lent\n• Alternatives : DAL, soft cup, cuillère\n\nCe n'est pas irréversible : du peau à peau aide à revenir au sein.",
  },
  {
    keywords: ['frein', 'langue', 'lèvre', 'ankyloglossie'],
    answer:
      "Frein de langue/lèvre restrictif peut causer :\n• Douleur pour maman\n• Mauvaise prise de poids\n• Claquements pendant la tétée\n• Fatigue rapide de bébé\n\nDiagnostic par IBCLC ou ORL spécialisé. Frénotomie parfois nécessaire.\n\nSource : académie d'allaitement",
  },

  // === ALIMENTATION MAMAN ===
  {
    keywords: ['café', 'caféine', 'thé'],
    answer:
      "2-3 cafés par jour : OK pendant l'allaitement. Évite après 15h si bébé semble agité. Attention : le thé vert contient aussi de la caféine.",
  },
  {
    keywords: ['alcool', 'vin', 'bière'],
    answer:
      "Occasionnel : OK avec précautions. 1 verre = attends 2-3h avant la prochaine tétée. Ou tire AVANT de boire. Pas besoin de \"jeter\" le lait (c'est un mythe).",
  },
  {
    keywords: ['régime', 'maigrir', 'perte', 'poids', 'kilos'],
    answer:
      "L'allaitement brûle ~500 kcal/jour. Perte de poids naturelle et progressive.\n\n⚠️ Régime restrictif déconseillé (< 1800 kcal) : risque de baisser ta production.\n\nMange équilibré, écoute ta faim, bois beaucoup. Les kilos partiront progressivement.",
  },
  {
    keywords: ['allergi', 'plv', 'aplv', 'lactose', 'intolérance'],
    answer:
      "Si bébé a : sang dans les selles, eczéma sévère, coliques intenses, reflux ++\n\n→ Possible APLV (allergie protéines lait vache)\n\nTest : éviction totale du lait de vache pendant 2-3 semaines (aussi produits laitiers, traces).\n\nConsulte un allergologue pour confirmer.",
  },
  {
    keywords: ['gaz', 'pet', 'ballonnement', 'chou', 'oignon'],
    answer:
      "MYTHE : les aliments gazeux ne passent PAS dans le lait !\n\nTu peux manger chou, oignon, légumineuses sans souci. Les gaz restent dans TON intestin.\n\nPar contre, certains bébés sont sensibles aux protéines de certains aliments (lait, soja).",
  },
  {
    keywords: ['épicé', 'piment', 'ail', 'goût'],
    answer:
      "Le goût de ton lait change selon ton alimentation, et c'est une BONNE chose ! Ça prépare bébé à la diversification.\n\nMange ce que tu veux. La plupart des bébés adorent les variations de goût. Seule exception : si bébé refuse le sein juste après certains aliments.",
  },
  {
    keywords: ['végétarien', 'vegan', 'végan', 'b12'],
    answer:
      "Allaitement végétarien : aucun souci.\nAllaitement végan : OBLIGATOIRE de prendre B12 (supplément).\n\nLa carence en B12 peut être grave pour bébé. Dose recommandée : 2000 µg/semaine ou 400 µg/jour.\n\nConsulte un diététicien si besoin.",
  },

  // === MÉDICAMENTS ET SANTÉ ===
  {
    keywords: ['médicament', 'medicament', 'prendre', 'compatible', 'antibiotique'],
    answer:
      "90% des médicaments sont compatibles avec l'allaitement. Vérifie TOUJOURS sur :\n\n• e-lactancia.org (référence mondiale)\n• lecrat.fr (CRAT, référence française)\n\nSi ton médecin te dit d'arrêter \"par précaution\", vérifie d'abord sur ces sites.",
  },
  {
    keywords: ['malade', 'rhume', 'grippe', 'gastro', 'covid'],
    answer:
      "Tu es malade ? CONTINUE d'allaiter !\n\nTon lait contient des anticorps qui protègent bébé. C'est la meilleure protection.\n\n• Lave-toi les mains\n• Porte un masque si rhume/grippe\n• Hydrate-toi bien\n\nLa plupart des médicaments sont OK (vérifie e-lactancia.org).",
  },
  {
    keywords: ['vaccin', 'vaccination', 'piqûre'],
    answer:
      "Tous les vaccins classiques sont compatibles avec l'allaitement (COVID, grippe inclus). Tu peux allaiter juste après le vaccin pour réconforter bébé.\n\nPour le calendrier vaccinal de ton bébé, regarde la section Vaccins de l'app.",
  },
  {
    keywords: ['vitamine d', 'vitamined', 'zymad', 'uvesterol'],
    answer:
      "La vitamine D est OBLIGATOIRE pour bébé allaité (le lait maternel en contient peu).\n\nDose : 1000-1200 UI/jour jusqu'à 18 mois minimum.\n\nZymad, Uvesterol, Adrigyl... tous OK. Donne-la tous les jours, c'est important pour les os !",
  },
  {
    keywords: ['anesthésie', 'opération', 'chirurgie', 'dentiste'],
    answer:
      "Anesthésie locale (dentiste) : compatible, tu peux allaiter juste après.\n\nAnesthésie générale : reprends dès que tu es réveillée et alerte.\n\nLa plupart des anesthésiques sont éliminés rapidement. Préviens l'anesthésiste que tu allaites.",
  },
  {
    keywords: ['dépression', 'baby blues', 'triste', 'pleurer', 'envie de rien'],
    answer:
      "Baby blues (J3-J10) = normal (hormones).\nSi ça dure > 2 semaines → dépression post-partum possible.\n\nTu peux être traitée ET continuer d'allaiter. Les antidépresseurs compatibles existent (sertraline, paroxetine...).\n\nPARLE À QUELQU'UN. Tu n'es pas seule.\n\nSOS Post-partum : écoute et orientation.",
  },
  {
    keywords: ['radio', 'scanner', 'irm', 'produit contraste'],
    answer:
      "• Radio simple : aucun problème\n• Scanner avec contraste iodé : compatible, pas besoin d'arrêter\n• IRM avec gadolinium : compatible aussi\n\nL'exposition du lait est minime. Pas besoin de tirer-jeter.\n\nSource : e-lactancia.org",
  },

  // === TIRE-LAIT ET CONSERVATION ===
  {
    keywords: ['tire-lait', 'tire lait', 'tirer', 'pompe', 'pompage'],
    answer:
      "Taille de téterelle = ESSENTIELLE (mamelon doit bouger librement). Mode stimulation puis expression. Compression du sein pendant le tirage. Regarde une photo de bébé.\n\nConservation : ambiante 4-6h, frigo 48h, congélo 4-6 mois.\n\nEn France : location en pharmacie remboursée sur ordonnance !",
  },
  {
    keywords: ['conserver', 'conservation', 'frigo', 'congel', 'stockage'],
    answer:
      "Conservation du lait maternel :\n\n• Température ambiante : 4-6h\n• Réfrigérateur (4°C) : 48h (idéal) à 5 jours max\n• Congélateur (-18°C) : 4-6 mois\n\nJAMAIS recongeler un lait décongelé. Décongèle au frigo ou à l'eau tiède (pas au micro-ondes).",
  },
  {
    keywords: ['power pumping', 'power', 'booster', 'relancer'],
    answer:
      "Power pumping = simuler des tétées en grappe au tire-lait.\n\nProtocole :\n• 20 min tirage\n• 10 min pause\n• 10 min tirage\n• 10 min pause\n• 10 min tirage\n\n1x/jour pendant 3-7 jours. Résultats en 48-72h.",
  },
  {
    keywords: ['téterelle', 'taille', 'mm'],
    answer:
      "Mauvaise taille de téterelle = douleur + moins de lait.\n\nComment mesurer : diamètre du mamelon (pas l'aréole) + 2-3mm.\n\nLe mamelon doit bouger librement dans le tunnel sans frotter.\n\nTailles courantes : 21, 24, 27, 30, 36mm. N'hésite pas à essayer plusieurs !",
  },

  // === SOMMEIL ET NUIT ===
  {
    keywords: ['nuit', 'dort pas', 'réveille', 'sommeil', 'dodo'],
    answer:
      "Les tétées de nuit sont NORMALES et essentielles (prolactine max la nuit). Nouveau-né : 2-4 tétées/nuit. 3-6 mois : 1-3. Ne les supprime pas trop tôt.\n\nPour faciliter les nuits : garde bébé près de toi, allaite en position allongée si tu le souhaites, et repose-toi dès que possible.",
  },
  {
    keywords: ['sieste', 'bras', 'pose pas', 'réveille'],
    answer:
      "Bébé ne dort que dans tes bras ? C'est NORMAL.\n\nLe sommeil autonome vient progressivement. En attendant :\n• Portage (écharpe/porte-bébé)\n• Contact sieste\n• Endors au sein puis dépose délicatement\n• Matelas chauffé (retire la bouillotte avant de poser bébé)",
  },

  // === ÉTAPES ET TRANSITIONS ===
  {
    keywords: ['sevrage', 'arrêter', 'sevrer', 'stop'],
    answer:
      "Le bon moment pour sevrer = QUAND TU VEUX. Pas de jugement.\n\nComment : supprime UNE tétée à la fois, attends 3-5 jours entre chaque. Commence par la moins importante. Garde matin/soir en dernier.\n\nChaque goutte de lait que tu as donnée compte.",
  },
  {
    keywords: ['diversification', 'solide', 'manger', 'purée', 'dme'],
    answer:
      "OMS : 6 mois révolus. Signes de prêt : tient assis, plus de réflexe de poussée de langue, intéressé par la nourriture.\n\nPurées OU DME OU les deux ! Pas de \"meilleure\" méthode. Le lait reste l'aliment principal jusqu'à 1 an.",
  },
  {
    keywords: ['mixte', 'complément', 'compléter', 'lait artificiel'],
    answer:
      "Allaitement mixte = sein + biberons. C'est VALIDE.\n\nConseils :\n• Donne le sein EN PREMIER\n• Utilise tétines débit lent\n• Paced bottle feeding\n• Complète si vraiment nécessaire (poids, avis médical)\n\nChaque tétée compte. Mixte ne veut pas dire échec.",
  },
  {
    keywords: ['travail', 'reprise', 'boulot', 'employeur'],
    answer:
      "Tes droits (Code du travail, art. L1225-30) :\n• 1h/jour pour allaiter (pendant 1 an)\n• 2x30 min sur temps de travail\n• Local dédié obligatoire (>100 salariés)\n\nTon employeur NE PEUT PAS refuser. C'est la LOI.",
  },
  {
    keywords: ['crèche', 'nounou', 'garde', 'séparation'],
    answer:
      "Allaitement + mode de garde = compatible !\n\n• Laisse ton lait tiré à la crèche/nounou\n• Donne les instructions de décongélation\n• Tétées matin/soir/nuit à la maison\n• Tire sur ton lieu de travail\n\nTes tétées retrouvailles seront précieuses pour toi et bébé.",
  },

  // === SITUATIONS PARTICULIÈRES ===
  {
    keywords: ['jumeaux', 'jumelles', 'multiple'],
    answer:
      "Allaiter des jumeaux : TON CORPS PEUT PRODUIRE ASSEZ.\n\nConseils :\n• Position football ou allongée\n• Coussin d'allaitement jumeaux\n• En tandem = gain de temps\n• Aide +++ au début\n\nLa production s'adapte. Tu peux demander l'aide d'une IBCLC spécialisée.",
  },
  {
    keywords: ['prématuré', 'prema', 'néonat', 'couveuse'],
    answer:
      "Bébé préma : ton lait est ENCORE PLUS précieux !\n\nLe lait de mère de préma est adapté (plus de protéines, anticorps).\n\n• Tire dès les premières heures\n• 8-10 tirages/24h\n• Peau à peau dès que possible\n• Patience : la succion viendra\n\nDemande l'aide de l'équipe de néonat.",
  },
  {
    keywords: ['césarienne', 'césa', 'c-section'],
    answer:
      "Allaitement après césarienne : tout à fait possible !\n\n• Peau à peau en salle de réveil si possible\n• Position allongée ou ballon de rugby (évite la cicatrice)\n• La montée de lait peut être légèrement retardée\n• Demande de l'aide pour les positions\n\nLa douleur : paracétamol et ibuprofène sont compatibles.",
  },
  {
    keywords: ['enceinte', 'grossesse', 'nouvelle', 'tomber'],
    answer:
      "Allaiter enceinte : généralement OK (sauf grossesse à risque).\n\n• Les contractions utérines sont légères\n• Le lait peut diminuer (hormones)\n• Le goût change → certains bébés se sèvrent naturellement\n\nAllaitement en tandem possible après l'accouchement. Parles-en à ta sage-femme.",
  },
  {
    keywords: ['règle', 'retour de couche', 'menstruation', 'saignement'],
    answer:
      "Le retour de couches peut être retardé par l'allaitement (surtout si tétées fréquentes).\n\nQuand les règles reviennent :\n• Production peut baisser légèrement avant/pendant\n• Goût du lait peut changer\n• Magnésium + calcium peuvent aider\n\nC'est temporaire, la production se stabilise.",
  },
  {
    keywords: ['contraception', 'pilule', 'stérilet', 'diu'],
    answer:
      "Contraception compatible allaitement :\n✓ Préservatif\n✓ DIU (cuivre ou hormonal)\n✓ Pilule progestative (microprogestatifs)\n✓ Implant\n\n✗ Pilule œstroprogestative (peut baisser la production)\n\nLa MAMA (méthode d'aménorrhée) : efficace SI allaitement exclusif + pas de règles + bébé <6 mois.",
  },
  {
    keywords: ['sport', 'exercice', 'fitness', 'course'],
    answer:
      "Sport pendant l'allaitement : OUI !\n\n• Hydrate-toi bien\n• Soutien-gorge de sport adapté\n• Allaite AVANT le sport (confort)\n• L'acide lactique n'affecte pas le lait\n\nReprends progressivement, écoute ton corps. Le périnée d'abord !",
  },
  {
    keywords: ['tatouage', 'piercing'],
    answer:
      "Tatouage/piercing pendant l'allaitement : déconseillé par précaution (risque d'infection).\n\nSi vraiment envie :\n• Salon réputé et hygiénique\n• Pas sur les seins\n• Surveille les signes d'infection\n\nPas de contre-indication absolue mais attends si possible.",
  },
  {
    keywords: ['public', 'dehors', 'regard', 'gêne'],
    answer:
      "Allaiter en public : C'EST TON DROIT.\n\nEn France, aucune loi ne l'interdit. Au contraire, empêcher une mère d'allaiter peut être discriminatoire.\n\nConseils :\n• Vêtements adaptés (haut qui se soulève)\n• Écharpe de portage\n• Tu n'as pas à te cacher\n\nNourris ton bébé quand il a faim, point.",
  },

  // === SOUTIEN ÉMOTIONNEL ===
  {
    keywords: ['culpab', 'nulle', 'mauvaise mère', 'échec'],
    answer:
      "Tu n'es PAS une mauvaise mère. Tu fais de ton mieux, et c'est déjà ÉNORME.\n\nQuel que soit ton parcours (sein, biberon, mixte), ton bébé est nourri, aimé, et c'est tout ce qui compte.\n\nSi tu te sens débordée, parle à quelqu'un. SOS Allaitement, ta sage-femme, ou une consultante en lactation sont là pour toi.",
  },
  {
    keywords: ['fatigue', 'épuisée', 'plus la force', 'dormir'],
    answer:
      "L'épuisement est RÉEL et VALIDE.\n\nStratégies :\n• Délègue tout ce qui n'est pas le bébé\n• Sieste quand bébé dort (vraiment)\n• Accepte l'aide (ménage, repas)\n• Allaitement allongée = repos pour toi aussi\n\nSi épuisement + tristesse > 2 semaines → parles-en à ton médecin.",
  },
  {
    keywords: ['entourage', 'belle-mère', 'famille', 'critique', 'avis'],
    answer:
      "L'entourage critique ? Quelques réponses :\n\n\"Ton lait n'est pas assez nourrissant\" → FAUX. Le lait maternel est toujours adapté.\n\n\"Il tète encore à X mois ?\" → L'OMS recommande jusqu'à 2 ans et plus.\n\n\"Tu vas le rendre dépendant\" → L'allaitement crée de la SÉCURITÉ, pas de la dépendance.\n\nToi seule sais ce qui est bon pour TON bébé.",
  },
  {
    keywords: ['ibclc', 'consultante', 'lactation', 'aide'],
    answer:
      "Consultante en lactation IBCLC = la spécialiste de l'allaitement.\n\nQuand consulter :\n• Douleur persistante\n• Prise de poids insuffisante\n• Difficultés de succion\n• Reprise du travail compliquée\n• Tu as besoin d'un avis expert\n\nTrouve une IBCLC : consultants-lactation.org\nParfois remboursée par la mutuelle.",
  },
  {
    keywords: ['pmi', 'sage-femme', 'soutien', 'gratuit'],
    answer:
      "Ressources GRATUITES en France :\n\n• PMI : consultations allaitement gratuites\n• Sage-femme libérale (remboursée SS)\n• La Leche League : réunions gratuites\n• Associations locales d'allaitement\n\nN'hésite jamais à demander de l'aide !",
  },

  // === QUESTIONS DIVERSES ===
  {
    keywords: ['rgo', 'reflux', 'régurgit', 'vomit'],
    answer:
      "Régurgitations fréquentes ≠ RGO pathologique.\n\nNormal si bébé : prend du poids, n'a pas mal, est content.\n\nRGO si : pleurs, dos arqué, refus du sein, perte de poids → consulte.\n\nSolutions : positions verticales après tétée, rot, tétées plus courtes et plus fréquentes.",
  },
  {
    keywords: ['selles', 'caca', 'vert', 'constipé'],
    answer:
      "Selles de bébé allaité :\n• Premiers jours : méconium (noir/vert)\n• Ensuite : jaune moutarde, grumeleuses\n• Fréquence : plusieurs/jour à 1x tous les 7-10 jours\n\nSelles vertes occasionnelles = OK. Si persistant + bébé grognon : possible déséquilibre avant-lait/arrière-lait.",
  },
  {
    keywords: ['prise de poids', 'courbe', 'croissance', 'gramme'],
    answer:
      "Prise de poids moyenne :\n• M1 : 25-30g/jour (après reprise du poids de naissance)\n• M2-M4 : 20-25g/jour\n• M4-M6 : 15-20g/jour\n\nUtilise les courbes OMS (pas les anciennes courbes). Un bébé allaité suit SA propre courbe, pas une moyenne.",
  },
  {
    keywords: ['couche', 'mouillée', 'pipi'],
    answer:
      "Signes que bébé boit assez :\n• J1 : 1 couche mouillée\n• J2 : 2 couches\n• J3 : 3 couches\n• J4+ : 6+ couches bien mouillées/24h\n\nCouche \"bien mouillée\" = équivalent de 3 cuillères à soupe d'eau.",
  },
  {
    keywords: ['tétée', 'durée', 'combien', 'temps', 'minute'],
    answer:
      "Durée d'une tétée : très variable !\n\n• Nouveau-né : 15-45 min par sein\n• 2-3 mois : souvent 10-20 min\n• Après : parfois 5 min suffisent\n\nLaisse bébé finir le premier sein (lait gras à la fin) avant de proposer le deuxième.",
  },
  {
    keywords: ['bout de sein', 'coquille', 'protège'],
    answer:
      "Bouts de sein en silicone : à utiliser en DERNIER recours.\n\nIndications : mamelons plats, bébé préma, transition biberon→sein.\n\n⚠️ Problèmes : moins de stimulation, risque de baisse de production.\n\nSi tu les utilises : sevrage progressif dès que possible. Consulte une IBCLC.",
  },
  {
    keywords: ['bonjour', 'salut', 'coucou', 'hello', 'hey'],
    answer:
      "Salut ! Je suis là pour répondre à tes questions sur l'allaitement.\n\nTu peux me demander des infos sur :\n• Les problèmes courants (crevasses, engorgement...)\n• La production de lait\n• Les médicaments compatibles\n• Le sommeil et les nuits\n• Le travail et la reprise\n• Et plein d'autres sujets !\n\nQu'est-ce qui te préoccupe ?",
  },
  {
    keywords: ['merci', 'super', 'génial', 'cool', 'top'],
    answer:
      "Avec plaisir ! N'hésite pas si tu as d'autres questions.\n\nTu fais un super boulot. L'allaitement, c'est un apprentissage pour toi ET pour bébé. Sois patiente avec toi-même.",
  },
];

const getResponse = (input) => {
  const lower = input.toLowerCase();
  for (const r of botResponses) {
    if (r.keywords.some((k) => lower.includes(k))) {
      return r.answer;
    }
  }
  return "Je n'ai pas de réponse précise à cette question, mais voici mes conseils :\n\n• Vérifie sur e-lactancia.org (médicaments)\n• Vérifie sur lecrat.fr (CRAT)\n• Contacte La Leche League (lllfrance.org)\n• Consulte une IBCLC (consultante en lactation)\n\nN'hésite pas à reformuler ta question avec des mots-clés comme : crevasse, engorgement, médicament, production, tire-lait, sevrage...";
};

export default function ChatbotScreen({ onClose }) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "Salut ! Je suis l'assistante Malo.\n\nL'allaitement, c'est une douceur immense, une connexion profonde. Et parfois, c'est aussi des questions et des doutes.\n\nPose-moi tes questions sur l'allaitement, les médicaments, le tire-lait, le sommeil... Je suis là pour t'aider !",
    },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    const botMsg = { id: Date.now() + 1, from: 'bot', text: getResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles" size={24} color="#fff" />
          <View>
            <Text style={styles.headerTitle}>Assistante Malo</Text>
            <Text style={styles.headerSub}>Questions allaitement</Text>
          </View>
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.from === 'user'
                ? [styles.userBubble, { backgroundColor: theme.primary }]
                : [styles.botBubble, { backgroundColor: theme.card }],
            ]}
          >
            {msg.from === 'bot' && (
              <Ionicons
                name="heart-circle"
                size={20}
                color={theme.primary}
                style={{ marginBottom: 4 }}
              />
            )}
            <Text
              style={[
                styles.bubbleText,
                { color: msg.from === 'user' ? '#fff' : theme.textDark },
              ]}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick questions */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickScroll}
        contentContainerStyle={styles.quickRow}
      >
        {['Crevasses', 'Médicaments', 'Production', 'Tire-lait', 'Nuits', 'REF', 'Coliques', 'Reprise travail', 'Grève tétée', 'Diversification'].map(
          (q) => (
            <TouchableOpacity
              key={q}
              style={[styles.quickButton, { borderColor: theme.primary }]}
              onPress={() => {
                setInput(q);
                setTimeout(() => send(), 50);
              }}
            >
              <Text style={[styles.quickText, { color: theme.primary }]}>{q}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputRow, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.textDark, borderColor: theme.border }]}
          value={input}
          onChangeText={setInput}
          placeholder="Pose ta question..."
          placeholderTextColor={theme.textLight}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.primary }]}
          onPress={send}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 50,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { color: '#fff', fontSize: 17, fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  messages: { flex: 1 },
  messagesContent: { padding: 16, paddingBottom: 8 },
  bubble: { maxWidth: '85%', padding: 14, borderRadius: 18, marginBottom: 10 },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: { fontSize: 14, lineHeight: 22 },
  quickScroll: { maxHeight: 44 },
  quickRow: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  quickButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, borderWidth: 1.5 },
  quickText: { fontSize: 12, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    borderTopWidth: 1,
    paddingBottom: 30,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
