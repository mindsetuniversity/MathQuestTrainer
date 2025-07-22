import { UserData, QuestProgress } from '../types';

const STORAGE_KEY = 'math-quest-trainer';

export const getDefaultUserData = (): UserData => ({
  name: 'Young Scholar',
  globalLevel: 1,
  globalXP: 0,
  questProgress: {
    'ocean-operations': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 },
    'algebraic-adventures': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 },
    'geometry-galaxy': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 },
    'measurement-mountain': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 },
    'data-discovery': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 },
    'temple-mastery': { level: 1, xp: 0, problemsSolved: 0, accuracy: 0 }
  },
  eloRatings: {
    'ocean-operations': 1000,
    'algebraic-adventures': 1000,
    'geometry-galaxy': 1000,
    'measurement-mountain': 1000,
    'data-discovery': 1000,
    'temple-mastery': 1000
  }
});

export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const loadUserData = (): UserData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      const defaults = getDefaultUserData();
      return {
        ...defaults,
        ...parsed,
        questProgress: { ...defaults.questProgress, ...parsed.questProgress },
        eloRatings: { ...defaults.eloRatings, ...parsed.eloRatings }
      };
    }
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
  return getDefaultUserData();
};