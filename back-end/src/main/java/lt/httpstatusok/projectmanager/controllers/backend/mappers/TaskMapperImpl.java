package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateTaskRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditTaskRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.TaskDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskPriority;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskMapperImpl implements TaskMapper{
    @Override
    public Task toTask(CreateTaskRequest createTaskRequest) {
        if(createTaskRequest == null){
            return null;
        }
        return new Task(createTaskRequest.getName(), createTaskRequest.getDescription(), createTaskRequest.getStatus(), createTaskRequest.getTaskPriority(), createTaskRequest.getUser());
    }

    @Override
    public Task toTask(EditTaskRequest editTaskRequest) {
        if(editTaskRequest == null){
            return null;
        }
        return new Task(editTaskRequest.getName(), editTaskRequest.getDescription(), editTaskRequest.getStatus(),editTaskRequest.getTaskPriority(), editTaskRequest.getUser());
    }

    @Override
    public TaskDto toTaskDto(Task task) {
        if(task == null){
            return null;
        }
        Long id = task.getId() != null ? task.getId() : Long.valueOf(""); // pasiaiskinti su destytoju
        String name = task.getName() != null ? task.getName() : "";
        String description = task.getDescription() != null ? task.getDescription() : "";
        TaskStatus taskStatus = task.getStatus() != null ? task.getStatus() : TaskStatus.valueOf(""); //tas pats
        TaskPriority taskPriority =task.getPriority() != null ? task.getPriority() : TaskPriority.valueOf("");

        LocalDateTime taskCreatedAt = task.getDateCreated() != null ? task.getDateCreated() : LocalDateTime.now();



        return new TaskDto(id, name, description, taskStatus, taskPriority,  taskCreatedAt);
    }
}
