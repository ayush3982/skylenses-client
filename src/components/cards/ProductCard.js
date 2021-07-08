import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, DeleteOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import defaultImage from "../../images/image.jpg"
import {Link} from "react-router-dom"
import {showAverage} from "../../functions/rating"
import _ from "lodash"


const {Meta} = Card;


const ProductCard = ({product}) => {


    const handleAddToCart = () => {
      let cart = []
      if(typeof window != 'undefined') {
        if(localStorage.getItem('cart')) {
          cart = JSON.parse(localStorage.getItem('cart')) 
        }
        cart.push({
          ...product,
          count: 1,
        })
        let unique = _.uniqWith(cart, _.isEqual)
        // console.log(unique)
        localStorage.setItem('cart', JSON.stringify(unique))
      }
    }
    
    const {images, title, slug, tagline} = product;
    
    return (

        <>
          {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : (
            <div className="text-center pt-1 pb-3">New Product: Be the first to rate it!</div>
          )}
          <Card
          cover={
            <img
              src={images && images.length ? images[0].url : defaultImage}
              style={{ height: "350px", objectFit: "cover" }}
              className="p-1"
            />
          }
      
          actions={[
              <Link to={`/product/${slug}`}>
                <EyeOutlined className="text-warning" /> <br /> View Product
              </Link>,
              <a onClick = {handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
              </a>
            ]}
          >
          <Meta
            title={title}
            description={`${tagline && tagline.substring(0, 40)}...`}
          />
        </Card>
        
        </>
            
    )
}

export default ProductCard