import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route,Routes } from "react-router-dom"
import RegisterComponent from "./components/RegisterComponent"
function App() {
  return (<>
  <BrowserRouter>
  
  <Routes>
    <Route>
     {/* //hhtp:localhost:8080/register */}
     <Route path='/register' element={<RegisterComponent/>} ></Route>
    </Route>
  </Routes>
  </BrowserRouter>

  
  </>
  )
}

export default App