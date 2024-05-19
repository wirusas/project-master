package lt.httpstatusok.projectmanager.controllers.backend.repositories;

import lt.httpstatusok.projectmanager.controllers.backend.models.Task;
import lt.httpstatusok.projectmanager.controllers.backend.models.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByProjectId(String projectId);

    List<Task> findByNameContaining(String name);

    List<Task> findByStatus(TaskStatus status);
}
