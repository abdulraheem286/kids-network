import React from "react";
import { useToken } from "../../hooks/useToken";
import avatar2 from "../../Assets/avatar2.png";
import "./Message.css";

const Message = ({ messages }) => {
  const token = useToken();

  return (
    <div
      className="h-100"
      style={{
        overflowY: "auto",
        backgroundColor: "whitesmoke",
      }}
    >
      {messages?.map((message, index) => (
        <div
          className={`d-flex rounded align-items-center ${
            message.author !== token.email
              ? "justify-content-end"
              : "justify-content-start"
          }  my-3  w-100`}
          key={index}
        >
          <img
            className="rounded-circle ml-4"
            src={avatar2}
            style={{ width: "25px", height: "25px" }}
          />
          <div className={"m-2 messageText"}>
            <p
              className="p-2 pl-3 pr-3 m-0"
              style={{ fontSize: "14px", color: "white" }}
            >
              {message?.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
