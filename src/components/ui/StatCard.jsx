import { cn } from '../../utils/helpers';
import Card from './Card';

export default function StatCard({ title, value, icon: Icon, trend, variant = 'default' }) {
  const variants = {
    default: 'bg-white',
    navy: 'bg-mercure-navy text-white border-mercure-navy',
    gold: 'bg-gradient-to-br from-mercure-gold/10 to-mercure-gold/5 border-mercure-gold/30',
  };

  const isDark = variant === 'navy';

  return (
    <Card className={cn('relative overflow-hidden', variants[variant])} padding>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-sm font-medium', isDark ? 'text-white/70' : 'text-mercure-muted')}>
            {title}
          </p>
          <p className={cn('mt-2 text-3xl font-bold tracking-tight', isDark ? 'text-white' : 'text-mercure-dark')}>
            {value}
          </p>
          {trend && (
            <p className={cn('mt-1 text-xs', isDark ? 'text-mercure-gold-light' : 'text-mercure-muted')}>
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'rounded-xl p-2.5',
              isDark ? 'bg-white/10' : 'bg-mercure-surface text-mercure-navy'
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}
