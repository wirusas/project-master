import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";

const BASE_URL = "http://localhost:8080";
const PROJECTS_PER_PAGE = 8; // Number of projects to display per page

export const ProjectsList = ({ searchTerm, filterState }) => {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects/allprojects?page=${currentPage}&size=${PROJECTS_PER_PAGE}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const formattedProjects = response.data.map((project) => ({
          ...project,
          createdAt: formatDate(project.createdAt),
        }));
        setProjectList(formattedProjects);
        setHasNextPage(response.data.length === PROJECTS_PER_PAGE);
        setHasPrevPage(currentPage !== 0);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [currentPage]);

   //Search
   useEffect(() => {
    let filtered = projectList;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterState) {
      filtered = filtered.filter(project =>
        project.projectState === filterState
      );
    }

    setFilteredProjects(filtered); 
  }, [projectList, searchTerm, filterState]);


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

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="create-project">
        <CreateProject />
      </div>
      <section className="sidebar-projects-container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="project-list">
          <div className="project-cards-container">
            {filteredProjects.map((project) => (
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

                <Link to={`/tasks/${project.id}`} className="project-link">
                  <div className="project-name-description-container">
                    <h2>{project.projectName}</h2>
                    <p>{project.description}</p>
                  </div>
                </Link>

                <div className="time-stamp">
                  <span>Task:</span> {project.createdAt}
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={!hasPrevPage} className="prev-button" style={{ display: !hasPrevPage ? "none" : "block" }}>
            &#60;&#60;&#60;
            </button>
            <button onClick={handleNextPage} disabled={!hasNextPage} className="next-button" style={{ display: !hasNextPage ? "none" : "block" }}>
            &#62;&#62;&#62;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
