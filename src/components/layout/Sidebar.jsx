import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Package,
  X,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { APP_NAME } from '../../utils/constants';
import { cn } from '../../utils/helpers';
import logo from '../../assets/logo.png';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/estoque', label: 'Estoque', icon: Package },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-mercure-dark/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-mercure-navy transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="relative border-b border-white/10 px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={logo}
              alt={APP_NAME}
              className="h-28 w-auto max-w-[220px] object-contain"
            />
            <p className="mt-3 text-sm font-semibold leading-tight text-mercure-gold">Grand Mercure</p>
            <p className="text-xs leading-tight text-white/60">Curitiba Rayon</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-5 rounded-lg p-1.5 text-white/60 hover:bg-white/10 lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-white/10 text-white shadow-sm ring-1 ring-mercure-gold/30'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Sair
          </button>
          <p className="mt-3 px-3 text-[10px] text-white/30">Louças & Utensílios v1.0</p>
        </div>
      </aside>
    </>
  );
}
