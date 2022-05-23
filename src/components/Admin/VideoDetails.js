import { Collapse } from "antd";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Modal, Button } from "antd";
const { Panel } = Collapse;
const VideoDetails = ({ courseVideos, index }) => {
  return (
    <div className="border p-2 rounded my-3">
      <div className="w-100 d-flex justify-content-between">
        <label> Course Id:</label>
        <p>{courseVideos.courseId}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Title:</label>
        <p>{courseVideos.coursetitle}</p>
      </div>
      <div className="w-100 d-flex justify-content-end">
        <AddModal courseId={courseVideos.courseId} />
      </div>
      <Collapse accordion>
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
    if (!state.description || !state.link || !state.title || !state.thumbnail) {
      alert("Make sure to add all the values")
      return
    }
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(courseId)
        .collection("coursevideos")
        .doc(state.id)
        .update(state);
      setdisabledState(true)
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
      <div className="my-2">
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            setdisabledState(false);
          }}
        >
          Edit
        </Button>
        <Button className="mx-4" type="primary" onClick={saveSettings}>
          Save
        </Button>
        <Button danger onClick={deleteDoc}>
          Delete
        </Button>
      </div>

      <div className="w-100 d-flex justify-content-between">
        <label>Video Id:</label>
        <p>{state?.id}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Video Title:</label>
        <input
          className="w-50"
          required
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
          required
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
          required
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
          required
          type="text"
          name="thumbnail"
          value={state?.thumbnail}
        />
      </div>
    </form>
  );
};
const AddModal = ({ courseId }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [state, setstate] = useState({
    title: "",
    thumbnail: "",
    description: "",
    link: "",
  });
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (!state.description || !state.link || !state.title || !state.thumbnail) {
      alert("Make sure to add all the values")
      return
    }
    try {
      const videoId = state.link.split("=")[1];
      firebase
        .firestore()
        .collection("courses")
        .doc(courseId)
        .collection("coursevideos")
        .doc(videoId)
        .set(state)
        .then(() => {
          setstate({
            title: "",
            thumbnail: "",
            description: "",
            link: "",
          });
          setVisible(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setstate({
      title: "",
      thumbnail: "",
      description: "",
      link: "",
    });
    setVisible(false);
  };

  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Video
      </Button>
      <Modal
        okText="Save"
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div className="w-100 d-flex justify-content-between">
            <label>Video Title</label>
            <input
              type="text"
              name="title"
              required
              value={state.title}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Video Link</label>
            <input
              type="text"
              name="link"
              required
              value={state.link}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Video Description</label>
            <textarea
              type="text"
              name="description"
              value={state.description}
              onChange={changeHandler}
              required
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Video Thumbnail</label>
            <input
              type="text"
              name="thumbnail"
              required
              value={state.thumbnail}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
