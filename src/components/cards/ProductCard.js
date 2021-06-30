import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, DeleteOutlined} from '@ant-design/icons'
import defaultImage from "../../images/image.jpg"
import {Link} from "react-router-dom"


const {Meta} = Card;


const ProductCard = ({product}) => {
    
    const {images, title, slug, description} = product;
    
    return (
        <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            style={{ height: "350px", objectFit: "cover" }}
            className="p-1"
          />
        }
    
        actions={[
            <Link to={`/admin/product/${slug}`}>
              <EyeOutlined className="text-warning" /> <br /> View Product
            </Link>,
          ]}
        >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
            
    )
}

export default ProductCard