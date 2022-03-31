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
    loadData();
  }, []);

  const columnsPerRow = 3;

  const getColumnsForRow = () => {
    console.log(listings.data);
    const items = listings?.map((data) => {
      return (
        <Col>
          <Card
            key={data.id}
            title={data.data.coursetitle}
            cardDescription={data.data.coursedescription}
            courseCategory={data.data.coursecategory}
            cardImage={data.data.courseimage}
            action={() => navigate("/coursesDetails/" + data.id)}
          />
        </Col>
      );
    });
    return items;
  };

  return (
    <>
      <Header pageName="Courses" />

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
