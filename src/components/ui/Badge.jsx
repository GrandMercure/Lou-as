import { STATUS } from '../../utils/constants';
import { cn } from '../../utils/helpers';

const styles = {
  [STATUS.DISPONIVEL]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  [STATUS.ATENCAO]: 'bg-amber-50 text-amber-700 border-amber-200',
  [STATUS.BAIXO]: 'bg-red-50 text-red-700 border-red-200',
};

export default function Badge({ status, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[status] || 'bg-gray-50 text-gray-600 border-gray-200',
        className
      )}
    >
      {status}
    </span>
  );
}
