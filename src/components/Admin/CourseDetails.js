import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import firebase from "firebase";
import { Button } from "antd";
import { Select } from "antd";
const { Option } = Select;

const CourseDetails = ({ course, categories }) => {
  const [state, setstate] = useState({
    coursecategory: "",
    coursetitle: "",
    coursedescription: "",
    courseimage: "",
    enrolleduser: [],
    id: "",
    ...course,
  });
  const [disableState, setdisableState] = useState(true);
  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    if (
      !state.coursecategory ||
      !state.coursetitle ||
      !state.coursedescription ||
      !state.courseimage
    ) {
      alert("Make sure to add value in all fields");
      return;
    }
    await firebase
      .firestore()
      .collection("courses")
      .doc(state.id)
      .update(state);
    setdisableState(true);
  };
  const updateEnrolledUsers = (user) => {
    setstate({
      ...state,
      enrolleduser: state.enrolleduser.filter((item) => item !== user),
    });
  };
  const deleteCourse = async (e) => {
    e.preventDefault();
    await firebase.firestore().collection("courses").doc(state.id).delete();
    alert("Course Deleted");
  };
  return (
    <form className="border rounded my-3 p-2">
      <div className="d-flex">
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            setdisableState(false);
          }}
        >
          Edit
        </Button>
        <Button className="mx-4" type="primary" onClick={saveSettings}>
          Save
        </Button>
        <Button danger onClick={deleteCourse}>
          Delete
        </Button>
      </div>

      <div className="d-flex justify-content-between">
        <label>Course Id:</label>
        <p>{state.id}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Title</label>
        <input
          type="text"
          name="coursetitle"
          required
          value={state.coursetitle}
          onChange={changeHandler}
          disabled={disableState}
          className="w-50"
        />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Category</label>
        <Select
          disabled={disableState}
          defaultValue={state?.coursecategory}
          className="w-50 my-2"
          onChange={(e) => setstate({ ...state, coursecategory: e })}
        >
          {categories.map(
            (item, index) =>
              item !== "All" && (
                <Option key={index} value={item}>
                  {item}
                </Option>
              )
          )}
        </Select>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Description</label>
        <textarea
          type="text"
          name="coursedescription"
          required
          value={state.coursedescription}
          onChange={changeHandler}
          disabled={disableState}
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
          disabled={disableState}
          className="w-50"
        />
      </div>
      <div>
        <label>Enrolled User</label>
        <ul>
          {state.enrolleduser.map((user, index) => (
            <li className="w-50 d-flex justify-content-between " key={index}>
              {" "}
              {user}
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => updateEnrolledUsers(user)}
              />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default CourseDetails;
