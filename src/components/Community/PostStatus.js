import React, { useRef, useState } from "react";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
const PostStatus = ({ type, activePostId }) => {
  const ref = useRef(null)
  const token = useToken();
  const [state, setstate] = useState({
    subject: "",
    image: ""
  });
  const changeHandler = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (type === "Question") {
        await firebase
          .firestore()
          .collection("questions")
          .add({
            ...state,
            postedBy: `${token.fName} ${token.lName}`,
            userId: token.id,
            likes: 0,
            comments: 0,
            expert: token?.expert ? true : false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      } else {
        await firebase
          .firestore()
          .collection("questions")
          .doc(activePostId)
          .collection("answers")
          .add({
            ...state,
            postedBy: `${token.fName} ${token.lName}`,
            userId: token.id,
            expert: token?.expert ? true : false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        await firebase
          .firestore()
          .collection("questions")
          .doc(activePostId)
          .update({
            comments: firebase.firestore.FieldValue.increment(1),
          });
      }
      setstate({
        subject: "",
        image: ""
      });
    } catch (error) {
      console.log(error);
    }
  };
  const openFile = () => {
    ref.current.click()
  }
  return (
    <form onSubmit={submitHandler} className="p-2 rounded bg-light">
      <div className="d-flex p-4 justify-content-between border" style={{
        alignItems: "end"
      }}>

        <div style={{ flex: "1 1 0" }}>
          {type === "Question" && (
            <label
              className="bg-danger p-1 mb-2 rounded-pill"
              style={{ color: "white" }}
            >
              #Thread
            </label>
          )}
          <input
            required
            name="subject"
            value={state.subject}
            placeholder={
              type === "Question" ? "What's the status ..." : "Post a comment ..."
            }
            onChange={changeHandler}
            className="bg-light"
            style={{
              border: "none",
              borderRadius: "0px",
              borderBottom: "1px solid black",
              outline: "none",
            }}
          />

        </div>
        <div>
          <FontAwesomeIcon className="ml-2" style={{ height: "20px" }} onClick={openFile} icon={faCameraAlt} />
          <input
            type={"file"}
            ref={ref}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) {
                return
              }
              if (file.size > 250000) {
                alert("File Size should not be more than 250kb")
                return
              }
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function (e) {
                setstate({ ...state, image: e.target.result });
              };
            }}
          />
        </div>
      </div>
      {
        state.image && (
          <img src={state.image} alt="post" className="w-25 h-25 m-2" />
        )
      }

      <button className="btn btn-primary rounded p-1" type="submit">
        {type === "Question" ? "Post a Thread" : "Post a Comment"}
      </button>
    </form>
  );
};

export default PostStatus;
