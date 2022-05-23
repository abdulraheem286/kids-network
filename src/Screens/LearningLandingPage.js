import React from "react";
import { Link } from "react-router-dom";
import AboutSection from "../components/ELearning/AboutSection";
import CommunitySection from "../components/ELearning/CommunitySection";
import FeatureSection from "../components/ELearning/FeatureSection";
import ProductsSection from "../components/ELearning/ProductsSection";

import "./LearningLandingPage.css";
const LearningLandingPage = () => {
  return (
    <>
      <div
        className="d-flex flex-column
        justify-content align-items-center"
        style={{
          alignContent: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "90vh",
          minWidth: "90vw",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderBottom: "1px solid #65daff",
          backgroundImage:
            "url('https://img.freepik.com/free-photo/little-girl-participating-online-classes_23-2149041079.jpg?t=st=1653218261~exp=1653218861~hmac=ea2d39231d71b221f0e58a512b847de5dfec0f4cade800e40a77d6874d6cae56&w=1060')",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(0,0,0,0.5)",
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        />
        <div
          style={{
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            alignItems: "center",
            position: "relative",
            zIndex: "100",
          }}
        >
          <h1
            className="text-light"
            style={{
              fontSize: "48px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
            }}
          >
            Make every study hour count
          </h1>
          <p
            className="text-light p-2"
            style={{ fontSize: "20px", fontFamily: "'Poppins', sans-serif" }}
          >
            Access to multiple courses and video tutorials
            <span
              className="text-light"
              style={{
                fontSize: "30px",
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "Black",
              }}
            >
              {" "}
              24/7
            </span>
          </p>

          <Link
            style={{
              margin: "auto",
              backgroundColor: "rgb(101,218,255)",
              fontFamily: "Poppins",
              color: "Black",
              fontSize: "16px",
              borderRadius: "100px 100px 100px 100px",
            }}
            to="/courses"
            className="btn align-self-end courses_btn btn-dark btn-lg w-25 btn-block"
          >
            See our Courses
          </Link>
        </div>
      </div>
      <FeatureSection />
      <ProductsSection />
      <CommunitySection />
      <AboutSection />
    </>
  );
};

export default LearningLandingPage;
