import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import { CATEGORIES } from '../../utils/constants';

const categoryOptions = CATEGORIES.filter((c) => c !== 'Todos').map((c) => ({ value: c, label: c }));

const emptyForm = {
  nome: '',
  categoria: 'Pratos',
  quantidadeTotal: '',
  danificado: '0',
  observacoes: '',
};

export default function ItemFormModal({ isOpen, onClose, onSubmit, item }) {
  const [form, setForm] = useState(emptyForm);
  const isEdit = Boolean(item);

  useEffect(() => {
    if (item) {
      setForm({
        nome: item.nome,
        categoria: item.categoria,
        quantidadeTotal: String(item.quantidadeTotal),
        danificado: String(item.danificado ?? 0),
        observacoes: item.observacoes || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [item, isOpen]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nome: form.nome,
      categoria: form.categoria,
      quantidadeTotal: Number(form.quantidadeTotal),
      danificado: Number(form.danificado),
      observacoes: form.observacoes,
    });
    onClose();
  };

  const disponivel = Number(form.quantidadeTotal || 0) - Number(form.danificado || 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Editar Item' : 'Adicionar Item'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nome" value={form.nome} onChange={handleChange('nome')} required placeholder="Ex: Prato Raso" />
          <Select label="Categoria" options={categoryOptions} value={form.categoria} onChange={handleChange('categoria')} />
          <Input label="Quantidade Total" type="number" min="0" value={form.quantidadeTotal} onChange={handleChange('quantidadeTotal')} required />
          <Input label="Danificado" type="number" min="0" value={form.danificado} onChange={handleChange('danificado')} />
        </div>

        {form.quantidadeTotal !== '' && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Disponível: <strong>{disponivel >= 0 ? disponivel : 0}</strong> unidades (calculado automaticamente)
          </p>
        )}

        <Input label="Observações" value={form.observacoes} onChange={handleChange('observacoes')} placeholder="Notas opcionais..." />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="gold">{isEdit ? 'Salvar Alterações' : 'Adicionar Item'}</Button>
        </div>
      </form>
    </Modal>
  );
}
