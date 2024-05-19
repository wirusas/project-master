package lt.httpstatusok.projectmanager.controllers.backend.controllers;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletResponse;
import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;
import lt.httpstatusok.projectmanager.controllers.backend.security.CustomUserDetails;
import lt.httpstatusok.projectmanager.controllers.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import static lt.httpstatusok.projectmanager.controllers.backend.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;


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
    @DeleteMapping("/{id}")
    public Task deleteTask(@PathVariable Long id) {
        Task task = taskService.validateAndGetTask(id);
        taskService.deleteTask(task);
        return task;
    }


    @GetMapping("/csv")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public void exportCSV(HttpServletResponse response) throws IOException, java.io.IOException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"tasks.csv\"");
        taskService.writeTasksToCsv(taskService.getAllTasks(), response.getWriter());

    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasksByName(@PathVariable String projectId,
                                                        @RequestParam("name") String name) {
        List<Task> tasks = taskService.findTasksByName(name);
        if (tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Task>> filterTasksByStatus(@PathVariable String projectId,
                                                          @RequestParam("status") TaskStatus status) {
        List<Task> tasks = taskService.findTasksByStatus(status);
        if (tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }

    }
}
