/** Funções utilitárias gerais */

export function formatDate(dateString) {
  if (!dateString) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value ?? 0);
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
