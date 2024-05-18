package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;

public interface ProjectMapper {
    Project toProject(CreateProjectRequest createProjectRequest);
    Project toProject(EditProjectRequest editProjectRequest);

    ProjectDto toProjectDto(Project project);
}
