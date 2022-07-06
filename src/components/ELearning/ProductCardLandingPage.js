import { Card } from "antd";
import React from "react";
import "./ProductCardLandingPage.css";
import { useNavigate } from "react-router-dom";

const ProductCardLandingPage = ({ product }) => {
  const navigate = useNavigate();
  const navigateToPage = () => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div>
      <Card
        onClick={navigateToPage}
        size="small"
        bordered={false}
        className="bootstrapcard mx-3 my-3 "
        style={{
          width: "188px",
          height: "auto",
          minHeight: "320px",
          border: "1px solid #dee2e6",
          borderRadius: "5px",
        }}
      >
        <div style={{ position: "relative" }}>
          <img className="w-100 h-75" src={product?.image} />
          {product?.type == "Old" && <p className="pFilter">Old</p>}
        </div>
        <div className="mt-4">
          <p className="pCategory">{product?.category}</p>
          <h6 className="pTitle">
            <strong>{product?.title}</strong>
          </h6>
          <h5 className="pPrice">
            <strong>Rs. {product?.price}</strong>
          </h5>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardLandingPage;
