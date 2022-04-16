import React, { useEffect, useState } from "react";
import { Collapse, Tooltip } from "antd";
import firebase from "firebase";
import CourseDetails from "./CourseDetails";
import { Modal, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import VideoDetails from "./VideoDetails";
const { Panel } = Collapse;

const CourseCard = () => {
  const [courses, setcourses] = useState([]);
  const [courseVideos, setcourseVideos] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const getVideos = async (data) => {
    try {
      const videosData = data.map(async (item) => {
        const videos = await firebase
          .firestore()
          .collection("courses")
          .doc(item.id)
          .collection("coursevideos")
          .get();
        return {
          courseId: item.id,
          coursetitle: item.coursetitle,
          videos: videos.docs.map((video) => ({
            id: video.id,
            ...video.data(),
          })),
        };
      });
      setcourseVideos(await Promise.all(videosData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      firebase
        .firestore()
        .collection("courses")
        .get()
        .then((res) => {
          const data = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setcourses(data);
          getVideos(data);
        });
    };
    loadData();
    setrefresh(false);
  }, [refresh]);
  return (
    <div>
      <Tooltip title="refresh">
        <Button
          type="primary"
          onClick={() => setrefresh(!refresh)}
          icon={<ReloadOutlined />}
        >
          Refresh
        </Button>
      </Tooltip>
      <Collapse>
        <Panel header="Course Details" key="1" extra={<AddModal />}>
          {courses.map((course) => (
            <CourseDetails key={course.id} course={course} />
          ))}
        </Panel>
        <Panel header="Course Videos" key="2">
          {courseVideos.map((course, index) => (
            <VideoDetails
              key={course.courseId}
              index={index}
              courseVideos={course}
            />
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CourseCard;

const AddModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const course = await firebase
        .firestore()
        .collection("courses")
        .add(state);
      if (course) {
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const [state, setstate] = useState({
    coursecategory: "",
    coursetitle: "",
    coursedescription: "",
    courseimage: "",
    enrolleduser: [],
  });
  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Course
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form>
          <div className="w-100 d-flex justify-content-between">
            <label>Course Title</label>
            <input
              type="text"
              name="coursetitle"
              required
              value={state.coursetitle}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Course Category</label>
            <input
              type="text"
              name="coursecategory"
              required
              value={state.coursecategory}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Course Description</label>
            <textarea
              type="text"
              name="coursedescription"
              value={state.coursedescription}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Course Image</label>
            <input
              type="text"
              name="courseimage"
              value={state.courseimage}
              onChange={changeHandler}
              className="w-50"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
