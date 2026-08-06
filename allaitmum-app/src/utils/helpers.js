export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Parse date from DD/MM/YYYY or YYYY-MM-DD format
export const parseBirthDate = (dateString) => {
  if (!dateString) return null;
  // Check if DD/MM/YYYY format
  if (dateString.includes('/')) {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  }
  // Fallback to YYYY-MM-DD format
  return new Date(dateString);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export const formatTimeOfDay = (dateString) => {
  return new Date(dateString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getBabyAge = (birthDate) => {
  if (!birthDate) return 'Date non renseignée';
  const parsedDate = parseBirthDate(birthDate);
  if (!parsedDate || isNaN(parsedDate.getTime())) return 'Date non renseignée';

  const days = Math.floor((new Date() - parsedDate) / (1000 * 60 * 60 * 24));
  if (isNaN(days) || days < 0) return 'Date non renseignée';

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainingDays = days % 30;

  if (years > 0) {
    return `${years} an${years > 1 ? 's' : ''} ${months > 0 ? `${months} mois` : ''}`;
  } else if (months > 0) {
    return `${months} mois ${remainingDays > 0 ? `${remainingDays} jour${remainingDays > 1 ? 's' : ''}` : ''}`;
  }
  return `${days} jour${days > 1 ? 's' : ''}`;
};

export const getBabyAgeInMonths = (birthDate) => {
  if (!birthDate) return 0;
  const parsedDate = parseBirthDate(birthDate);
  const days = Math.floor((new Date() - parsedDate) / (1000 * 60 * 60 * 24));
  return Math.floor(days / 30.44);
};

// Retourne la date locale au format YYYY-MM-DD (pas UTC — important pour les filtres journée)
export const todayString = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Convertit un ISO timestamp UTC en date locale YYYY-MM-DD
export const toLocalDateStr = (isoStr) => {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};
