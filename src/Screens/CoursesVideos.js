import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import firebase from "firebase";
import "firebase/firestore";
import { useLocation, useParams } from "react-router";
import { Row, Col, Container } from "react-bootstrap";
import VideoCard from "../components/ELearning/VideoCard";

export default function CoursesDetails() {
  const [courseVideo, setVideoData] = useState();
  const location = useLocation();
  const params = useParams();
  const docId = JSON.stringify(params.id);
  const [video, setvideo] = useState("");
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const video = urlSearch.get("video");
    console.log("Video", video, params.id);
    setvideo(video);
    const loaddata = async () => {
      firebase
        .firestore()
        .collection("courses")
        .doc(params.id)
        .get()
        .then((res) => {
          console.log(res.data());
          setVideoData(res.data());
        });
    };
    loaddata();
  }, [params.id, location.search]);
  const videos = [
    {
      videoUrl: "7eh4d6sabA0",
      thumnail:
        "https://i.ytimg.com/vi/7eh4d6sabA0/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPWI1rL7i47fjCbqRl-XSqR5rIhw",
    },
    {
      videoUrl: "RnFGwxJwx-0",
      thumbnail:
        "https://i.ytimg.com/an_webp/RnFGwxJwx-0/mqdefault_6s.webp?du=3000&sqp=CNTCtpIG&rs=AOn4CLB2L53U9HpFty8HO_pntCZXTrKBeQ",
    },
    {
      videoUrl: "lsf060bLH_Y",
      thumnail:
        "https://i.ytimg.com/vi/lsf060bLH_Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCI5XbXWsan8bHDrdfLWpGleSLmpA",
    },
    {
      videoUrl: "6uE4nfFgc5Q",
      thumnail:
        "https://i.ytimg.com/vi/6uE4nfFgc5Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDjqEWyJRhDVGmH-DnVH9LWoOqlKg",
    },
    {
      videoUrl: "eq7KF7JTinU",
      thumbnail:
        "https://i.ytimg.com/vi/eq7KF7JTinU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAc27dJxOlZjF2NjYYS0I3FotyJEg",
    },
  ];
  return (
    <div style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      {courseVideo && (
        <Container fluid className="border mx-auto">
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
              <h1>{courseVideo.coursecategory}</h1>
              <h4>Description</h4>
              <p>
                Ad ad laboris sunt reprehenderit nisi qui magna eiusmod ullamco
                cillum eiusmod. Nostrud anim consectetur qui magna adipisicing
                aliquip est consequat proident sit eiusmod occaecat in. Ad non
                do ex ullamco consectetur nisi adipisicing eu fugiat velit do
                dolore ullamco. Eu et ut est Lorem nulla. Nostrud dolore in sint
                ullamco cillum nisi est minim irure magna quis mollit qui. Ipsum
                do elit in ad culpa tempor quis officia quis anim aute. In minim
                consequat anim sunt.
              </p>
            </Col>
            <Col md={4} className="border" style={{ overflowY: "auto" }}>
              {videos.map((ele, index) => (
                <VideoCard
                  key={index}
                  videoLink={ele.videoUrl}
                  thumbnail={ele.thumbnail}
                />
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
