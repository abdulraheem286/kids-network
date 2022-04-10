import React from "react";

const ChapterCards = ({ number, title }) => {
  return (
    <div
      className="rounded-pill border my-2 fs-3 justify-content-center p-2 w-100 d-flex
     align-items-center"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <h5 style={{ marginRight: "5px" }}>#{number}</h5>
      <h6>{title}</h6>
    </div>
  );
};

export default ChapterCards;
