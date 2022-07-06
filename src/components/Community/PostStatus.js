import React, { useRef, useState } from "react";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Input, Select } from "antd";
import avatar from "../../Assets/avatar.png";

const PostStatus = ({ type, activePostId }) => {
  const ref = useRef(null);
  const token = useToken();
  const [state, setstate] = useState({
    subject: "",
    image: "",
    category: "Post Category"
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
        image: "",
        category: "Post Category"

      });
    } catch (error) {
      console.log(error);
    }
  };
  const openFile = () => {
    ref.current.click();
  };
  return (
    <form onSubmit={submitHandler} className="addPost rounded">
      <div
        className=" d-flex mb-2 justify-content-between "
        style={{
          alignItems: "center",
        }}
      >
        <img
          alt="avatar"
          className="rounded-circle mr-3 mt-2 mb-2"
          src={avatar}
          style={{ width: "40px", height: "40px", color: "grey" }}
        />

        <Input
          name="subject"
          placeholder={
            type === "Question"
              ? "Type what you want to share ..."
              : "Reply Now ..."
          }
          value={state.subject}
          onChange={changeHandler}
          style={{
            width: "100%",
            minHeight: "40px",
            borderRadius: "100px",
          }}
          required
        />
        {type === "Question" && <Select value={state.category} className="mx-1 rounded" onChange={(e) => setstate({ ...state, category: e })}>
          <Select.Option value="Question">Question</Select.Option>
          <Select.Option value="General Discussion">General Discussion</Select.Option>
          <Select.Option value="Suggestion">Suggestion</Select.Option>
          <Select.Option value="Advice">Advice</Select.Option>

        </Select>}
        <div>
          <FontAwesomeIcon
            className="ml-3"
            style={{ height: "35px", color: "#113C49" }}
            onClick={openFile}
            icon={faImage}
          />
          <input
            type={"file"}
            ref={ref}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) {
                return;
              }
              if (file.size > 250000) {
                alert("File Size should not be more than 250kb");
                return;
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

      {state.image && (
        <img src={state.image} alt="post" className="w-25 h-25 m-2" />
      )}

      <button
        className="btn btn-info rounded p-2"
        style={{ right: "0" }}
        type="submit"
      >
        {type === "Question" ? "Submit Post" : "Reply"}
      </button>
    </form>
  );
};

export default PostStatus;
