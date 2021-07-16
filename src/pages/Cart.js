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
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Power</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {cart.map((p) => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))}
            </table>
        )
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-9">
                    <h4>Cart / {cart.length} Lenses</h4>
                    {!cart.length ? (<p>No products in cart. <Link to = '/shop'>Continue Shopping</Link></p>) : (
                        showCartItems()
                    )}
                </div>
                <div className="col-md-3">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                        </div>
                    ))}
                    {getTotal() < deliveryChargesApplied() ? (<div>Delivery Charges : 50</div>) : (null)}
                    <hr />
                        Total: <b>${deliveryChargesApplied()}</b>
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
    )
}

export default Cart