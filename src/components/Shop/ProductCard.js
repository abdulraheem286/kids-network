import { Card } from 'antd'
import React from 'react'
import { useNavigate } from "react-router-dom"
import "./ProductCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons"

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const navigateToPage = () => {
    navigate(`/product/${product.id}`, { state: product })
  }
  return (
    <div>
      <Card onClick={navigateToPage} size='small' bordered={false} className="bootstrap__card mx-3 my-3"
        style={{ width: "188px", height: "290px", border: "1px solid #dee2e6", borderRadius: "5px" }}>
        <img className='w-100 h-75' src={product?.image} />
        <div className='mt-2'>
          <h6>{product?.title}</h6>
          <p><strong>Rs. {product?.price}</strong></p>
          {
            Array(5).fill(0).map((_, index) => (

              index <= product?.rating ? <FontAwesomeIcon key={index}
                style={{ color: "yellow" }} icon={faStarSolid} /> :
                <FontAwesomeIcon icon={faStar} key={index} />


            ))
          }
        </div>
      </Card>
    </div>
  )
}

export default ProductCard