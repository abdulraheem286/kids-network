import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";
import Header from "../ELearning/Header";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleArrowDown,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import "./Community.css";

const Community = () => {
  const token = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
  }, [navigate, token]);

  return (
    <div className="h-100" style={{ minHeight: "100vh" }}>
      <Header
        color={"white"}
        pageName={"Kids Network Community"}
        bgImage="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      />
      <Container style={{ width: "80%", margin: "2% auto" }}>
        <Row>
          <Col className="" xs={8}>
            <div
              className="d-flex h-100"
              style={{
                borderRadius: "15px",
                filter:
                  "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
              }}
            >
              <section
                className="h-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  width: "8%",
                  backgroundColor: "#d7d8d9",
                  fontSize: "16px",
                }}
              >
                <FontAwesomeIcon icon={faCircleArrowUp} />
                <p>5</p>
                <FontAwesomeIcon icon={faCircleArrowDown} />
              </section>
              <section
                className="bg-light h-100 p-2"
                style={{
                  flex: "1 1 0%",
                  fontSize: "12px",
                }}
              >
                <p>Posted by John Doe 12 days ago</p>
                <h6>
                  <span
                    className="bg-danger rounded-pill fw-bold p-1 text-light"
                    style={{ marginRight: "10px", fontSize: "12px" }}
                  >
                    Question
                  </span>
                  How to react
                </h6>
                <div
                  style={{ fontSize: "16px", marginTop: "20px" }}
                  className="d-flex justify-content-evenly border-top p-1"
                >
                  <div
                    className="d-flex flex-column item-box p-2"
                    style={{
                      width: "fit-content",
                      marginRight: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faMessage} className="icon" />
                    <p> 9 comments</p>
                  </div>
                  <div
                    className="d-flex flex-column  item-box p-2"
                    style={{ width: "fit-content", borderRadius: "10px" }}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                    <p> 9 Likes</p>
                  </div>
                </div>
                <div>
                  Reprehenderit sint exercitation dolore excepteur sit sint et
                  et duis. Labore deserunt consectetur duis laboris pariatur ea
                  est culpa amet exercitation consequat magna nulla
                  reprehenderit. Eu consectetur eiusmod aliquip minim aliqua.
                  Duis laboris cupidatat elit excepteur amet ad culpa sit. Sint
                  laborum reprehenderit voluptate consequat anim id et
                  incididunt adipisicing veniam id adipisicing reprehenderit ea.
                  Officia laborum consectetur cupidatat sint magna ad ex velit.
                </div>
              </section>
            </div>
          </Col>
          <Col className="" xs={{ span: 3, offset: 1 }}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Community;
