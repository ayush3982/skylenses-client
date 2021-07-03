import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, DeleteOutlined} from '@ant-design/icons'
import defaultImage from "../../images/image.jpg"
import {Link} from "react-router-dom"
import {showAverage} from "../../functions/rating"


const {Meta} = Card;


const ProductCard = ({product}) => {
    
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