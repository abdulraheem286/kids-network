import { Button, Col, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useToken } from "../../hooks/useToken";
import Chat from "../Chat/Chat";
const Product = () => {
  const location = useLocation();
  const token = useToken();
  const navigate = useNavigate();
  const [product, setproduct] = useState({});
  const [itemsToBuy, setitemsToBuy] = useState(0);
  const [userId, setuserId] = useState(null);
  const [addressDiv, setaddressDiv] = useState(false);
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
    <Container>
      <Row>
        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn-blog.cpcstrategy.com%2Fwp-content%2Fuploads%2F2015%2F10%2Famazon-vendor-guide-blog.jpg&f=1&nofb=1" />
      </Row>
      <Row className="my-5">
        <Col xs={{ span: 8 }}>
          <img src={product.image} className="w-100 h-100" />
        </Col>
        <Col xs={{ span: 8 }} className="p-3">
          <h2>{product.title}</h2>
          <h6>{product.description}</h6>
          <h6>Brand: {product.brand}</h6>
          <h6>Category: {product.category}</h6>
          <hr />
          <p style={{ color: "red", fontSize: "24px", fontWeight: "bold" }}>
            Rs. {product.price}
          </p>
          <p>Quantity {product.quantity} left</p>
          <div>
            {Array(5)
              .fill(0)
              .map((_, index) =>
                index <= rating ? (
                  <FontAwesomeIcon
                    key={index}
                    style={{ color: "yellow" }}
                    onClick={() => {
                      setrating(index);
                      buyNow(index);
                    }}
                    icon={faStarSolid}
                  />
                ) : (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    onClick={() => {
                      setrating(index);
                      buyNow(index);
                    }}
                  />
                )
              )}
          </div>
        </Col>
        <Col
          style={{
            backgroundColor: "#fafafa",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-center",
          }}
          xs={{ span: 8 }}
          className="p-2"
        >
          <div className="my-2 d-flex justify-content-between flex-column">
            <h6>
              <span style={{ fontWeight: "bold" }} className="mx-2">
                Seller Name:
              </span>{" "}
              {product.author}
            </h6>
            <h6>
              <span style={{ fontWeight: "bold" }} className="mx-2">
                Seller Contact:
              </span>{" "}
              {product.author_email}
            </h6>
          </div>
          <div className="my-2 d-flex justify-content-between flex-column">
            <h6>
              <span style={{ fontWeight: "bold" }} className="mx-2">
                Delivery Location:{" "}
              </span>{" "}
              {product.delivery}
            </h6>
            <h6>
              <span style={{ fontWeight: "bold" }} className="mx-2">
                Cash on delivery available
              </span>
            </h6>
          </div>
          <div className="my-2 d-flex justify-content-between flex-column">
            <h6>
              <span style={{ fontWeight: "bold" }} className="mx-2">
                Service:
              </span>{" "}
              {product.service}
            </h6>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex w-full justify-content-between align-content-center">
            <label
              className="w-100"
              style={{ fontWeight: "500", fontSize: "22px" }}
            >
              Chat with the seller:{" "}
            </label>
          </div>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => setchatOpen(!chatOpen)}
            className=" rounded ml-2"
            size="large"
          >
            Chat
          </Button>
        </Col>
      </Row>
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
      {addressDiv && (
        <Row className="p-2 my-5">
          <Col xs={{ span: 12 }}>
            <form className="w-100" onSubmit={buyNow}>
              <div className="w-100 d-flex justify-content-between my-2">
                <label className="w-50">Street Address:</label>
                <Input
                  placeholder="street address"
                  value={address.street}
                  name="street"
                  onChange={changeHandler}
                />
              </div>
              <div className="w-100 d-flex justify-content-between my-2">
                <label className="w-50">Zip Code:</label>
                <Input
                  placeholder="zip code"
                  value={address.zip}
                  name="zip"
                  onChange={changeHandler}
                />
              </div>
              <div className="w-100 d-flex justify-content-between my-2">
                <label className="w-50">City:</label>
                <Input
                  placeholder="city"
                  value={address.city}
                  name="city"
                  onChange={changeHandler}
                />
              </div>
              <div className="w-100 d-flex justify-content-between my-2">
                <label className="w-50">Country:</label>
                <Input
                  placeholder="country"
                  value={address.country}
                  name="country"
                  onChange={changeHandler}
                />
              </div>
              <div className="w-100">
                <label className="w-50">Save Address for later use</label>
                <Input
                  className="w-25"
                  type={"checkbox"}
                  checked={saveAddress}
                  onChange={(e) => setsaveAddress(e.target.checked)}
                />
              </div>
              <div>
                {Array(5)
                  .fill(0)
                  .map((_, index) =>
                    index <= rating ? (
                      <FontAwesomeIcon
                        key={index}
                        style={{ color: "yellow" }}
                        onClick={() => setrating(index)}
                        icon={faStarSolid}
                      />
                    ) : (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        onClick={() => setrating(index)}
                      />
                    )
                  )}
              </div>
              <Button type="primary" htmlType="submit" className="mt-2">
                Ship Product
              </Button>
            </form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Product;
