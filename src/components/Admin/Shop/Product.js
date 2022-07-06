import { Button, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
const Product = ({ product: mainProduct, categories }) => {
  const [product, setproduct] = useState({
    title: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    delivery: "",
    service: "",
    brand: "",
    category: "",
    type: "",
  });
  const [userId, setuserId] = useState("");
  const [disabledState, setdisabledState] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", mainProduct.author_email)
      .get()
      .then((snapshot) => {
        setuserId(snapshot.docs[0].id);
      })
      .catch((error) => console.log(error));
    setproduct({ ...mainProduct });
  }, [mainProduct]);
  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !product.category ||
      !product.brand ||
      !product.description ||
      !product.image ||
      !product.price ||
      !product.title ||
      !product.type
    ) {
      alert("Make sure to add all the values");
      return;
    }
    try {
      await firebase
        .firestore()
        .collection("products")
        .doc(product.id)
        .update(product);
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("store")
        .doc(product.id)
        .update(product);
      setdisabledState(true);
    } catch (error) {
      console.log(error);
      setdisabledState(true);
    }
  };
  const deleteProduct = async () => {
    try {
      await firebase
        .firestore()
        .collection("products")
        .doc(product.id)
        .delete();
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("store")
        .doc(product.id)
        .delete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column">
      <div className="d-flex px-2 mb-2">
        <Button type="primary" onClick={() => setdisabledState(false)}>
          Edit
        </Button>
        <Button onClick={deleteProduct} danger>
          Delete
        </Button>
      </div>
      <form className="d-flex flex-column border p-2" onSubmit={submitHandler}>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Title</label>
          <Input
            disabled={disabledState}
            placeholder="title"
            className="w-50"
            required
            name="title"
            type={"text"}
            value={product.title}
            onChange={changeHandler}
          />
        </div>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Brand</label>
          <Input
            disabled={disabledState}
            placeholder="brand"
            className="w-50"
            name="brand"
            type={"text"}
            value={product.brand}
            onChange={changeHandler}
          />
        </div>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Category</label>
          <Select
            disabled={disabledState}
            className="w-50"
            value={product.category}
            onChange={(e) => setproduct({ ...product, category: e })}
          >
            {categories?.map(
              (category, index) =>
                category !== "All" && (
                  <Select.Option key={index} value={category}>
                    {category}
                  </Select.Option>
                )
            )}
          </Select>
        </div>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Type</label>
          <Select
            disabled={disabledState}
            className="w-50"
            value={product.type}
            onChange={(e) => setproduct({ ...product, type: e })}
          >
            <Select.Option value={"Old"}>{"Old"}</Select.Option>
            <Select.Option value={"New"}>{"New"}</Select.Option>
          </Select>
        </div>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Description</label>
          <Input.TextArea
            disabled={disabledState}
            placeholder="description"
            className="w-50"
            name="description"
            type={"text"}
            value={product.description}
            onChange={changeHandler}
          />
        </div>
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Price</label>
          <Input
            disabled={disabledState}
            placeholder="0"
            className="w-50"
            name="price"
            type={"number"}
            min={0}
            value={product.price}
            onChange={changeHandler}
          />
        </div>
        {/* <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Quantity</label>
          <Input
            disabled={disabledState}
            placeholder="0"
            className="w-50"
            name="quantity"
            min={0}
            type={"number"}
            value={product.quantity}
            onChange={changeHandler}
          />
        </div> */}
        <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Image Link</label>
          <Input
            required
            disabled={disabledState}
            placeholder="image"
            className="w-50"
            name="image"
            type={"text"}
            value={product.image}
            onChange={changeHandler}
          />
        </div>
        {/* <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Delivery</label>
          <Input
            disabled={disabledState}
            placeholder="Address"
            className="w-50"
            name="delivery"
            type={"text"}
            value={product.delivery}
            onChange={changeHandler}
          />
        </div> */}
        {/* <div className="d-flex w-100 justify-content-between px-2">
          <label>Product Service</label>
          <Input
            disabled={disabledState}
            placeholder="service"
            className="w-50"
            name="service"
            type={"text"}
            value={product.service}
            onChange={changeHandler}
          />
        </div> */}
        <div>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Product;
