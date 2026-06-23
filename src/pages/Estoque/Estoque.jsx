import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../../components/estoque/CategoryFilter';
import InventoryActions from '../../components/estoque/InventoryActions';
import InventoryTable from '../../components/estoque/InventoryTable';
import ItemDetailModal from '../../components/estoque/ItemDetailModal';
import ItemFormModal from '../../components/estoque/ItemFormModal';
import MainLayout from '../../components/layout/MainLayout';
import Card, { CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { useInventoryContext } from '../../contexts/InventoryContext';
import { useToastContext } from '../../contexts/ToastContext';
import { enrichItem } from '../../utils/inventoryCalculations';
import { Search } from 'lucide-react';

export default function Estoque() {
  const { items, addItem, updateItem, markDamaged } = useInventoryContext();
  const { addToast } = useToastContext();
  const navigate = useNavigate();

  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchCat = category === 'Todos' || item.categoria === category;
      const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, category, search]);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleAdd = (data) => {
    addItem(data);
    addToast('Item adicionado com sucesso!', 'success');
  };

  const handleEdit = (data) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      addToast('Item atualizado com sucesso!', 'success');
    }
  };

  const openEdit = (item) => {
    setEditingItem(item || selectedItem);
    setFormOpen(true);
  };

  const handleOperation = (action, successMsg, failMsg) => {
    if (!selectedItem) {
      addToast('Selecione um item na tabela primeiro.', 'error');
      return;
    }
    const result = action(selectedItem.id, 1);
    if (result) {
      addToast(successMsg, 'success');
      setSelectedItem(enrichItem(result));
    } else {
      addToast(failMsg, 'error');
    }
  };

  return (
    <MainLayout title="Gestão de Estoque" subtitle="Controle de louças e utensílios">
      <Card className="mb-4">
        <CardHeader title="Operações" subtitle="Gerencie movimentações do estoque" />
        <InventoryActions
          hasSelection={Boolean(selectedItem)}
          onAdd={() => { setEditingItem(null); setFormOpen(true); }}
          onEdit={() => openEdit(selectedItem)}
          onDamage={() => handleOperation(markDamaged, 'Item marcado como danificado.', 'Quantidade indisponível para marcar como danificado.')}
          onReport={() => {
            addToast('Relatório gerado! (simulação)', 'info');
            // TODO: Exportação PDF / Excel
            navigate('/relatorios');
          }}
        />
      </Card>

      <Card>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter selected={category} onChange={setCategory} />
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mercure-muted" />
            <Input
              placeholder="Buscar item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <InventoryTable
          items={filtered}
          onRowClick={(item) => {
            setSelectedItem(item);
            handleRowClick(item);
          }}
        />
      </Card>

      <ItemDetailModal
        item={selectedItem}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={openEdit}
      />

      <ItemFormModal
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingItem(null); }}
        onSubmit={editingItem ? handleEdit : handleAdd}
        item={editingItem}
      />
    </MainLayout>
  );
}
