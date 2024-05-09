import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";


const BASE_URL = "http://localhost:8080";
const PROJECTS_PER_PAGE = 9; // Number of projects to display per page

export const ProjectsList = ({ searchTerm, filterState }) => {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/projects/allprojects?page=${currentPage}&size=${PROJECTS_PER_PAGE}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProjectList(response.data);
        setHasNextPage(response.data.length === PROJECTS_PER_PAGE);
        setHasPrevPage(currentPage !== 0);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [currentPage]);

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
        return 0;
      case "DONE":
        return 100;
      default:
        return 0;
    }
  };

  const getVariant = (state) => {
    switch (state) {
      case "TO DO":
        return "primary";
      case "DONE":
        return "primary";
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
                <div className="project-name-progressbar-div">
                  <div className="project-name">
                    <p>{project.projectName}</p>
                  </div>
                  <div className="progress-bar">
                    <ProgressBar
                      className="progress-bar"
                      now={getProgressValue(project.projectState)}
                      variant={getVariant(project.projectState)}
                      label={`${getProgressValue(project.projectState)}%`} // Add percentage label
                      style={{
                        backgroundColor: project.projectState === "TO DO" ? "#dde0e5" : "transparent",
                        backgroundImage: project.projectState === "DONE" ? "linear-gradient(to right, #dde0e5, #dde0e5)" : "",
                      }}
                    />
                  </div>
                </div>
                <div className="project-description-container">
                  <p>{project.description}</p>
                </div>
                <div className="edit-delete-div">
                  <EditProject projectId={project.id} />
                  <DeleteProject projectId={project.id} />
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={!hasPrevPage} className="prev-button" style={{ display: !hasPrevPage ? "none" : "block" }}>
              &#60;&#60;
            </button>
            <button onClick={handleNextPage} disabled={!hasNextPage} className="next-button" style={{ display: !hasNextPage ? "none" : "block" }}>
              &#62;&#62;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
