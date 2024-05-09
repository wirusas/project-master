package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project toProject(CreateProjectRequest createProjectRequest) {
        if (createProjectRequest == null) {
            return null;
        }
        return new Project(  createProjectRequest.getProjectName(), createProjectRequest.getDescription(), createProjectRequest.getProjectStatus());
    }

    @Override
    public Project toProject(EditProjectRequest editProjectRequest) {
        if (editProjectRequest == null) {
            return null;
        }
        return new Project( editProjectRequest.getProjectName(), editProjectRequest.getDescription(), editProjectRequest.getProjectStatus());
    }

    @Override
    public ProjectDto toProjectDto(Project project) {
        if (project == null) {
            return null;
        }


        String id = project.getId() != null ? project.getId() : "";
        String projectName = project.getProjectName() != null ? project.getProjectName() : "";
        String description = project.getDescription() != null ? project.getDescription() : "";
        String projectState = project.getProjectState() != null ? project.getProjectState() : "";
        // Assuming createdAt is not nullable
        ZonedDateTime createdAt = project.getCreatedAt() != null ? project.getCreatedAt() : ZonedDateTime.now();


        List<ProjectDto.UserDto> userDtos = project.getUsers().stream()
                .map(user -> new ProjectDto.UserDto(user.getUsername()))
                .collect(Collectors.toList());

        return new ProjectDto(id, projectName, description, projectState, userDtos, createdAt);
    }
}
