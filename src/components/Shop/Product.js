import { Button, Col, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
import banner3 from "../../Assets/banner3.jpg";
import "./Product.css";

import Chat from "../Chat/Chat";
const Product = () => {
  const location = useLocation();
  const token = useToken();
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const [itemsToBuy, setitemsToBuy] = useState(0);
  const [userId, setuserId] = useState(null);
  const [saveAddress, setsaveAddress] = useState(true);
  const [address, setaddress] = useState({
    street: "",
    zip: "",
    city: "",
    country: "",
  });
  const [rating, setrating] = useState(-1);
  const [chatOpen, setchatOpen] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", location.state.author_email)
      .get()
      .then((snapshot) => {
        setuserId(snapshot.docs[0].id);
      });
    firebase
      .firestore()
      .collection("users")
      .doc(token.id)
      .get()
      .then((doc) => {
        setaddress({ ...address, ...doc.data()?.address });
      });
    setproduct({ ...location.state });
    setrating(location.state?.rating >= 0 ? location.state?.rating : -1);
  }, [location]);
  const changeHandler = (e) => {
    setaddress({ ...address, [e.target.name]: e.target.value });
  };
  const buyNow = async (index) => {
    const leftItems = product.quantity - itemsToBuy;
    const averageRating = product?.rating
      ? (index + product?.rating) / 2
      : index;
    try {
      await firebase.firestore().collection("products").doc(product.id).update({
        rating: averageRating,
        quantity: leftItems,
      });
      if (saveAddress) {
        await firebase.firestore().collection("users").doc(token.id).update({
          address,
        });
      }
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("store")
        .doc(product.id)
        .update({
          rating: averageRating,
          quantity: leftItems,
        });
      // navigate("/order", { state: true })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${banner3})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: " 50% 20%",
        }}
      ></div>

      <Container>
        <div className="my-5 flexDivMain">
          <div
            style={{
              width: "100%",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <img style={{ maxWidth: "100%" }} src={product.image} />
          </div>
          <div className="p-3" style={{ width: "100%" }}>
            <h1 className="proTitle">
              <strong>{product?.title}</strong>
            </h1>
            <div className="filterDiv">
              <p className="filter">{product?.type}</p>
              <p className="categoryF">{product?.category}</p>
            </div>
            <p
              style={{
                color: "red",
                fontSize: "38px",
                fontWeight: "bold",
                marginTop: "5px",
                marginBottom: "30px",
              }}
            >
              Rs. {product.price}
            </p>
            <hr />
            <h6
              style={{
                marginTop: "30px",
                color: "#113c49",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {"Description :"}
            </h6>
            <h6
              style={{
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: "1.4",
                textTransform: "capitalize",
                marginBottom: "30px",
              }}
            >
              {product?.description}
            </h6>
            <hr />
            <div className="flexDiv">
              <h6
                style={{
                  color: "#113c49",
                  fontSize: "20px",
                  fontWeight: "bold",
                  width: "auto",
                  marginRight: "20px",
                }}
              >
                Brand :
              </h6>

              <h6
                style={{
                  fontSize: "16px",
                  textTransform: "capitalize",
                  width: "auto",
                }}
              >
                {product?.brand}
              </h6>
            </div>
            <hr />
            <h6
              style={{
                marginTop: "30px",
                color: "#113c49",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {"Seller Details :"}
            </h6>
            <div className="flexDiv2">
              <h6>
                <span style={{ fontWeight: "bold" }}>Name:</span>
              </h6>

              <h6>{product.author}</h6>
            </div>
            <div className="flexDiv2">
              <h6>
                <span style={{ fontWeight: "bold" }}>Email:</span>
              </h6>

              <h6 style={{ marginBottom: "20px" }}>{product.author_email}</h6>
            </div>

            {token.email == product.author_email ? (
              <div></div>
            ) : (
              <div>
                <hr />
                <Button
                  type="primary"
                  onClick={() => setchatOpen(!chatOpen)}
                  className="chatBtn Rounded"
                  size="large"
                >
                  Chat With Seller
                </Button>

                <Button
                  type="primary"
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send?phone=" +
                        product.author_phone
                    )
                  }
                  className="chatBtn2 btn-success Rounded mt-3"
                  size="large"
                >
                  Contact on Whatsapp
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>

      <Container>
        <Row>
          <Col
            xs={{
              span: 24,
            }}
          >
            {chatOpen && (
              <Chat
                author={product?.author}
                product={product}
                author_email={product?.author_email}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
