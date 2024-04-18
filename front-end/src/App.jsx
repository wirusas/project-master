import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route,Routes } from "react-router-dom"
import RegisterComponent from "./components/RegisterComponent"
import LoginComponent from "./components/LoginComponent"
function App() {
  return (<>
  <BrowserRouter>
  
  <Routes>
   
     {/* //hhtp:localhost:8080/register */}
     <Route path='/register' element={<RegisterComponent/>} ></Route>
     {/* //hhtp:localhost:8080/login */}
     <Route path='/login' element={<LoginComponent/>} ></Route>
    
  </Routes>
  </BrowserRouter>

  
  </>
  )
}

export default App