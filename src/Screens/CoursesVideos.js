import React, { useEffect, useState, useContext } from "react";
import Iframe from "react-iframe";
import firebase from "firebase";
import "firebase/firestore";
import { useParams } from "react-router";

export default function CoursesDetails() {
  const [courseVideo, setVideoData] = useState();
  const params = useParams();
  const docId = JSON.stringify(params.id);
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
  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      {courseVideo && (
        <>
          <Iframe
            url={courseVideo.coursevideos[0]}
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
