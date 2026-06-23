import { STATUS, STOCK_THRESHOLDS } from './constants';
import { getItemImage } from './itemImages';

/** Quantidade em bom estado = total − danificados */
export function getDisponivel(item) {
  return item.quantidadeTotal - (item.danificado ?? 0);
}

/**
 * Calcula o status do item com base na quantidade disponível.
 * Futuramente: regras por unidade virão do Firestore.
 */
export function getItemStatus(item) {
  const disponivel = getDisponivel(item);
  const ratio = disponivel / item.quantidadeTotal;

  if (ratio <= STOCK_THRESHOLDS.BAIXO) return STATUS.BAIXO;
  if (ratio <= STOCK_THRESHOLDS.ATENCAO) return STATUS.ATENCAO;
  return STATUS.DISPONIVEL;
}

export function enrichItem(item) {
  const disponivel = getDisponivel(item);
  return {
    ...item,
    disponivel,
    imagem: getItemImage(item.nome),
    status: getItemStatus({ ...item, disponivel }),
  };
}

export function calculateSummary(items) {
  return items.reduce(
    (acc, item) => {
      const disponivel = getDisponivel(item);
      const status = getItemStatus({ ...item, disponivel });
      acc.totalItens += item.quantidadeTotal;
      acc.disponivel += disponivel;
      acc.danificado += item.danificado ?? 0;
      if (status === STATUS.BAIXO) acc.baixoEstoque += 1;
      if (status === STATUS.BAIXO || status === STATUS.ATENCAO) acc.itensComAlerta += 1;
      return acc;
    },
    { totalItens: 0, disponivel: 0, danificado: 0, baixoEstoque: 0, itensComAlerta: 0 }
  );
}

export function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.categoria;
    if (!acc[key]) {
      acc[key] = { categoria: key, total: 0, disponivel: 0, danificado: 0 };
    }
    acc[key].total += item.quantidadeTotal;
    acc[key].disponivel += getDisponivel(item);
    acc[key].danificado += item.danificado ?? 0;
    return acc;
  }, {});
}

export function getTopStockItems(items, limit = 5) {
  return [...items].sort((a, b) => b.quantidadeTotal - a.quantidadeTotal).slice(0, limit);
}

export function getLowStockItems(items, limit = 5) {
  return [...items]
    .map(enrichItem)
    .sort((a, b) => a.disponivel / a.quantidadeTotal - b.disponivel / b.quantidadeTotal)
    .slice(0, limit);
}

export function getDamagedItems(items) {
  return items
    .filter((item) => (item.danificado ?? 0) > 0)
    .sort((a, b) => b.danificado - a.danificado);
}
