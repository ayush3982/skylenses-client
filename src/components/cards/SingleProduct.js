import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import StarRating from "react-star-ratings"
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating"
import _ from "lodash"
import {useSelector, useDispatch} from 'react-redux'


const {Meta} = Card

const SingleProduct = ({product, onStarClick, star}) => {

    const {title, tagline, images, slug, hexCodeDark, hexCodeLight, price, category, sub, _id} = product;

    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

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
          dispatch({
            type: "ADD_TO_CART",
            payload: unique
          })
        }
    }

    return (
        <>  
            <div className="col-md-7">
                <Carousel showArrows = {true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel>
            </div>
            <div className="col-md-5">
                <h1 className="p-3 text-center" style={{backgroundColor: hexCodeLight}}>{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : (
                    <div className="text-center pt-1 pb-3">New Product: Be the first to rate it!</div>
                )}
                <h6 className="p-3 text-center">{tagline}</h6>
                <Card
                    actions = {[
                        <>
                            <a onClick = {handleAddToCart}>
                                <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
                            </a>
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