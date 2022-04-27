import { Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import Product from './Product'

const { Panel } = Collapse
const Products = ({ categories, refresh }) => {
    const [products, setproducts] = useState([])
    useEffect(() => {
        firebase.firestore().collection("products").get().then(snapshot => {
            setproducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }).catch(error => console.log(error))
    }, [refresh])

    return (
        <Collapse accordion>
            {products?.map(product => (
                <Panel key={product.id} header={product.title} extra={<p>{product.author_email}</p>}>
                    <Product categories={categories} product={product} />
                </Panel>
            ))}
        </Collapse>
    )
}

export default Products