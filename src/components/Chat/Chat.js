import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import Message from './Message'
import firebase from "firebase"
import { useToken } from '../../hooks/useToken'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
const Chat = ({ author, author_email, product }) => {
    const token = useToken()
    const [message, setmessage] = useState({
        text: "",
        timestamp: null,
        author: ""
    })
    const [messages, setmessages] = useState([])// db
    const [authorId, setauthorId] = useState("")
    const [changeMessageState, setchangeMessageState] = useState(false)// current write
    useEffect(() => {
        async function getMessages() {
            try {
                const authorId = await firebase.firestore().collection("users")
                    .where("email", "==", author_email).get();

                const userChat = await firebase.firestore().collection("users")
                    .doc(authorId.docs[0].id)
                    .collection("store").doc(product.id).collection("chats").doc(token.email).get()

                setauthorId(authorId.docs[0].id)
                if (userChat.data()?.chat) {

                    setmessages(userChat.data()?.chat)
                }


            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [changeMessageState])

    const sendMessage = async () => {
        try {
            const userMessages = [...messages, message];
            setmessages([...messages, message])
            await firebase.firestore().collection("users").doc(authorId)
                .collection("store").doc(product.id).collection("chats").doc(token.email).set({
                    chat: [...userMessages]
                })
            setchangeMessageState(!changeMessageState)
            setmessage({ ...message, text: "" })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='d-flex flex-column justify-content-between p-2 rounded border w-100 mt-3'
            style={{ height: "550px", backgroundColor: "#1890ff" }}>
            <div className='d-flex justify-content-between border-bottom p-1 pb-2 w-100'
                style={{ height: "50px", color: "white" }}>
                <div className='d-flex
                 justify-content-center align-items-center'>
                    <img className='rounded-circle  mr-4'
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Nhwvll4m1Jc3wjjmi2OGFgHaGZ%26pid%3DApi&f=1" style={{ width: "50px", height: "50px" }} />
                    <h4 style={{ color: "white" }} className='mt-2'>{author}</h4>
                    <FontAwesomeIcon className='mx-3' onClick={() => setchangeMessageState(!changeMessageState)} icon={faRefresh} />

                </div>
                <div className="d-flex align-items-center mx-5">
                    {author_email}
                </div>
            </div>
            <div style={{ height: "75%" }} className="border rounded m-2 mb-3">
                <Message messages={messages} messageState={changeMessageState} />
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
    )
}

export default Chat