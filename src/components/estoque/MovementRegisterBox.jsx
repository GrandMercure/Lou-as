import { ArrowDownToLine, ArrowUpFromLine, History } from 'lucide-react';
import { useState } from 'react';
import { FUNCIONARIOS, RESPONSAVEL_PADRAO, getFuncionarioById } from '../../data/mockEmployees';
import { useInventoryContext } from '../../contexts/InventoryContext';
import { useToastContext } from '../../contexts/ToastContext';
import { APP_NAME } from '../../utils/constants';
import { getItemImage } from '../../utils/itemImages';
import { cn, formatDate, formatNumber } from '../../utils/helpers';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import ItemSelect from './ItemSelect';
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
    color: 'text-mercure-navy',
    bg: 'bg-mercure-gold/10 border-mercure-gold/30',
    activeBtn: 'bg-mercure-gold text-mercure-navy border-mercure-gold',
  },
};

const TYPE_ORDER = ['saida', 'entrada'];

/**
 * Box dinâmico de registro de entrada e saída.
 * TODO: Sincronizar movimentações com Firestore em tempo real
 */
export default function MovementRegisterBox() {
  const { items, movements, registerEntry, registerExit } = useInventoryContext();
  const { addToast } = useToastContext();

  const [tipo, setTipo] = useState(null);
  const [itemId, setItemId] = useState('');
  const [quantidade, setQuantidade] = useState('1');
  const [observacao, setObservacao] = useState('');
  const [responsavelId, setResponsavelId] = useState(RESPONSAVEL_PADRAO);

  const responsavelOptions = FUNCIONARIOS.map((f) => ({
    value: f.id,
    label: f.cargo ? `${f.nome} — ${f.cargo}` : f.nome,
  }));

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

    const meta = { observacao, unidade: APP_NAME };
    if (tipo === 'saida') {
      const responsavel = getFuncionarioById(responsavelId);
      meta.responsavelId = responsavel.id;
      meta.responsavelNome = responsavel.nome;
    }
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

      <div className={cn('flex gap-2', tipo && 'mb-5')}>
        {TYPE_ORDER.map((key) => {
          const cfg = TYPES[key];
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTipo(key);
                if (key === 'saida') setResponsavelId(RESPONSAVEL_PADRAO);
              }}
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

      {tipo && (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <ItemSelect
            label="Selecione o item"
            items={items}
            value={itemId}
            onChange={setItemId}
          />
          <Input
            label="Quantidade"
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>

        {selectedItem && (
          <div
            className={cn(
              'flex flex-col items-center gap-4 rounded-xl border p-5 sm:flex-row sm:items-start',
              TYPES[tipo].bg
            )}
          >
            <ItemThumbnail
              src={selectedItem.imagem ?? getItemImage(selectedItem.nome)}
              alt={selectedItem.nome}
              size="xl"
              className="shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-lg font-semibold text-mercure-dark">{selectedItem.nome}</h4>
              <p className="text-sm text-mercure-muted">{selectedItem.categoria}</p>
              <div className="mt-3 flex flex-wrap justify-center gap-4 sm:justify-start">
                <div>
                  <span className="text-xs text-mercure-muted">Total</span>
                  <p className="font-semibold text-mercure-dark">{formatNumber(selectedItem.quantidadeTotal)}</p>
                </div>
                <div>
                  <span className="text-xs text-mercure-muted">Disponível</span>
                  <p className="font-semibold text-emerald-700">{formatNumber(selectedItem.disponivel)}</p>
                </div>
                <div>
                  <span className="text-xs text-mercure-muted">Danificado</span>
                  <p className="font-semibold text-red-600">{formatNumber(selectedItem.danificado)}</p>
                </div>
                {tipo === 'saida' && (
                  <div>
                    <span className="text-xs text-mercure-muted">Máx. saída</span>
                    <p className="font-semibold text-amber-700">{formatNumber(selectedItem.disponivel)} un.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tipo === 'saida' && (
          <Select
            label="Quem danificou o item?"
            options={responsavelOptions}
            value={responsavelId}
            onChange={(e) => setResponsavelId(e.target.value)}
          />
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
      )}

      <div className={cn('border-t border-mercure-border pt-5', tipo ? 'mt-6' : 'mt-5')}>
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
              return (
                <li
                  key={mov.id}
                  className="flex items-center gap-3 rounded-lg bg-mercure-surface px-3 py-2.5 text-sm"
                >
                  <div className={cn('rounded-lg p-1.5', cfg?.bg)}>
                    {mov.tipo === 'entrada' ? (
                      <ArrowDownToLine className={cn('h-3.5 w-3.5', cfg?.color)} />
                    ) : (
                      <ArrowUpFromLine className={cn('h-3.5 w-3.5', cfg?.color)} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-mercure-dark">
                      {cfg?.label} — {mov.itemNome}
                    </p>
                    <p className="text-xs text-mercure-muted">
                      {formatDate(mov.data)}
                      {mov.tipo === 'saida' && mov.responsavelNome && ` · ${mov.responsavelNome}`}
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
