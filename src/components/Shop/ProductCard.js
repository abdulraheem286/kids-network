import { Card } from 'antd'
import React from 'react'
import "./ProductCard.css"
const ProductCard = () => {
  return (
    <div>
      <Card size='small' bordered={false} className="bootstrap__card"
        style={{ width: "188px", height: "290px", border: "1px solid #dee2e6", borderRadius: "5px" }}>
        <img className='w-100 h-75' src="https://static-01.daraz.pk/p/5d0df61e7b5d8ec01a379b9c8bd76c42.jpg" />
        <div className='mt-2'>
          <h6>Mini Garlic Slicer</h6>
          <p><strong>Rs. 500</strong></p>
        </div>
      </Card>
    </div>
  )
}

export default ProductCard