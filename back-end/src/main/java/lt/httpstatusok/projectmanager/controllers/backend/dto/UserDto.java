package lt.httpstatusok.projectmanager.controllers.backend.dto;

import java.time.ZonedDateTime;
import java.util.List;

public record UserDto(Long id, String username, String name, String email, String role, List<ProjectDto> projects) {

    public record ProjectDto(String id, String description, String projectName, ZonedDateTime createdAt) {

    }
}
