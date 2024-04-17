package lt.httpstatusok.projectmanager.controllers.backend.dto;

import java.time.ZonedDateTime;

public record ProjectDto(String id, String description, String projectName, String projectState, ProjectDto.UserDto user, ZonedDateTime createdAt) {
    public record UserDto (String username){
    }
}
