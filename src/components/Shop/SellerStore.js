import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import firebase from "firebase";
import { Row } from "antd";
import ProductCard from "./ProductCard";
import "./SellerStore.css";
import { Container } from "react-bootstrap";
import noproduct from "../../Assets/noproduct.png";
const SellerStore = () => {
  const [storeDetails, setstoreDetails] = useState({});
  const location = useLocation();
  const [products, setproducts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(location.state.id)
      .collection("store")
      .get()
      .then((res) =>
        setproducts(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
    setstoreDetails(location.state);
  }, [location]);

  return (
    <Container style={{ paddingBottom: "40px" }}>
      <div className="h-100 px-4 w-100">
        <h1 className="storeHead my-3">Welcome To {storeDetails.store}</h1>
        {products.length <= 0 ? (
          <div>
            <img className="noPro" style={{ width: "70%" }} src={noproduct} />
          </div>
        ) : (
          <div
            className="mt-4 w-100 h-100 sellerCard"
            justify="space-between"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default SellerStore;
