import React from "react";
import {Card} from "antd"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import defaultImage from "../../images/image.jpg"
import {Link} from "react-router-dom"

const {Meta} = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, tagline, images, slug } = product;

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
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${tagline && tagline.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
