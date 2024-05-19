import React, { useState, useEffect } from "react";
import { TaskDesktop } from "./TaskDekstop";
import { TasksHeader } from "./TasksHeader";
// import { SideBar } from "./SideBar";
import { Footer } from "./Footer";
import "../styles/TasksComponentStyle.css";
import { SideBarTask } from "./SideBarTask";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { projectId } = useParams();

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
          {/* Pass search and filter handlers to TaskDesktop */}
          <TaskDesktop
            tasks={tasks}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TaskComponent;
