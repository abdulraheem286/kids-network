import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { useParams } from "react-router";
import Headers from "./../components/ELearning/Header";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBInput,
} from "mdbreact";
import { Link } from "react-router-dom";
import ReviewCard from "../components/ELearning/ReviewCard";
import ChapterCards from "../components/ELearning/ChapterCards";
import { useToken } from "../hooks/useToken";
import CourseDetailsCard from "../components/ELearning/CourseDetailsCard";

export default function CoursesDetails(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [courseData, setCourseData] = useState();
  const token = useToken();
  const [enrolledUser, setenrolledUser] = useState(false);
  const [review, setreview] = useState("");
  const [reviews, setreviews] = useState([]);
  const [rating, setrating] = useState(0);
  const [sent, setsent] = useState(false);

  async function submitReview() {
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .collection("reviews")
        .add({
          name: `${token.fName} ${token.lName}`,
          comment: review,
          stars: rating,
        });
      setreview(0);
      setrating(0);
      setsent(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const loaddatas = async () => {
      firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .get()
        .then((res) => {
          setCourseData(res.data());
          setenrolledUser(
            res.data()?.enrolleduser?.find((element) => element === token.email)
          );
        });
      firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .collection("reviews")
        .get()
        .then((res) => {
          setreviews(res.docs.map((e) => ({ id: e.id, ...e.data() })));
        });
      setsent(false);
    };

    loaddatas();
  }, [params.data, enrolledUser, token.email, sent]);
  const UnEnrollUser = async () => {
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .update({
          enrolleduser: firebase.firestore.FieldValue.arrayRemove(token.email),
        });
      setenrolledUser(false);
    } catch (error) {
      console.log(error);
    }
  };
  async function EnrollUser() {
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .update({
          enrolleduser: firebase.firestore.FieldValue.arrayUnion(token.email),
        });
      setenrolledUser(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Headers
        pageName="Course Details"
        bgImage={
          "https://images.pexels.com/photos/414548/pexels-photo-414548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
      <BreadcrumbPage />
      <Container>
        {courseData && (
          <>
            <div>
              <div
                className="d-flex flex-row mt-5"
                style={{
                  justifyContent: "space-between",
                  maxWidth: "95%",
                  margin: "auto",
                }}
              >
                <div style={{ width: "60%" }}>
                  <h2 className="font-weight-bold text-danger">
                    {courseData.coursetitle}
                  </h2>
                  <h6>By Abdullah Riaz</h6>
                  <img
                    src={courseData.courseimage}
                    alt="courseimages"
                    style={{
                      marginTop: 40,
                      marginBottom: 40,
                      maxWidth: "100%",
                      height: 400,
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 50,
                      height: "fit-content",
                    }}
                  >
                    <h3>Description</h3>
                    <p>
                      Veniam mollit excepteur excepteur amet aliquip quis sint
                      esse id cillum. Duis irure laboris consectetur laboris
                      anim. Consectetur enim ad nulla do proident occaecat est.
                      Reprehenderit sunt occaecat adipisicing pariatur ex.
                      Dolore exercitation laborum fugiat labore quis. Aliquip
                      laboris amet enim proident nisi velit veniam nisi nostrud.
                    </p>
                    <h3>Course Contents: </h3>
                    <div
                      className="border rounded-3 my-5"
                      style={{
                        borderRadius: "5px",
                        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      {new Array(5).fill(0).map((_, index) => (
                        <ChapterCards
                          number={index}
                          key={index}
                          title={
                            "How to do this and Eran more monryadsadsadasdsad"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3>
                      Reviews: <small>({reviews?.length})</small>{" "}
                    </h3>
                    {reviews?.map((item) => (
                      <ReviewCard
                        key={item.id}
                        name={item.name}
                        comment={item.comment}
                        stars={item.stars}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                    height: "fit-content",
                    borderRadius: "10px",
                    backgroundColor: "#f5f5f5",
                    alignItems: "center",
                    padding: "20px",
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                  }}
                  className=""
                >
                  {enrolledUser ? (
                    <div>
                      <button
                        className="btn btn-danger btn-lg rounded-pill mr-2"
                        onClick={() => UnEnrollUser()}
                      >
                        UnEnroll
                      </button>
                      <button
                        className="btn btn-success btn-lg rounded-pill"
                        onClick={() =>
                          navigate(
                            `/courseVideos/${
                              params.data
                            }?video=${"7eh4d6sabA0"}`
                          )
                        }
                      >
                        See Videos
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-success btn-lg rounded-pill mr-2"
                      onClick={() => EnrollUser()}
                    >
                      Enroll Now
                    </button>
                  )}
                  <CourseDetailsCard />
                  <form className=" w-100 my-5">
                    <h3>Leave a review: </h3>

                    <MDBInput
                      value={review}
                      name={"review"}
                      onChange={(e) => setreview(e.target.value)}
                      type="textarea"
                      background
                    />
                    <div className="mb-2">
                      {new Array(5).fill(0).map((_, i) => {
                        return i < rating ? (
                          <i
                            key={i}
                            onClick={() => setrating(i + 1)}
                            className="fa fa-star text-warning"
                          ></i>
                        ) : (
                          <i
                            key={i}
                            onClick={() => setrating(i + 1)}
                            className="fa fa-star text-secondary"
                          ></i>
                        );
                      })}
                    </div>

                    <MDBBtn onClick={submitReview} color="dark">
                      Submit
                    </MDBBtn>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
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
        <MDBBreadcrumbItem icon="arrow">
          <Link
            to={"/courses"}
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            /Courses
          </Link>
        </MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </MDBContainer>
  );
};
