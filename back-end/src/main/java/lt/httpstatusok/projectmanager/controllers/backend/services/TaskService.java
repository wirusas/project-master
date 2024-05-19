package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskCreateRequest;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;

import java.io.Writer;
import java.util.List;

public interface TaskService {
    Task createTask(String projectId, TaskCreateRequest taskCreateRequest);

    List<Task> getTasksByProjectId(String projectId);

    void deleteTask(Task task);

    Task validateAndGetTask(Long id);

    List<Task> findTasksByName(String name);

    List<Task> findTasksByStatus(TaskStatus status);

    void writeTasksToCsv(List<Task> projects, Writer writer) throws java.io.IOException;

    List<Task> getAllTasks();
}
