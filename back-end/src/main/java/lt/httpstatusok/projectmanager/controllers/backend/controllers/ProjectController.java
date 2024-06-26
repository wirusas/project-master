package lt.httpstatusok.projectmanager.controllers.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.NoProjectsFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.exceptions.UserNotFoundException;
import lt.httpstatusok.projectmanager.controllers.backend.mappers.ProjectMapper;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.security.CustomUserDetails;
import lt.httpstatusok.projectmanager.controllers.backend.services.ProjectService;
import lt.httpstatusok.projectmanager.controllers.backend.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lt.httpstatusok.projectmanager.controllers.backend.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final UserService userService;
    private final ProjectService projectService;
    private final ProjectMapper projectMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ProjectDto createProject(@AuthenticationPrincipal CustomUserDetails currentUser,
                                    @Valid @RequestBody CreateProjectRequest createProjectRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Project project = projectMapper.toProject(createProjectRequest);
        project.setId(UUID.randomUUID().toString());
        project.addUser(user);

        return projectMapper.toProjectDto(projectService.saveProject(project));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public ProjectDto editProject(@AuthenticationPrincipal CustomUserDetails currentUser,
                                  @Valid @RequestBody EditProjectRequest editProjectRequest,
                                  @PathVariable UUID id) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Project project = projectMapper.toProject(editProjectRequest);
        return projectMapper.toProjectDto(projectService.editProject(id, project));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public ProjectDto deleteProject(@PathVariable UUID id) {
        Project project = projectService.validateAndGetProject(id.toString());
        projectService.deleteProject(project);
        return projectMapper.toProjectDto(project);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/allprojects")
    public List<ProjectDto> getAllPagedProjects(@RequestParam(defaultValue = "0") int page) {
        Page<Project> projectPage = projectService.getAllPagedProjects(PageRequest.of(page, 9));
        return projectPage.getContent().stream()
                .map(projectMapper::toProjectDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/findproject")
    List<ProjectDto> getAllProjects() {
        return projectService.getAllProjects().stream()
                .map(projectMapper::toProjectDto)
                .collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myprojects")
    List<ProjectDto> getMyProjects(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        try {
            return projectService.getProjectsByUser(user).stream()
                    .map(projectMapper::toProjectDto)
                    .collect(Collectors.toList());
        } catch (NoProjectsFoundException e) {
            return Collections.emptyList();
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{id}")
    public ProjectDto getProjectById(@PathVariable UUID id) {
        Project project = projectService.validateAndGetProject(id.toString());
        return projectMapper.toProjectDto(project);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/sorting/{field}")
    public List<ProjectDto> getProjectWithSorting(@PathVariable String field) {
        return projectService.findProjectWithSorting(field).stream()
                .map(projectMapper::toProjectDto)
                .collect(Collectors.toList());
    }


    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{projectId}/{userEmail}")
    public ProjectDto addUserToProject(@PathVariable UUID projectId, @PathVariable String userEmail) {
        User user = userService.findUserByEmail(userEmail);
        Project project = projectService.validateAndGetProject(projectId.toString());
        projectService.addUserToProject(user.getEmail(), projectId);
        return projectMapper.toProjectDto(project);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("{projectId}/removeUser/{userEmail}")
    public ResponseEntity<?> removeUserFromProject(@PathVariable UUID projectId, @PathVariable String userEmail) {
        try {
            Project updatedProject = projectService.removeUserFromProject(userEmail, projectId);
            return ResponseEntity.ok(updatedProject);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove user from project");
        }
    }

    @GetMapping("/csv")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public void exportCSV(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.addHeader("Content-Disposition", "attachment; filename=\"projects.csv\"");
        projectService.writeProjectsToCsv(projectService.getAllProjects(), response.getWriter());
    }
    @GetMapping("/search")
    public ResponseEntity<Page<ProjectDto>> findProjectByName(@RequestParam(required = false) String projectName,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "9") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Project> projectPage;

            if (projectName != null && !projectName.isEmpty()) {
                projectPage = projectService.findProjectByName(projectName, pageable);
            } else {
                projectPage = projectService.getAllPagedProjects(pageable);
            }

            if (projectPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(projectPage.map(projectMapper::toProjectDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/filter")
    public ResponseEntity<Page<Project>> filterProjects(
            @RequestParam("projectState") String projectState,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Project> projectPage;

            if ("All".equalsIgnoreCase(projectState)) {
                projectPage = projectService.findAllProjects(pageable);
            } else {
                projectPage = projectService.findByProjectState(projectState, pageable);
            }

            if (projectPage.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(projectPage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
