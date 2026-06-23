import { Building2 } from 'lucide-react';
import { useUnitContext } from '../../contexts/UnitContext';

/**
 * Seletor multiunidade – demonstração visual.
 * TODO: Filtrar inventário por unidade via Firestore
 */
export default function UnitSelector({ compact = false }) {
  const { units, selectedUnitId, selectUnit } = useUnitContext();

  return (
    <div className={compact ? 'w-full' : 'px-3'}>
      {!compact && (
        <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Unidade
        </p>
      )}
      <div className="relative">
        <Building2
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-mercure-muted ${compact ? 'left-3 h-4 w-4' : 'left-3 h-4 w-4'}`}
        />
        <select
          value={selectedUnitId}
          onChange={(e) => selectUnit(e.target.value)}
          className={
            compact
              ? 'w-full rounded-lg border border-mercure-border bg-white py-2 pl-9 pr-3 text-sm text-mercure-dark focus:border-mercure-gold focus:outline-none focus:ring-2 focus:ring-mercure-gold/20'
              : 'w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white focus:border-mercure-gold focus:outline-none focus:ring-1 focus:ring-mercure-gold/40'
          }
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id} className="text-mercure-dark">
              {unit.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
