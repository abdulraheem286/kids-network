import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./Card.css";
import { ProgressBar } from "react-bootstrap";
export default function Card({
  cardImage,
  title,
  cardDescription,
  courseCategory,
  action,
  id,
}) {
  const [percentage, setpercentage] = useState(0);
  useEffect(() => {
    firebase
      .firestore()
      .collection("courses")
      .doc(id)
      .collection("coursevideos")
      .get()
      .then((res) => {
        const items = res?.docs?.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (items) {
          const length = items?.length;
          const openedItems = items.filter((item) => item.state === "opened");
          const openedItemsLength = openedItems.length;
          const percentage = Math.round((openedItemsLength / length) * 100);
          setpercentage(percentage);
        }
      });
  }, [id]);

  return (
    <div
      style={style.WrapperBtn}
      className="wrapper"
      onClick={action ? () => action() : null}
    >
      <div style={style.Wrapper}>
        <div className="card-group" style={{ maxWidth: 400 }}>
          <div className="card" style={{ border: 0 }}>
            <img
              className="card-img-top"
              style={{ height: 180, objectFit: "cover" }}
              src={cardImage}
              alt="Card"
            />
            <div className="card-body">
              {title && <h5 className="card-title">{title}</h5>}
              <p className="card-text">{cardDescription}</p>
              <p className="card-text">
                <hr />
                <small className="text-muted">{courseCategory}</small>
              </p>
              <ProgressBar now={percentage} label={`${percentage}%`} />
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
    padding: "15px",
    marginTop: 30,
    cursor: "Pointer",
    height: "451px",
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: "0.25rem",
    overflow: "hidden",
    transition: "transform .3s ease-in-out",

    "&:hover": {
      background: "#efefef",
    },
    "&:last-child": {
      borderRight: "solid 1px #cccccc",
    },
  },
};
