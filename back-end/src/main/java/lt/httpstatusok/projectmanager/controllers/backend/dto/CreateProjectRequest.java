package lt.httpstatusok.projectmanager.controllers.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProjectRequest {
@Schema(example = "create project")
    @NotBlank
    private String description;

}
