import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { inventoryService } from '../services/inventoryService';
import { movementService } from '../services/movementService';
import { enrichItem } from '../utils/inventoryCalculations';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [items, setItems] = useState(() => inventoryService.getAll());
  const [movements, setMovements] = useState(() => movementService.getAll());

  const refresh = useCallback(() => {
    setItems(inventoryService.getAll());
    setMovements(movementService.getAll());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const enrichedItems = useMemo(() => items.map(enrichItem), [items]);

  const updateItem = useCallback((id, updates) => {
    inventoryService.updateItem(id, updates);
    refresh();
  }, [refresh]);

  const addItem = useCallback((item) => {
    inventoryService.addItem(item);
    refresh();
  }, [refresh]);

  const markDamaged = useCallback((id, qty) => {
    const result = inventoryService.markDamaged(id, qty);
    refresh();
    return result;
  }, [refresh]);

  const registerEntry = useCallback((id, qty, meta = {}) => {
    const item = inventoryService.getAll().find((i) => i.id === id);
    const result = inventoryService.registerEntry(id, qty);
    if (result) {
      movementService.add({
        tipo: 'entrada',
        itemId: id,
        itemNome: item?.nome,
        quantidade: qty,
        observacao: meta.observacao || '',
        unidade: meta.unidade || '',
      });
      refresh();
    }
    return result;
  }, [refresh]);

  const registerExit = useCallback((id, qty, meta = {}) => {
    const item = inventoryService.getAll().find((i) => i.id === id);
    const result = inventoryService.registerExit(id, qty);
    if (result) {
      movementService.add({
        tipo: 'saida',
        itemId: id,
        itemNome: item?.nome,
        quantidade: qty,
        observacao: meta.observacao || '',
        unidade: meta.unidade || '',
        responsavelId: meta.responsavelId || '',
        responsavelNome: meta.responsavelNome || '',
      });
      refresh();
    }
    return result;
  }, [refresh]);

  const value = useMemo(
    () => ({
      items: enrichedItems,
      movements,
      updateItem,
      addItem,
      markDamaged,
      registerEntry,
      registerExit,
      refresh,
    }),
    [enrichedItems, movements, updateItem, addItem, markDamaged, registerEntry, registerExit, refresh]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventoryContext() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventoryContext deve ser usado dentro de InventoryProvider');
  return ctx;
}
