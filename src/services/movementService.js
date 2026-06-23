import { generateId } from '../utils/helpers';
import { storageService } from './storageService';

const MOVEMENTS_KEY = 'gm_movements';

/**
 * Histórico de movimentações local.
 * TODO: Migrar para subcoleção Firestore por unidade
 */
export const movementService = {
  getAll() {
    return storageService.get(MOVEMENTS_KEY) || [];
  },

  add(movement) {
    const entries = this.getAll();
    const entry = {
      id: generateId(),
      data: new Date().toISOString(),
      ...movement,
    };
    const updated = [entry, ...entries].slice(0, 50);
    storageService.set(MOVEMENTS_KEY, updated);
    return entry;
  },

  clear() {
    storageService.remove(MOVEMENTS_KEY);
  },
};
