package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;

import java.util.List;

public interface TaskService {
    Task createTask(String projectId, TaskCreateRequest taskCreateRequest);

    List<Task> getTasksByProjectId(String projectId);

    void deleteTask(Task task);

    Task validateAndGetTask(Long id);

    Task getTaskById(Long id);

    Task updateTask(Long id, Task updatedTask);

}
