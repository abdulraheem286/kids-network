import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import { useToken } from '../../hooks/useToken'
import { Card, Col, Row, Input, Button } from 'antd'
import Products from '../Admin/Shop/Products'
import AddProduct from '../Admin/Shop/AddProduct'
import { ReloadOutlined } from "@ant-design/icons"
const Store = () => {
    const token = useToken()
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([]);
    const [productsMessage, setproductsMessage] = useState("")
    const [storeName, setstoreName] = useState("")
    const [visible, setvisible] = useState(false)
    const [refresh, setrefresh] = useState(false)
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
                    setproductsMessage("There's no products to show. Add one to create your store")
            })
        setrefresh(false)
    }, [refresh])
    const createStore = async () => {
        try {
            await firebase.firestore().collection("users").doc(token?.id).update({
                store: storeName
            })
            setvisible(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' px-4 h-100'>
            <Button icon={<ReloadOutlined />} className="mb-2" onClick={() => setrefresh(!refresh)}>Refresh</Button>
            {products.length > 0 ? (
                <div className=''>
                    <AddProduct categories={categories} />
                    <h3 className='my-3'>Welcome to {token?.store}</h3>
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
            ) : <>
                <h1>{productsMessage}</h1>
                <Input value={storeName} onChange={(e) => setstoreName(e.target.value)}
                    placeholder="Give your store a name" size='large' className='my-3 w-50' />
                <Button size="large" type='primary' onClick={createStore}>Create Store</Button>
                {
                    visible && <>
                        <h3>Start adding products</h3>
                        <AddProduct categories={categories} /></>
                }
            </>
            }</div>
    )
}

export default Store