import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import firebase from "firebase"
import AnswerCard from './AnswerCard';
import PostStatus from './PostStatus';
const QuestionCard = ({ post }) => {
    const [answers, setanswers] = useState([])
    const [postAnswer, setpostAnswer] = useState(false)
    useEffect(() => {
        firebase.firestore().collection("questions").doc(post.id).collection("answers").onSnapshot(snapshot => {
            const answers = snapshot.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
            setanswers(answers)
        })
    }, [])

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
                <p>Posted by {post?.postedBy} 12 days ago</p>
                <h6>
                    <span
                        className="bg-danger rounded-pill fw-bold p-1 text-light"
                        style={{ marginRight: "10px", fontSize: "14px" }}
                    >
                        #Thread
                    </span>
                    {post?.subject}
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
                        <FontAwesomeIcon icon={faThumbsUp} className="icon" />
                        <p> {post?.likes} Likes</p>
                    </div>
                </div>
                <div>
                    {
                        answers?.map((answer) => {
                            return (
                                <AnswerCard post={answer} key={answer.id} />
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