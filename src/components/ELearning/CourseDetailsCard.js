import {
  faCube,
  faLanguage,
  faSliders,
  faStopwatch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CourseDetailsCard = () => {
  return (
    <div className=" w-100 mt-4">
      <h3 style={{ fontWeight: "bold", margin: "5px 0" }} className="my-1">
        $149.00
      </h3>
      <table className="my-2 w-100">
        <Row icon={faSliders} text="Beginner" category="Level" />
        <Row icon={faTv} text="8 Lectures" category="Lectures" />
        <Row icon={faStopwatch} text="1h 30 minutes" category="Duration" />
        <Row icon={faCube} text="Data Sciences" category="Category" />
        <Row icon={faLanguage} text="English" category="Language" />
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
