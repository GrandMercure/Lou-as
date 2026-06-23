import mockItems from '../data/mockItems.json';
import { INVENTORY_DATA_VERSION, STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { storageService } from './storageService';

/**
 * Serviço de inventário local.
 * TODO: Migrar para Firebase Firestore com sincronização em tempo real
 * TODO: Adicionar histórico de movimentações (audit log)
 */
export const inventoryService = {
  getAll() {
    const version = storageService.get(STORAGE_KEYS.INVENTORY_VERSION);
    const stored = storageService.get(STORAGE_KEYS.INVENTORY);

    if (version !== INVENTORY_DATA_VERSION || !stored?.length) {
      storageService.set(STORAGE_KEYS.INVENTORY, mockItems);
      storageService.set(STORAGE_KEYS.INVENTORY_VERSION, INVENTORY_DATA_VERSION);
      return mockItems;
    }

    return stored.map(this._normalize);
  },

  /** Remove campos legados (emUso, disponivel) de dados antigos no Local Storage */
  _normalize(item) {
    const { emUso, disponivel, ...rest } = item;
    return rest;
  },

  saveAll(items) {
    storageService.set(STORAGE_KEYS.INVENTORY, items);
    return items;
  },

  updateItem(id, updates) {
    const items = this.getAll();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      ultimaAtualizacao: new Date().toISOString(),
    };
    this.saveAll(items);
    return items[index];
  },

  addItem(item) {
    const items = this.getAll();
    const newItem = {
      ...item,
      id: generateId(),
      ultimaAtualizacao: new Date().toISOString(),
    };
    items.push(newItem);
    this.saveAll(items);
    return newItem;
  },

  /** Marca itens como danificados */
  markDamaged(id, quantidade = 1) {
    const item = this.getAll().find((i) => i.id === id);
    if (!item) return null;

    const disponivel = item.quantidadeTotal - (item.danificado ?? 0);
    if (disponivel < quantidade) return null;

    return this.updateItem(id, {
      danificado: (item.danificado ?? 0) + quantidade,
    });
  },

  /** Registra entrada de itens no estoque */
  registerEntry(id, quantidade = 1) {
    const item = this.getAll().find((i) => i.id === id);
    if (!item || quantidade <= 0) return null;

    return this.updateItem(id, {
      quantidadeTotal: item.quantidadeTotal + quantidade,
    });
  },

  /** Registra saída de itens do estoque (não pode ultrapassar o disponível) */
  registerExit(id, quantidade = 1) {
    const item = this.getAll().find((i) => i.id === id);
    if (!item || quantidade <= 0) return null;

    const disponivel = item.quantidadeTotal - (item.danificado ?? 0);
    if (disponivel < quantidade) return null;

    return this.updateItem(id, {
      quantidadeTotal: item.quantidadeTotal - quantidade,
    });
  },

  resetToMock() {
    storageService.set(STORAGE_KEYS.INVENTORY, mockItems);
    storageService.set(STORAGE_KEYS.INVENTORY_VERSION, INVENTORY_DATA_VERSION);
    return mockItems;
  },
};
