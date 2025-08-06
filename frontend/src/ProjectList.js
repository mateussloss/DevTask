import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from './api';
import ProjectForm from './ProjectForm';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState(null);

  useEffect(() => {
    fetchProjects()
      .then(res => setProjects(res.data))
      .catch(() => setError('Erro ao carregar projetos'))
      .finally(() => setLoading(false));
  }, []);

  const handleNewProject = project => {
    setProjects(prev => [project, ...prev]);
  };

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error)   return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Projetos</h1>
      <ProjectForm onCreated={handleNewProject} />

      {projects.length === 0 ? (
        <p>Nenhum projeto cadastrado.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {projects.map(p => (
            <li key={p.id}>
              <Link to={`/projects/${p.id}`} className="text-blue-600 hover:underline">
                {p.nome}
              </Link>: {p.descricao}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
