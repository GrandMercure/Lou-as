import { ArrowDownToLine, ArrowUpFromLine, History } from 'lucide-react';
import { useState } from 'react';
import { useInventoryContext } from '../../contexts/InventoryContext';
import { useToastContext } from '../../contexts/ToastContext';
import { useUnitContext } from '../../contexts/UnitContext';
import { getItemImage } from '../../utils/itemImages';
import { cn, formatDate, formatNumber } from '../../utils/helpers';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import Input from '../ui/Input';
import ItemThumbnail from './ItemThumbnail';

const TYPES = {
  entrada: {
    label: 'Entrada',
    icon: ArrowDownToLine,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    activeBtn: 'bg-emerald-600 text-white border-emerald-600',
  },
  saida: {
    label: 'Saída',
    icon: ArrowUpFromLine,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    activeBtn: 'bg-amber-600 text-white border-amber-600',
  },
};

/**
 * Box dinâmico de registro de entrada e saída.
 * TODO: Sincronizar movimentações com Firestore em tempo real
 */
export default function MovementRegisterBox() {
  const { items, movements, registerEntry, registerExit } = useInventoryContext();
  const { addToast } = useToastContext();
  const { selectedUnit } = useUnitContext();

  const [tipo, setTipo] = useState('entrada');
  const [itemId, setItemId] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');

  const selectedItem = items.find((i) => i.id === itemId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = Number(quantidade);

    if (!itemId) {
      addToast('Selecione um item.', 'error');
      return;
    }
    if (!qty || qty <= 0) {
      addToast('Informe uma quantidade válida.', 'error');
      return;
    }

    const meta = { observacao, unidade: selectedUnit.nome };
    const result =
      tipo === 'entrada'
        ? registerEntry(itemId, qty, meta)
        : registerExit(itemId, qty, meta);

    if (result) {
      addToast(
        `${TYPES[tipo].label} de ${qty} un. registrada com sucesso!`,
        'success'
      );
      setQuantidade('1');
      setObservacao('');
    } else {
      addToast(
        tipo === 'saida'
          ? 'Quantidade indisponível para saída.'
          : 'Não foi possível registrar a entrada.',
        'error'
      );
    }
  };

  const recentMovements = movements.slice(0, 8);

  return (
    <Card className="border-mercure-gold/20">
      <CardHeader
        title="Registro de Movimentação"
        subtitle="Entrada e saída de itens do estoque"
      />

      <div className="mb-5 flex gap-2">
        {Object.entries(TYPES).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTipo(key)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition',
                tipo === key
                  ? cfg.activeBtn
                  : 'border-mercure-border bg-white text-mercure-muted hover:border-mercure-gold/40'
              )}
            >
              <Icon className="h-4 w-4" />
              {cfg.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-3 text-sm font-medium text-mercure-dark">Selecione o item</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {items.map((item) => {
              const isSelected = itemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setItemId(item.id)}
                  className={cn(
                    'flex flex-col items-center rounded-xl border p-3 transition',
                    isSelected
                      ? 'border-mercure-gold bg-mercure-gold/5 ring-2 ring-mercure-gold/30'
                      : 'border-mercure-border bg-white hover:border-mercure-gold/40 hover:bg-mercure-surface'
                  )}
                >
                  <ItemThumbnail
                    src={item.imagem ?? getItemImage(item.nome)}
                    alt={item.nome}
                    size="lg"
                  />
                  <p className="mt-2 text-center text-xs font-semibold text-mercure-dark">{item.nome}</p>
                  <p className="text-center text-[10px] text-mercure-muted">
                    {formatNumber(item.disponivel)} disp.
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Quantidade"
          type="number"
          min="1"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />

        {selectedItem && (
          <div
            className={cn(
              'flex flex-wrap items-center gap-4 rounded-lg border px-4 py-3 text-sm',
              TYPES[tipo].bg
            )}
          >
            <ItemThumbnail
              src={selectedItem.imagem}
              alt={selectedItem.nome}
              size="md"
            />
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-mercure-muted">Total: </span>
                <strong>{formatNumber(selectedItem.quantidadeTotal)}</strong>
              </div>
              <div>
                <span className="text-mercure-muted">Disponível: </span>
                <strong className="text-emerald-700">{formatNumber(selectedItem.disponivel)}</strong>
              </div>
              <div>
                <span className="text-mercure-muted">Danificado: </span>
                <strong className="text-red-600">{formatNumber(selectedItem.danificado)}</strong>
              </div>
              {tipo === 'saida' && (
                <div className="text-xs text-amber-700">
                  Máx. saída: {formatNumber(selectedItem.disponivel)} un.
                </div>
              )}
            </div>
          </div>
        )}

        <Input
          label="Observação (opcional)"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Ex: Reposição fornecedor, evento salão principal..."
        />

        <Button
          type="submit"
          variant={tipo === 'entrada' ? 'primary' : 'gold'}
          icon={TYPES[tipo].icon}
          className="w-full sm:w-auto"
        >
          Registrar {TYPES[tipo].label}
        </Button>
      </form>

      <div className="mt-6 border-t border-mercure-border pt-5">
        <div className="mb-3 flex items-center gap-2">
          <History className="h-4 w-4 text-mercure-muted" />
          <h4 className="text-sm font-semibold text-mercure-dark">Últimas movimentações</h4>
        </div>

        {recentMovements.length === 0 ? (
          <p className="text-sm text-mercure-muted">Nenhuma movimentação registrada ainda.</p>
        ) : (
          <ul className="max-h-52 space-y-2 overflow-y-auto scrollbar-thin">
            {recentMovements.map((mov) => {
              const cfg = TYPES[mov.tipo];
              const movItem = items.find((i) => i.id === mov.itemId);
              return (
                <li
                  key={mov.id}
                  className="flex items-center gap-3 rounded-lg bg-mercure-surface px-3 py-2.5 text-sm"
                >
                  <ItemThumbnail
                    src={movItem?.imagem ?? getItemImage(mov.itemNome)}
                    alt={mov.itemNome}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-mercure-dark">
                      {cfg?.label} — {mov.itemNome}
                    </p>
                    <p className="text-xs text-mercure-muted">
                      {formatDate(mov.data)}
                      {mov.observacao && ` · ${mov.observacao}`}
                    </p>
                  </div>
                  <span className={cn('shrink-0 font-semibold', cfg?.color)}>
                    {mov.tipo === 'entrada' ? '+' : '−'}{formatNumber(mov.quantidade)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
}
