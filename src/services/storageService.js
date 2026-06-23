import { STORAGE_KEYS } from '../utils/constants';

/** Abstração de Local Storage – futuramente substituída por Firestore */

export const storageService = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear(keys = Object.values(STORAGE_KEYS)) {
    keys.forEach((key) => localStorage.removeItem(key));
  },
};
