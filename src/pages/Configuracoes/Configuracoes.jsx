import { Building2, Info, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import UnitSelector from '../../components/layout/UnitSelector';
import Button from '../../components/ui/Button';
import Card, { CardHeader } from '../../components/ui/Card';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUnitContext } from '../../contexts/UnitContext';
import { APP_NAME, APP_VERSION, SYSTEM_SECTOR } from '../../utils/constants';
import logo from '../../assets/logo.png';

export default function Configuracoes() {
  const { session, logout } = useAuthContext();
  const { selectedUnit } = useUnitContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const infoItems = [
    { icon: Building2, label: 'Nome do Hotel', value: APP_NAME },
    { icon: User, label: 'Usuário Logado', value: session?.usuario || '—' },
    { icon: Info, label: 'Setor Responsável', value: SYSTEM_SECTOR },
    { icon: Info, label: 'Unidade Selecionada', value: selectedUnit.nome },
    { icon: Info, label: 'Versão do Sistema', value: `v${APP_VERSION}` },
  ];

  return (
    <MainLayout title="Configurações" subtitle="Preferências e informações do sistema">
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="text-center">
          <img
            src={logo}
            alt={APP_NAME}
            className="mx-auto h-28 w-auto max-w-[200px] object-contain"
          />
          <h2 className="mt-4 text-xl font-semibold text-mercure-dark">{APP_NAME}</h2>
          <p className="mt-1 text-sm text-mercure-muted">Sistema de Controle de Louças e Utensílios</p>
        </Card>

        <Card>
          <CardHeader title="Informações Gerais" />
          <div className="space-y-4">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 rounded-lg bg-mercure-surface p-4">
                <div className="rounded-lg bg-white p-2.5 shadow-sm">
                  <Icon className="h-5 w-5 text-mercure-navy" />
                </div>
                <div>
                  <p className="text-xs text-mercure-muted">{label}</p>
                  <p className="text-sm font-medium text-mercure-dark">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Unidade" subtitle="Seletor multiunidade (demonstração)" />
          <UnitSelector compact />
          <p className="mt-3 text-xs text-mercure-muted">
            {/* TODO: Integração Firestore para inventário por unidade */}
            Futuramente, cada unidade terá estoque independente sincronizado via Firebase.
          </p>
        </Card>

        <Card>
          <CardHeader title="Sessão" />
          <Button variant="danger" icon={LogOut} onClick={handleLogout} className="w-full sm:w-auto">
            Sair do Sistema
          </Button>
        </Card>
      </div>
    </MainLayout>
  );
}
