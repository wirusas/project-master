package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project toProject(CreateProjectRequest createProjectRequest) {
        if (createProjectRequest == null) {
            return null;
        }
        return new Project(createProjectRequest.getDescription(), createProjectRequest.getDescription(), createProjectRequest.getProjectStatus());
    }

    @Override
    public Project toProject(EditProjectRequest editProjectRequest) {
        if (editProjectRequest == null) {
            return null;
        }
        return new Project(editProjectRequest.getDescription(), editProjectRequest.getDescription(), editProjectRequest.getProjectStatus());
    }

    @Override
    public ProjectDto toProjectDto(Project project) {
        if (project == null) {
            return null;
        }

        // Handle null values gracefully
        String id = project.getId() != null ? project.getId() : "";
        String description = project.getDescription() != null ? project.getDescription() : "";
        String projectName = project.getProjectName() != null ? project.getProjectName() : "";
        String projectState = project.getProjectState() != null ? project.getProjectState() : "";
        // Assuming UserDto is also nullable
        ProjectDto.UserDto userDto = project.getUser() != null ? new ProjectDto.UserDto(project.getUser().getUsername()) : null;
        // Assuming createdAt is not nullable
        ZonedDateTime createdAt = project.getCreatedAt() != null ? project.getCreatedAt() : ZonedDateTime.now();

        return new ProjectDto(id, description, projectName, projectState, userDto, createdAt);
    }
}
