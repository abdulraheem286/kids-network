import React, { useEffect, useState } from "react";
import { Collapse, Tooltip, List, Typography, Select } from "antd";
import firebase from "firebase";
import CourseDetails from "./CourseDetails";
import { Modal, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import VideoDetails from "./VideoDetails";
import CourseInfo from "./CourseInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
const { Panel } = Collapse;

const CourseCard = () => {
  const [courses, setcourses] = useState([]);
  const [courseVideos, setcourseVideos] = useState([]);
  const [courseCategory, setcourseCategory] = useState([]);
  const [category, setcategory] = useState("");
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
      firebase
        .firestore()
        .collection("categories")
        .doc("courseCategory")
        .get()
        .then((res) => {
          if (res?.data()) {
            setcourseCategory(res.data()?.categories);
          }
        });
    };
    loadData();
    setrefresh(false);
  }, [refresh]);
  const addCourseCategory = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Make sure to add a category")
      return
    }
    setcourseCategory([...courseCategory, category]);
    setcategory("");
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .firestore()
        .collection("categories")
        .doc("courseCategory")
        .set({ categories: courseCategory });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCategory = (item) => {
    setcourseCategory(courseCategory.filter((category) => category !== item));
  };
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
      <Collapse accordion>
        <Panel header="Courses" key="1" extra={<AddModal categories={courseCategory} />}>
          {courses.map((course) => (
            <CourseDetails
              key={course.id}
              categories={courseCategory}
              course={course}
            />
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
        <Panel header="Course Details" key="3">
          {courses.map((course, index) => (
            <CourseInfo
              key={course.id}
              courseTitle={course.coursetitle}
              courseInfo={course}
              cousreId={course.id}
            />
          ))}
        </Panel>
        <Panel
          header="Course Category"
          key="4"
          extra={
            <Button type="primary" onClick={saveCategory}>
              Save
            </Button>
          }
        >
          <List
            bordered
            dataSource={courseCategory}
            renderItem={(item, index) => (
              item !== "All" &&
              <List.Item className="w-50 d-flex justify-content-between">
                <div>
                  <Typography.Text mark>{index}</Typography.Text> {item}
                </div>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => removeCategory(item)}
                />
              </List.Item>
            )}
          />
          <form className="d-flex">
            <input
              type="text"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="w-25"
              placeholder="Add Category"
            />
            <Button className="ml-4" type="primary" onClick={addCourseCategory}>
              Add Course Category{" "}
            </Button>
          </form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CourseCard;

const AddModal = ({ categories }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [state, setstate] = useState({
    coursecategory: "",
    coursetitle: "",
    coursedescription: "",
    courseimage: "",
    enrolleduser: [],
  });
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    if (!state.coursecategory || !state.coursetitle || !state.coursedescription || !state.courseimage) {
      alert("Make sure to add value in all fields")
      return
    }
    try {
      const course = await firebase
        .firestore()
        .collection("courses")
        .add(state);
      if (course) {
        setstate({
          coursecategory: "",
          coursetitle: "",
          coursedescription: "",
          courseimage: "",
        });
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setstate({
      coursecategory: "",
      coursetitle: "",
      coursedescription: "",
      courseimage: "",
    });
    setVisible(false);
  };

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
          <div className="w-100 mb-2 d-flex justify-content-between">
            <label className="w-50">Course Category</label>
            <Select className="w-50" value={state.coursecategory} onChange={e => setstate({ ...state, coursecategory: e })}>
              {categories?.map((category, index) => (
                category !== "All" && <Select.Option key={index} value={category}>
                  {category}
                </Select.Option>

              ))}
            </Select>
          </div>
          <div className="w-100 d-flex justify-content-between">
            <label>Course Description</label>
            <textarea
              type="text"
              required
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
              required
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
