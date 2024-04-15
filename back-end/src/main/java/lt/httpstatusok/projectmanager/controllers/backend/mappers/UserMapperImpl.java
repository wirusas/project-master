package lt.httpstatusok.projectmanager.controllers.backend.mappers;

import lt.httpstatusok.projectmanager.controllers.backend.dto.UserDto;
import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapperImpl implements UserMapper {
    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<UserDto.ProjectDto> projects = user.getProjects().stream().map(this::toUserDtoProjectDto).toList();
        return  new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), projects);
    }
    private UserDto.ProjectDto toUserDtoProjectDto (Project project){
        if (project == null){
            return  null;
        }
        return new UserDto.ProjectDto(project.getId(), project.getDescription(), project.getProjectName(), project.getCreatedAt());
    }
}
