import { Col, Row, List, Switch, Card, Input, Button } from "antd";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBView,
  MDBCarouselInner,
  MDBBtn,
} from "mdbreact";
import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useToken } from "../../hooks/useToken";
import firebase from "firebase";
import "./Shop.css";
import ProductCard from "./ProductCard";
import Store from "./Store";
import _ from "lodash";
import DictaphoneShop from "../../components/VoiceToText/DictaphoneShop";
import DictaphoneStore from "../../components/VoiceToText/DictaphoneStore";
import mic from "../../Assets/mic.png";
import banner from "../../Assets/shopBanner.png";
import banner2 from "../../Assets/shopBanner2.png";
import avatar from "../../Assets/avatar.png";
import noproduct from "../../Assets/noproduct.png";
import nostore from "../../Assets/nostore.png";

const Shop = () => {
  const token = useToken();
  const [switchState, setswitchState] = useState(false);
  const [productsCategory, setproductsCategory] = useState([]);
  const [products, setproducts] = useState([]);
  const [stores, setstores] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("All");
  const navigate = useNavigate();
  const productsSearchRef = useRef();
  const storeSearchRef = useRef();
  const [productsSearch, setproductsSearch] = useState("");
  const [storeSearch, setstoreSearch] = useState("");
  const [shopmic, setshopmic] = useState(false);
  const [storemic, setstoremic] = useState(false);
  const [categorizeProdType, setCategorizeProdType] = useState("");
  useEffect(() => {
    if (!token) navigate("/sign-in", { replace: true });
  }, [navigate, token]);
  useEffect(() => {
    const loadData = async () => {
      const categories = await firebase
        .firestore()
        .collection("categories")
        .doc("productCategory")
        .get();
      setproductsCategory(categories.data().categories);

      let products = await firebase.firestore().collection("products").get();

      products = productsSearch
        ? _.filter(products?.docs, (product) => {
            if (
              product
                .data()
                .title.toLowerCase()
                .includes(productsSearch.toLowerCase())
            ) {
              return product;
            }
          })
        : products?.docs;
      setproducts(products?.map((doc) => ({ id: doc.id, ...doc.data() })));

      let stores = await firebase
        .firestore()
        .collection("users")
        .where("store", ">", "")
        .get();
      stores = storeSearch
        ? stores?.docs.filter((store) => {
            if (
              store
                .data()
                .store.toLowerCase()
                .includes(storeSearch.toLowerCase())
            ) {
              return store;
            }
          })
        : stores?.docs;
      setstores(stores?.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    loadData();
  }, [productsSearch, storeSearch]);

  return (
    <div className="w-100">
      <>
        <div
          style={{
            height: "400px",
            backgroundImage: `url(https://img.freepik.com/free-photo/robots-efficiently-sorting-hundreds-parcels-per-hour-3d-rendering_41470-3492.jpg?t=st=1655693864~exp=1655694464~hmac=afa51a6514763842ad9e194b7d329c410c1ce1bdeee6493eb8cd61e516366df1&w=1380)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            backgroundPosition: " 50% 20%",
          }}
        >
          <div className="overlay">
            <Container>
              <h1 className="headerTitle">{"Shop With Us"}</h1>
            </Container>
          </div>
        </div>
      </>
      <div className="d-flex w-100 justify-content-between p-4">
        <div
          className="d-flex"
          style={{
            position: "absolute",
            top: "100px",
            right: "30px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <p className="mx-4">
            {!switchState ? "Switch as a Seller" : "Switch as a Buyer"}
          </p>
          <Switch
            onChange={(e) => setswitchState(e)}
            style={{ color: "white" }}
          />
        </div>
      </div>
      {!switchState ? (
        <Container>
          <Row className="h-100">
            <Col
              xs={{
                span: 4,
              }}
            >
              <div className="d-flex justify-center categorybox">
                <List
                  header={"Categories"}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  size="small"
                  dataSource={productsCategory}
                  renderItem={(item) => (
                    <List.Item
                      className="w-full text-center"
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                    >
                      <p
                        onClick={() => setselectedCategory(item)}
                        className="productItems"
                      >
                        {">"} {item}
                      </p>
                    </List.Item>
                  )}
                />
              </div>
              <div className="justify-content-center categorybox mt-4">
                <h5 className="filters">Filters</h5>
                <hr></hr>
                <h5
                  className="prod-types mt-2"
                  onClick={() => setCategorizeProdType("")}
                >
                  {">"} All
                </h5>
                <h5
                  className="prod-types mt-3"
                  onClick={() => setCategorizeProdType("Old")}
                >
                  {">"} Old
                </h5>
                <h5
                  className="prod-types mt-3"
                  onClick={() => setCategorizeProdType("New")}
                >
                  {">"} New
                </h5>
              </div>
            </Col>

            <Col xs={{ span: 20 }}>
              <CarouselPage />
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <h5 className="mt-5">
              <strong>{selectedCategory} Products</strong>
            </h5>
            <div className="d-flex mt-4 align-items-center">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                onChange={(e) => setproductsSearch(e.target.value)}
                aria-label="Search"
                value={productsSearch}
              />
              <MDBBtn gradient="aqua" size="sm" type="submit">
                <img
                  src={require("../../Assets/search-icon.png")}
                  alt="search"
                />
              </MDBBtn>

              <img
                src={mic}
                style={{
                  width: "35px",
                  padding: "5px",
                  height: "35px",
                  backgroundColor: shopmic ? "red" : "transparent",
                  borderRadius: "50px",
                }}
                onClick={() => setshopmic(true)}
              />
              {shopmic && (
                <DictaphoneShop
                  setproductsSearch={setproductsSearch}
                  setshopmic={setshopmic}
                />
              )}
            </div>
          </div>

          {products.length <= 0 ? (
            <div>
              <img className="noPro" style={{ width: "70%" }} src={noproduct} />
            </div>
          ) : (
            <div
              className="mt-4 w-100 h-100"
              justify="space-between"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {products?.map((product) =>
                !categorizeProdType ? (
                  selectedCategory === "All" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : selectedCategory === product.category ? (
                    <ProductCard key={product.id} product={product} />
                  ) : null
                ) : selectedCategory === "All" &&
                  product.type === categorizeProdType ? (
                  <ProductCard key={product.id} product={product} />
                ) : selectedCategory === product.category &&
                  product.type === categorizeProdType ? (
                  <ProductCard key={product.id} product={product} />
                ) : null
              )}
            </div>
          )}

          <section>
            <div className="d-flex justify-content-between">
              <h5 className="mt-5">
                <strong>All Stores</strong>
              </h5>
              <div className="d-flex mt-4 align-items-center">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setstoreSearch(e.target.value)}
                  aria-label="Search"
                  value={storeSearch}
                />
                <MDBBtn gradient="aqua" size="sm" type="submit">
                  <img
                    src={require("../../Assets/search-icon.png")}
                    alt="search"
                  />
                </MDBBtn>
                <img
                  src={mic}
                  style={{
                    width: "35px",
                    padding: "5px",
                    height: "35px",
                    backgroundColor: storemic ? "red" : "transparent",
                    borderRadius: "50px",
                  }}
                  onClick={() => setstoremic(true)}
                />
                {storemic && (
                  <DictaphoneStore
                    setstoreSearch={setstoreSearch}
                    setstoremic={setstoremic}
                  />
                )}
              </div>
            </div>
            {stores.length <= 0 ? (
              <div>
                <img className="noPro" style={{ width: "40%" }} src={nostore} />
              </div>
            ) : (
              <div
                className="mt-4 w-100 h-100"
                justify="space-between"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
              >
                {stores?.map((store) => (
                  <Card
                    onClick={() =>
                      navigate(`/store/${store.id}`, {
                        state: store,
                      })
                    }
                    className="storeCard my-2"
                    key={store.id}
                  >
                    <div className="storeInfo">
                      <p className="storeName">{store.store}</p>
                      <hr></hr>
                      <img className="avaImg" src={avatar} />
                      <p className="sellerName">
                        {store.fName} {store.lName}
                      </p>
                      <p className="sellerEmail">{store.email}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </Container>
      ) : (
        <Store />
      )}
    </div>
  );
};

export default Shop;

const CarouselPage = () => {
  return (
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={2}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                style={{ height: "465px" }}
                src={banner}
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                style={{ height: "465px" }}
                src={banner2}
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
};
