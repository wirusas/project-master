import React, { useState, useEffect } from "react";
import { TaskDesktop } from "./TaskDekstop";
import { Header } from "./Header";
import { EditTask } from "./EditTask";
import { Footer } from "./Footer";
import "../styles/TasksComponentStyle.css";
import { SideBarTask } from "./SideBarTask";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskComponent = ({}) => {
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [showModalET, setShowModalET] = useState(false);

  const { projectId } = useParams();

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModalET(true);
  };

  const handleCloseModal = () => {
    setShowModalET(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Use template literals to insert the projectId into the URL
        const response = await axios.get(
          `http://localhost:8080/api/projects/${projectId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(response.data); // Update the state with the fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (projectId) {
      console.log(projectId);
      // Ensure projectId is available before fetching
      fetchTasks();
    }

    // useEffect(() => {
    //   fetchTasks();
  }, [projectId]);

  const refreshTasks = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/projects/${projectId}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTasks(response.data);
  };

  return (
    <>
      <Header />
      <div className="task-container">
        <div className="sidebar">
          <SideBarTask refreshTasks={refreshTasks} />
        </div>
        <div className="task-desktop">
          <TaskDesktop tasks={tasks} onEditTask={handleEditTask} />
          {selectedTask && (
            <EditTask
              taskId={selectedTask.id}
              projectId={selectedTask.projectId}
              showModalET={showModalET}
              handleClose={handleCloseModal}
              // refreshTasks={fetchTasks}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TaskComponent;
