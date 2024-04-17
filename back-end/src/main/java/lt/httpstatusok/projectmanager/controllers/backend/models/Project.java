package lt.httpstatusok.projectmanager.controllers.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

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
//    private Task tasks;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private ZonedDateTime createdAt;

    public Project(String description, String projectName, String projectState) {
        this.description = description;
        this.projectName = projectName;
        this.projectState = projectState;
//        this.tasks = tasks;
    }




    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
}
