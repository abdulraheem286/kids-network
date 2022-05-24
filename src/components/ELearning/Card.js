import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "./Card.css";
import { ProgressBar } from "react-bootstrap";
import { useToken } from "../../hooks/useToken";
export default function Card({
  cardImage,
  title,
  cardDescription,
  courseCategory,
  action,
  id,
}) {
  const [percentage, setpercentage] = useState(0);
  const token = useToken();
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
          const openedItems = items?.filter(
            (item) => item[token.email.split(".")[0]]?.state === "opened"
          );
          const openedItemsLength = openedItems.length;
          const percentage = Math.round((openedItemsLength / length) * 100);
          setpercentage(percentage);
        }
      });
  }, [id, token.email]);

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
              <p>
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {title}
                </span>
              </p>

              <p className="card-desc">{cardDescription}</p>

              <div style={{ marginBottom: "0px" }}>
                <hr />
                <p className="card-category">
                  <small>{courseCategory}</small>
                </p>
                <ProgressBar now={percentage} label={`${percentage}%`} />
              </div>
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
    border: "1px solid rgba(0,0,0,.125)",
    borderRadius: "0.25rem",
    overflow: "hidden",
    transition: "transform .3s ease-in-out",

    "&:last-child": {
      borderRight: "solid 1px #cccccc",
    },
  },
};
