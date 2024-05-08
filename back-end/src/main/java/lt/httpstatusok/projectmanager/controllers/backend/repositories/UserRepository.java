package lt.httpstatusok.projectmanager.controllers.backend.repositories;

import lt.httpstatusok.projectmanager.controllers.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User findUserByEmail(String email);
}
