// src/App.js
import { Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectList />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
