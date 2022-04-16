import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import firebase from "firebase";

const { Panel } = Collapse;
const VideoDetails = ({ courseVideos, index }) => {
  return (
    <div className="border p-1 my-3">
      <div className="w-100 d-flex justify-content-between">
        <label> Course Id:</label>
        <p>{courseVideos.courseId}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Title:</label>
        <p>{courseVideos.coursetitle}</p>
      </div>
      <Collapse>
        {courseVideos?.videos.map((video) => (
          <Panel header={video.title} key={video.id}>
            <VideoCard video={video} courseId={courseVideos.courseId} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default VideoDetails;
const VideoCard = ({ video, courseId }) => {
  const [state, setstate] = useState({
    title: "",
    thumbnail: "",
    description: "",
    link: "",
    id: "",
  });
  const [disabledState, setdisabledState] = useState(true);
  useEffect(() => {
    setstate({ ...video });
  }, [video]);
  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(courseId)
        .collection("coursevideos")
        .doc(state.id)
        .update(state);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteDoc = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(courseId)
        .collection("coursevideos")
        .doc(state.id)
        .delete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setdisabledState(false);
          }}
        >
          Edit
        </button>
        <button onClick={saveSettings}>Save</button>
        <button onClick={deleteDoc}>Delete</button>
      </div>

      <div className="w-100 d-flex justify-content-between">
        <label>Video Id:</label>
        <p>{state?.id}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Video Title:</label>
        <input
          className="w-50"
          disabled={disabledState}
          onChange={changeHandler}
          type="text"
          value={state?.title}
          name="title"
        />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Video Link</label>
        <input
          className="w-50"
          disabled={disabledState}
          onChange={changeHandler}
          type="text"
          name="link"
          value={state?.link}
        />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Video Description</label>
        <textarea
          className="w-50"
          disabled={disabledState}
          onChange={changeHandler}
          name="description"
          value={state?.description}
        />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Video thumbnail</label>
        <input
          className="w-50"
          disabled={disabledState}
          onChange={changeHandler}
          type="text"
          name="thumbnail"
          value={state?.thumbnail}
        />
      </div>
    </form>
  );
};
