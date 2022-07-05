import React from "react";
import { Modal } from "antd";
import Product from "../Admin/Shop/Product";
const ProdModal = ({ visible, product, categories, setmodalVisible }) => {
  return (
    <Modal
      visible={visible}
      onCancel={() =>
        setmodalVisible({
          visible: false,
          product: null,
        })
      }
      okButtonProps={{
        style: { display: "none" },
      }}
    >
      <Product product={product} categories={categories} />
    </Modal>
  );
};

export default ProdModal;
