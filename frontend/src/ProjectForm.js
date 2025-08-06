import { useState } from 'react';
import { createProject } from './api';

export default function ProjectForm({ onCreated }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!nome.trim() || !descricao.trim()) {
      setError('Preencha nome e descrição.');
      return;
    }
    try {
      const res = await createProject({ nome, descricao });
      setNome('');
      setDescricao('');
      setError('');
      onCreated(res.data);
    } catch (err) {
      console.error(err);
      setError('Falha ao criar projeto.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <div className="mb-2">
        <label className="block mb-1">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Projeto
      </button>
    </form>
  );
}
