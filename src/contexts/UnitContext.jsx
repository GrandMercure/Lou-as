import { createContext, useContext, useMemo, useState } from 'react';
import { STORAGE_KEYS, UNITS } from '../utils/constants';
import { storageService } from '../services/storageService';

const UnitContext = createContext(null);

/**
 * Contexto multiunidade – demonstração visual.
 * TODO: Sincronizar unidade selecionada com Firestore e permissões do usuário
 */
export function UnitProvider({ children }) {
  const [selectedUnitId, setSelectedUnitId] = useState(
    () => storageService.get(STORAGE_KEYS.UNIT) || UNITS[0].id
  );

  const selectedUnit = UNITS.find((u) => u.id === selectedUnitId) || UNITS[0];

  const selectUnit = (unitId) => {
    setSelectedUnitId(unitId);
    storageService.set(STORAGE_KEYS.UNIT, unitId);
  };

  const value = useMemo(
    () => ({ units: UNITS, selectedUnit, selectedUnitId, selectUnit }),
    [selectedUnit, selectedUnitId]
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnitContext() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnitContext deve ser usado dentro de UnitProvider');
  return ctx;
}
