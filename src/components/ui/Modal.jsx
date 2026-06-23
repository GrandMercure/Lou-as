import { X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '../../utils/helpers';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-mercure-dark/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          'relative w-full rounded-2xl bg-white shadow-2xl',
          'max-h-[90vh] overflow-y-auto scrollbar-thin',
          sizes[size]
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-mercure-border bg-white px-5 py-4">
          <h2 className="text-lg font-semibold text-mercure-dark">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-mercure-muted transition hover:bg-gray-100 hover:text-mercure-dark"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
