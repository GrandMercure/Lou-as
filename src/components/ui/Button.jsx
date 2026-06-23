import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-mercure-navy text-white hover:bg-mercure-navy-light shadow-sm',
  secondary: 'bg-white text-mercure-dark border border-mercure-border hover:bg-gray-50',
  gold: 'bg-mercure-gold text-mercure-navy hover:bg-mercure-gold-light shadow-sm',
  danger: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
  ghost: 'text-mercure-muted hover:bg-gray-100 hover:text-mercure-dark',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-mercure-gold/40 focus:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  );
}
