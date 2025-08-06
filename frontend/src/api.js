import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const fetchProjects = () => API.get('/projects');
export const fetchTasks    = projectId => API.get(`/tasks/project/${projectId}`);
export const createProject = body => API.post('/projects', body);
export const createTask    = body => API.post('/tasks', body);
export const updateTask    = (id, body) => API.put(`/tasks/${id}`, body);

export const deleteTask = id => API.delete(`/tasks/${id}`);
export const editTask   = (id, body) => API.patch(`/tasks/${id}`, body);
