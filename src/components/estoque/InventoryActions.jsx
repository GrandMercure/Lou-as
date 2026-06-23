import { AlertTriangle, FileText, Pencil, Plus } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Barra de operações simuladas.
 * TODO: Exportação PDF / Excel
 * TODO: Relatórios avançados via Firebase Functions
 */
export default function InventoryActions({
  onAdd,
  onEdit,
  onDamage,
  onReport,
  hasSelection,
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="gold" size="sm" icon={Plus} onClick={onAdd}>
        Adicionar Item
      </Button>
      <Button variant="secondary" size="sm" icon={Pencil} onClick={onEdit} disabled={!hasSelection}>
        Editar Item
      </Button>
      <Button variant="danger" size="sm" icon={AlertTriangle} onClick={onDamage} disabled={!hasSelection}>
        Marcar Danificado
      </Button>
      <Button variant="ghost" size="sm" icon={FileText} onClick={onReport}>
        Gerar Relatório
      </Button>
    </div>
  );
}
