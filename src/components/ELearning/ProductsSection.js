import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCardLandingPage from "./ProductCardLandingPage";
import "./ProductsSection.css";
import { Row } from "react-bootstrap";
import firebase from "firebase";
import "firebase/firestore";

const ProductsSection = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .limit(4)
      .get()
      .then((res) =>
        setproducts(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, []);

  return (
    <div className="products_main">
      <div className="container">
        <h1 className="products_head">Shop With Us</h1>

        <p className="products_desc">
          Modern-day kids are a lot more inquisitive, smart and
          fashion-oriented. Kids Network let's your kids sync with modern
          fashion trends to feel adored and look incredibly different and
          classy. Here at Kids Network, we pay attention to all minor details.
        </p>

        <Row style={{ justifyContent: "space-between" }}>
          {products?.map((product) => (
            <ProductCardLandingPage key={product.id} product={product} />
          ))}
        </Row>

        <Link
          to="/shop"
          className="products_button btn align-self-end courses_btn btn-dark btn-lg w-25 btn-block"
        >
          See All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductsSection;
