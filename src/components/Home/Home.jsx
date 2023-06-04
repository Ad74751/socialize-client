import React from "react";
import "./Home.css";
function Home() {
  return (
    <>
      <div id="hero-container-1">
        <div className="h-100 d-flex  align-items-center justify-content-center mt-5">
          <div className="row d-flex align-items-center flex-column">
            <img
              className="w-50"
              src="https://img.icons8.com/?size=2x&id=h6pni1ZW1XDS&format=svg&SScolor=737373"
              alt="..."
            />
            <h1 className="display-2 text-center" id="hero">
              SOCIALIZE.IO
            </h1>
          </div>
        </div>
        <div className="h-100 d-flex  align-items-center justify-content-center">
          <div className="row">
            <p>Connect | Share | Enjoy</p>
          </div>
        </div>
        <div className="h-100 d-flex  align-items-center justify-content-center m-3">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col">
                  <a href="/login" className="btn btn-primary btn-lg">
                    Get Started For Free 🌟
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="hero-container-2">
        <div className="row w-100 p-5">
          <div className="col-md-4 ms-auto">
            <h1 id="icon">🔐</h1>
          </div>
          <div className="col-md-8 ">
            <h1 id="hero" className="display-1">
              SECURE
            </h1>
            <p className="float-md-end">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              molestias fugiat perferendis minus temporibus, odit nam quibusdam,
              non aspernatur odio libero nostrum consequuntur adipisci, minima
              dolorem eius atque debitis! Sapiente!
            </p>
          </div>
        </div>
      </div>
      <div id="hero-container-3">
        <div className="row w-100 p-5">
          <div className="col-md-8 ">
            <h1 id="hero" className="display-1">
              FAST
            </h1>
            <p className="float-md-end">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              molestias fugiat perferendis minus temporibus, odit nam quibusdam,
              non aspernatur odio libero nostrum consequuntur adipisci, minima
              dolorem eius atque debitis! Sapiente!
            </p>
          </div>
          <div className="col-md-4 ms-auto">
            <h1 id="icon">⚡</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
