import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { useParams } from "react-router";
import Headers from "./../components/ELearning/Header";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdbreact";
import ReviewCard from "../components/ELearning/ReviewCard";
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
  const [deleteComment, setdelete] = useState(false);
  const [mainVideo, setmainVideo] = useState();
  const [currentUserReview, setcurrentUserReview] = useState(true)

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
      setreview("");
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
          setreviews(res.docs.map((e) => {
            if (e.data().name == `${token.fName} ${token.lName}`) {
              setcurrentUserReview(false)
            }
            return { id: e.id, ...e.data() }
          })
          )
        });
      firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .collection("coursevideos")
        .get()
        .then((res) => {
          setmainVideo(res.docs.map((e) => ({ id: e.id, ...e.data() }))[0]);
        });
      setsent(false);
      setdelete(false);
    };

    loaddatas();
  }, [params.data, enrolledUser, token.email, sent, deleteComment]);
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
  const deleteComments = async (pageId, itemId) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(pageId)
      .collection("reviews")
      .doc(itemId)
      .delete();
    setdelete(true);
  };

  return (
    <>
      <Headers
        pageName="Course Details"
        bgImage={
          "https://www.ideafist.com/wp-content/uploads/2013/05/contact-us-banner.jpg"
        }
        bcpt1="Home"
        bcl1="/"
        bcpt2=" / Courses"
        bcl2="/courses"
        bcpt3=" / Course Details"
        bcl3=""
        bcpt4=""
      />

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
                  <h6>
                    By{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {courseData?.author}
                    </span>
                  </h6>
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
                      height: "fit-content",
                    }}
                  >
                    <h4>Description</h4>
                    <p>{courseData?.detailedDescription}</p>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <h5>
                      Reviews: <small>({reviews?.length})</small>{" "}
                    </h5>
                    {reviews?.map((item) => (
                      <ReviewCard
                        key={item.id}
                        photo="https://i.ibb.co/prSK5Kj/imgbin-avatar-child-computer-icons-user-profile-png.png"
                        enrolled={enrolledUser}
                        name={item.name}
                        pageId={params.data}
                        itemId={item.id}
                        comment={item.comment}
                        stars={item.stars}
                        deleteComment={deleteComments}
                      />
                    ))}
                  </div>
                </div>
                <div style={{ width: "35%" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "auto",
                      height: "fit-content",
                      borderRadius: "10px",
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                    }}
                  >
                    <CourseDetailsCard courseDetails={courseData} />
                    <div className="pl-4 pr-4">
                      {enrolledUser && currentUserReview && (
                        <form className=" w-100 my-5">
                          <h4>Leave a review: </h4>

                          <MDBInput
                            value={review}
                            name={"review"}
                            onChange={(e) => setreview(e.target.value)}
                            type="textarea"
                            background
                          />
                          <div className="mb-2" style={{ cursor: "pointer" }}>
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
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {enrolledUser ? (
                      <div>
                        <button
                          className="btn btn-danger btn-lg mr-2 mt-4"
                          style={{
                            width: "40%",
                          }}
                          onClick={() => UnEnrollUser()}
                        >
                          UnEnroll
                        </button>
                        <button
                          className="btn btn-success btn-lg mt-4"
                          style={{
                            width: "40%",
                          }}
                          onClick={() =>
                            navigate(
                              `/courseVideos/${params.data}?video=${mainVideo?.id}`,
                              { state: "opened" }
                            )
                          }
                        >
                          See Videos
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-success btn-lg mr-2 mt-4"
                        style={{ width: "100%" }}
                        onClick={() => EnrollUser()}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
