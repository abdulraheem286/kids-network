import { Alert, Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useToken } from "../../../hooks/useToken";
import firebase from "firebase";
const AddProduct = ({ categories }) => {
  const token = useToken();
  const [visible, setvisible] = useState(false);
  const [userId, setuserId] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const [product, setproduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    type: "",
    brand: "",
    category: "",
  });
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", token.email)
      .get()
      .then((snapshot) => {
        setuserId(snapshot.docs[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOk = () => {
    setvisible(false);
    setalertMessage("");
  };
  const handleCancel = () => {
    setproduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      brand: "",
      category: "",
      type: "",
    });
    setalertMessage("");
    setvisible(false);
  };
  const changeHandler = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const finalProduct = {
      ...product,
      author: `${token.fName} ${token.lName}`,
      author_email: token.email,
    };
    if (
      !finalProduct.category ||
      !finalProduct.brand ||
      !finalProduct.description ||
      !finalProduct.image ||
      !finalProduct.price ||
      !finalProduct.title ||
      !finalProduct.type
    ) {
      alert("Make sure to add all the values");
      return;
    }
    try {
      const data = await firebase
        .firestore()
        .collection("products")
        .add(finalProduct);
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("store")
        .doc(data.id)
        .set(finalProduct);
      setalertMessage("sent");
      setproduct({
        title: "",
        price: 0,
        description: "",
        image: "",
        brand: "",
        category: "",
        type: "",
      });
      setTimeout(() => {
        setvisible(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setalertMessage("failed");
    }
  };
  return (
    <>
      <Button type="primary" onClick={() => setvisible(true)}>
        Add a Product
      </Button>
      <Modal
        title="Add a Product"
        okText="Draft"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={visible}
      >
        {alertMessage === "sent" && (
          <Alert className="my-2" message="Product Saved" type="success" />
        )}
        {alertMessage === "failed" && (
          <Alert className="my-2" message="Product Saved Failed" type="error" />
        )}
        <form onSubmit={submitHandler}>
          <div className="d-flex w-100 justify-content-between px-2">
            <label>Product Title</label>
            <Input
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
              placeholder="Address"
              className="w-50"
              name="delivery"
              type={"text"}
              value={product.delivery}
              onChange={changeHandler}
            />
          </div>
          <div className="d-flex w-100 justify-content-between px-2">
            <label>Product Service</label>
            <Input
              placeholder="service"
              className="w-50"
              name="service"
              type={"text"}
              value={product.service}
              onChange={changeHandler}
            />
          </div> */}
          <Button type="primary" htmlType="submit">
            Save a Product
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddProduct;
