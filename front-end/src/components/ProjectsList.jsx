import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";

const BASE_URL = "http://localhost:8080";
const PROJECTS_PER_PAGE = 9;

export const ProjectsList = ({ searchTerm, filterState }) => {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!searchTerm && !filterState) {
          response = await axios.get(
            `${BASE_URL}/api/projects/allprojects?page=${currentPage}&size=${PROJECTS_PER_PAGE}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          response = await axios.get(`${BASE_URL}/api/projects/allprojects/nopagination`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }

        const data = response.data;
        setProjectList(data);
        setHasNextPage(data.length === PROJECTS_PER_PAGE);
        setHasPrevPage(currentPage !== 0);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, filterState]);

  useEffect(() => {
    let filtered = projectList;

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterState) {
      filtered = filtered.filter((project) => project.projectState === filterState);
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
      <br />
      <section className="sidebar-projects-container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="project-list">
          <div className="project-cards-container">
            {(searchTerm || filterState ? filteredProjects : projectList).map((project) => (
              <div className="project-card-div" key={project.id}>
                <div className="project-name-progressbar-div">
                  <Link className="project-name" to={`/tasks/${project.id}`}>
                    <div>
                      <p>{project.projectName}</p>
                    </div>
                  </Link>
                  <div className="progress-bar">
                    <ProgressBar
                      className="progress-bar"
                      now={getProgressValue(project.projectState)}
                      variant={getVariant(project.projectState)}
                      label={`${getProgressValue(project.projectState)}%`}
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