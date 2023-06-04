import React from "react";
import "./PageNotFound.css";
function PageNotFound() {
  return (
    <div id="main" className="h-100 d-flex flex-column align-items-center justify-content-center">
      <h1 id="title" className="display-1">
        Oops !
      </h1>
      <h1 id="title" className="display-4">
        404
      </h1>
      <h3 className="h3">The page you are looking for does not exist</h3>
      <a href="/" className="stretched-link">Return to home page</a>
    </div>
  );
}

export default PageNotFound;
