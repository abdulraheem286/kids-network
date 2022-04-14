import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const VideoCard = ({ thumbnail, videoLink }) => {
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {}, [params]);

  return (
    <Row
      onClick={() =>
        navigate(`/courseVideos/${params.id}?video=${videoLink}`, {
          state: "opened",
        })
      }
      className="w-100 bg-white rounded p-0"
      style={{ height: "80px", margin: "10px auto", cursor: "pointer" }}
    >
      <Col style={{ overflow: "hidden" }}>
        <img
          className="w-100"
          style={{ height: "80px" }}
          src={thumbnail}
          alt=""
        />
      </Col>

      <Col className="justify-content-center d-flex flex-column">
        <h5 className="text-start fw-bold" style={{ fontSize: "16px" }}>
          {" "}
          Machine Learning with Python
        </h5>
        <h6 style={{ fontWeight: "lighter", fontSize: "14px" }}>
          Code with Mosh
        </h6>
      </Col>
    </Row>
  );
};

export default VideoCard;
