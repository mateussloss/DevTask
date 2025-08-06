import { useState } from 'react';

export default function EditTaskModal({ task, onClose, onSaved }) {
  const [form, setForm] = useState({
    titulo: task.titulo,
    descricao: task.descricao,
    status: task.status,
    prioridade: task.prioridade,
    dataVencimento: task.dataVencimento || ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await onSaved(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded w-80">
        <h2 className="text-xl mb-2">Editar Tarefa</h2>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="w-full mb-2 p-1 border"
          placeholder="Título"
        />
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full mb-2 p-1 border"
          placeholder="Descrição"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full mb-2 p-1 border"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <select
          name="prioridade"
          value={form.prioridade}
          onChange={handleChange}
          className="w-full mb-2 p-1 border"
        >
          <option>Alta</option>
          <option>Média</option>
          <option>Baixa</option>
        </select>
        <input
          type="date"
          name="dataVencimento"
          value={form.dataVencimento}
          onChange={handleChange}
          className="w-full mb-2 p-1 border"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
