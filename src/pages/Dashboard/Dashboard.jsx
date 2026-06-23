import {
  AlertTriangle,
  CheckCircle2,
  Package,
  TrendingUp,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MainLayout from '../../components/layout/MainLayout';
import MovementRegisterBox from '../../components/estoque/MovementRegisterBox';
import Card, { CardHeader } from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import { useInventoryContext } from '../../contexts/InventoryContext';
import { useUnitContext } from '../../contexts/UnitContext';
import { CHART_COLORS } from '../../utils/constants';
import { formatNumber } from '../../utils/helpers';
import { calculateSummary, groupByCategory } from '../../utils/inventoryCalculations';

export default function Dashboard() {
  const { items } = useInventoryContext();
  const { selectedUnit } = useUnitContext();
  const summary = calculateSummary(items);
  const categoryData = Object.values(groupByCategory(items));

  const pieData = [
    { name: 'Disponível', value: summary.disponivel },
    { name: 'Danificado', value: summary.danificado },
  ];

  return (
    <MainLayout
      title="Dashboard"
      subtitle={`Visão geral do estoque · ${selectedUnit.nome}`}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total de Itens" value={formatNumber(summary.totalItens)} icon={Package} />
        <StatCard title="Disponíveis" value={formatNumber(summary.disponivel)} icon={CheckCircle2} variant="gold" />
        <StatCard title="Danificados" value={formatNumber(summary.danificado)} icon={AlertTriangle} />
        <StatCard title="Baixo Estoque" value={formatNumber(summary.baixoEstoque)} icon={TrendingUp} variant="navy" trend="Itens com alerta" />
      </div>

      <div className="mt-6">
        <MovementRegisterBox />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Estoque por Categoria" subtitle="Quantidade total por tipo de item" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="categoria" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#1b2a4a" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="danificado" fill="#ef4444" radius={[4, 4, 0, 0]} name="Danificado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Distribuição do Estoque" subtitle="Proporção entre disponível e danificado" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatNumber(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Resumo Operacional" subtitle="Situação atual do inventário" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Taxa de Disponibilidade</p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {((summary.disponivel / summary.totalItens) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="rounded-lg bg-mercure-surface p-4">
            <p className="text-sm text-mercure-muted">Tipos de Itens</p>
            <p className="mt-1 text-2xl font-bold text-mercure-dark">{items.length}</p>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-700">Taxa de Danos</p>
            <p className="mt-1 text-2xl font-bold text-red-800">
              {((summary.danificado / summary.totalItens) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
}
