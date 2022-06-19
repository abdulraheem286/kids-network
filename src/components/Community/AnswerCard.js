import React from 'react'

const AnswerCard = ({ post }) => {
    return (
        <div className="my-2" style={{ borderRadius: "15px" }}>
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
                        className="bg-success rounded-pill fw-bold p-1 text-light"
                        style={{ marginRight: "10px", fontSize: "12px" }}
                    >
                        #Open Thread
                    </span>
                    {post?.subject}
                </h6>
                <div
                    style={{ fontSize: "16px", marginTop: "20px" }}
                    className="d-flex justify-content-evenly border-top p-1"
                >


                </div>

            </section>

        </div>
    )
}

export default AnswerCard
