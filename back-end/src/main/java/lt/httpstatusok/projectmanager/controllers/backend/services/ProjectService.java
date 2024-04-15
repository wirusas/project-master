package lt.httpstatusok.projectmanager.controllers.backend.services;

import lt.httpstatusok.projectmanager.controllers.backend.models.Project;

import java.util.List;

public interface ProjectService {
List<Project> getProjects();

Project validateAndGetProject(String id);

Project saveProject(Project project);

//Project editProject(String projectName, Project updatedProject);

void deleteProject(Project project);


}
