import { BarChart3, Clock } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';

/**
 * Página de relatórios — em desenvolvimento.
 * TODO: Relatórios avançados com Firebase
 * TODO: Exportação PDF / Excel
 */
export default function Relatorios() {
  return (
    <MainLayout title="Relatórios" subtitle="Análise e indicadores do estoque">
      <Card className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-mercure-navy/5">
          <BarChart3 className="h-10 w-10 text-mercure-navy" />
        </div>
        <h2 className="text-2xl font-semibold text-mercure-dark">Em breve</h2>
        <p className="mt-2 max-w-md text-sm text-mercure-muted">
          Os relatórios detalhados de estoque estarão disponíveis em uma próxima versão do sistema.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-mercure-gold/10 px-4 py-2 text-sm font-medium text-mercure-navy">
          <Clock className="h-4 w-4" />
          Funcionalidade em desenvolvimento
        </div>
      </Card>
    </MainLayout>
  );
}
