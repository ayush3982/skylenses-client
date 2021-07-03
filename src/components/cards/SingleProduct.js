import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import StarRating from "react-star-ratings"
import RatingModal from "../modal/RatingModal";

const {Meta} = Card

const SingleProduct = ({product, onStarClick, star}) => {

    const {title, tagline, images, slug, hexCodeDark, hexCodeLight, price, category, sub, _id} = product;

    return (
        <>  
            <div className="col-md-7">
                <Carousel showArrows = {true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel>
            </div>
            <div className="col-md-5">
                <h1 className="p-3" style={{backgroundColor: hexCodeLight}}>{title}</h1>
                <h6 className="p-3">{tagline}</h6>
                <Card
                    actions = {[
                        <>
                            <ShoppingCartOutlined className="text-success" /> Add to Card
                        </>,
                        <Link to = {`/`}>
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                        </Link>,
                        <RatingModal>
                            <StarRating
                                name = {_id}
                                numberOfStars = {5}
                                rating = {star}   
                                changeRating = {onStarClick}
                                isSelectable = {true}
                                starRatedColor = "aqua"
                            />
                            <br />
                            <br /> 
                        </RatingModal>
                    ]}
                >
                    <div>
                        <ul className="list-group">
                        <li className="list-group-item">
                            Price{" "}
                            <span className="label label-default label-pill pull-xs-right">
                            $ {price}
                            </span>
                        </li>

                        {category && (
                            <li className="list-group-item">
                            Category{" "}
                            <Link
                                to={`/category/${category.slug}`}
                                className="label label-default label-pill pull-xs-right"
                            >
                                {category.name}
                            </Link>
                            </li>
                        )}

                        {sub && (
                            <li className="list-group-item">
                            Sub category{" "}
                            <Link
                                to={`/sub/${sub.slug}`}
                                className="label label-default label-pill pull-xs-right"
                            >
                                {sub.name}
                            </Link>
                            </li>
                        )}

        
                        </ul>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct