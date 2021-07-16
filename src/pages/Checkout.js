import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import {getUserCart, saveUserAddress} from "../functions/user"
 
const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    const [address, setAddress] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState()
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [addressSaved, setAddressSaved] = useState(false)

    useEffect(() => {
        getUserCart(user.token).then((res) => {
          console.log("user cart res", JSON.stringify(res.data, null, 4));
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        });
    }, []);

    console.log( customerName,
        address,
        city,
        pincode,
        state,
        country,
        email,
        phone)

    const saveAddressToDb = () => {
        saveUserAddress(
            user.token,
            customerName,
            address,
            city,
            pincode,
            state,
            country,
            email,
            phone
        ).then(res => {
            if(res.data.ok) {
                setAddressSaved(true)
                toast.success("Address saved")
            }
        })
    }

    return (
        <div className = "row">
            <div className = "col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <form className = "ml-2 mr-5">
                    <div className = "form-group">
                        <label>Customer Name</label>
                        <input className = "form-control" type = "text" onChange = {(e) => setCustomerName(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Address</label>
                        <textArea className = "form-control" type = "text" onChange = {(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>City</label>
                        <input className = "form-control" type = "text" onChange = {(e) => setCity(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Pincode</label>
                        <input className = "form-control" type = "number" inputmode="numeric" onChange = {(e) => setPincode(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>State</label>
                        <input className = "form-control" type = "text" onChange = {(e) => setState(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Country</label>
                        <input className = "form-control" type = "text" onChange = {(e) => setCountry(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Email</label>
                        <input className = "form-control" type = "email" onChange = {(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Phone Number</label>
                        <input className = "form-control" type = "number" onChange = {(e) => setPhone(e.target.value)} required/>
                    </div>
                </form>
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
                        <button className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout