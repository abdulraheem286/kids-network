import React from "react";
import { Link } from "react-router-dom";
import AboutSection from "../components/ELearning/AboutSection";
import CommentCard from "../components/ELearning/CommentCard";
import FeatureSection from "../components/ELearning/FeatureSection";
import "./LearningLandingPage.css";
const LearningLandingPage = () => {
  return (
    <>
      <div
        className="d-flex flex-column
        justify-content-start align-items-center"
        style={{
          minHeight: "100vh",
          padding: "1rem",
          minWidth: "90vw",
          margin: "0 auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderBottom: "1px solid #65daff",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80')",
        }}
      >
        <h1
          className="text-light"
          style={{ fontSize: "48px", fontFamily: "'Raleway', sans-serif" }}
        >
          Make every study hour count
        </h1>
        <p
          className="text-light"
          style={{ fontSize: "30px", fontFamily: "'Raleway', sans-serif" }}
        >
          Access to multiple courses and video tutorials
          <span
            className="text-light"
            style={{
              fontSize: "48px",
              fontFamily: "serif",
              fontWeight: "bold",
            }}
          >
            {" "}
            24/7
          </span>
        </p>
        <CommentCard />
        <Link
          to="/courses"
          className="btn align-self-end courses_btn btn-dark btn-lg w-25 btn-block"
        >
          See our Courses
        </Link>
      </div>
      <FeatureSection />
      <AboutSection />
    </>
  );
};

export default LearningLandingPage;
