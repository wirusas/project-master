package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.UserDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;

public interface UserMapper {
    UserDto toUserDto(User user);
}
