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
  const [questions, setquestions] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [expertForm, setexpertForm] = useState({
    address: "",
    phone: "",
    education: "",
    occupation: "",
    specialization: "",
    reason: "",
  });
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
  }, [navigate, token]);

  useEffect(() => {
    function getData() {
      try {
        firebase
          .firestore()
          .collection("questions")
          .onSnapshot((snapshot) => {
            const questions = snapshot.docs?.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setquestions(questions);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  async function submitHandler(e) {
    try {
      if (
        !expertForm.address ||
        !expertForm.phone ||
        !expertForm.education ||
        !expertForm.occupation ||
        !expertForm.specialization ||
        !expertForm.reason
      ) {
        alert("All fields are required");
        return;
      }
      e.preventDefault();
      setloading(true);
      await firebase
        .firestore()
        .collection("expertsForms")
        .doc(token.id)
        .set({
          ...expertForm,
          approved: false,
          name: `${token.fName} ${token.lName}`,
          uid: token.id,
          email: token.email,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setexpertForm({
        question: "",
      });
      setloading(false);
      setopenModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  const changeHandler = (e) => {
    setexpertForm({ ...expertForm, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Header
        color={"white"}
        pageName={"Kids Network Community"}
        bgImage="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        bcpt1="Home"
        bcl1="/"
        bcpt2=" / Community"
        bcl2="/community"
        bcpt3=""
        bcl3=""
        bcpt4=""
      />
      <div className="container">
        <Row>
          <Col className=" " xs={7}>
            <Modal
              visible={openModal}
              confirmLoading={loading}
              onOk={submitHandler}
              onCancel={() => setopenModal(false)}
            >
              <form
                className="d-flex flex-column border p-2"
                onSubmit={submitHandler}
              >
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Address</label>
                  <Input
                    className="my-1 w-50"
                    required
                    name="address"
                    type={"text"}
                    value={expertForm.address}
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Phone</label>
                  <Input
                    className="my-1 w-50"
                    required
                    name="phone"
                    type={"text"}
                    value={expertForm.phone}
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Education</label>
                  <Input
                    className="my-1 w-50"
                    required
                    name="education"
                    type={"text"}
                    value={expertForm.education}
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Occupation</label>
                  <Input
                    className="my-1 w-50"
                    required
                    name="occupation"
                    type={"text"}
                    value={expertForm.occupation}
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Specialization</label>
                  <Input
                    className="my-1 w-50"
                    required
                    name="specialization"
                    type={"text"}
                    value={expertForm.specialization}
                    onChange={changeHandler}
                  />
                </div>
                <div className="d-flex w-100 justify-content-between px-2">
                  <label>Reason</label>
                  <Input.TextArea
                    className="my-1 w-50"
                    required
                    name="reason"
                    type={"text"}
                    value={expertForm.reason}
                    onChange={changeHandler}
                  />
                </div>
              </form>
            </Modal>

            {!token?.expert && (
              <Button
                className="rounded-pill  bg-primary p-1 px-2 text-light my-2"
                onClick={() => setopenModal(true)}
              >
                Become an Expert
              </Button>
            )}

            <PostStatus type={"Question"} />

            {questions?.map((question) => (
              <QuestionCard key={question?.id} post={question} />
            ))}
          </Col>

          <Col style={{ backgroundColor: "grey" }}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Community;
