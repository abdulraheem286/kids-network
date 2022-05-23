import { Card } from "antd";
import React from "react";
import "./ProductCardLandingPage.css";

const ProductCardLandingPage = ({ product }) => {
  return (
    <div>
      <Card
        size="small"
        bordered={false}
        className="bootstrap__card mx-3 my-3"
        style={{
          width: "188px",
          height: "290px",
          border: "1px solid #dee2e6",
          borderRadius: "5px",
        }}
      >
        <img className="w-100 h-75" src={product?.image} />
        <div className="mt-2">
          <h6>{product?.title}</h6>
          <p>
            <strong>Rs. {product?.price}</strong>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardLandingPage;
