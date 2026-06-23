import { cn } from '../../utils/helpers';
import Card from './Card';

export default function StatCard({ title, value, icon: Icon, trend, variant = 'default' }) {
  const variants = {
    default: 'bg-white',
    navy: '!bg-mercure-navy text-white !border-mercure-navy',
    gold: 'bg-gradient-to-br from-mercure-gold/10 to-mercure-gold/5 border-mercure-gold/30',
  };

  const isDark = variant === 'navy';

  return (
    <Card className={cn('relative overflow-hidden !p-3 sm:!p-5', variants[variant])} padding={false}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={cn('text-xs font-medium sm:text-sm', isDark ? 'text-white/70' : 'text-mercure-muted')}>
            {title}
          </p>
          <p className={cn('mt-1 text-xl font-bold tracking-tight sm:mt-2 sm:text-3xl', isDark ? 'text-mercure-gold' : 'text-mercure-dark')}>
            {value ?? '0'}
          </p>
          {trend && (
            <p className={cn('mt-0.5 text-[10px] sm:mt-1 sm:text-xs', isDark ? 'text-mercure-gold-light' : 'text-mercure-muted')}>
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'shrink-0 rounded-lg p-1.5 sm:rounded-xl sm:p-2.5',
              isDark ? 'bg-white/10' : 'bg-mercure-surface text-mercure-navy'
            )}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}
