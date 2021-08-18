import React, { useState } from "react";
import { Card, Tabs, Tooltip, Modal,  } from "antd";
import Button from '@material-ui/core/Button';
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
    // const outOfStock = ["0", "-1.00", "-1.25", "-1.50", "-1.75", "-5.00"]
    const [power, setPower] = useState('default');
    const [power6, setPower6] = useState('default');
    const [powerLeft, setPowerLeft] = useState('default');
    const [powerRight, setPowerRight] = useState('default');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [customized, setCustomized] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [showError, setShowError] = useState(false);

    const {title, tagline, images, slug, hexCodeDark, hexCodeLight, price, category, sub, _id, isCustomized, outOfStock} = product;

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
        if((power !== "default" && power !== "Choose Power")) {
            let cart = []
            if(typeof window != 'undefined') {
                if(localStorage.getItem('cart')) {
                    cart = JSON.parse(localStorage.getItem('cart')) 
                }
                cart.push({
                    ...product,
                    count: 1,
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

        if(customized) {
            let cart = []
            if(typeof window != 'undefined') {
                if(localStorage.getItem('cart')) {
                    cart = JSON.parse(localStorage.getItem('cart')) 
                }
                cart.push({
                    ...product,
                    count: 1,
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
    
    }

    const productChoices = () => {
        return (
            <div className="container-fluid">
                    <ul className="list-group">
                        {/* <li className="list-group-item">
                            Price{" "}
                            <span className="label label-default label-pill pull-xs-right">
                            {customized ? (
                                <p> INR {price + 500}</p>
                            ) : (
                                <p> INR {price}</p>
                            )}
                            </span>
                        </li> */}
                        <div>
                        {customized ? (
                            <h5 className="p-3 text-center" style = {{color: `${product.hexCodeLight}`, fontSize: '30px'}}> INR {price + 500}</h5>
                            ) : (
                                <h5 className="p-3 text-center" style = {{color: `${product.hexCodeLight}`, fontSize: '30px'}}> INR {price}</h5>
                            )}
                        </div>

                        {category && (
                            <li className="list-group-item">
                            Use it for{" "}
                            <Link
                                to={`/category/${category.slug}`}
                                className="label label-default label-pill pull-xs-right"
                                style = {{color: `${product.hexCodeLight}`}}
                            >
                                {category.name}
                            </Link>
                            </li>
                        )}  
                        {customized && (
                            <>
                                {/* <p>Left Power: {powerLeft}</p>
                                <p>Right Power: {powerRight}</p> */}
                                <li className="list-group-item">
                                    Left Power{" "}
                                    <span className="label label-default label-pill pull-xs-right">
                                        <p>{powerLeft}</p>
                                    </span>
                                </li>
                                <li className="list-group-item">
                                    Right Power{" "}
                                    <span className="label label-default label-pill pull-xs-right">
                                        <p>{powerRight}</p>
                                    </span>
                                </li>
                            </>
                        )} 


                        

                        <br />

                        {category && category.name === '6 Months' && category.name !== "Sky Solutio" ? (
                            <>
                                <div className="form-group">
                                    <select
                                        value = {power}
                                        name = "choosePower"
                                        className = "form-control"
                                        onChange = {(e) => setPower(e.target.value)}
                                        hidden = {hidden}
                                        style = {{color : `black`, background : `white`}}
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
                            <div style = {{color : `${product.hexCodeLight}`}}>
                                {!customized && (
                                    <p>Different powers? Customize by clicking below for an extra INR 500!</p>
                                )}

                                <div>
                                    <Button variant="outlined" onClick={showModal} style = {{color : `${product.hexCodeDark}`, background : `${product.hexCodeLight}`}}>
                                        Customize
                                    </Button> <br />
                                    {customized && (
                                    <Button variant="outlined" onClick = {removeCustomization} style = {{color : `${product.hexCodeDark}`, background : `${product.hexCodeLight}`, marginTop : '10px'}}>Remove Customizations</Button>
                                )}
                                </div>
                                {showError ? (<p>Please choose a power</p>) : ""}
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
                        <div style = {{
                            display: 'flex',
                            marginTop: '20px',
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }}>
                        <a style = {{
                           marginLeft: '20px',
                           marginRight: '20px',
                           backgroundColor: `${product.hexCodeLight}`,
                           color: `${product.hexCodeDark}`,
                           height: '50px',
                           width: '100%',
                           display: 'flex',
                           alignItems: 'center', 
                           justifyContent: 'center',
                           borderRadius: '5px'
                        }} onClick = {handleAddToCart}>
                                <ShoppingCartOutlined className="success" disabled /> Add to Cart
                        </a>
                        {/* <RatingModal style = {{
                            display: 'flex',
                            marginTop: '10px',
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }}>
                            <StarRating
                                name = {_id}
                                numberOfStars = {5}
                                rating = {star}   
                                changeRating = {onStarClick}
                                isSelectable = {true}
                                starRatedColor = {`${product.hexCodeLight}`}
                            />
                            <br />
                            <br /> 
                        </RatingModal> */}
                        </div>
                    </div>
        )
    }

    const cardBody = () => {
        return (
            <>
                <h1 className="p-3 text-center" style={{backgroundColor: `${product.hexCodeDark}`, borderRadius: '20px', color: `${product.hexCodeLight}`, marginTop: '10px'}}>{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : (
                    <div className="text-center pt-1 pb-3" style = {{color: `${product.hexCodeLight}`}}>New Product: Be the first to rate it!</div>
                )}
                <h6 className="p-3 text-center" style = {{color: `${product.hexCodeLight}`}}>{tagline}</h6>
                <Card style ={{borderRadius: '20px', backgroundColor: `${product.hexCodeDark}`, color: `${product.hexCodeLight}`}}
                >
                    {category && category.name !== "Sky Solution" && (
                        <div>{productChoices()}</div>
                    )}
                </Card>
            </>
        )
    }

    return (
        <>  
            <div className="col-md-6">
                <Carousel showThumbs = {false} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.url} key={i.public_id}/>)}
                </Carousel>
            </div>
            <div className="col-md-5" style={{backgroundColor: `${product.hexCodeDark}`, borderRadius: '20px'}} >
                {cardBody()}
            </div>
        </>
            
    )
}

export default SingleProduct