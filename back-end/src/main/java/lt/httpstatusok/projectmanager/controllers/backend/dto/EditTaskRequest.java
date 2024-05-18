package lt.httpstatusok.projectmanager.controllers.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskPriority;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;

import java.security.PrivateKey;

@Data
public class EditTaskRequest {
    @Schema(example = "new Task name")
    @NotBlank
    private String name;

    @Schema(example = "new Task description")
    @NotBlank
    private String description;
    @Schema(example = "new Task status")
    @NotBlank
    private TaskStatus status;

    @Schema(example = "new Task priority")
    @NotBlank
    private TaskPriority taskPriority;

    @Schema(example = "new Task user")
    private User user;

}
