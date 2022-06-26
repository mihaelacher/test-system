import React from "react";

const HomePage = () => {
  return (
    <section id="hero">
      <div
        id="heroCarousel"
        data-bs-interval="5000"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInDown">
                  Welcome to <span>Test System</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="carousel-container">
              <div className="container">
                <h2 className="animate__animated animate__fadeInUp">
                  We have created simple test system web page. You can navigate
                  through the sidebar, create custom tests for your students and
                  invite them to participate.
                </h2>
              </div>
            </div>
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#heroCarousel"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bi bi-chevron-left"
            aria-hidden="true"
          ></span>
        </a>

        <a
          className="carousel-control-next"
          href="#heroCarousel"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bi bi-chevron-right"
            aria-hidden="true"
          ></span>
        </a>
      </div>
    </section>
  );
};

export default HomePage;
