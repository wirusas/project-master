package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import org.springframework.stereotype.Service;

@Service
public class ProjectMapperImpl implements  ProjectMapper{

    @Override
    public Project toProject(CreateProjectRequest createProjectRequest) {
        if (createProjectRequest == null) {
            return null;
        }
        return new Project(createProjectRequest.getDescription());
    }

    @Override
    public ProjectDto toProjectDto(Project project) {
        return null;
    }
}
