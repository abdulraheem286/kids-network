import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
const Order = () => {
    const location = useLocation();
    const [order, setorder] = useState(null)
    useEffect(() => {
        setorder(location.state)
    }, [location])

    return (
        <div>
            <h1>Welcome to order page</h1>
            {order ? <h1>Thanks for your order</h1> : <h1>Make sure you placed an order</h1>}
        </div>
    )
}

export default Order