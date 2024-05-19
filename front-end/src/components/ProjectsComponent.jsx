import React, { useState } from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import "bootstrap/dist/js/bootstrap.bundle";
import { Footer } from "./Footer";
import { ProjectsList } from "./ProjectsList";

const ProjectsComponent = () => {
  const [searchProjectQuery, setProjectSearchQuery] = useState("");
  const [filterProjectState, setProjectFilterState] = useState("All");

  const handleProjectSearch = (query) => {
    setProjectSearchQuery(query);
  };

  const handleProjectFilter = (state) => {
    setProjectFilterState(state);
  };

  return (
    <>
      <Header onSearch={handleProjectSearch} onFilter={handleProjectFilter} />
      <ProjectsList
        searchQuery={searchProjectQuery}
        filterState={filterProjectState}
      />
      <br />
      <Footer />
    </>
  );
};
export default ProjectsComponent;
