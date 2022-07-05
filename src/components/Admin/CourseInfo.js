import React, { useState } from "react";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Button } from "antd";
const CourseInfo = ({ cousreId, courseTitle, courseInfo }) => {
  const [state, setstate] = useState({
    author: "",
    detailedDescription: "",
    price: "",
    lectures: "",
    level: "",
    duration: "",
    language: "",
    chapters: [],
    ...courseInfo,
  });
  const [disableState, setdisableState] = useState(true);
  const [chapter, setchapter] = useState("");

  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const updateDoc = async (e) => {
    e.preventDefault();
    if (
      !state.author ||
      !state.detailedDescription ||
      !state.language ||
      !state.chapters.length ||
      !state.level ||
      !state.lectures ||
      !state.language ||
      !state.price
    ) {
      alert("Make sure to add all values");
      return;
    }
    try {
      await firebase
        .firestore()
        .collection("courses")
        .doc(cousreId)
        .update(state)
        .then(() => {
          setdisableState(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border rounded p-2 my-3">
      <div className="d-flex my-2 justify-content-evenly">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setdisableState(false);
          }}
          type="primary"
        >
          Edit
        </Button>
        <Button onClick={updateDoc} className="mx-4" type="primary">
          Save
        </Button>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <p>Course ID:</p>
        <p>{cousreId}</p>
      </div>
      <div className="w-100 d-flex justify-content-between">
        <p>Course Title:</p>
        <p>{courseTitle}</p>
      </div>
      <form>
        <div className="w-100 d-flex justify-content-between">
          <label>Course Detailed Description:</label>
          <textarea
            className="w-50"
            onChange={changeHandler}
            disabled={disableState}
            name="detailedDescription"
            value={state.detailedDescription}
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Course Author:</label>
          <input
            name="author"
            value={state.author}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Price:</label>
          <input
            name="price"
            value={state.price}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Level:</label>
          <input
            name="level"
            value={state.level}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Lectures:</label>
          <input
            name="lectures"
            value={state.lectures}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Language:</label>
          <input
            name="language"
            value={state.language}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div className="w-100 d-flex justify-content-between">
          <label>Duration:</label>
          <input
            name="duration"
            value={state.duration}
            onChange={changeHandler}
            disabled={disableState}
            className="w-50"
          />
        </div>
        <div>
          <label>Chapters</label>
          <ul>
            {state?.chapters?.map((chapter, index) => (
              <li
                className="w-50 p-0 m-0 d-flex justify-content-between "
                key={index}
              >
                {chapter}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "red" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setstate({
                      ...state,
                      chapters: state.chapters.filter(
                        (item, index) => item !== chapter
                      ),
                    });
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={chapter}
            onChange={(e) => {
              setchapter(e.target.value);
            }}
          />
          <Button
            type="primary"
            className="my-2"
            onClick={(e) => {
              e.preventDefault();
              setstate({ ...state, chapters: [...state.chapters, chapter] });
              setchapter("");
            }}
          >
            Add Chapters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
