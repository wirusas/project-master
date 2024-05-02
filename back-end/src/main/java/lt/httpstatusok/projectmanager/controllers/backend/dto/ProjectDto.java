package lt.httpstatusok.projectmanager.controllers.backend.dto;

import java.time.ZonedDateTime;

public record ProjectDto(String id, String projectName,  String description, String projectState, java.util.List<UserDto> user, ZonedDateTime createdAt) {
    public record UserDto (String username){
    }
}
