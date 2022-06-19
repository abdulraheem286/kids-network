import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";
import Header from "../ELearning/Header";
import { Row, Col, Container } from "react-bootstrap";
import "./Community.css";
import AnswerCard from "./AnswerCard";
import QuestionCard from "./QuestionCard";
import PostStatus from "./PostStatus";
import firebase from "firebase";
const Community = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [questions, setquestions] = useState([])
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
  }, [navigate, token]);

  useEffect(() => {
    function getData() {
      try {
        firebase.firestore().collection("questions").onSnapshot(snapshot => {
          const questions = snapshot.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
          setquestions(questions)
        })

      } catch (error) {
        console.log(error)
      }
    }
    getData()

  }, [])

  return (
    <div className="d-flex justify-content-between flex-column" style={{ minHeight: "100vh" }}>
      <Header
        color={"white"}
        pageName={"Kids Network Community"}
        bgImage="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        bcpt1="Home"
        bcl1="/"
        bcpt2=" / Community"
        bcl2="/"
        bcpt3=""
        bcl3=""
        bcpt4=""
      />
      <Container className="h-100" style={{ width: "80%", margin: "2% auto" }}>
        <Row>
          <Col className="h-100 mx-auto" xs={7}>
            <PostStatus type={"Question"} />
            {questions?.map(question => <QuestionCard key={question?.id} post={question} />)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Community;
