import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { useParams } from "react-router";
import AuthContext from "./../components/AuthContext";
import Headers from "./../components/ELearning/Header";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CoursesDetails(props) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const params = useParams();
  const [courseData, setCourseData] = useState();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
  const [enrolledUser, setenrolledUser] = useState(false);

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
            res.data()?.enrolleduser?.find((element) => element === user.email)
          );
        });
    };

    loaddatas();
  }, [params.data, enrolledUser, user.email]);
  const UnEnrollUser = async () => {
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(params.data)
        .update({
          enrolleduser: firebase.firestore.FieldValue.arrayRemove(user.email),
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
          enrolleduser: firebase.firestore.FieldValue.arrayUnion(user.email),
        });
      setenrolledUser(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Headers pageName="Course Details" />
      <Container>
        {courseData && (
          <>
            <div>
              <div
                className="d-flex flex-row mt-5"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "65%" }}>
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
                  <p className="mt-1">{courseData.coursedescription}</p>
                  <small className="font-weight-bold">(8 Reviews)</small>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "25%",
                    alignItems: "center",
                  }}
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
                  {/* <button
                    className="btn btn-success btn-lg rounded-pill"
                    onClick={() => EnrollUser()}
                  >
                    Enroll Now
                  </button> */}
                </div>
              </div>
            </div>

            {/* <div
              className="d-flex flex-row mt-5"
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ width: "60%" }}>
                <h4 className="font-weight-bold">About This Course</h4>
                <p className="mt-1">{courseData.coursedescription}</p>
                <h4 className="font-weight-bold">What You'll Learn</h4>
                <p className="mt-1">{courseData.coursedescription}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25%",
                  alignItems: "center",
                }}
              >
                <small className="font-weight-bold">
                  {" "}
                  Students: {courseData.enrolleduser.length}
                </small>
                <small className="font-weight-bold">
                  {" "}
                  {courseData.courseduration}
                </small>
              </div>
            </div> */}
          </>
        )}
      </Container>
    </>
  );
}
