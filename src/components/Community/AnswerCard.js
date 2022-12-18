import React, { useState } from "react";
import { useToken } from "../../hooks/useToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import firebase from "firebase";
import { Input, Button } from "antd";

const AnswerCard = ({ questionId, post }) => {
  const token = useToken();
  const [edit, setedit] = useState(false);
  const [subject, setsubject] = useState("");
  const deletePost = async () => {
    try {
      await firebase
        .firestore()
        .collection("questions")
        .doc(questionId)
        .collection("answers")
        .doc(post?.id)
        .delete();
      await firebase
        .firestore()
        .collection("questions")
        .doc(questionId)
        .update({
          comments: firebase.firestore.FieldValue.increment(-1),
        });
    } catch (error) {
      console.log(error);
    }
  };
  const editPost = async () => {
    try {
      await firebase
        .firestore()
        .collection("questions")
        .doc(questionId)
        .collection("answers")
        .doc(post?.id)
        .update({
          subject,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-5" style={{ borderRadius: "15px" }}>
      <section
        className="p-2"
        style={{
          borderLeft: "1px Solid rgba(0,0,0,0.2)",
          flex: "1 1 0%",
          fontSize: "12px",
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
            )}
            Posted by {post?.postedBy} on
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
                onClick={() => setedit(!edit)}
                icon={faPenToSquare}
              />
            </div>
          )}
        </div>
        <h6>
          <span
            className="bg-success rounded-pill fw-bold p-1 text-light"
            style={{ marginRight: "10px", fontSize: "12px" }}
          >
            #Reply
          </span>
          {edit ? (
            <form
              onSubmit={editPost}
              className="d-flex align-items-center my-2"
            >
              <Input
                value={subject}
                style={{
                  width: "100%",
                  minHeight: "40px",
                  borderRadius: "100px",
                }}
                onChange={(e) => setsubject(e.target.value)}
              />
              <Button className="btn btn-dark p-0 px-2" htmlType="submit">
                Submit
              </Button>
            </form>
          ) : (
            post?.subject
          )}
        </h6>
        <div
          style={{ fontSize: "16px", marginTop: "20px" }}
          className="d-flex justify-content-evenly border-top p-1"
        ></div>
      </section>
    </div>
  );
};

export default AnswerCard;
