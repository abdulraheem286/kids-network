import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
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
        className="bootstrap_card my-2"
        style={{
          width: "100%",
          minHeight: "330px",
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

export default ProductCard;
