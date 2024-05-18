package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateTaskRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditTaskRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;

public interface TaskMapper {

    Task toTask(CreateTaskRequest createTaskRequest);
    Task toTask(EditTaskRequest editTaskRequest);
    TaskDto toTaskDto(Task task);
}
