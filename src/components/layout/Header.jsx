import { Bell, Menu, Search } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUnitContext } from '../../contexts/UnitContext';
import UnitSelector from './UnitSelector';

export default function Header({ onMenuClick, title, subtitle }) {
  const { session } = useAuthContext();
  const { selectedUnit } = useUnitContext();

  return (
    <header className="sticky top-0 z-30 border-b border-mercure-border bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-mercure-muted transition hover:bg-gray-100 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-mercure-dark sm:text-xl">{title}</h1>
            {subtitle && <p className="text-sm text-mercure-muted">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:block">
            <UnitSelector compact />
          </div>

          <button className="hidden rounded-lg p-2 text-mercure-muted transition hover:bg-gray-100 sm:block">
            <Search className="h-5 w-5" />
          </button>

          <button className="relative rounded-lg p-2 text-mercure-muted transition hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-mercure-gold" />
          </button>

          <div className="hidden items-center gap-3 border-l border-mercure-border pl-4 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-mercure-dark">{session?.usuario}</p>
              <p className="text-xs text-mercure-muted">{selectedUnit.nome}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mercure-navy text-sm font-semibold text-mercure-gold">
              {session?.usuario?.charAt(0)?.toUpperCase() || 'G'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
