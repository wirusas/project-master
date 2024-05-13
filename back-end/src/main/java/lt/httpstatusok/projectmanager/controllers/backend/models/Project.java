package lt.httpstatusok.projectmanager.controllers.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "projects")
public class Project {
    @Id
    private String id;
    private String projectName;
    private String description;
    private String projectState;

    @ManyToMany(mappedBy = "followedProjects")
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "project")
    private Set<Task> tasks;

    private ZonedDateTime createdAt;

    public Project(String projectName, String description,  String projectState) {
        this.projectName = projectName;
        this.description = description;
        this.projectState = projectState;
    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }

    public void addUser(User user){
        users.add(user);
        user.getFollowedProjects().add(this);
    }
}
