package lt.httpstatusok.projectmanager.controllers.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserExistsInTRheProject extends RuntimeException{
    public UserExistsInTRheProject(String message){super(message);}
}
