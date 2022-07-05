import React from "react";
import { useToken } from "../../hooks/useToken";

const Message = ({ messages }) => {
  const token = useToken();

  return (
    <div
      className="h-100"
      style={{
        overflowY: "scroll",
        backgroundColor: "whitesmoke",
      }}
    >
      {messages?.map((message, index) => (
        <div
          className={`d-flex rounded ${
            message.author !== token.email
              ? "justify-content-end"
              : "justify-content-start"
          }  my-3  w-100`}
          key={index}
        >
          <div
            className={`rounded m-2
             w-25 border`}
            style={{ fontSize: "10px" }}
          >
            <p
              className="border-bottom p-1"
              style={{
                backgroundColor: "#282828",
                color: "white",
              }}
            >
              {message?.author.split("@")[0]}
            </p>
            <p className="p-1 m-0 p-0">{message?.text}</p>
            <p className="m-0 p-1 float-right">
              {new Date(message?.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
