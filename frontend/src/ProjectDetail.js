import { useEffect, useState } from 'react';
import { deleteTask, editTask, fetchTasks, fetchProjects, updateTask } from './api';
import { useParams, Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import EditTaskModal from './EditTaskModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async taskId => {
    if (!window.confirm('Tem certeza que quer excluir esta tarefa?')) return;
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch {
      alert('Falha ao excluir.');
    }
  };

  const handleSaveEdit = async updatedFields => {
    try {
      const res = await editTask(editingTask.id, updatedFields);
      setTasks(prev =>
        prev.map(t => t.id === res.data.id ? res.data : t)
      );
      setEditingTask(null);
    } catch {
      alert('Falha ao salvar edição.');
    }
  };

  useEffect(() => {
    fetchProjects().then(res => {
      setProject(res.data.find(p => p.id === +id));
    });
    fetchTasks(id)
      .then(res => setTasks(res.data))
      .catch(() => setError('Erro ao carregar tarefas'))
      .finally(() => setLoading(false));
  }, [id]);

  

  const grouped = { TODO: [], IN_PROGRESS: [], DONE: [] };
  tasks.forEach(t => grouped[t.status]?.push(t));

  const onDragEnd = async result => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    try {
      const res = await updateTask(draggableId, { status: destination.droppableId });
      setTasks(prev =>
        prev.map(t => t.id.toString() === draggableId ? res.data : t)
      );
    } catch {
      alert('Falha ao mover a tarefa.');
    }
  };

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error)   return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      {/* Modal de edição */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSaved={handleSaveEdit}
        />
      )}

      <Link to="/" className="text-blue-600 hover:underline">&larr; Voltar</Link>
      <h1 className="text-2xl font-bold my-4">{project?.nome}</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(grouped).map(([status, items]) => (
            <Droppable droppableId={status} key={status}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border rounded p-2 bg-gray-50 min-h-[200px]"
                >
                  <h2 className="font-semibold mb-2">{status.replace('_',' ')}</h2>
                  {status === 'TODO' &&
                    <TaskForm projetoId={+id} onCreated={t=>setTasks(prev=>[t,...prev])}/>
                  }

                  {items.map((t, index) => (
                    <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
                      {prov => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          className="relative mb-2 p-2 bg-white rounded shadow-sm"
                        >
                          {/* Botões */}
                          <div className="absolute top-1 right-1 flex space-x-1 text-sm">
                            <button onClick={()=>setEditingTask(t)} title="Editar" className="hover:text-blue-600">✏️</button>
                            <button onClick={()=>handleDelete(t.id)} title="Excluir" className="hover:text-red-600">🗑️</button>
                          </div>

                          <strong>{t.titulo}</strong>
                          <p className="text-sm">{t.descricao}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
