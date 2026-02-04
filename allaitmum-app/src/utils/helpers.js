export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
  const days = Math.floor((new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24));
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
  const days = Math.floor((new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24));
  return Math.floor(days / 30.44);
};

export const todayString = () => new Date().toISOString().split('T')[0];
