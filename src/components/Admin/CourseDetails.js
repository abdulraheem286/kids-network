import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { Button } from "antd";

const CourseDetails = ({ course }) => {
  const [state, setstate] = useState({
    coursecategory: "",
    coursetitle: "",
    coursedescription: "",
    courseimage: "",
    enrolleduser: [],
    id: "",
  });
  const [disableState, setdisableState] = useState(true);
  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setstate(course);
  }, [course]);
  const saveSettings = async (e) => {
    e.preventDefault();
    await firebase
      .firestore()
      .collection("courses")
      .doc(state.id)
      .update(state);
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
          value={state.coursetitle}
          onChange={changeHandler}
          disabled={disableState}
          className="w-50"
        />
      </div>
      <div className="w-100 d-flex justify-content-between">
        <label>Course Category</label>
        <input
          type="text"
          name="coursecategory"
          value={state.coursecategory}
          onChange={changeHandler}
          disabled={disableState}
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
          disabled={disableState}
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
