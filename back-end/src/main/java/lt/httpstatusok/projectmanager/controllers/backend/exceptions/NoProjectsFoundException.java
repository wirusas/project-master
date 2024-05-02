package lt.httpstatusok.projectmanager.controllers.backend.exceptions;

public class NoProjectsFoundException extends RuntimeException {
    public NoProjectsFoundException(String message) {
        super(message);
    }
}
