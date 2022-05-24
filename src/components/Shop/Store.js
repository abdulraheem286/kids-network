import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import { useToken } from '../../hooks/useToken'
import { Card, Col, Row, Input, Button } from 'antd'
import Products from '../Admin/Shop/Products'
import AddProduct from '../Admin/Shop/AddProduct'
import { ReloadOutlined, MessageOutlined } from "@ant-design/icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
const Store = () => {
    const token = useToken()
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([]);
    const [productsMessage, setproductsMessage] = useState("")
    const [storeName, setstoreName] = useState("")
    const [visible, setvisible] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [chats, setchats] = useState([])
    const [changeMessageState, setchangeMessageState] = useState(false)
    const [activeChat, setactiveChat] = useState([])
    const [message, setmessage] = useState({
        text: "",
        author: "",
        timestamp: null
    })
    useEffect(() => {
        firebase
            .firestore()
            .collection("categories")
            .doc("productCategory")
            .get()
            .then((res) => {
                if (res?.data()) {
                    console.log(res.data())
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
    useEffect(() => {
        const unsub = firebase.firestore().collection("users").doc(token.id).collection("chats").onSnapshot(snapshot => {

            setchats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return () => unsub()
    })

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
    const sendMessage = async () => {
        try {
            const userMessages = [...activeChat.chat, message];
            await firebase.firestore().collection("users").doc(token.id)
                .collection("chats").doc(activeChat.id).set({
                    chat: [...userMessages]
                })
            setchangeMessageState(!changeMessageState)
            setmessage({ ...message, text: "" })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' px-4 h-100'>
            <div className='d-flex'>
                <Button icon={<ReloadOutlined />} className="mb-2" onClick={() => setrefresh(!refresh)}>Refresh</Button>

            </div>

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
                    <Row className='my-3'>
                        <Col xs={{
                            span: 24
                        }}>
                            <div className='border d-flex p-2' style={{ height: "467px" }}>
                                <div className='d-flex flex-column h-100 w-25' style={{
                                    backgroundColor: "whitesmoke", overflowY: "scroll"
                                }}>
                                    {
                                        chats?.map((chat, index) => (
                                            <p className={`p-1 border text-center`}
                                                key={index} style={{
                                                    cursor: "pointer",

                                                    backgroundColor: chat.id == activeChat.id ?
                                                        "#1890ff" : "white",
                                                    color: chat.id == activeChat.id ?
                                                        "white" : "#282828",
                                                }}
                                                onClick={() => setactiveChat(chat)}>
                                                {chat.id.split("@")[0].replace(/^\w/, c => c.toUpperCase())}
                                            </p>
                                        ))
                                    }
                                </div>
                                <div className='h-100 w-75 border d-flex justify-content-between flex-column'>
                                    <div className="w-100 border text-center p-1">
                                        {activeChat?.id?.split("@")[0].toUpperCase()}
                                    </div>

                                    <div style={{ overflowY: "scroll" }}>

                                        {
                                            activeChat?.chat?.map((message, index) => (
                                                <div className={`w-100
                                                ${message.author === token.email ? "justify-content-start" : "justify-content-end"} d-flex`} key={index}>

                                                    <div className={`rounded m-2 w-25 border`} style={{ fontSize: "10px" }}>
                                                        <p style={{
                                                            backgroundColor: "#282828",
                                                            color: "whitesmoke"
                                                        }} className='border-bottom p-1'>{message?.author.split("@")[0]}</p>
                                                        <p className='p-1 m-0 p-0'>{message?.text}</p>
                                                        <p className='m-0 p-1 float-right'>{new Date(message?.timestamp).toLocaleTimeString()}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='d-flex align-items-center w-75 mx-auto'>
                                        <input className='w-75 h-100 rounded-pill'
                                            value={message.text} onChange={e => setmessage({
                                                ...message, text: e.target.value,
                                                timestamp: Date.now(),
                                                author: token.email
                                            })} placeholder='Send a message' />
                                        <FontAwesomeIcon className='mx-3 paperPlane'
                                            onClick={sendMessage} icon={faPaperPlane} />
                                    </div>

                                </div>

                            </div>

                        </Col>
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