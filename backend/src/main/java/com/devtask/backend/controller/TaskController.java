package com.devtask.backend.controller;

import com.devtask.backend.dto.CreateTaskRequest;
import com.devtask.backend.dto.TaskDTO;
import com.devtask.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<TaskDTO> getAll() {
        return service.getAllTasks();
    }

    @GetMapping("/project/{projectId}")
    public List<TaskDTO> getByProject(@PathVariable Long projectId) {
        return service.getTasksByProjectId(projectId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getById(@PathVariable Long id) {
        return service.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TaskDTO create(@RequestBody CreateTaskRequest request) {
        return service.createTask(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteTask(id);
    }
}
