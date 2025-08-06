import { useState } from 'react';
import { createTask } from './api';

export default function TaskForm({ projetoId, onCreated }) {
  const [titulo, setTitulo]         = useState('');
  const [descricao, setDescricao]   = useState('');
  const [status, setStatus]         = useState('TODO');
  const [prioridade, setPrioridade] = useState('Média');
  const [dataVencimento, setDataVencimento] = useState('');
  const [error, setError]           = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      setError('Título e descrição são obrigatórios.');
      return;
    }
    try {
      const body = {
        titulo,
        descricao,
        status,
        prioridade,
        dataCriacao: new Date().toISOString().slice(0, 10),
        dataVencimento: dataVencimento || null,
        projetoId: projetoId
      };
      const res = await createTask(body);
      onCreated(res.data);
      setTitulo('');
      setDescricao('');
      setDataVencimento('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Não foi possível criar tarefa.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 bg-white rounded shadow">
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="w-full mb-2 p-1 border rounded"
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        className="w-full mb-2 p-1 border rounded"
      />

      <div className="flex space-x-2 mb-2">
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="flex-1 p-1 border rounded"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <select
          value={prioridade}
          onChange={e => setPrioridade(e.target.value)}
          className="flex-1 p-1 border rounded"
        >
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>
      </div>

      <input
        type="date"
        value={dataVencimento}
        onChange={e => setDataVencimento(e.target.value)}
        className="w-full mb-2 p-1 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        + Nova Tarefa
      </button>
    </form>
  );
}
