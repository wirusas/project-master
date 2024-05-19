import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../styles/ProjectList.css";
import { SideBar } from "./SideBar";
import { CreateProject } from "./CreateProject";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";
import { ToastContainer, toast } from "react-toastify";

const BASE_URL = "http://localhost:8080";
const PROJECTS_PER_PAGE = 9;

export const ProjectsList = ({ searchQuery, filterState }) => {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${BASE_URL}/api/projects/allprojects?page=${currentPage}&size=${PROJECTS_PER_PAGE}`;
        if (searchQuery) {
          url = `${BASE_URL}/api/projects/search?projectName=${searchQuery}&page=${currentPage}&size=${PROJECTS_PER_PAGE}`;
        } else if (filterState) {
          url = `${BASE_URL}/api/projects/filter?projectState=${filterState}&page=${currentPage}&size=${PROJECTS_PER_PAGE}`;
        }
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        console.log("Fetched data:", data);

        if (data && data.content) {
          setProjectList(data.content);
          setHasNextPage(data.content.length === PROJECTS_PER_PAGE);
          setHasPrevPage(data.number !== 0);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        if (error.response && error.response.status === 404) {
          alert("NO DATA !");
        }
      }
    };
    fetchData();
  }, [currentPage, searchQuery, filterState]);

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
          {projectList && projectList.map((project) =>  (
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
                          backgroundColor:
                            project.projectState === "TO DO"
                              ? "#dde0e5"
                              : "transparent",
                          backgroundImage:
                            project.projectState === "DONE"
                              ? "linear-gradient(to right, #dde0e5, #dde0e5)"
                              : "",
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
              )
            )}
          </div>
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className="prev-button"
              style={{ display: !hasPrevPage ? "none" : "block" }}
            >
              &#60;&#60;
            </button>
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className="next-button"
              style={{ display: !hasNextPage ? "none" : "block" }}
            >
              &#62;&#62;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
