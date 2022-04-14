import React, { useEffect, useState } from "react";
import Card from "../components/ELearning/Card";
import { Row, Col, Container } from "react-bootstrap";
import firebase from "firebase";
import "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "./../components/ELearning/Header";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import { useToken } from "../hooks/useToken";

const Courses = () => {
  const [listings, setListings] = useState([]);
  const [enrolledCourse, setenrolledCourse] = useState([]);
  const [unEnrolledCourse, setunEnrolledCourse] = useState([]);
  const navigate = useNavigate();
  const token = useToken();
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
    const loadData = async () => {
      const courseRef = await firebase.firestore().collection("courses").get();
      setListings(
        courseRef.docs.map((e) => {
          return { id: e.id, data: e.data() };
        })
      );
      let enrolledCourse = courseRef.docs.map((e) => {
        if (e.data().enrolleduser.includes(token.email)) {
          return {
            id: e.id,
            data: e.data(),
          };
        }
      });
      enrolledCourse = enrolledCourse.filter((e) => e !== undefined);
      setenrolledCourse(enrolledCourse);

      let unenrolledCourse = courseRef.docs.map((e) => {
        if (!e.data().enrolleduser.includes(token.email)) {
          return {
            id: e.id,
            data: e.data(),
          };
        }
      });
      unenrolledCourse = unenrolledCourse.filter((e) => e !== undefined);
      setunEnrolledCourse(unenrolledCourse);
    };

    loadData();
  }, [navigate, token]);

  const columnsPerRow = 3;
  console.log("EnrolledCouse", enrolledCourse);
  console.log("unEnrolledCourse", unEnrolledCourse);
  const getColumnsForRow = (courses) => {
    const items = courses?.map((data) => {
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
      <BreadcrumbPage />
      <Container>
        {enrolledCourse.length > 0 && (
          <>
            <h1>Your Courses</h1>
            <Row xs={1} md={columnsPerRow}>
              {getColumnsForRow(enrolledCourse)}
            </Row>
          </>
        )}
        {unEnrolledCourse.length > 0 && (
          <>
            <h1 className="mt-5">Other Courses</h1>
            <Row xs={1} md={columnsPerRow}>
              {getColumnsForRow(unEnrolledCourse)}
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Courses;

const BreadcrumbPage = () => {
  return (
    <MDBContainer>
      <MDBBreadcrumb>
        <MDBBreadcrumbItem active>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            /Home
          </Link>
        </MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </MDBContainer>
  );
};
