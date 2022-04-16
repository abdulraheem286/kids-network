import React, { useEffect, useRef, useState } from "react";
import Card from "../components/ELearning/Card";
import { Row, Col, Container } from "react-bootstrap";
import firebase from "firebase";
import "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "./../components/ELearning/Header";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
} from "mdbreact";
import { Link } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import "./Courses.css";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import _ from "lodash";

const Courses = () => {
  const [listings, setListings] = useState([]);
  const [enrolledCourse, setenrolledCourse] = useState([]);
  const [unEnrolledCourse, setunEnrolledCourse] = useState([]);
  const navigate = useNavigate();
  const [filterItem, setfilterItem] = useState("");
  const token = useToken();
  const [search, setsearch] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
    const loadData = async () => {
      let courseRef = await firebase.firestore().collection("courses").get();
      if (search) {
        courseRef = _.filter(courseRef.docs, (doc) => {
          if (
            doc.data().coursetitle.toLowerCase().includes(search.toLowerCase())
          ) {
            return doc;
          }
        });
      } else {
        courseRef = courseRef.docs;
      }
      setListings(
        courseRef?.map((e) => {
          return { id: e.id, data: e.data() };
        })
      );
      let enrolledCourse = courseRef?.map((e) => {
        if (e.data().enrolleduser.includes(token.email)) {
          return {
            id: e.id,
            data: e.data(),
          };
        }
      });
      enrolledCourse = enrolledCourse.filter((e) => e !== undefined);
      setenrolledCourse(enrolledCourse);

      let unenrolledCourse = courseRef?.map((e) => {
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
  }, [navigate, token, search]);

  const columnsPerRow = 3;
  const getColumnsForRow = (courses) => {
    const items = courses?.map((data) => {
      const card = (
        <Col key={data.id}>
          <Card
            key={data.id}
            id={data.id}
            title={data.data.coursetitle}
            cardDescription={data.data.coursedescription}
            courseCategory={data.data.coursecategory}
            cardImage={data.data.courseimage}
            action={() => navigate("/coursedetails/" + data.id)}
          />
        </Col>
      );
      return filterItem
        ? data.data.coursecategory === filterItem
          ? card
          : null
        : card;
    });
    return items;
  };
  const courseCategory = [
    "All",
    "Business",
    "Coding",
    "Bitcoin",
    "Development",
  ];
  return (
    <>
      <Header
        pageName="Courses"
        bgImage={
          "https://www.s7template.com/react/eduskills/assets/images/banner-image-00.jpg"
        }
      />
      <BreadcrumbPage />
      <div className="d-flex w-100 my-2 mx-auto justify-content-between">
        <div className="w-75 d-flex justify-content-between px-5">
          {courseCategory.map((e, index) => (
            <h5
              key={index}
              className="filterItems"
              onClick={() => setfilterItem(e === "All" ? "" : e)}
            >
              {e}
            </h5>
          ))}
        </div>
        <div style={{ flex: "1 1 0%" }} className="w-25">
          <MDBFormInline className="md-form">
            <input
              ref={ref}
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              onChange={(e) => {
                if (!e.target.value) {
                  setsearch(e.target.value);
                }
              }}
              aria-label="Search"
            />
            <MDBBtn
              gradient="aqua"
              rounded
              size="sm"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setsearch(ref.current.value);
              }}
              className="mr-auto"
            >
              Search
            </MDBBtn>
          </MDBFormInline>
        </div>
      </div>
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
