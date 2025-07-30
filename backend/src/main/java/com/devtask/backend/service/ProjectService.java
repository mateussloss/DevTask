package com.devtask.backend.service;

import com.devtask.backend.dto.CreateProjectRequest;
import com.devtask.backend.dto.ProjectDTO;
import com.devtask.backend.model.Project;
import com.devtask.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<ProjectDTO> getAllProjects() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProjectDTO> getProjectById(Long id) {
        return repository.findById(id)
                .map(this::toDTO);
    }

    public ProjectDTO createProject(CreateProjectRequest request) {
        Project project = new Project();
        project.setName(request.getNome());
        project.setDescription(request.getDescricao());
        return toDTO(repository.save(project));
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }

    private ProjectDTO toDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setNome(project.getName());
        dto.setDescricao(project.getDescription());
        return dto;
    }
}
