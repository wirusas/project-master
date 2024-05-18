package lt.httpstatusok.projectmanager.controllers.backend.controllers;

import lombok.RequiredArgsConstructor;
import lt.httpstatusok.projectmanager.controllers.backend.services.ProjectService;
import lt.httpstatusok.projectmanager.controllers.backend.services.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class PublicController {

    private final UserService userService;
    private final ProjectService projectService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }

    @GetMapping("/numberOfProjects")
    public Integer getNumberOfProjects() {
        return projectService.getProjects().size();
    }
}
