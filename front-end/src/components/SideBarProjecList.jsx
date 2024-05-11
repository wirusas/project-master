import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/SideBarProjectsList.css'

const BASE_URL = "http://localhost:8080";
const PROJECTS_PER_PAGE = 9; // Number of projects to display per page

export const SideBarProjectList = ({ searchTerm, filterState }) => {
  const [projectList, setProjectList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [expanded, setExpanded] = useState(false); // State to control expansion of project list

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
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterState) {
      filtered = filtered.filter(project =>
        project.projectState === filterState
      );
    }

    setFilteredProjects(filtered); 
  }, [projectList, searchTerm, filterState]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <section>
        <div>
        <Link onClick={() => setExpanded(!expanded)} className="sidebar-my-projects">
  My Projects
</Link>

          {expanded && (
            <div className="sidebar-project-dropdown">
              <ul>
                {filteredProjects.map((project) => (
                  <li key={project.id}>
                    <div className="sidebar-project-name">
                      <p>{project.projectName}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="sidebar-projects-pagination-div">
                <Link className="sidebar-projects-pagination-link" onClick={handlePrevPage} disabled={!hasPrevPage} style={{ display: !hasPrevPage ? "none" : "block" }}>
                  &#60;&#60;
                </Link>
               
                <Link className="sidebar-projects-pagination-link"  onClick={handleNextPage} disabled={!hasNextPage} style={{ display: !hasNextPage ? "none" : "block" }}>
                &#62;&#62;
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
