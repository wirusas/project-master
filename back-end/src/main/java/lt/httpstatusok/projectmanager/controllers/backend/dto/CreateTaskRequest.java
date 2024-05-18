package lt.httpstatusok.projectmanager.controllers.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskPriority;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;

@Data
public class CreateTaskRequest {

    @Schema(example = "Task name")
    @NotBlank
    private String name;

    @Schema(example = "Task description")
    @NotBlank
    private String description;

    @Schema(example = "Task status")
    @NotBlank
    private TaskStatus status;

    @Schema(example = "Task priority")
    @NotBlank
    private TaskPriority taskPriority;

    @Schema(example = "Task user")
    private User user;


}
