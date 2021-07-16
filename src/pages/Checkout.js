import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getUserCart} from "../functions/user"
 
const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        getUserCart(user.token).then((res) => {
          console.log("user cart res", JSON.stringify(res.data, null, 4));
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        });
    }, []);

    

    const saveAddressToDb = () => {
        //
    }

    return (
        <div className = "row">
            <div className = "col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                Address goes here
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>Save</button>
                <hr />
                <h4>Got Coupon?</h4>
                <br />
                Coupon input and apply button
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products: {products.length}</p>
                <hr />
                {products.map((p,i) => (
                    <div key = {i}>
                        <p>{p.product.title} x {p.count} = {p.price*p.count}</p>
                    </div>
                ))}
                <p>Rs 50 shipping for total below 999 (if applicable)</p>
                <hr />
                <p>total: {total}</p>
                <div className = "row">
                    <div className = "col-md-6">
                        <button className="btn btn-primary mt-2">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout