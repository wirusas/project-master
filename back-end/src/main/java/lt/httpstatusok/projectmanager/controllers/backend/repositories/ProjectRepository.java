package lt.httpstatusok.projectmanager.controllers.backend.repositories;

import lt.httpstatusok.projectmanager.controllers.backend.models.Project;
import org.hibernate.query.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {

    Page<Project> findByProjectNameContainingIgnoreCase(String projectName, Pageable pageable);

    Page<Project> findByProjectState(String projectState, Pageable pageable);

    Page<Project> findAll(Pageable pageable);


}
