import React, { useState } from "react";
import { Card, Tabs, Tooltip, Modal, Button } from "antd";
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

    const choosePowers = ["Choose Power","0"]
    const choosePower6s = ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"]
    const outOfStock = ["0", "-1.00", "-1.25", "-1.50", "-1.75", "-5.00"]
    const [power, setPower] = useState('default');
    const [power6, setPower6] = useState('default');
    const [powerLeft, setPowerLeft] = useState('default');
    const [powerRight, setPowerRight] = useState('default');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [customized, setCustomized] = useState(false);
    const [hidden, setHidden] = useState(false);

    const {title, tagline, images, slug, hexCodeDark, hexCodeLight, price, category, sub, _id, isCustomized} = product;

    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalVisible(true);
    };

    let passingPrice

    if(customized) {
        passingPrice = price + 500;
    }
    else {
        passingPrice = price;
    }
    
    const handleOk = () => {
        if(powerRight === "Choose Power" || powerLeft === "Choose Power" || powerRight === "default" || powerLeft === "default") {
            alert("Please select a power")
        }
        else {
            setCustomized(true)
            setHidden(true);
            setIsModalVisible(false);
        }
    };

    const removeCustomization = () => {
        setPowerLeft('default');
        setPowerRight("default");
        setHidden(false);
        setCustomized(false)
    } 
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddToCart = () => {
        let cart = []
        if(typeof window != 'undefined') {
          if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')) 
          }
          cart.push({
            ...product,
            count: 1,
            choosePower6: power6,
            choosePower: power,
            choosePowerLeft: powerLeft,
            choosePowerRight: powerRight,
            isCustomized: customized,
            price: passingPrice
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
                            $ {price} {customized && (
                                <p className = "text-success"> + $500</p>
                            )}
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

                        

                        <br />

                        {category && category.name === '6 Months' ? (
                            <>
                                <div className="form-group">
                                    <select
                                        value = {power6}
                                        name = "choosePower6"
                                        className = "form-control"
                                        onChange = {(e) => setPower6(e.target.value)}
                                        hidden = {hidden}
                                    >
                                        {choosePower6s.map(c => {
                                            if(outOfStock.includes(c)) {
                                               return (<option disabled key = {c} value = {c}>
                                                    {c} - Out of Stock
                                                </option>)
                                            } else {
                                                return (
                                                    <option key = {c} value = {c}>
                                                        {c}
                                                    </option>
                                                )
                                            }
                                        })}
                                    </select>
                                </div>
                            <div>
                                {!customized && (
                                    <p className="text-muted">Different powers? Customize by clicking below!</p>
                                )}

                                {customized && (
                                    <>
                                        <p className="text-success">Left Power: {powerLeft}</p>
                                        <p className="text-success">Right Power: {powerRight}</p>
                                    </>
                                )}
                                <Button type="primary" onClick={showModal}>
                                    Customize
                                </Button>
                                <Modal title="Customize Your Lenses" okText={`Customize`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    <div className="form-group">
                                        <label>Power Left</label>
                                        <select
                                            value = {powerLeft}
                                            name = "choosePower6"
                                            className = "form-control"
                                            onChange = {(e) => setPowerLeft(e.target.value)}
                                        >
                                            {choosePower6s.map(c => {
                                                if(outOfStock.includes(c)) {
                                                return (<option disabled key = {c} value = {c}>
                                                        {c} - Out of Stock
                                                    </option>)
                                                } else {
                                                    return (
                                                        <option key = {c} value = {c}>
                                                            {c}
                                                        </option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </div> 
                                    <hr />
                                    <div className="form-group">
                                        <label>Power Right</label>
                                        <select
                                            value = {powerRight}
                                            name = "choosePower6"
                                            className = "form-control"
                                            onChange = {(e) => setPowerRight(e.target.value)}
                                        >
                                            {choosePower6s.map(c => {
                                                if(outOfStock.includes(c)) {
                                                return (<option disabled key = {c} value = {c}>
                                                        {c} - Out of Stock
                                                    </option>)
                                                } else {
                                                    return (
                                                        <option key = {c} value = {c}>
                                                            {c}
                                                        </option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </div>
                                </Modal>
                                {customized && (
                                    <div>
                                        <button className="btn btn-danger" onClick = {removeCustomization}>Remove Customizations</button>
                                    </div>
                                )}
                            </div>
                            </>
                        ) : (
                            <div className="form-group">
                                    <select
                                        value = {power}
                                        name = "choosePowers"
                                        className = "form-control"
                                        onChange = {(e) => setPower(e.target.value)}
                                    >
                                        {choosePowers.map(c => 
                                            <option key = {c} value = {c}>
                                                {c}
                                            </option>
                                        )}
                                    </select>
                            </div>
                        )}    

        
                        </ul>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct