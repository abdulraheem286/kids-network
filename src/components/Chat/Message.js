import React from 'react'
import { useToken } from '../../hooks/useToken'

const Message = ({ messages }) => {

    const token = useToken()
    return (
        <div className='h-100' style={{
            overflowY: "scroll"
        }}>
            {
                messages?.map((message, index) => (
                    <div className='w-100 d-flex' key={index}>

                        <div className={`rounded m-2
            ${message?.author !== token.email ? "float-right" : "float-left"} w-25 border`} style={{ fontSize: "10px" }}>
                            <p className='border-bottom p-1'>{message?.author}</p>
                            <p className='p-1 m-0 p-0'>{message?.text}</p>
                            <p className='m-0 p-1 float-right'>{new Date(message?.timestamp).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Message