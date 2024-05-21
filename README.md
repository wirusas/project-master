PROJECT-MASTER

The goal of this project is to implement an application to manage projects.

It will implement a back-end Spring Boot application and a front-end React application called.

APPLICATIONS:

1. BACK-END:

Web Java backend application exposes a Rest API to create, retrieve, edit and delete projects and also tasks associated with those projects.
If a user has ADMIN role he/she can also retrieve information of other users or delete them, as well as projects.

The application secured endpoints can just be accessed if a valid JWT access token is provided.

order-api stores its data in H2 database.

order-api has the following ENDPOINTS:

  | Endpoint                                                      | Secured | Roles           |
  | ------------------------------------------------------------- | ------- | --------------- |
  | `GET     /api/projects/{id}`                                  | Yes     | `ADMIN`, `USER` |
  | `PUT     /api/projects/{id}`                                  | Yes     | `ADMIN`, `USER` |
  | `DELETE  /api/projects/{id}`                                  | Yes     | `ADMIN`         |
  | `POST    /api/projects/`                                      | Yes     | `ADMIN`, `USER` |
  | `POST    /api/projects/{projectId}/{userEmail}`               | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/search`                                | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/myprojects`                            | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/sorting/{field}`                       | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/findproject`                           | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/filter`                                | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/csv`                                   | Yes     | `ADMIN`, `USER` |
  | `GET     /api/projects/allprojects`                           | Yes     | `ADMIN`, `USER` |
  | `DELETE  /api/projects/{projectId}/removeUser/{userEmail}`    | Yes     | `ADMIN`, `USER` |
  | `POST /auth/signup`                                           | No      |                 |
  | `POST /auth/authenticate`                                     | No      |                 |
  | `GET /api/projects/{projectId}/tasks`                         | Yes     | `ADMIN`, `USER` |
  | `POST /api/projects/{projectId}/tasks`                        | Yes     | `ADMIN`, `USER` |
  | `GET /api/projects/{projectId}/tasks/search`                  | Yes     | `ADMIN`, `USER` |
  | `GET /api/projects/{projectId}/tasks/filter`                  | Yes     | `ADMIN`, `USER` |
  | `GET /api/projects/{projectId}/tasks/csv`                     | Yes     | `ADMIN`, `USER` |
  | `DELETE /api/projects/{projectId}/tasks/{id}`                 | Yes     | `ADMIN`, `USER` |
  | `GET /api/users`                                              | Yes     | `ADMIN`         |
  | `GET /api/users/{username}`                                   | Yes     | `ADMIN`         |
  | `DELETE /api/users/{username}`                                | Yes     | `ADMIN`, `USER` |
  | `GET /api/me`                                                 | Yes     | `ADMIN`, `USER` |



  
2. FRONT-END
  
  In order to access the application, a `user` or `admin` must login using his/her `username` and `password`. All the requests coming from `front-end` to secured endpoints in `back-end` have the JWT access token. This token is generated when the `user` or `admin` logins.
  
 
## Prerequisites

- [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`Java 17+`](https://www.oracle.com/java/technologies/downloads/#java17)
- [`h2`](https://www.h2database.com/html/download.html)


## Start Environment

**front-end**

- In a terminal (it might be Visual Studio Code), you can download it [`here`](https://code.visualstudio.com/download), make sure you are inside `front-end` root folder;

- If you are running application for the first time;Run the following command to install npm 
   ```
   npm i
 
 or

   ```
   npm install
   ```

- Run the following command to start front end application 

   ```
   npm run dev

- **back-end**

  - Open java Compiler (it might be IntelliJ IDEA) you can download it [`here`](https://www.jetbrains.com/idea/download/?section=windows);
  - In the compiler open back-end application
  - run BackEndEplication

  

## Applications URLs

  | `back-end`     | `http://localhost:8080`      | `ADMIN`, `USER`                                     |
  | `front-end`    | `http://localhost:3000/`     | `admin/admin`, `user/user` or signing up a new user |

> **Note**: the credentials shown in the table are the ones already pre-defined. You can signup new users.

- **Manual Endpoints Test using Swagger**
  
 http://localhost:8080/swagger-ui/index.html
    


