import React, { useState } from 'react'
import firebase from 'firebase'
import { useToken } from '../../hooks/useToken'
const PostStatus = ({ type, activePostId }) => {
    const token = useToken()
    const [state, setstate] = useState({
        subject: "",
        description: ""
    })
    const changeHandler = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (type === "Question") {

                await firebase.firestore().collection("questions").add({
                    ...state,
                    postedBy: `${token.fName} ${token.lName}`,
                    userId: token.id,
                    likes: 0,
                    comments: 0,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            }
            else {
                await firebase.firestore().collection("questions")
                    .doc(activePostId).collection("answers").add({
                        ...state,
                        postedBy: `${token.fName} ${token.lName}`,
                        userId: token.id,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                await firebase.firestore().collection("questions").doc(activePostId).update({
                    comments: firebase.firestore.FieldValue.increment(1)
                })
            }
            setstate({
                subject: "",
                description: ""
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={submitHandler} className='p-2 rounded bg-light'>
            <div>
                <label>{type} Subject: </label>
                <input required name="subject" onChange={changeHandler} className="bg-light" style={{ border: "1px solid black" }} />
            </div>
            <div>
                <label>Description: </label>
                <textarea required name="description" onChange={changeHandler} className="bg-light" style={{ border: "1px solid black" }} />
            </div>
            <button className='btn btn-success p-1' type="submit">Post</button>
        </form>
    )
}

export default PostStatus