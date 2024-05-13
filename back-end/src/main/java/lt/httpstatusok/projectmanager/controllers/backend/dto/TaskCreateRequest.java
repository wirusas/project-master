package lt.httpstatusok.projectmanager.controllers.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data


public class TaskCreateRequest {
    private String name;
    private String description;
    private String status;



}