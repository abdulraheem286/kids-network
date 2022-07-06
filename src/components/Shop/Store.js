import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useToken } from "../../hooks/useToken";
import { Card, Col, Row, Input, Button } from "antd";
import Products from "../Admin/Shop/Products";
import AddProduct from "../Admin/Shop/AddProduct";
import { ReloadOutlined, MessageOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import ProdModal from "./ProdModal";
import "./ProductCard.css";
import "./Store.css";
import avatar from "../../Assets/avatar.png";
import cart from "../../Assets/cart.png";

const Store = () => {
  const token = useToken();
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [productsMessage, setproductsMessage] = useState("");
  const [storeName, setstoreName] = useState("");
  const [visible, setvisible] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [chats, setchats] = useState([]);
  const [changeMessageState, setchangeMessageState] = useState(false);
  const [activeChat, setactiveChat] = useState([]);
  const [activeProduct, setactiveProduct] = useState({});
  const [message, setmessage] = useState({
    text: "",
    author: "",
    timestamp: null,
  });
  useEffect(() => {
    firebase
      .firestore()
      .collection("categories")
      .doc("productCategory")
      .get()
      .then((res) => {
        if (res?.data()) {
          console.log(res.data());
          setcategories(res.data()?.categories);
        }
      });
    firebase
      .firestore()
      .collection("users")
      .doc(token.id)
      .collection("store")
      .get()
      .then((res) => {
        res.docs.length > 0
          ? setproducts(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
          : setproductsMessage("No products to show. create your store first");
      });
    setrefresh(false);
  }, [refresh]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("users")
      .doc(token.id)
      .collection("store")
      .doc(activeProduct?.id)
      .collection("chats")
      .onSnapshot((snapshot) => {
        setchats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsub();
  }, [activeProduct]);

  const createStore = async () => {
    try {
      await firebase.firestore().collection("users").doc(token?.id).update({
        store: storeName,
      });
      setvisible(true);
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      const userMessages = [...activeChat.chat, message];
      await firebase
        .firestore()
        .collection("users")
        .doc(token.id)
        .collection("store")
        .doc(activeProduct?.id)
        .collection("chats")
        .doc(activeChat.id)
        .set({
          chat: [...userMessages],
        });
      setchangeMessageState(!changeMessageState);
      setmessage({ ...message, text: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const [modalVisible, setmodalVisible] = useState({
    visible: false,
    product: null,
  });
  return (
    <div className="container px-4 h-100">
      <div className="d-flex">
        <Button
          icon={<ReloadOutlined />}
          className="mb-2"
          onClick={() => setrefresh(!refresh)}
        >
          Refresh
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="">
          <AddProduct categories={categories} />

          <h3 className="my-3">Welcome to {token?.store}</h3>
          <ProdModal
            visible={modalVisible.visible}
            product={modalVisible.product}
            categories={categories}
            setmodalVisible={setmodalVisible}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginBottom: "60px",
            }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                onClick={() => setmodalVisible({ visible: true, product })}
                size="small"
                bordered={false}
                className="bootstrap_card my-2 "
                style={{
                  width: "100%",
                  minHeight: "340px",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={product?.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
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
            ))}
          </div>

          <Row className="my-3">
            <Col
              xs={{
                span: 24,
              }}
            >
              <div className="border d-flex" style={{ height: "467px" }}>
                <div
                  className="d-flex flex-column h-100 w-25 p-2 pt-4 pb-4"
                  style={{
                    backgroundColor: "#113c49",
                    overflowY: "auto",
                  }}
                >
                  {products?.map((product, index) => (
                    <>
                      <p
                        className={`p-2 border text-left rounded-pill`}
                        key={index}
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                          backgroundColor:
                            product.id == activeProduct.id
                              ? "#1890ff"
                              : "white",
                          color:
                            product.id == activeProduct.id
                              ? "white"
                              : "#282828",
                        }}
                        onClick={() => setactiveProduct(product)}
                      >
                        <img
                          style={{ width: "20px", marginRight: "10px" }}
                          src={cart}
                        />
                        {product.title
                          .split("@")[0]
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </p>
                    </>
                  ))}
                </div>
                <div
                  className="d-flex flex-column h-100 w-25 p-2 pt-4 pb-4"
                  style={{
                    backgroundColor: "whitesmoke",
                    overflowY: "auto",
                  }}
                >
                  {chats?.map((chat, index) => (
                    <>
                      <p
                        className={`p-2 border text-left rounded-pill`}
                        key={index}
                        style={{
                          cursor: "pointer",
                          fontSize: "13px",
                          backgroundColor:
                            chat.id == activeChat.id ? "#1890ff" : "white",
                          color: chat.id == activeChat.id ? "white" : "#282828",
                        }}
                        onClick={() => setactiveChat(chat)}
                      >
                        <img
                          style={{ width: "20px", marginRight: "10px" }}
                          src={avatar}
                        />
                        {chat.id
                          .split("@")[0]
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </p>
                    </>
                  ))}
                </div>
                <div className="h-100 w-50 d-flex justify-content-between flex-column">
                  <div className="w-100 text-left border-bottom p-2 pl-4">
                    {activeChat?.id?.split("@")[0].toUpperCase()}
                  </div>

                  <div
                    className="bottom-border"
                    style={{ backgroundColor: "white", overflowY: "auto" }}
                  >
                    {activeChat?.chat?.map((message, index) => (
                      <div
                        className={`w-100
                                                ${
                                                  message.author === token.email
                                                    ? "justify-content-start"
                                                    : "justify-content-end"
                                                } d-flex`}
                        key={index}
                      >
                        <div
                          className={`rounded m-2 w-50 border`}
                          style={{ fontSize: "10px" }}
                        >
                          <p
                            style={{
                              backgroundColor: "#282828",
                              color: "whitesmoke",
                            }}
                            className="border-bottom p-2"
                          >
                            {message?.author.split("@")[0]}
                          </p>
                          <p className="p-2 m-0">{message?.text}</p>
                          <p className="m-0 p-2 float-right">
                            {new Date(message?.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex align-items-center border-top">
                    <input
                      className="w-90 messageChat pb-2"
                      value={message.text}
                      onChange={(e) =>
                        setmessage({
                          ...message,
                          text: e.target.value,
                          timestamp: Date.now(),
                          author: token.email,
                        })
                      }
                      placeholder="Write Your Message..."
                    />
                    <div className="sendIcon">
                      <FontAwesomeIcon
                        className="pl-3 pr-3 pb-2 paperPlane"
                        style={{ backgroundColor: "#113c49" }}
                        onClick={sendMessage}
                        icon={faPaperPlane}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* <h3 className='my-3'>Edit your products</h3>
                    <div className='d-flex flex-column w-100'>
                        <Products products={products} categories={categories} />
                    </div> */}
        </div>
      ) : (
        <>
          <h1>{productsMessage}</h1>
          <Input
            value={storeName}
            onChange={(e) => setstoreName(e.target.value)}
            placeholder="Give your store a name"
            size="large"
            className="my-3 w-50"
          />
          <Button size="large" type="primary" onClick={createStore}>
            Create Store
          </Button>
          {visible && (
            <>
              <h3>Start adding products</h3>
              <AddProduct categories={categories} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Store;
