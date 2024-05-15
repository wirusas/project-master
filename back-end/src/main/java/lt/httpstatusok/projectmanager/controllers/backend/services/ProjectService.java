package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.exceptions.NoProjectsFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectService {
    List<Project> getProjects();

    Project validateAndGetProject(String id);

    Project saveProject(Project project);

    Project editProject(UUID id, Project project);

    void deleteProject(Project project);

    List<Project> getAllProjects();



    List<Project> getProjectsByUser(User user) throws NoProjectsFoundException;

    Optional<Project> getProjectById(UUID id);

    List<Project> findProjectWithSorting(String field);

    Page<Project> getAllPagedProjects(Pageable pageable);

    Project addUserToProject(String email, UUID id);
    Project removeUserFromProject(String email, UUID id);
}
