import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ItemThumbnail from './ItemThumbnail';
import { formatDate, formatNumber } from '../../utils/helpers';

export default function ItemDetailModal({ item, isOpen, onClose, onEdit }) {
  if (!item) return null;

  const rows = [
    { label: 'Quantidade Total', value: formatNumber(item.quantidadeTotal) },
    { label: 'Disponível', value: formatNumber(item.disponivel), color: 'text-emerald-700' },
    { label: 'Danificado', value: formatNumber(item.danificado), color: 'text-red-600' },
    { label: 'Última Atualização', value: formatDate(item.ultimaAtualizacao) },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Item" size="md">
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <ItemThumbnail src={item.imagem} alt={item.nome} size="xl" className="mx-auto sm:mx-0" />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-mercure-dark">{item.nome}</h3>
                <p className="mt-1 text-sm text-mercure-muted">{item.categoria}</p>
              </div>
              <Badge status={item.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg bg-mercure-surface p-3">
              <p className="text-xs text-mercure-muted">{row.label}</p>
              <p className={`mt-0.5 text-lg font-semibold ${row.color || 'text-mercure-dark'}`}>
                {row.value}
              </p>
            </div>
          ))}
        </div>

        {item.observacoes && (
          <div className="rounded-lg border border-mercure-border p-3">
            <p className="text-xs font-medium text-mercure-muted">Observações</p>
            <p className="mt-1 text-sm text-mercure-dark">{item.observacoes}</p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
          <Button variant="primary" onClick={() => { onClose(); onEdit(item); }}>Editar</Button>
        </div>
      </div>
    </Modal>
  );
}
