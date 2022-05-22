import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";
const CommentCard = () => {
  const [state, setState] = useState([]);
  const [count, setcount] = useState(0);
  const [bgRandomColor, setrandomColor] = useState(
    randomColor({ luminosity: "dark" })
  );
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://dummyapi.io/data/v1/user", {
          headers: {
            "app-id": "624d7d9a8010f2c51c470627",
          },
        });
        const data = await res.json();
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
      setrandomColor(randomColor({ luminosity: "dark" }));
    }, 5000);
  });

  return (
    <div
      className="align-self-end d-flex p-4 justify-content-evenly
      fs-5 align-items-center flex-wrap w-25 mb-4"
      style={{
        height: "250px",
        borderRadius: "10px",
        backgroundColor: bgRandomColor,
        transition: "all 1s ease-in-out",
      }}
    >
      {
        <img
          className=" rounded-circle"
          style={{ width: "64px", height: "64px" }}
          src={state[count]?.picture}
          alt=""
        />
      }
      <p
        className="text-light"
        style={{ fontSize: "16px", fontWeight: "bold", paddingLeft: "10px" }}
      >
        {state[count]?.firstName} {state[count]?.lastName}
      </p>
      <p
        className="text-light"
        style={{ fontSize: "14px", textAlign: "justify" }}
      >
        Ad culpa non minim anim fugiat eiusmod tempor tempor.
      </p>
    </div>
  );
};

export default CommentCard;
