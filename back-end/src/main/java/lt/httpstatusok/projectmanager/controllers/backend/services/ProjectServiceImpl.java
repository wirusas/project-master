package lt.httpstatusok.projectmanager.controllers.backend.services;

import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    @Override
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project validateAndGetProject(String id) {
        return projectRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

//    @Override
//    public Project editProject(String projectName, Project updatedProject) {
//
//        if (projectRepository.findByName(projectName) != null) {
//            Project existingProject = (Project) projectRepository.findByName(projectName);
//            existingProject.setProjectName(updatedProject.getProjectName());
//            existingProject.setDescription(updatedProject.getDescription());
//            existingProject.setProjectState(updatedProject.getProjectState());
//            return projectRepository.save(existingProject);
//        }
//
//        return null;
//    }

    @Override
    public void deleteProject(Project project) {
        projectRepository.delete(project);
    }
}
