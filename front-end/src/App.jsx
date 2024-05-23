import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./services/AuthService";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import TaskComponent from "./components/TaskComponent";
import { CreateTask } from "./components/CreateTask";
import NotFoundComponent from "./components/NotFoundComponent ";


function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* /http://localhost:3000 */}
          <Route current path="/" element={<LoginComponent />}></Route>
          {/* /http://localhost:3000/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>
          {/* /http://localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>'
          {/* <Route path="*" element={<></>} */}
          <Route
            path="/tasks"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* /http://localhost:3000/tasks */}
          {/* <Route path="/tasks" element={<TaskComponent />}></Route> */}
          <Route
            path="/tasks/:projectId"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          />

          {/* /http://localhost:3000/tasks/modal */}
          <Route
            path="/create-task/:projectId"
            element={
              <AuthenticatedRoute>
                <CreateTask />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* /http://localhost:3000/projects */}
          <Route
            path="/projects"
            element={
              <AuthenticatedRoute>
                <ProjectsComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
