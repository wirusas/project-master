
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route,Routes, Navigate } from "react-router-dom"
import React from "react"
import  {isUserLoggedIn}from './services/AuthService'
import RegisterComponent from "./components/RegisterComponent"
import LoginComponent from "./components/LoginComponent"
import ProjectsComponent from "./components/ProjectsComponent"



function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth){
     return children;
    }
     return <Navigate to="/"/>
 }
  return (<>
  <BrowserRouter>
  
  <Routes>
    
     {/* /http://localhost:3000 */}
     <Route current path='/' element={<LoginComponent/>} ></Route>
     {/* /http://localhost:3000/register */}
     <Route path='/register' element={<RegisterComponent/>} ></Route>
     {/* /http://localhost:3000/login */}
     <Route path='/login' element={<LoginComponent/>} ></Route>
     {/* /http://localhost:3000/projects */}

     <Route path='/projects' element={<ProjectsComponent/>} ></Route>
     <Route path="*" element={<Navigate to="/login" />} />
    
  
     <Route path='/projects' element={

      <AuthenticatedRoute>
     <ProjectsComponent/>
     </AuthenticatedRoute>
     } ></Route>
     
  </Routes>
  </BrowserRouter>

  
  </>
  )
}

export default App