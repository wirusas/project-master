import React from "react";
import notFoundimg from "../assets/error404.png";
import "../styles/NotFound.css"

const NotFoundComponent = () => {
  return (
    <div className="not-found">
      <a href="/"><button className="not-found-back-button">Back</button></a>
      
    </div>
  );
};

export default NotFoundComponent;
