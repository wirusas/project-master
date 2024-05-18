package lt.httpstatusok.projectmanager.controllers.backend.dto;

import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskPriority;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public record TaskDto(Long id, String name, String description, TaskStatus status, TaskPriority priority,
                      LocalDateTime createdAt) {public record UserDto (String userName){}
}
