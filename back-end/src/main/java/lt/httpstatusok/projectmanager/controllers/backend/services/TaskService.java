package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    Task createTask(String projectId, TaskCreateRequest taskCreateRequest);

    List<Task> getTasksByProjectId(String projectId);

    void deleteTask(Task task);

    Task validateAndGetTask(Long id);

    Task editTask(Long id, Task task);

}
