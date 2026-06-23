import { cn } from '../../utils/helpers';

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-mercure-dark">{label}</label>
      )}
      <input
        className={cn(
          'w-full rounded-lg border border-mercure-border bg-white px-3.5 py-2.5 text-sm',
          'text-mercure-dark placeholder:text-gray-400',
          'transition focus:border-mercure-gold focus:outline-none focus:ring-2 focus:ring-mercure-gold/20',
          error && 'border-red-300 focus:border-red-400 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
