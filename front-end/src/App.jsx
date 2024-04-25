import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route,Routes, Navigate } from "react-router-dom"
import RegisterComponent from "./components/RegisterComponent"
import LoginComponent from "./components/LoginComponent"
import ProjectsComponent from "./components/ProjectsComponent"

function App() {
  return (<>
  <BrowserRouter>
  
  <Routes>
   
     {/* /http://localhost:3000/register */}
     <Route path='/register' element={<RegisterComponent/>} ></Route>
     {/* /http://localhost:3000/login */}
     <Route path='/login' element={<LoginComponent/>} ></Route>
     {/* /http://localhost:3000/projects */}
     <Route path='/projects' element={<ProjectsComponent/>} ></Route>
     <Route path="*" element={<Navigate to="/login" />} />
    
  </Routes>
  </BrowserRouter>

  
  </>
  )
}

export default App