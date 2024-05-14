import React, {useState} from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import "bootstrap/dist/js/bootstrap.bundle";
import { Footer } from "./Footer";

import { ProjectsList } from "./ProjectsList";

const ProjectsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState(""); 

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (state) => {
    setFilterState(state);
  };

  return (
    <>
      <Header onSearch={handleSearch} searchTerm={searchTerm} onFilterChange={handleFilterChange} />
      <ProjectsList searchTerm={searchTerm} filterState={filterState} />
      <br />
      <Footer />
    </>
  );
};
export default ProjectsComponent;
