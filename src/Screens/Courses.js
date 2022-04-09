import React, { useEffect, useState } from "react";
import Card from "../components/ELearning/Card";
import { Row, Col, Container } from "react-bootstrap";
import firebase from "firebase";
import "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "./../components/ELearning/Header";

const Courses = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    const courseRef = await firebase.firestore().collection("courses").get();

    setListings(courseRef.docs.map((e) => ({ id: e.id, data: e.data() })));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (!token) navigate("/sign-in", { replace: true });
    console.log("Courses");
    loadData();
  }, [navigate]);

  const columnsPerRow = 3;

  const getColumnsForRow = () => {
    const items = listings?.map((data) => {
      return (
        <Col key={data.id}>
          <Card
            key={data.id}
            title={data.data.coursetitle}
            cardDescription={data.data.coursedescription}
            courseCategory={data.data.coursecategory}
            cardImage={data.data.courseimage}
            action={() => navigate("/coursedetails/" + data.id)}
          />
        </Col>
      );
    });
    return items;
  };

  return (
    <>
      <Header
        pageName="Courses"
        bgImage={
          "https://www.s7template.com/react/eduskills/assets/images/banner-image-00.jpg"
        }
      />

      <Container>
        {listings && (
          <Row xs={1} md={columnsPerRow}>
            {getColumnsForRow()}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Courses;
