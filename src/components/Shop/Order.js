import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import "./Order.css"
const Order = () => {
    const location = useLocation();
    const [order, setorder] = useState(null)
    useEffect(() => {
        setorder(location.state)
    }, [location])

    return (
        <div className='d-flex flex-column justify-content-center align-items-center h-100'>
            {order ? <div className='d-flex flex-column text-center'>
                <div style={{ marginLeft: "200px", width: "250px", height: "80px" }}>
                    <FontAwesomeIcon className="fIcon" style={{ color: "#282828", height: "48px" }} icon={faRocket} />
                </div>
                <h1>Thanks for your order</h1>
                <h4>Your order has been shipped and will be delivered shortly</h4>
            </div> : <h1>Make sure you placed an order</h1>}
            <Button className='my-2' type="primary" size="large">
                <Link to="/shop">Back to Shop Page</Link>
            </Button>
        </div>
    )
}

export default Order