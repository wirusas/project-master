package lt.httpstatusok.projectmanager.controllers.backend.services;

import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.ProjectNotFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.NoProjectsFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.UserExistsInTRheProject;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.UserNotFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.mappers.ProjectMapper;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.ProjectRepository;
import lt.httpstatusok.projectmanager.controllers.backend.repositories.UserRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.io.IOException;
import java.io.Writer;


@RequiredArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

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

    @Override
    public Optional<Project> getProjectById(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return projectRepository.findById(id.toString());
    }

    @Override
    public List<Project> findProjectWithSorting(String field) {
        return projectRepository.findAll(Sort.by(Sort.Direction.ASC, field));
    }

    @Override
    public Page<Project> getAllPagedProjects(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }


    @Override
    @Transactional
    public Project addUserToProject(String userEmail, UUID projectId) {
        Project existingProject = validateAndGetProject(projectId.toString());
        User user = userRepository.findUserByEmail(userEmail);

        if (user == null) {
            throw new UserNotFoundException(String.format("User with email %s not found", userEmail));
        } else if (existingProject.getUsers().contains(user)) {
            throw new UserExistsInTRheProject("User is already a member of the project.");
        }

        existingProject.addUser(user);
        return projectRepository.save(existingProject);
    }


    @Override
    @Transactional
    public Project removeUserFromProject(String userEmail, UUID projectId) {
        Project existingProject = validateAndGetProject(projectId.toString());
        User user = userRepository.findUserByEmail(userEmail);

        if (user == null) {
            throw new UserNotFoundException(String.format("User with email %s not found", userEmail));
        } else if (!existingProject.getUsers().contains(user)) {
            throw new UserNotFoundException(String.format("User with email %s is not a member of the project", userEmail));
        }

        existingProject.removeUser(user);
        return projectRepository.save(existingProject);
    }


    @Override
    public void writeProjectsToCsv(List<Project> projects, Writer writer) throws IOException {
        // Initialize CSVPrinter with writer
        CSVPrinter printer = new CSVPrinter(writer, CSVFormat.DEFAULT);

        // Write headings
        printer.printRecord("CREATED_AT", "DESCRIPTION", "ID", "PROJECT_NAME", "PROJECT_STATE");

        // Write project data
        for (Project project : projects) {
            // Map Project to ProjectDto using ProjectMapper
            ProjectDto projectDto = projectMapper.toProjectDto(project);

            printer.printRecord(
                    projectDto.createdAt(),
                    projectDto.description(),
                    projectDto.id(),
                    projectDto.projectName(),
                    projectDto.projectState()
            );
        }
    }
    @Override
    public Page<Project> findProjectByName(String projectName, Pageable pageable) {
        return projectRepository.findByProjectNameContainingIgnoreCase(projectName, pageable);
    }


    @Override
    public Page<Project> findByProjectState(String projectState, Pageable pageable) {
        return projectRepository.findByProjectState(projectState, pageable);
    }

    public Page<Project> findAllProjects(Pageable pageable) {
        return projectRepository.findAll(pageable);
    }

}
