import React from "react";

const ReviewCard = ({ photo, name, comment, stars }) => {
  return (
    <div className="d-flex mt-3 mb-3 align-items-center">
      <div className="">
        <img
          src={photo}
          style={{ width: "44px", height: "44px" }}
          className="rounded-circle"
          alt=""
        />
      </div>
      <div
        style={{ fontSize: "14px", lineHeight: "12px", marginLeft: "10px" }}
        className="p-1"
      >
        <div className="d-flex">
          <h6 style={{ fontWeight: "800", marginRight: "5px" }}>{name}</h6>
          {new Array(5).fill(0).map((_, i) => {
            return i < stars ? (
              <i key={i} className="fa fa-star text-warning"></i>
            ) : (
              <i key={i} className="fa fa-star text-secondary"></i>
            );
          })}
        </div>

        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
