import { cn } from '../../utils/helpers';

export default function Select({ label, options, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-mercure-dark">{label}</label>
      )}
      <select
        className={cn(
          'w-full rounded-lg border border-mercure-border bg-white px-3.5 py-2.5 text-sm',
          'text-mercure-dark transition',
          'focus:border-mercure-gold focus:outline-none focus:ring-2 focus:ring-mercure-gold/20',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
