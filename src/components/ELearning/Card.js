import React from "react";

export default function Card({
  cardImage,
  title,
  cardDescription,
  courseCategory,
  action,
}) {
  return (
    <div style={style.WrapperBtn} onClick={action ? () => action() : null}>
      <div style={style.Wrapper}>
        <div className="card-group" style={{ maxWidth: 400 }}>
          <div className="card">
            <img
              className="card-img-top"
              style={{ height: 180, objectFit: "cover" }}
              src={cardImage}
              alt="Card Image"
            />
            <div className="card-body">
              {title && <h5 className="card-title">{title}</h5>}
              <p className="card-text">{cardDescription}</p>
              <p className="card-text">
                <hr />
                <small className="text-muted">{courseCategory}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  Wrapper: {
    border: 0,
    outline: "none",
    backgroundColor: "transparent",
  },

  WrapperBtn: {
    width: "100%",
    textAlign: "left",
    padding: 20,
    marginTop: 30,
    cursor: "Pointer",

    "&:hover": {
      background: "#efefef",
    },
    "&:last-child": {
      borderRight: "solid 1px #cccccc",
    },
  },
};
