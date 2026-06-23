import { cn } from '../../utils/helpers';

export default function Card({ children, className, padding = true, ...props }) {
  return (
    <div
      className={cn(
        'min-w-0 max-w-full rounded-xl border border-mercure-border bg-white shadow-sm',
        padding && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-mercure-dark">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-mercure-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
