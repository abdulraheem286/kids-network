import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import firebase from "firebase";
import "firebase/firestore";
import { useParams } from "react-router";

export default function CoursesDetails() {
  const [courseVideo, setVideoData] = useState();
  useEffect(async () => {
    firebase
      .firestore()
      .collection("courses")
      .doc("lRxlabQoxMF4eIIfkEcP")
      .get()
      .then((res) => {
        setVideoData(res.data());
      });
  }, []);

  return (
    <>
      {courseVideo && (
        <>
          <Iframe
            url={courseVideo.coursevideos}
            width="700px"
            height="450px"
            id="V1"
            display="initial"
            position="relative"
          />
          <h1>{courseVideo.coursecategory}</h1>
        </>
      )}
    </>
  );
}
