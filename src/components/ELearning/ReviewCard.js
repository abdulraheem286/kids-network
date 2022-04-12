import React from "react";

const ReviewCard = ({ photo, name, comment, stars }) => {
  return (
    <div className="d-flex flex-column mt-3 mb-3 align-items-start">
      <div className="d-flex align-items-center">
        <img
          src={photo}
          style={{ width: "52px", height: "52px" }}
          className="rounded-circle me-5"
          alt=""
        />
        <div className="d-flex flex-column m-4">
          <h6 style={{ fontWeight: "800", marginRight: "5px" }}>{name}</h6>
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
