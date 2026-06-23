import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useToastContext } from '../../contexts/ToastContext';
import { cn } from '../../utils/helpers';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-mercure-border bg-white text-mercure-dark',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-start gap-3 rounded-xl border p-4 shadow-lg animate-in slide-in-from-right',
              styles[toast.type]
            )}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-60 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
