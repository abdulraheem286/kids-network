import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import firebase from "firebase"
import { Row } from 'antd'
import ProductCard from './ProductCard'
const SellerStore = () => {
    const [storeDetails, setstoreDetails] = useState({})
    const location = useLocation()
    const [products, setproducts] = useState([])
    useEffect(() => {
        firebase.firestore().collection("users").doc(location.state.id)
            .collection("store").get().then(res => setproducts(res.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
        setstoreDetails(location.state)
    }, [location])

    return (
        <div className='h-100 px-4'>
            <h1 className='my-3'>Products Available By {storeDetails.store}</h1>
            <Row className="px-2 w-100 h-100" justify="space-between" >
                {
                    products?.map(product => (
                        <ProductCard key={product.id} product={product} />

                    ))
                }
            </Row>
        </div>
    )
}

export default SellerStore