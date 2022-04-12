import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const ChapterCards = ({ number, title }) => {
  return (
    <div
      className="mt-2 fs-3 justify-content-between p-3 w-100 d-flex
     align-items-center"
      style={{ borderBottom: "1px solid #000" }}
    >
      <div className="d-flex ">
        <FontAwesomeIcon icon={faChevronRight} className="mr-2" />
        <h6>{title}</h6>
      </div>
      <h6>8 Videos</h6>
    </div>
  );
};

export default ChapterCards;
