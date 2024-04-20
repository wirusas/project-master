package lt.httpstatusok.projectmanager.controllers.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;

public final class UserDto {
    private final Long id;
<<<<<<< Updated upstream
    @NotNull
    private final String username;
    @Size(min = 2,max=30, message = "Name should be between 2 and 30 characters!")
    private final String name;
    @NotNull
    @Email(message = "Email should be valid !")
=======
    private final String username;
    private final String name;
>>>>>>> Stashed changes
    private final String email;
    private final String role;
    private final List<ProjectDto> projects;

    public UserDto(Long id, String username, String name, String email, String role, List<ProjectDto> projects) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.projects = projects;
    }

    public Long id() {
        return id;
    }

    public String username() {
        return username;
    }

    public String name() {
        return name;
    }

    public String email() {
        return email;
    }

    public String role() {
        return role;
    }

    public List<ProjectDto> projects() {
        return projects;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (UserDto) obj;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.username, that.username) &&
                Objects.equals(this.name, that.name) &&
                Objects.equals(this.email, that.email) &&
                Objects.equals(this.role, that.role) &&
                Objects.equals(this.projects, that.projects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, name, email, role, projects);
    }

    @Override
    public String toString() {
        return "UserDto[" +
                "id=" + id + ", " +
                "username=" + username + ", " +
                "name=" + name + ", " +
                "email=" + email + ", " +
                "role=" + role + ", " +
                "projects=" + projects + ']';
    }


    public record ProjectDto(String id, String description, String projectName, ZonedDateTime createdAt) {

    }
}
