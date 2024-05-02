package lt.httpstatusok.projectmanager.controllers.backend.services;

import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.ProjectNotFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.NoProjectsFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.ProjectRepository;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project validateAndGetProject(String id) {
        return projectRepository.findById(id).orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    @Transactional
    public Project editProject(UUID id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id.toString())
                .orElseThrow(() -> new ProjectNotFoundException("Project not found with ID: " + id));

        existingProject.setProjectName(updatedProject.getProjectName());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setProjectState(updatedProject.getProjectState());

        return projectRepository.save(existingProject);
    }

    @Override
    @Transactional
    public void deleteProject(Project project) {
        List<User> users = project.getUsers();

        for (User user : users) {
            user.getFollowedProjects().remove(project);
            userRepository.save(user);
        }

        projectRepository.delete(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getProjectsByUser(User user) {
        List<Project> projects = user.getFollowedProjects();
        if (projects.isEmpty()) {
            throw new NoProjectsFoundException("No projects found for user: " + user.getUsername());
        }
        return projects;
    }
}
