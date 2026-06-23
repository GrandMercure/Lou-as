import { ChevronDown, Package } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn, formatNumber } from '../../utils/helpers';
import { getItemImage } from '../../utils/itemImages';
import ItemThumbnail from './ItemThumbnail';

/**
 * Seletor de item com miniatura 1:1 na lista — escalável para muitos produtos.
 */
export default function ItemSelect({ label, items, value, onChange, placeholder = 'Selecione um item...' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = items.find((i) => i.id === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-mercure-dark">{label}</label>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg border border-mercure-border bg-white px-3 py-2.5 text-left text-sm transition',
          'hover:border-mercure-gold/50 focus:border-mercure-gold focus:outline-none focus:ring-2 focus:ring-mercure-gold/20',
          open && 'border-mercure-gold ring-2 ring-mercure-gold/20'
        )}
      >
        {selected ? (
          <>
            <ItemThumbnail
              src={selected.imagem ?? getItemImage(selected.nome)}
              alt={selected.nome}
              size="sm"
            />
            <span className="flex-1 truncate font-medium text-mercure-dark">
              {selected.nome}
              <span className="ml-1 font-normal text-mercure-muted">
                — {formatNumber(selected.disponivel)} disp.
              </span>
            </span>
          </>
        ) : (
          <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-mercure-border bg-mercure-surface text-mercure-muted">
              <Package className="h-4 w-4" />
            </div>
            <span className="flex-1 text-mercure-muted">{placeholder}</span>
          </>
        )}
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-mercure-muted transition', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-mercure-border bg-white py-1 shadow-lg scrollbar-thin"
          role="listbox"
        >
          {items.map((item) => {
            const isActive = item.id === value;
            return (
              <li key={item.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition',
                    isActive
                      ? 'bg-mercure-gold/10 text-mercure-dark'
                      : 'text-mercure-dark hover:bg-mercure-surface'
                  )}
                >
                  <ItemThumbnail
                    src={item.imagem ?? getItemImage(item.nome)}
                    alt={item.nome}
                    size="sm"
                  />
                  <span className="flex-1 truncate font-medium">{item.nome}</span>
                  <span className="shrink-0 text-xs text-mercure-muted">
                    {formatNumber(item.disponivel)} disp.
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
