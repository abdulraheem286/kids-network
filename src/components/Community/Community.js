import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";
import Header from "../ELearning/Header";
import { Row, Col, Container } from "react-bootstrap";
import "./Community.css";
import QuestionCard from "./QuestionCard";
import PostStatus from "./PostStatus";
import firebase from "firebase";
import { Button, Modal, Input } from "antd";
const Community = () => {
  const token = useToken();
  const navigate = useNavigate();
  const [questions, setquestions] = useState([])
  const [openModal, setopenModal] = useState(false)
  const [loading, setloading] = useState(false)
  const [expertForm, setexpertForm] = useState({
    question: "",
  })
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
  async function submitHandler(e) {
    try {
      if (!expertForm.question) {
        alert("All fields are required")
        return
      }
      e.preventDefault()
      setloading(true)
      await firebase.firestore().collection("expertsForms").doc(token.id).set({
        ...expertForm,
        approved: false,
        name: `${token.fName} ${token.lName}`,
        uid: token.id,
        email: token.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setexpertForm({
        question: ""
      })
      setloading(false)
      setopenModal(false)
    } catch (error) {
      console.log(error)
    }
  }
  const changeHandler = (e) => {
    setexpertForm({ ...expertForm, [e.target.name]: e.target.value })
  }
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
            <Modal visible={openModal}
              confirmLoading={loading} onOk={submitHandler} onCancel={() => setopenModal(false)} >

              <form className='d-flex flex-column border p-2' onSubmit={submitHandler}>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Question</label>
                  <Input
                    placeholder='Why do you want to be an expert?'
                    className="w-50" required name='question'
                    type={"text"} value={expertForm.question} onChange={changeHandler} />
                </div>


              </form>
            </Modal>
            {
              !token?.expert && <Button className="rounded-pill  bg-primary p-1 px-2 text-light my-2" onClick={() => setopenModal(true)}>
                Become an Expert
              </Button>
            }

            <PostStatus type={"Question"} />
            {questions?.map(question => <QuestionCard key={question?.id} post={question} />)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Community;
