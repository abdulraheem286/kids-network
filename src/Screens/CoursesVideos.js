import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import firebase from "firebase";
import "firebase/firestore";
import { useLocation, useParams } from "react-router";
import { Row, Col, Container } from "react-bootstrap";
import VideoCard from "../components/ELearning/VideoCard";
import { MDBBtn, MDBInput } from "mdbreact";
import ReviewCard from "../components/ELearning/ReviewCard";
import { useToken } from "../hooks/useToken";
import Header from "../components/ELearning/Header";

export default function CoursesDetails() {
  const [courseVideo, setVideoData] = useState();
  const location = useLocation();
  const params = useParams();
  const [video, setvideo] = useState("");
  const [videoDetails, setvideoDetails] = useState({});
  const [review, setreview] = useState("");
  const [rating, setrating] = useState(0);
  const [sent, setsent] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [deleteComment, setdeleteComment] = useState(false);
  const token = useToken();
  const [videos, setvideos] = useState([]);
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const video = urlSearch.get("video");
    setvideo(video);
    const loaddata = async () => {
      firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .collection("coursevideos")
        .get()
        .then((videos) => {
          const data = videos.docs.map((video) => ({
            id: video.id,
            ...video.data(),
          }));

          setvideos(data);
          setvideoDetails(data.find((item) => item.id === video));
        });
      firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .collection("coursevideos")
        .doc(video)
        .update({
          [token.email.split(".")[0]]: {
            state: location.state,
          },
        });
      firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .get()
        .then((res) => {
          setVideoData(res.data());
        });
      firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .collection("coursevideos")
        .doc(video)
        .collection("reviews")
        .get()
        .then((res) => {
          setreviews(
            res.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
          );
        });
    };
    loaddata();
    setsent(false);
    setdeleteComment(false);
  }, [
    params.id,
    location.search,
    sent,
    deleteComment,
    location.state,
    token.email,
  ]);
  const submitReview = async () => {
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .collection("coursevideos")
        .doc(video)
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
  };
  const deleteComments = async (pageId, itemId) => {
    firebase
      .firestore()
      .collection("courses")
      .doc(pageId)
      .collection("coursevideos")
      .doc(video)
      .collection("reviews")
      .doc(itemId)
      .delete();
    setdeleteComment(true);
  };
  // const videos = [
  //   {
  //     videoUrl: "7eh4d6sabA0",
  //     thumnail:
  //       "https://i.ytimg.com/vi/7eh4d6sabA0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPWI1rL7i47fjCbqRl-XSqR5rIhw",
  //   },
  //   {
  //     videoUrl: "RnFGwxJwx-0",
  //     thumbnail:
  //       "https://i.ytimg.com/an_webp/RnFGwxJwx-0/mqdefault_6s.webp?du=3000&sqp=CNTCtpIG&rs=AOn4CLB2L53U9HpFty8HO_pntCZXTrKBeQ",
  //   },
  //   {
  //     videoUrl: "lsf060bLH_Y",
  //     thumnail:
  //       "https://i.ytimg.com/vi/lsf060bLH_Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCI5XbXWsan8bHDrdfLWpGleSLmpA",
  //   },
  //   {
  //     videoUrl: "6uE4nfFgc5Q",
  //     thumnail:
  //       "https://i.ytimg.com/vi/6uE4nfFgc5Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDjqEWyJRhDVGmH-DnVH9LWoOqlKg",
  //   },
  //   {
  //     videoUrl: "eq7KF7JTinU",
  //     thumbnail:
  //       "https://i.ytimg.com/vi/eq7KF7JTinU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAc27dJxOlZjF2NjYYS0I3FotyJEg",
  //   },
  // ];

  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <Header
        pageName="Courses Videos"
        bgImage={
          "https://img.freepik.com/free-photo/happy-family-watching-movie-laptop-while-eating-popcorn-home_637285-12232.jpg?t=st=1653321620~exp=1653322220~hmac=47076cf7fe5272d3d5f2837f77fbc188a474017bb6ee8eecf47a1122e1457a25&w=996"
        }
        bcpt1="Home"
        bcl1="/"
        bcpt2=" / Courses"
        bcl2="/courses"
        bcpt3=" / Course Details"
        bcl3=""
        bcpt4=" / Course Videos"
      />

      {courseVideo && (
        <Container fluid className=" mx-auto">
          <Row>
            <Col md={8}>
              <Iframe
                url={`https://www.youtube.com/embed/${video}`}
                width="100%"
                height="450px"
                id="V1"
                display="initial"
                position="relative"
              />
              <h2>Title</h2>
              <p>{videoDetails?.title}</p>
              <h4>{courseVideo.coursecategory}</h4>
              <h4>Description</h4>
              <p>{videoDetails?.description}</p>
              <form className="mb-2">
                <h4>Add a comment</h4>
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
              <div className="">
                <h4>Comments: </h4>
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    itemId={review.id}
                    pageId={params.id}
                    videoId={video}
                    name={review.name}
                    comment={review.comment}
                    stars={review.stars}
                    deleteComment={deleteComments}
                  />
                ))}
              </div>
            </Col>
            <Col md={4} className="" style={{ overflowY: "auto" }}>
              {videos.map((ele, index) => (
                <VideoCard
                  key={index}
                  title={ele.title}
                  videoLink={ele.id}
                  thumbnail={ele.thumbnail}
                  author={courseVideo?.author}
                />
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
