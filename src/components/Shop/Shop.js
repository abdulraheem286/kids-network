import { Col, Row, List, Switch, Card, Input, Button } from 'antd';
import {
    MDBCarousel,
    MDBCarouselItem, MDBContainer, MDBView, MDBCarouselInner
} from 'mdbreact';
import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useToken } from '../../hooks/useToken';
import firebase from "firebase"
import "./Shop.css"
import ProductCard from './ProductCard';
import Store from './Store';
import _ from 'lodash';
const Shop = () => {
    const token = useToken();
    const [switchState, setswitchState] = useState(false)
    const [productsCategory, setproductsCategory] = useState([])
    const [products, setproducts] = useState([])
    const [stores, setstores] = useState([])
    const [selectedCategory, setselectedCategory] = useState("All")
    const navigate = useNavigate();
    const productsSearchRef = useRef();
    const storeSearchRef = useRef()
    const [productsSearch, setproductsSearch] = useState("")
    const [storeSearch, setstoreSearch] = useState("")
    useEffect(() => {
        if (!token) navigate("/sign-in", { replace: true });
    }, [navigate, token]);
    useEffect(() => {
        const loadData = async () => {
            const categories = await firebase.firestore().collection("categories")
                .doc("productCategory").get()
            setproductsCategory(categories.data().categories)

            let products = await firebase.firestore().collection("products").get()

            products = productsSearch ? _.filter(products?.docs, product => {
                if (
                    product.data().title.toLowerCase().includes(productsSearch.toLowerCase())
                ) {
                    return product;
                }
            })
                : products?.docs
            setproducts(products?.map(doc => ({ id: doc.id, ...doc.data() })))

            let stores = await firebase.firestore().collection("users").where("store", ">", "").get()
            stores = storeSearch ? stores?.docs.filter(store => {
                if (
                    store.data().store.toLowerCase().includes(storeSearch.toLowerCase())
                ) {
                    return store;
                }
            })
                : stores?.docs
            setstores(stores?.map(doc => ({ id: doc.id, ...doc.data() })))
        }
        loadData()
    }, [productsSearch, storeSearch])

    return (
        <div className='w-100'>
            <div className='d-flex w-100 justify-content-between p-4'>
                <p className='fs-2 fw-bold' style={{
                    fontSize: "22px", fontWeight: "bold", textDecoration: "underline",
                    textUnderlineOffset: "8px"
                }}>
                    Welcome to <span style={{ color: "#65daff" }}>Kid's Network </span>Store</p>
                <div className='d-flex'>
                    <p className='mx-4'>{!switchState ? "Switch as a Seller" : "Switch as a Buyer"}</p>
                    <Switch onChange={(e) => setswitchState(e)} />
                </div>
            </div>
            {
                !switchState ? <Container>

                    <Row className='h-100'>
                        <Col xs={{
                            span: 4
                        }}>
                            <div className='d-flex justify-center'>
                                <List
                                    header={"Products Categories"}
                                    size='small'
                                    dataSource={productsCategory}
                                    renderItem={(item) => (
                                        <List.Item className='w-full text-center  px-4' style={{ fontSize: "14px" }}>
                                            <p onClick={() => setselectedCategory(item)} className="productItems">{item}</p>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>
                        <Col xs={{ span: 20 }}>
                            <CarouselPage />
                        </Col>
                    </Row>
                    <div className='px-4 d-flex justify-content-between mt-5'>

                        <h5 className="">
                            {selectedCategory} Products
                        </h5>
                        <div className='w-50 d-flex'>

                            <input className='p-1 rounded'
                                onChange={(e) => {
                                    if (!e.target.value) {
                                        setproductsSearch(e.target.value);
                                    }
                                }}
                                ref={productsSearchRef} placeholder="Search Products ..." />
                            <Button type="primary" onClick={() => setproductsSearch(productsSearchRef.current.value)}>Search</Button>
                        </div>
                    </div>
                    <Row className="px-2 w-100 h-100" justify="space-evenly" >
                        {
                            products?.map(product => (
                                selectedCategory === "All" ? <ProductCard key={product.id} product={product} />
                                    : selectedCategory === product.category ? <ProductCard key={product.id} product={product} /> : null

                            ))
                        }
                    </Row>

                    <div className='px-4 d-flex justify-content-between mt-5'>

                        <h5 className=''>
                            Available Stores                    </h5>
                        <div className='w-50 d-flex'>

                            <input className='p-1 rounded' ref={storeSearchRef}
                                onChange={(e) => {
                                    if (!e.target.value) {
                                        setstoreSearch(e.target.value);
                                    }
                                }}
                                placeholder="Search Stores ..." />
                            <Button type="primary" onClick={(e) => {
                                setstoreSearch(storeSearchRef.current.value)
                            }}>Search</Button>
                        </div>
                    </div>
                    <Row className="px-2 w-100 h-100" justify="space-evenly" >
                        {
                            stores?.map(store => (
                                <Card onClick={() => navigate(`/store/${store.id}`, {
                                    state: store
                                })} className="storeCard mx-3" key={store.id} title={store.store}>
                                    <p>
                                        Seller Name: {store.fName} {store.lName}
                                    </p>
                                    <p>
                                        Seller Contact: {store.email}
                                    </p>
                                </Card>
                            ))
                        }
                    </Row>
                </Container>
                    : <Store />
            }
        </div>
    )
}

export default Shop
const CarouselPage = () => {
    return (
        <MDBContainer>
            <MDBCarousel
                activeItem={1}
                length={3}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
            >
                <MDBCarouselInner>
                    <MDBCarouselItem itemId="1">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://icms-image.slatic.net/images/ims-web/4c506832-5d4f-4b7a-8adb-6ef3c39a57df.jpg_1200x1200.jpg"
                                alt="First slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://icms-image.slatic.net/images/ims-web/f3a04e14-3e75-49c3-97b5-9c92d97a9323.jpg"
                                alt="Second slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://icms-image.slatic.net/images/ims-web/e6bcb8af-df90-4633-b71d-32c2d2831412.jpg"
                                alt="Third slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}