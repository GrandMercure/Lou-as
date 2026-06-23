import Badge from '../ui/Badge';
import ItemThumbnail from './ItemThumbnail';
import { formatNumber } from '../../utils/helpers';

export default function InventoryTable({ items, onRowClick }) {
  return (
    <div className="max-w-full overflow-hidden rounded-xl border border-mercure-border bg-white">
      <p className="border-b border-mercure-border bg-mercure-surface/50 px-4 py-2 text-xs text-mercure-muted sm:hidden">
        Deslize horizontalmente para ver todas as colunas →
      </p>
      <div className="overflow-x-auto overscroll-x-contain scrollbar-thin">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-mercure-border bg-mercure-surface/80">
              <th className="px-4 py-3 font-semibold text-mercure-muted">Item</th>
              <th className="px-4 py-3 font-semibold text-mercure-muted">Categoria</th>
              <th className="px-4 py-3 font-semibold text-mercure-muted text-right">Total</th>
              <th className="px-4 py-3 font-semibold text-mercure-muted text-right">Disponível</th>
              <th className="px-4 py-3 font-semibold text-mercure-muted text-right">Danificado</th>
              <th className="px-4 py-3 font-semibold text-mercure-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick(item)}
                className="cursor-pointer border-b border-mercure-border/60 transition hover:bg-mercure-gold/5 last:border-0"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <ItemThumbnail src={item.imagem} alt={item.nome} size="md" />
                    <div className="min-w-[120px]">
                      <p className="font-medium text-mercure-dark">{item.nome}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-mercure-muted">{item.categoria}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right font-medium">{formatNumber(item.quantidadeTotal)}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right text-emerald-700">{formatNumber(item.disponivel)}</td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right text-red-600">{formatNumber(item.danificado)}</td>
                <td className="whitespace-nowrap px-4 py-3.5">
                  <Badge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="py-12 text-center text-mercure-muted">Nenhum item encontrado.</div>
        )}
      </div>
    </div>
  );
}
