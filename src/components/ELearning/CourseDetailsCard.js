import {
  faCube,
  faLanguage,
  faSliders,
  faStopwatch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CourseDetailsCard = ({ courseDetails }) => {
  return (
    <div className=" w-100 pl-4 pr-4">
      <table className="my-4 w-100">
        <Row icon={faSliders} text={courseDetails?.level} category="Level" />
        <Row
          icon={faTv}
          text={`${courseDetails?.lectures} Lectures`}
          category="Lectures"
        />
        <Row
          icon={faStopwatch}
          text={courseDetails?.duration}
          category="Duration"
        />
        <Row
          icon={faCube}
          text={courseDetails?.coursecategory}
          category="Category"
        />
        <Row
          icon={faLanguage}
          text={courseDetails?.language}
          category="Language"
        />
      </table>
    </div>
  );
};

export default CourseDetailsCard;
function Row({ icon, text, category }) {
  return (
    <tr
      className="w-100"
      style={{
        margin: "5px 0",
        height: "30px",
        borderBottom: "1px solid #edeef2",
        lineHeight: "64px",
      }}
    >
      <td className="mx-1">
        <FontAwesomeIcon className="" icon={icon} />
      </td>
      <td className="">{category}</td>
      <td className="w-50 text-end">{text}</td>
    </tr>
  );
}
