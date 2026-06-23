import { CATEGORIES } from '../../utils/constants';
import { cn } from '../../utils/helpers';

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-xs font-medium transition',
            selected === cat
              ? 'border-mercure-navy bg-mercure-navy text-white'
              : 'border-mercure-border bg-white text-mercure-muted hover:border-mercure-gold hover:text-mercure-dark'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
