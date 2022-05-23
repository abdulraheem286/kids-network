import React from "react";
import { Link } from "react-router-dom";
import "./CommunitySection.css";

const CommunitySection = () => {
  return (
    <div className="community_main">
      <div className="container">
        <h1 className="community_head">Join Our Community</h1>

        <p className="community_desc">
          True community requires commitment and openness. It is a willingness
          to extend yourself to encounter and know the other. One of the
          marvelous things about community is that it enables us to welcome and
          help people in a way we couldn’t as individuals.
        </p>

        <Link
          to="/community"
          className="community_button btn align-self-end courses_btn btn-dark btn-lg w-25 btn-block"
        >
          Join Now
        </Link>

        <img
          className="community_img"
          src="https://i.ibb.co/1nghGQy/Community-BG.png"
          alt="bg"
        />
      </div>
    </div>
  );
};

export default CommunitySection;
