import { Pencil, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function InventoryActions({ onAdd, onEdit, hasSelection }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      <Button variant="gold" size="sm" icon={Plus} onClick={onAdd} className="w-full sm:w-auto">
        Adicionar Item
      </Button>
      <Button variant="secondary" size="sm" icon={Pencil} onClick={onEdit} disabled={!hasSelection} className="w-full sm:w-auto">
        Editar Item
      </Button>
    </div>
  );
}
