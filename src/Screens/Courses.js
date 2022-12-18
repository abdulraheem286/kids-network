import React, { useEffect, useRef, useState } from "react";
import Card from "../components/ELearning/Card";
import { Row, Col, Container } from "react-bootstrap";
import firebase from "firebase";
import "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "./../components/ELearning/Header";
import { MDBBtn } from "mdbreact";
import { useToken } from "../hooks/useToken";
import "./Courses.css";
import _ from "lodash";
import Dictaphone from "../components/VoiceToText/Dictaphone";
import nocourse from "../Assets/noresult.png";

const Courses = () => {
  const [voiceText, setVoiceText] = React.useState("");
  const [listings, setListings] = useState([]);
  const [enrolledCourse, setenrolledCourse] = useState([]);
  const [unEnrolledCourse, setunEnrolledCourse] = useState([]);
  const navigate = useNavigate();
  const [filterItem, setfilterItem] = useState("");
  const token = useToken();
  const [search, setsearch] = useState("");
  const ref = useRef(null);
  const [courseCategory, setcourseCategory] = useState([]);

  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
    const loadData = async () => {
      let courseRef = await firebase.firestore().collection("courses").get();
      const courseCategoryRef = await firebase
        .firestore()
        .collection("categories")
        .doc("courseCategory")
        .get();
      setcourseCategory(courseCategoryRef.data().categories);
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
        if (e.data().enrolleduser.includes(token?.email)) {
          return {
            id: e.id,
            data: e.data(),
          };
        }
      });
      enrolledCourse = enrolledCourse.filter((e) => e !== undefined);
      setenrolledCourse(enrolledCourse);

      let unenrolledCourse = courseRef?.map((e) => {
        if (!e.data().enrolleduser.includes(token?.email)) {
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

  return (
    <>
      <Header
        pageName="Courses"
        bgImage={
          "https://www.s7template.com/react/eduskills/assets/images/banner-image-00.jpg"
        }
        bcpt1="Home"
        bcl1="/"
        bcpt2=" / Courses"
        bcl2=""
        bcpt3=""
        bcl3=""
        bcpt4=""
      />

      <Container>
        <div className="d-flex justify-content-between mb-5 mt-5">
          <div className="d-flex">
            {courseCategory.map((e, index) => (
              <button
                key={index}
                className="filterItems px-4 py-1 mr-2 btn btn-dark"
                onClick={() => setfilterItem(e === "All" ? "" : e)}
              >
                {e}
              </button>
            ))}
          </div>

          <div className="d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={(e) => setsearch(e.target.value)}
              aria-label="Search"
              value={search}
            />
            <MDBBtn
              gradient="aqua"
              size="sm"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setsearch(ref.current.value);
              }}
              className="mr-auto "
            >
              <img src={require("../Assets/search-icon.png")} alt="search" />
            </MDBBtn>
            <Dictaphone setSearch={setsearch} />
          </div>
        </div>

        {/* Code For E-Learning Cards Below. */}

        <h1>Your Courses</h1>
        {}
        {enrolledCourse?.length > 0 ? (
          <>
            <Row xs={1} md={columnsPerRow}>
              {getColumnsForRow(enrolledCourse)}
            </Row>
          </>
        ) : (
          <div>
            <img className="noCourse" src={nocourse} />
          </div>
        )}

        <h1 className="mt-5">Other Courses</h1>

        {unEnrolledCourse?.length > 0 ? (
          <>
            <Row xs={1} md={columnsPerRow}>
              {getColumnsForRow(unEnrolledCourse)}
            </Row>
          </>
        ) : (
          <div>
            <img className="noCourse" src={nocourse} />
          </div>
        )}
      </Container>
    </>
  );
};

export default Courses;
