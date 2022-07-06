import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import avatar from "../../Assets/avatar.png";

const Chat = ({ author, author_email, product }) => {
  const token = useToken();
  const [message, setmessage] = useState({
    text: "",
    timestamp: null,
    author: "",
  });
  const [messages, setmessages] = useState([]); // db
  const [authorId, setauthorId] = useState("");
  const [changeMessageState, setchangeMessageState] = useState(false); // current write
  useEffect(() => {
    async function getMessages() {
      try {
        const authorId = await firebase
          .firestore()
          .collection("users")
          .where("email", "==", author_email)
          .get();

        const userChat = await firebase
          .firestore()
          .collection("users")
          .doc(authorId.docs[0].id)
          .collection("store")
          .doc(product.id)
          .collection("chats")
          .doc(token.email)
          .get();

        setauthorId(authorId.docs[0].id);
        if (userChat.data()?.chat) {
          setmessages(userChat.data()?.chat);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [changeMessageState]);

  const sendMessage = async () => {
    try {
      const userMessages = [...messages, message];
      setmessages([...messages, message]);
      await firebase
        .firestore()
        .collection("users")
        .doc(authorId)
        .collection("store")
        .doc(product.id)
        .collection("chats")
        .doc(token.email)
        .set({
          chat: [...userMessages],
        });
      setchangeMessageState(!changeMessageState);

      setmessage({ ...message, text: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="d-flex flex-column justify-content-between border mt-3"
      style={{ height: "550px", backgroundColor: "white" }}
    >
      <div
        className="d-flex justify-content-between border-bottom p-1"
        style={{ height: "auto", color: "white" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img
            className="rounded-circle ml-2 mt-2 mb-2"
            src={avatar}
            style={{ width: "50px", height: "50px" }}
          />
          <h5 style={{ color: "black" }} className=" ml-3 mt-2">
            {author}
          </h5>
          <FontAwesomeIcon
            className="mx-3"
            onClick={() => setchangeMessageState(!changeMessageState)}
            icon={faRefresh}
            style={{
              color: "black",
            }}
          />
        </div>
      </div>
      <div className="border-bottom" style={{ height: "100%" }}>
        <Message messages={messages} messageState={changeMessageState} />
      </div>
      <div className="d-flex w-100">
        <input
          className="w-90 h-100 messageChat"
          value={message.text}
          onChange={(e) =>
            setmessage({
              ...message,
              text: e.target.value,
              timestamp: Date.now(),
              author: token.email,
            })
          }
          placeholder="Write A Message..."
        />
        <div className="sendIcon p-0">
          <FontAwesomeIcon
            className="paperPlane"
            onClick={sendMessage}
            icon={faPaperPlane}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
