package lt.httpstatusok.projectmanager.controllers.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.dto.CreateProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.EditProjectRequest;
import lt.httpstatusok.projectmanager.controllers.backend.dto.ProjectDto;
import lt.httpstatusok.projectmanager.controllers.backend.mappers.ProjectMapper;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import lt.httpstatusok.projectmanager.controllers.backend.security.CustomUserDetails;
import lt.httpstatusok.projectmanager.controllers.backend.services.ProjectService;
import lt.httpstatusok.projectmanager.controllers.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/create")
    public ProjectDto createProject(@AuthenticationPrincipal CustomUserDetails currentUser,
                                    @Valid @RequestBody CreateProjectRequest createProjectRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Project project = projectMapper.toProject(createProjectRequest);
        project.setId(UUID.randomUUID().toString());
        project.setUser(user);

        return projectMapper.toProjectDto(projectService.saveProject(project));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/edit/{id}")
    public ProjectDto editProject(@AuthenticationPrincipal CustomUserDetails currentUser,
                                  @Valid @RequestBody EditProjectRequest editProjectRequest,
                                  @PathVariable UUID id) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Project project = projectMapper.toProject(editProjectRequest);
        project.setUser(user);
        return projectMapper.toProjectDto(projectService.editProject(id, project));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/delete/{id}")
    public ProjectDto deleteProject(@PathVariable UUID id) {
        Project project = projectService.validateAndGetProject(id.toString());
        projectService.deleteProject(project);
        return projectMapper.toProjectDto(project);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/allprojects")
    List<ProjectDto> getAllProjects() {
        return projectService.getAllProjects().stream()
                .map(projectMapper::toProjectDto)
                .collect(Collectors.toList());
    }


}
