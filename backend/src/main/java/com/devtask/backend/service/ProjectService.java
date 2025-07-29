package com.devtask.backend.service;

import com.devtask.backend.model.Project;
import com.devtask.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return repository.findById(id);
    }

    public Project createProject(Project project) {
        return repository.save(project);
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }
}
