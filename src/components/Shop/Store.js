import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import { useToken } from '../../hooks/useToken'
import { Card, Col, Row } from 'antd'
import Products from '../Admin/Shop/Products'
import AddProduct from '../Admin/Shop/AddProduct'
const Store = () => {
    const token = useToken()
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([]);
    const [productsMessage, setproductsMessage] = useState("")
    useEffect(() => {
        firebase
            .firestore()
            .collection("categories")
            .doc("productCategory")
            .get()
            .then((res) => {
                if (res?.data()) {
                    setcategories(res.data()?.categories);
                }
            });
        firebase.firestore().collection("users").doc(token.id)
            .collection("store").get().then(res => {
                res.docs.length > 0 ? setproducts(res.docs.map(doc => ({ id: doc.id, ...doc.data() }))) :
                    setproductsMessage("There's no products to show. Add some to start your store")
            })
    }, [])

    return (
        <div className=' px-4 h-100'>
            <AddProduct categories={categories} />
            {products.length > 0 ? (
                <div className=''>
                    <h3 className='my-3'>Welcome to your store</h3>
                    <Row>
                        {
                            products.map((product) => (
                                <Col key={product.id}>
                                    <Card title={product.title}>
                                        <img style={{ height: "200px", width: "200px" }} src={product.image} />
                                        <div className="d-flex flex-column mt-2">
                                            <p>Category: {product.category}</p>
                                            <p>Price: Rs.{product.price}</p>
                                            <p>Quantity: {product.quantity}</p>
                                            <p>Brand: {product.brand}</p>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <h3 className='my-3'>Edit your products</h3>
                    <div className='d-flex flex-column w-100'>
                        <Products products={products} categories={categories} />
                    </div>
                </div>
            ) : <h1>{productsMessage}</h1>
            }</div>
    )
}

export default Store