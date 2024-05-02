package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.exceptions.NoProjectsFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;

import java.util.List;
import java.util.UUID;

public interface ProjectService {
    List<Project> getProjects();

    Project validateAndGetProject(String id);

    Project saveProject(Project project);

    Project editProject(UUID id, Project project);

    void deleteProject(Project project);

    List<Project> getAllProjects();

}
