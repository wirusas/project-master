import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";

// Main base URL
const BASE_URL = "http://localhost:8080";

// MAIN EXPORT
export const ProjectsList = () => {
  // SET project LIST
  const [projectList, setProjectList] = useState([]);

  // Function to format the timestamp to YYYY-MM-DD
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  // FETCH DATA
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects/allprojects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Format createdAt field for each project
        const formattedProjects = response.data.map((project) => ({
          ...project,
          createdAt: formatDate(project.createdAt),
        }));
        setProjectList(formattedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  // Function to calculate progress value
  const getProgressValue = (state) => {
    switch (state) {
      case "TO DO":
        return 32;
      case "IN PROGRESS":
        return 65;
      case "DONE":
        return 100;
      default:
        return 0;
    }
  };

  // Function to determine progress bar color state
  const getVariant = (state) => {
    switch (state) {
      case "TO DO":
        return "danger";
      case "IN PROGRESS":
        return "warning";
      case "DONE":
        return "success";
      default:
        return "info";
    }
  };

  // RETURN
  return (
    <>
      <div className="create-project">
        <CreateProject />
      </div>
      <section className="sidebar-projects-container">
        <SideBar />
        <div className="project-list">
          {/* MAP projects */}
          <div className="project-cards-container">
            {projectList.map((project) => (
              <div className="project-card-div" key={project.id}>
                <div className="progress-bar-edit-project">
                  <ProgressBar
                    className="progress-bar"
                    now={getProgressValue(project.projectState)}
                    label={project.projectState}
                    variant={getVariant(project.projectState)}
                  />
                  <EditProject projectId={project.id} />
                  <DeleteProject projectId={project.id} />
                </div>

                <div className="project-name-description-container">
                  <h2>{project.description}</h2>
                  <p>{project.projectName}</p>
                </div>
                <div className="time-stamp">
                  <span>Task:</span> {project.createdAt}
                </div>
              </div>
            ))}
          </div>
          {/* MAP projects */}
        </div>
      </section>
    </>
  );
};
