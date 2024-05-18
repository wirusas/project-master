package lt.httpstatusok.projectmanager.controllers.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProjectRequest {

    @Schema(example = "Project name")
    @NotBlank

    private String projectName;
    @Schema(example = "Project description")
    @NotBlank
    private String description;
    @Schema(example = "Project status")
    @NotBlank
    private String projectStatus;


}
