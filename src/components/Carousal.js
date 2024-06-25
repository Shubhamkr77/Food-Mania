import React from "react";

export default function Carousal() {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner " id="carousel">
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <form className=" d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                {" "}
                Search{" "}
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100  "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1546069901-eacef0df6022"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100 "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18809.jpg?w=996&t=st=1719177064~exp=1719177664~hmac=5883080e3a6a08bf15be2761d8ed22af2a87ee8652eba19bf16e29f78abf077b"
              alt="Pastry"
              width="900"
              height="700"
              className="d-block w-100 "
              style={{ filter: "brightness(30%)" }}
              //alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
