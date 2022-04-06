import React, { useEffect, useState } from "react";

const CommentCard = () => {
  const [state, setState] = useState([]);
  const [count, setcount] = useState(0);
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://dummyapi.io/data/v1/user", {
          headers: {
            "app-id": "624d7d9a8010f2c51c470627",
          },
        });
        const data = await res.json();
        console.log(data);
        setState(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      count < 20 ? setcount(count + 1) : setcount(0);
    }, 5000);
  });

  return (
    <div
      className="align-self-start d-flex p-4 justify-content-between align-items-center flex-wrap w-25 mb-4"
      style={{
        height: "325px",
        borderRadius: "10px",
        backgroundColor: "#167bff",
      }}
    >
      {
        <img
          className="w-25 h-25 rounded-circle"
          src={state[count]?.picture}
          alt=""
        />
      }
      <p
        className="text-light"
        style={{ fontSize: "24px", fontWeight: "bold", paddingLeft: "10px" }}
      >
        {state[count]?.firstName} {state[count]?.lastName}
      </p>
      <p
        className="text-light"
        style={{ fontSize: "18px", textAlign: "justify" }}
      >
        Ad culpa non minim anim fugiat eiusmod tempor tempor. Est tempor amet
        reprehenderit anim minim nostrud anim nisi et amet. Magna commodo ad
      </p>
    </div>
  );
};

export default CommentCard;
