package lt.httpstatusok.projectmanager.controllers.backend.controllers;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditTaskRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskDto;
import lt.httpstatusok.projectmanager.controllers.backend.mappers.TaskMapper;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.security.CustomUserDetails;
import lt.httpstatusok.projectmanager.controllers.backend.services.TaskService;
import lt.httpstatusok.projectmanager.controllers.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static lt.httpstatusok.projectmanager.controllers.backend.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    private final TaskService taskService;
    private final UserService userService;
    private final TaskMapper taskMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public ResponseEntity<?> createTask(@AuthenticationPrincipal CustomUserDetails currentUser,
                                        @PathVariable String projectId,
                                        @RequestBody TaskCreateRequest taskCreateRequest) {

        Task task = taskService.createTask(projectId, taskCreateRequest);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable String projectId) {

        List<Task> tasks = taskService.getTasksByProjectId(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("{id}")
    public TaskDto editTask(@AuthenticationPrincipal CustomUserDetails currentUser,
                            @Valid @RequestBody EditTaskRequest editTaskRequest,
                            @PathVariable("id") Long id){
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Task task = taskMapper.toTask(editTaskRequest);
        return taskMapper.toTaskDto(taskService.editTask(id, task));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public Task deleteTask(@PathVariable Long id) {
        Task task = taskService.validateAndGetTask(id);
        taskService.deleteTask(task);
        return task;
    }
}
