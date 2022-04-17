import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
    <div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setdisableState(false);
          }}
          type=""
        >
          Edit
        </button>
        <button onClick={updateDoc} type="">
          Save
        </button>
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
              <li className="w-50 d-flex justify-content-between " key={index}>
                {chapter}
                <FontAwesomeIcon
                  icon={faTrash}
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
          <button
            type=""
            onClick={(e) => {
              e.preventDefault();
              setstate({ ...state, chapters: [...state.chapters, chapter] });
              setchapter("");
            }}
          >
            Add Chapters
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
