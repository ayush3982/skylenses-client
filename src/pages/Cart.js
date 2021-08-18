import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import {userCart} from '../functions/user'

const Cart = ({history}) => {

    const {cart, user} = useSelector((state) => ({...state}))
    // const [deliveryCharges, setDeliveryCharges] = useState(false)
    const dispatch = useDispatch()

    const charges = 50;
    const limit = 999;

    const deliveryChargesApplied = () => {
        let extraCharges = getTotal();
        if(extraCharges < limit) {
            // setDeliveryCharges(true);
            extraCharges = extraCharges + charges;
            return extraCharges;
        }
        else {
            return extraCharges
        }
    }

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
        userCart(cart,user.token).then((res) => {
            if(res.data.ok) history.push("/checkout")
        }).catch((err) => {console.log("cart save err", err)})
    }

    const showCartItems = () => {
        return (
            <div >
                {cart.map((p) => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))}
            </div>
        )
    }

    return (
        <div>
            <div className="container-fluid pt-2" style = {{marginBottom: "100px"}}>
            <div className="row">
                <div className="col-md" style = {{
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Lato, sans-serif",
                    alignItems: "center"
                }}>
                    <h4 className="mt-5">{cart.length} Products in  Cart</h4>
                    {!cart.length ? (<p>No products in cart. <Link to = '/shop'>Continue Shopping</Link></p>) : (
                        showCartItems()
                    )}
                </div>
                <div className="col-md" style = {{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    fontFamily: "Lato, sans-serif"
                }}>
                    <h4 className = "mt-5">Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = INR {c.price * c.count}</p>
                        </div>
                    ))}
                    {getTotal() < deliveryChargesApplied() ? (<div>Delivery Charges : 50</div>) : (null)}
                    <hr />
                        Total: <b>INR {deliveryChargesApplied()}</b>
                    <hr />
                    {
                        user ? (
                            <button onClick={saveOrderToDb} className = "btn btn-sm btn-primary mt-2" disabled={!cart.length}>Proceed to Checkout</button>
                        ) : (
                            <button className = "btn btn-sm btn-primary mt-2">
                                <Link to = {{
                                    pathname: "/login",
                                    state: {from: "cart"}
                                }}>
                                    Login to Checkout
                                </Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="footer-container">
          <div className="footer-box row">
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/jjUpM.png"/>
                </div>
                  <div className="app-heading margin-top">
                    Marketed By
                  </div>
                  <p className = "branding-text">VYOMAN CLAIRE PVT LTD.</p>
                  <p className = "branding-text">GSTIN: 07AAHCV4657N1ZM</p>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-heading">Get Our App</div>
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/>
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/>
                </div>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
              <div className="app-heading">Shop Our Range</div>
                <a href = "/category/6-months" style = {{color: 'white'}}><p className = "branding-text mt-2">6 &nbsp; Months</p></a>
                <a href = "/category/3-months" style = {{color: 'white'}}><p className = "branding-text mt-2">3 &nbsp; Months</p></a>
                <a href = "/category/1-month" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Month</p></a>
                <a href = "/category/1-day" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Day</p></a>
              </div>
            </div>
            <div className="footer-section col-md- 3">
            <div className="get-app-container">
              <div className="app-heading">Our Policies</div>
                <a href = "/privacypolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Privacy and Policy</p></a>
                <a href = "/returnpolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Return Policy</p></a>
                <a href = "/tandc" style = {{color: 'white'}}><p className = "branding-text mt-2">Terms & Conditions</p></a>
              </div>
            </div>
            <p className = "copyright">© skycosmeticlenses.com All Rights Reserved.</p>
          </div>
        </div>
        </div>
    )
}

export default Cart