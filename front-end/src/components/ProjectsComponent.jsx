import React from "react";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import "bootstrap/dist/js/bootstrap.bundle";
import { Footer } from "./Footer";

import { ProjectsList } from "./ProjectsList";

const ProjectsComponent = () => {
  return (
    <>
      <Header></Header>

      <ProjectsList />

      <Footer></Footer>
    </>
  );
};

export default ProjectsComponent;
