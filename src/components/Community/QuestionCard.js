import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faThumbsUp,
  faTrashCan,
  faPenToSquare,
  faThumbsDown,
} from "@fortawesome/free-regular-svg-icons";
import firebase from "firebase";
import AnswerCard from "./AnswerCard";
import PostStatus from "./PostStatus";
import { useToken } from "../../hooks/useToken";
import { Input, Button } from "antd";
import { useRef } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const QuestionCard = ({ post }) => {
  const token = useToken();
  const [answers, setanswers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState({
    subject: "",
    image: "",
  });
  const [postAnswer, setpostAnswer] = useState(false);
  const [allLikes, setallLikes] = useState(0);
  const [allDislikes, setallDislikes] = useState(0);
  const ref = useRef(null);
  const [likeColor, setlikeColor] = useState("")

  useEffect(() => {
    firebase
      .firestore()
      .collection("questions")
      .doc(post.id)
      .collection("answers")
      .onSnapshot((snapshot) => {
        const answers = snapshot.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setanswers(answers);
      });
    firebase
      .firestore()
      .collection("questions")
      .doc(post.id)
      .collection("likes")
      .onSnapshot((snapshot) => {
        const likes = snapshot?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        let allLike = 0;
        let allDisLike = 0;
        for (let i = 0; i < likes?.length; i++) {

          if (likes[i]?.like === true) {
            allLike += 1;
            if (likes[i].id == token.id) {
              setlikeColor("blue")
            }
          } else {
            allDisLike += 1;
            if (likes[i].id == token.id) {
              setlikeColor("red")
            }
          }
        }
        setallLikes(allLike);
        setallDislikes(allDisLike);
      });
  }, []);
  const deletePost = async () => {
    try {
      await firebase.firestore().collection("questions").doc(post?.id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .firestore()
        .collection("questions")
        .doc(post?.id)
        .update({
          ...state,
          image: state?.image ? state.image : post.image,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setState({
        subject: "",
        image: "",
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const setLike = async () => {
    try {
      await firebase
        .firestore()
        .collection("questions")
        .doc(post?.id)
        .collection("likes")
        .doc(token.id)
        .set({
          like: true,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log(error);
    }
  };
  const setDisLike = async () => {
    try {
      await firebase
        .firestore()
        .collection("questions")
        .doc(post?.id)
        .collection("likes")
        .doc(token.id)
        .set({
          like: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log(error);
    }
  };
  const openFile = () => {
    ref.current.click();
  };
  return (
    <div
      className="d-flex my-3 "
      style={{
        borderRadius: "15px",
        filter:
          "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
      }}
    >
      <div
        className="d-flex align-items-center mt-1 mr-2"
        style={{ flexDirection: "column", marginLeft: "-26px" }}
      >
        <FontAwesomeIcon icon={faThumbsUp} style={{ color: likeColor === "blue" ? "blue" : "" }} onClick={setLike} className="icon" />
        {allLikes - allDislikes >= 0 ? (
          <p>{allLikes - allDislikes}</p>
        ) : (
          <p style={{ color: "red" }}>{allLikes - allDislikes}</p>
        )}

        <FontAwesomeIcon
          icon={faThumbsDown}
          onClick={setDisLike}
          className="icon"
          style={{ marginTop: "-12px", color: likeColor === "red" ? "red" : "" }}
        />
      </div>

      <section
        className=" h-100 p-4"
        style={{
          flex: "1 1 0%",
          fontSize: "12px",
          background: "white",
          borderRadius: "6px",
        }}
      >
        <div className="d-flex justify-content-between">
          <p>
            {((token.id === post?.userId && token?.expert) || post?.expert) && (
              <span
                style={{
                  backgroundColor: "purple",
                  color: "white",
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                Expert
              </span>
            )}{" "}
            Posted by
            <strong>{post?.postedBy}</strong> on
            {post?.timestamp?.toDate()?.toLocaleDateString()}
          </p>

          {(token?.isAdmin || token.id === post?.userId) && (
            <div className="mx-5">
              <FontAwesomeIcon
                className="mx-2"
                style={{ height: "14px" }}
                onClick={deletePost}
                icon={faTrashCan}
              />
              <FontAwesomeIcon
                className="mx-2"
                style={{ height: "14px" }}
                onClick={() => setEdit(!edit)}
                icon={faPenToSquare}
              />
            </div>
          )}
        </div>

        <h6>
          {edit ? (
            <form
              onSubmit={editPost}
              className="d-flex align-items-center my-2"
            >
              <Input
                value={state.subject}
                style={{
                  width: "100%",
                  minHeight: "40px",
                  borderRadius: "100px",
                }}
                onChange={(e) =>
                  setState({ ...state, subject: e.target.value })
                }
              />
              <div>
                <FontAwesomeIcon
                  className="mx-2"
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
                      setState({ ...state, image: e.target.result });
                    };
                  }}
                />
              </div>
              {state?.image && (
                <img src={state.image} alt="post" className="w-25 h-25 m-2" />
              )}

              <Button className="btn btn-dark p-0 px-2" htmlType="submit">
                Submit
              </Button>
            </form>
          ) : (
            <div>
              <p className=" m-2" style={{ fontSize: "16px" }}>
                {post?.subject}
              </p>
              <>
                {post?.image && (
                  <div style={{ maxWidth: "700px", maxHeight: "400px" }}>
                    <img
                      src={post?.image}
                      alt="post"
                      className="m-2"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </div>
                )}
              </>
            </div>
          )}
        </h6>
        <div
          style={{ fontSize: "16px", marginTop: "20px" }}
          className="d-flex justify-content-evenly border-top p-1"
        >
          <div
            onClick={() => setpostAnswer(!postAnswer)}
            className="item-box p-2"
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon icon={faMessage} className="icon mr-1" />
            <p className="p-0 m-0">
              {" "}
              <small className="btn-info px-2 rounded-pill py-1">
                {post?.comments} Comments
              </small>
            </p>
          </div>
        </div>

        <div>
          {answers?.map((answer) => {
            return (
              <AnswerCard post={answer} questionId={post.id} key={answer.id} />
            );
          })}
        </div>
        {postAnswer && <PostStatus type="Answer" activePostId={post.id} />}
      </section>
    </div>
  );
};

export default QuestionCard;
