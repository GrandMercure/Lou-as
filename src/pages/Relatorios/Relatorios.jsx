import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MainLayout from '../../components/layout/MainLayout';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader } from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { useInventoryContext } from '../../contexts/InventoryContext';
import { formatNumber } from '../../utils/helpers';
import {
  calculateSummary,
  getDamagedItems,
  getLowStockItems,
  getTopStockItems,
  groupByCategory,
} from '../../utils/inventoryCalculations';
import { AlertTriangle, BarChart3, Package } from 'lucide-react';

/**
 * Página de relatórios com dados mockados.
 * TODO: Relatórios avançados com Firebase
 * TODO: Exportação PDF / Excel
 * TODO: Dashboard em tempo real
 */
export default function Relatorios() {
  const { items } = useInventoryContext();
  const summary = calculateSummary(items);
  const topStock = getTopStockItems(items);
  const lowStock = getLowStockItems(items);
  const damaged = getDamagedItems(items);
  const categoryData = Object.values(groupByCategory(items));

  return (
    <MainLayout title="Relatórios" subtitle="Análise e indicadores do estoque">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total de Itens" value={formatNumber(summary.totalItens)} icon={Package} />
        <StatCard title="Total Disponível" value={formatNumber(summary.disponivel)} icon={BarChart3} variant="gold" />
        <StatCard title="Total Danificado" value={formatNumber(summary.danificado)} icon={AlertTriangle} variant="navy" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Maior Estoque" subtitle="Itens com maior quantidade total" />
          <div className="space-y-3">
            {topStock.map((item, i) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg bg-mercure-surface p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mercure-navy text-xs font-bold text-mercure-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-mercure-dark">{item.nome}</p>
                    <p className="text-xs text-mercure-muted">{item.categoria}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-mercure-navy">{formatNumber(item.quantidadeTotal)} un.</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Menor Estoque" subtitle="Itens com disponibilidade crítica" />
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg bg-mercure-surface p-3">
                <div>
                  <p className="text-sm font-medium text-mercure-dark">{item.nome}</p>
                  <p className="text-xs text-mercure-muted">{item.categoria}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-red-600">{formatNumber(item.disponivel)} disp.</p>
                  <Badge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Itens Danificados" subtitle="Necessitam reposição ou descarte" />
          <div className="space-y-2">
            {damaged.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b border-mercure-border/50 py-2.5 last:border-0">
                <span className="text-sm text-mercure-dark">{item.nome}</span>
                <span className="text-sm font-medium text-red-600">{formatNumber(item.danificado)} un.</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Danos por Categoria" subtitle="Quantidade danificada por tipo" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="categoria" type="category" tick={{ fontSize: 10 }} width={90} />
                <Tooltip />
                <Bar dataKey="danificado" fill="#ef4444" radius={[0, 4, 4, 0]} name="Danificado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
