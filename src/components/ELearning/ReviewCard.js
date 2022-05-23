import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewCard.css";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
const ReviewCard = ({
  enrolled,
  photo,
  name,
  comment,
  stars,
  pageId,
  itemId,
  deleteComment,
}) => {
  const token = useToken()
  return (
    <div className="d-flex flex-column mt-3 mb-3 align-items-start">
      <div className="d-flex align-items-center">
        <img
          src={
            "https://i.ibb.co/prSK5Kj/imgbin-avatar-child-computer-icons-user-profile-png.png"
          }
          style={{ width: "52px", height: "52px" }}
          className="rounded-circle me-5"
          alt=""
        />
        <div className="d-flex flex-column m-4">
          <div className="d-flex justify-content-between ">
            <h6 style={{ fontWeight: "800", marginRight: "45px" }}>{name}</h6>
            {
              enrolled && name == `${token.fName} ${token.lName}` &&
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => deleteComment(pageId, itemId)}
                className="icon"
              />
            }
          </div>
          <div>
            {new Array(5).fill(0).map((_, i) => {
              return i < stars ? (
                <i key={i} className="fa fa-star text-warning"></i>
              ) : (
                <i key={i} className="fa fa-star text-secondary"></i>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{ fontSize: "16px", lineHeight: "12px", marginLeft: "75px" }}
        className="p-1"
      >
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
