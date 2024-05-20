import React, { useState, useEffect } from "react";
import { TaskDesktop } from "./TaskDekstop";
import { Header } from "./Header";
import { EditTask } from "./EditTask";
import { TasksHeader } from "./TasksHeader";
import { Footer } from "./Footer";
import "../styles/TasksComponentStyle.css";
import { SideBarTask } from "./SideBarTask";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteTask } from "./DeleteTask";

const TaskComponent = ({}) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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
        let url = `http://localhost:8080/api/projects/${projectId}/tasks`;
        if (searchQuery) {
          url += `/search?name=${searchQuery}`;
        } else if (filterStatus) {
          url += `/filter?status=${filterStatus}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response && error.response.status === 404) {
          alert("NO DATA !");
        }
      }
    };

    if (projectId) {
      fetchTasks();
    }
  }, [projectId, searchQuery, filterStatus]);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <>
      <TasksHeader
        onSearchHandler={handleSearch}
        searchQuery={searchQuery}
        onFilterChangeHandler={handleFilterChange}
      />
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
              refreshTasks={refreshTasks}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TaskComponent;
