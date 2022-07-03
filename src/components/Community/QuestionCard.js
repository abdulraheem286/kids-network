import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp, faTrashCan, faPenToSquare, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import firebase from "firebase"
import AnswerCard from './AnswerCard';
import PostStatus from './PostStatus';
import { useToken } from '../../hooks/useToken';
import { Button } from 'antd';
import { useRef } from 'react';
import { faCameraAlt } from '@fortawesome/free-solid-svg-icons';
const QuestionCard = ({ post }) => {
    const token = useToken()
    const [answers, setanswers] = useState([])
    const [edit, setedit] = useState(false)
    const [state, setState] = useState({
        subject: "",
        image: ""
    })
    const [postAnswer, setpostAnswer] = useState(false)
    const [allLikes, setallLikes] = useState(0)
    const [allDislikes, setallDislikes] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        firebase.firestore().collection("questions").doc(post.id).collection("answers").onSnapshot(snapshot => {
            const answers = snapshot.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
            setanswers(answers)
        })
        firebase.firestore().collection("questions").doc(post.id).collection("likes").onSnapshot(snapshot => {
            const likes = snapshot?.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
            let allLike = 0
            let allDisLike = 0
            for (let i = 0; i < likes?.length; i++) {

                if (likes[i]?.like === true) {
                    allLike += 1
                }
                else {
                    allDisLike += 1
                }
            }
            setallLikes(allLike)
            setallDislikes(allDisLike)
        })
    }, [])
    const deletePost = async () => {
        try {
            await firebase.firestore().collection("questions").doc(post?.id).delete()
        } catch (error) {
            console.log(error)
        }
    }
    const editPost = async (e) => {
        e.preventDefault()
        try {
            await firebase.firestore().collection("questions").doc(post?.id).update({
                ...state,
                image: state?.image ? state.image : post.image,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setState({
                subject: "",
                image: ""
            });
            setedit(false)
        } catch (error) {
            console.log(error)
        }
    }
    const setLike = async () => {
        try {
            await firebase.firestore().collection("questions").doc(post?.id).collection("likes")
                .doc(token.id).set({
                    like: true,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        } catch (error) {
            console.log(error)
        }
    }
    const setDisLike = async () => {
        try {
            await firebase.firestore().collection("questions").doc(post?.id).collection("likes")
                .doc(token.id).set({
                    like: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        } catch (error) {
            console.log(error)
        }
    }
    const openFile = () => {
        ref.current.click()
    }
    return (
        <div
            className="d-flex my-2 h-100"
            style={{
                borderRadius: "15px",
                filter:
                    "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
            }}
        >
            <section
                className="bg-light h-100 p-2"
                style={{
                    flex: "1 1 0%",
                    fontSize: "12px",
                }}
            >
                <div className='d-flex justify-content-between'>

                    <p>{((token.id === post?.userId && token?.expert) || post?.expert) && <span style={{
                        backgroundColor: "purple",
                        color: "white",
                        borderRadius: "10px",
                        padding: "5px"
                    }}
                    >Expert</span>} Posted by {post?.postedBy} on {post?.timestamp?.toDate()?.toLocaleDateString()}</p>
                    {(token?.isAdmin || (token.id === post?.userId)) && <div className='mx-5'>
                        <FontAwesomeIcon className='mx-2' style={{ height: "14px" }} onClick={deletePost}
                            icon={faTrashCan} />
                        <FontAwesomeIcon className='mx-2' style={{ height: "14px" }}
                            onClick={() => setedit(!edit)}
                            icon={faPenToSquare} />
                    </div>}

                </div>
                <h6>
                    <span
                        className="bg-danger rounded-pill fw-bold p-1 text-light"
                        style={{ marginRight: "10px", fontSize: "14px" }}
                    >
                        #Thread
                    </span>
                    {edit ? <form onSubmit={editPost} className='d-flex my-2'>
                        <input value={state.subject} style={{
                            border: "none", borderBottom: "1px solid black", borderRadius: "0px"
                        }} onChange={e => setState({ ...state, subject: e.target.value })} />
                        <div>
                            <FontAwesomeIcon className="ml-2" style={{ height: "20px" }} onClick={openFile} icon={faCameraAlt} />
                            <input
                                type={"file"}
                                ref={ref}
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) {
                                        return
                                    }
                                    if (file.size > 250000) {
                                        alert("File Size should not be more than 250kb")
                                        return
                                    }
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = function (e) {
                                        setState({ ...state, image: e.target.result });
                                    };
                                }}
                            />
                        </div>
                        {
                            state?.image && (
                                <img src={state.image} alt="post" className="w-25 h-25 m-2" />
                            )
                        }

                        <Button htmlType="submit">Submit</Button>
                    </form> : <><p className='m-2'>{post?.subject}</p>
                        {post?.image && <img src={post?.image} alt="post" className='w-50 h-50 m-2' />}
                    </>}
                </h6>
                <div
                    style={{ fontSize: "16px", marginTop: "20px" }}
                    className="d-flex justify-content-evenly border-top p-1"
                >
                    <div
                        onClick={() => setpostAnswer(!postAnswer)}
                        className="d-flex flex-column item-box p-2"
                        style={{
                            width: "fit-content",
                            marginRight: "15px",
                            borderRadius: "10px",
                        }}
                    >
                        <FontAwesomeIcon icon={faMessage} className="icon" />
                        <p> {post?.comments} Comments</p>
                    </div>
                    <div
                        className="d-flex flex-column  item-box p-2"
                        style={{ width: "fit-content", borderRadius: "10px" }}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} onClick={setLike} className="icon" />
                        <p> {allLikes} Likes</p>
                    </div>
                    <div
                        className="d-flex flex-column  item-box p-2"
                        style={{ width: "fit-content", borderRadius: "10px" }}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} onClick={setDisLike} className="icon" />
                        <p> {allDislikes} Dislikes</p>
                    </div>
                </div>
                <div>
                    {
                        answers?.map((answer) => {
                            return (
                                <AnswerCard post={answer} questionId={post.id} key={answer.id} />
                            )
                        })
                    }
                </div>
                {
                    postAnswer && <PostStatus type="Answer" activePostId={post.id} />
                }
            </section>
        </div>)
}

export default QuestionCard