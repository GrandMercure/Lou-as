import Select from '../ui/Select';
import { CATEGORIES } from '../../utils/constants';
import { cn } from '../../utils/helpers';

const categoryOptions = CATEGORIES.map((cat) => ({ value: cat, label: cat }));

export default function CategoryFilter({ selected, onChange }) {
  return (
    <>
      {/* Mobile: dropdown compacto */}
      <div className="md:hidden">
        <Select
          label="Filtrar por categoria"
          options={categoryOptions}
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {/* Desktop: botões em linha */}
      <div className="hidden overflow-x-auto scrollbar-thin pb-1 md:block">
        <div className="flex w-max min-w-full gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
                selected === cat
                  ? 'border-mercure-navy bg-mercure-navy text-white'
                  : 'border-mercure-border bg-white text-mercure-muted hover:border-mercure-gold hover:text-mercure-dark'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
