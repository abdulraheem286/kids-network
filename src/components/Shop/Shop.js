import { List, Switch } from 'antd';
import { MDBCarousel, MDBCarouselItem, MDBContainer, MDBView, MDBCarouselInner } from 'mdbreact';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useToken } from '../../hooks/useToken';
import firebase from "firebase"
import "./Shop.css"
const Shop = () => {
    const token = useToken();
    const [switchState, setswitchState] = useState(false)
    const [productsCategory, setproductsCategory] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) navigate("/sign-in", { replace: true });
    }, [navigate, token]);
    useEffect(() => {
        firebase.firestore().collection("categories").doc("productCategory").get().then(res => setproductsCategory(res.data().categories))
    }, [])

    return (
        <div className='w-100 mh-100'>
            <div className='d-flex w-100 justify-content-between p-4'>
                <p className='fs-4 fw-bold'>Welcome to Kid's Network Store</p>
                <div className='d-flex'>
                    <p className='mx-4'>{!switchState ? "Switch as a Seller" : "Switch as a Buyer"}</p>
                    <Switch onChange={(e) => setswitchState(e)} />
                </div>
            </div>
            <Container>

                <Row className='h-100'>
                    <Col xs={{
                        span: 2
                    }}>
                        <div>
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
                    <Col >
                        <CarouselPage />
                    </Col>
                </Row>

                <Row className="mt-5 border w-100 h-100">
                    <h5>
                        All Products
                    </h5>
                </Row>
            </Container>
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