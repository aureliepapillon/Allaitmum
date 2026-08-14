// Email validation
export const isValidEmail = (email) => {
  if (!email || !email.trim()) return true; // Optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Date validation (DD/MM/YYYY or YYYY-MM-DD)
export const isValidDate = (dateStr) => {
  if (!dateStr || !dateStr.trim()) return true; // Optional field

  const trimmed = dateStr.trim();

  // Format DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    const [day, month, year] = trimmed.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  }

  // Format YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [year, month, day] = trimmed.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
  }

  return false;
};

// Check if date is not in the future
export const isNotFutureDate = (dateStr) => {
  if (!dateStr || !dateStr.trim()) return true;

  const trimmed = dateStr.trim();
  let date;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    const [day, month, year] = trimmed.split('/').map(Number);
    date = new Date(year, month - 1, day);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    date = new Date(trimmed);
  } else {
    return false;
  }

  return date <= new Date();
};

// Weight validation for babies/young children (0.5 - 40 kg)
export const isValidBabyWeight = (weight) => {
  if (!weight && weight !== 0) return true; // Optional field
  const num = typeof weight === 'string' ? parseFloat(weight.replace(',', '.')) : weight;
  return !isNaN(num) && num >= 0.5 && num <= 40;
};

// Height validation for babies/young children (30 - 140 cm)
export const isValidBabyHeight = (height) => {
  if (!height && height !== 0) return true; // Optional field
  const num = typeof height === 'string' ? parseFloat(height.replace(',', '.')) : height;
  return !isNaN(num) && num >= 30 && num <= 140;
};

// Head circumference validation (25 - 60 cm)
export const isValidHeadCircumference = (circumference) => {
  if (!circumference && circumference !== 0) return true; // Optional field
  const num = typeof circumference === 'string' ? parseFloat(circumference.replace(',', '.')) : circumference;
  return !isNaN(num) && num >= 25 && num <= 60;
};

// Name validation (not empty, reasonable length)
export const isValidName = (name) => {
  if (!name || !name.trim()) return false;
  return name.trim().length >= 1 && name.trim().length <= 50;
};

// Validation messages
export const ValidationMessages = {
  email: 'Email invalide. Exemple: nom@email.com',
  date: 'Date invalide. Format: JJ/MM/AAAA',
  futureDate: 'La date ne peut pas être dans le futur',
  weight: 'Poids invalide (entre 0.5 et 15 kg)',
  height: 'Taille invalide (entre 30 et 120 cm)',
  headCircumference: 'Périmètre crânien invalide (entre 25 et 60 cm)',
  name: 'Le prénom est requis',
};

// Validate all baby data at once
export const validateBabyData = (data) => {
  const errors = [];

  if (!isValidName(data.name)) {
    errors.push(ValidationMessages.name);
  }

  if (data.birthDate && !isValidDate(data.birthDate)) {
    errors.push(ValidationMessages.date);
  } else if (data.birthDate && !isNotFutureDate(data.birthDate)) {
    errors.push(ValidationMessages.futureDate);
  }

  if (data.birthWeight && !isValidBabyWeight(data.birthWeight)) {
    errors.push(ValidationMessages.weight);
  }

  if (data.birthHeight && !isValidBabyHeight(data.birthHeight)) {
    errors.push(ValidationMessages.height);
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push(ValidationMessages.email);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate growth entry
export const validateGrowthEntry = (data) => {
  const errors = [];

  if (data.weight && !isValidBabyWeight(data.weight)) {
    errors.push(ValidationMessages.weight);
  }

  if (data.height && !isValidBabyHeight(data.height)) {
    errors.push(ValidationMessages.height);
  }

  if (data.headCircumference && !isValidHeadCircumference(data.headCircumference)) {
    errors.push(ValidationMessages.headCircumference);
  }

  if (data.date && !isValidDate(data.date)) {
    errors.push(ValidationMessages.date);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
