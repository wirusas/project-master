import React from 'react'
import  {TaskDesktop} from "./TaskDekstop";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { Footer } from "./Footer"
import '../styles/TasksComponentStyle.css'



const TaskComponent = () => {
  return (<>
    <Header />
        <div className="task-container">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="task-desktop">
            <TaskDesktop />
          </div>
        </div>
        <Footer />
        </>
  )
}

export default TaskComponent