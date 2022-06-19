import React, { useState } from 'react'
import firebase from 'firebase'
import { useToken } from '../../hooks/useToken'
const PostStatus = ({ type, activePostId }) => {
    const token = useToken()
    const [state, setstate] = useState({
        subject: "",
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
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={submitHandler} className='p-2 rounded bg-light'>
            <div>
                {
                    type === "Question" && <label className="bg-danger p-1 mb-2 rounded-pill"
                        style={{ color: "white" }}>#Thread</label>
                }
                <input required name="subject" value={state.subject}
                    placeholder={type === "Question" ? "What's the status ..." :
                        "Post a comment ..."}
                    onChange={changeHandler} className="bg-light"
                    style={{
                        border: "none",
                        borderRadius: "0px",
                        borderBottom: "1px solid black", outline: "none"
                    }} />
            </div>
            <button className='btn btn-primary rounded p-1' type="submit">
                {type === "Question" ? "Post a Thread" : "Post a Comment"}
            </button>
        </form>
    )
}

export default PostStatus