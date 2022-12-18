import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const ChapterCards = ({ number, title }) => {
  return (
    <div
      className="mt-2 fs-3 p-3 w-100 d-flex
     "
      style={{ borderBottom: "1px solid #000" }}
    >
      <FontAwesomeIcon icon={faAnglesRight} />
      <h6 style={{ marginLeft: "10px" }}>{title}</h6>
    </div>
  );
};

export default ChapterCards;
