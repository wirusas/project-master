package lt.httpstatusok.projectmanager.controllers.backend.dto;

import java.time.ZonedDateTime;
import java.util.ArrayList;

public record ProjectDto(String id, String description, String projectName, ArrayList projectState, ProjectDto.UserDto user, ZonedDateTime createdAt) {
    public record UserDto (String username){
    }
}
