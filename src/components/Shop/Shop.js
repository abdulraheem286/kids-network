import { Col, Row, List, Switch, Card } from 'antd';
import {
    MDBCarousel,
    MDBCarouselItem, MDBContainer, MDBView, MDBCarouselInner
} from 'mdbreact';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useToken } from '../../hooks/useToken';
import firebase from "firebase"
import "./Shop.css"
import ProductCard from './ProductCard';
import Store from './Store';
const Shop = () => {
    const token = useToken();
    const [switchState, setswitchState] = useState(false)
    const [productsCategory, setproductsCategory] = useState([])
    const [products, setproducts] = useState([])
    const [stores, setstores] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) navigate("/sign-in", { replace: true });
    }, [navigate, token]);
    useEffect(() => {
        firebase.firestore().collection("categories")
            .doc("productCategory").get().then(res => setproductsCategory(res.data().categories))
        firebase.firestore().collection("products").get().then(products => {
            setproducts(products?.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        firebase.firestore().collection("users").where("store", ">", "").get().
            then(res => setstores(res.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
    }, [])

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
                                            <p className="productItems">{item}</p>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Col>
                        <Col xs={{ span: 20 }}>
                            <CarouselPage />
                        </Col>
                    </Row>

                    <h5 className='mt-5'>
                        All Products
                    </h5>
                    <Row className="px-2 w-100 h-100" justify="space-between" >
                        {
                            products?.map(product => (
                                <ProductCard key={product.id} product={product} />

                            ))
                        }
                    </Row>

                    <h5 className='mt-5'>
                        Available Stores
                    </h5>
                    <Row className="px-2 w-100 h-100" justify="space-between" >
                        {
                            stores?.map(store => (
                                <Card onClick={() => navigate(`/store/${store.id}`, {
                                    state: store
                                })} className="storeCard" key={store.id} title={store.store}>
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
                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).webp"
                                alt="First slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).webp"
                                alt="Second slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3">
                        <MDBView>
                            <img
                                className="d-block w-100"
                                src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).webp"
                                alt="Third slide"
                            />
                        </MDBView>
                    </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>
        </MDBContainer>
    );
}