import React from "react";
import { Link } from "react-router-dom";
import CommentCard from "../components/ELearning/CommentCard";
import "./LearningLandingPage.css";
const LearningLandingPage = () => {
  return (
    <>
      <div
        className="d-flex border flex-column
        justify-content-start align-items-center"
        style={{
          minHeight: "100vh",
          padding: "1rem",
          minWidth: "90vw",
          margin: "0 auto",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: "url('images/book-library.jpg')",
        }}
      >
        <h1 className="text-light" style={{ fontSize: "48px" }}>
          Make every study hour count
        </h1>
        <p className="text-light" style={{ fontSize: "30px" }}>
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
          className="btn align-self-start courses_btn btn-dark btn-lg w-25 btn-block"
        >
          See our Courses
        </Link>
      </div>
    </>
  );
};

export default LearningLandingPage;
