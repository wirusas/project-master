package lt.httpstatusok.projectmanager.controllers.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditProjectRequest {
    @Schema(example = "new Project description")
    @NotBlank
    private String description;
    @Schema(example = "new Project name")
    @NotBlank
    private String projectName;
    @Schema(example = "new Project status")
    @NotBlank
    private String projectStatus;


}
