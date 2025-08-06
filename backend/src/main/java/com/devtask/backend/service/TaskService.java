package com.devtask.backend.service;

import com.devtask.backend.dto.CreateTaskRequest;
import com.devtask.backend.dto.TaskDTO;
import com.devtask.backend.model.Project;
import com.devtask.backend.model.Task;
import com.devtask.backend.repository.ProjectRepository;
import com.devtask.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;
import com.devtask.backend.dto.UpdateTaskRequest;
import com.devtask.backend.dto.EditTaskRequest;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<TaskDTO> getTaskById(Long id) {
        return taskRepository.findById(id).map(this::toDTO);
    }

    public TaskDTO createTask(CreateTaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitulo());
        task.setDescription(request.getDescricao());
        task.setStatus(request.getStatus());
        task.setPrioridade(request.getPrioridade());
        task.setDataCriacao(request.getDataCriacao());
        task.setDataVencimento(request.getDataVencimento());

        Project project = projectRepository.findById(request.getProjetoId())
                .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));

        task.setProject(project);
        return toDTO(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Optional<TaskDTO> updateTask(Long id, UpdateTaskRequest req) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(req.getTitulo());
                task.setDescription(req.getDescricao());
                task.setStatus(req.getStatus());
                task.setPrioridade(req.getPrioridade());
                task.setDataVencimento(req.getDataVencimento());
                Task updated = taskRepository.save(task);
                return toDTO(updated);
            });
    }
    public Optional<TaskDTO> editTask(Long id, EditTaskRequest req) {
    return taskRepository.findById(id)
      .map(task -> {
        task.setTitle(req.getTitulo());
        task.setDescription(req.getDescricao());
        task.setStatus(req.getStatus());
        task.setPrioridade(req.getPrioridade());
        task.setDataVencimento(req.getDataVencimento());
        Task updated = taskRepository.save(task);
        return toDTO(updated);
      });
    }

    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.id = task.getId();
        dto.titulo = task.getTitle();
        dto.descricao = task.getDescription();
        dto.status = task.getStatus();
        dto.prioridade = task.getPrioridade();
        dto.dataCriacao = task.getDataCriacao();
        dto.dataVencimento = task.getDataVencimento();
        dto.projetoId = task.getProject().getId();
        dto.projetoNome = task.getProject().getName();
        return dto;
    }
}
