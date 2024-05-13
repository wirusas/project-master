package lt.httpstatusok.projectmanager.controllers.backend.controllers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import lt.httpstatusok.projectmanager.controllers.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<?> createTask(@PathVariable String projectId, @RequestBody TaskCreateRequest taskCreateRequest) {

            Task task = taskService.createTask(projectId, taskCreateRequest);
            return new ResponseEntity<>(task, HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable String projectId) {

            List<Task> tasks = taskService.getTasksByProjectId(projectId);

            return new ResponseEntity<>(tasks, HttpStatus.OK);

    }
}
