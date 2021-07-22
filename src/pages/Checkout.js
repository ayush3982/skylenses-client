import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import {getUserCart, saveUserAddress, getUser} from "../functions/user"
import {countryData} from "../helpers/countries"
 
const Checkout = () => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [internationalTotal, setInternationalTotal] = useState(0)
    const [fullData, setFullData] = useState('')
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [customerName, setCustomerName] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState()
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [userData, setUserData] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    useEffect(() => {
        getUserCart(user.token).then((res) => {
          console.log("user cart res", JSON.stringify(res.data, null, 4));
          setProducts(res.data.products);
          setFullData(res.data)
          setInternationalTotal(res.data.internationalCartTotal)
          setTotal(res.data.cartTotal);
          console.log(total)
          console.log(internationalTotal)
        });
        getUser(user.token, user.email).then((res) => {
            console.log(user.token)
            setUserData(res.data)
            setAddress(res.data.billing_address)
            setPhone(res.data.billing_phone)
            setCustomerName(res.data.billing_customer_name)
            setCity(res.data.billing_city)
            setState(res.data.billing_state)
            setPincode(res.data.billing_pincode)
            setCountry(res.data.billing_country)
            setEmail(res.data.billing_email)
        })
    }, []);

    // const {billing_customer_name, billing_address, billing_country, billing_city, billing_phone, billing_email, billing_state, billing_pincode} = userData

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

    const handleCountryChange = (e) => {
        setCountry(e.target.value) 
        setInternationalTotal(fullData.internationCartTotal) 
        console.log(internationalTotal)
    }

    return (
        <div className = "row"> 
            <div className = "col-md-6">
                <h4>Delivery Address</h4>  
                <br />
                <form className = "ml-2 mr-5">
                    <div className = "form-group">
                        <label>Customer Name</label>
                        <input value = {customerName} className = "form-control" type = "text" onChange = {(e) => setCustomerName(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Address</label>
                        <textarea value = {address} className = "form-control" type = "text" onChange = {(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Country</label>
                        <select name="sub" className="form-control" type = "text" onChange={handleCountryChange} value = {country} required>
                            <option>Select Country</option>
                                {countryData.length > 0 && countryData.map((c) => (
                                    <option value={c.name}  key={c._id} data = {c.id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>State</label>
                        <input value = {state} className = "form-control" type = "text" onChange = {(e) => setState(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>City</label>
                        <input value = {city}  className = "form-control" type = "text" onChange = {(e) => setCity(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Pincode/ZIP Code</label>
                        <input value = {pincode} className = "form-control" type = "number" inputmode="numeric" onChange = {(e) => setPincode(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Email</label>
                        <input value = {email} className = "form-control" type = "email" onChange = {(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className = "form-group">
                        <label>Phone Number</label>
                        <input value = {phone} className = "form-control" type = "number" onChange = {(e) => setPhone(e.target.value)} required/>
                    </div>
                </form>
                <button className="btn btn-primary mt-2" onClick={saveAddressToDb} disabled = {country === "Select Country"}>Confirm Address</button>
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
                {country === "India" ? (
                     <>
                        <p>Rs 50 shipping for total below 999 (if applicable)</p>
                        <hr />
                        <p>total: {total}</p>
                     </>
                ) : (
                    <>
                        <p>Shipping to {country}, additional shipping charges applied</p>
                        <p>
                            {total < 4999 ? (
                               <>
                                     <p>Rs 1500 shipping applied below INR 4999</p>
                                     <p>total: {JSON.stringify(fullData.internationCartTotal)}</p>
                               </>
                            ) : (
                                <>
                                    <p>You are eligible for free shipping</p>
                                    <p>Total: {total} </p>
                                </>   
                            )}
                        </p>
                    </>
                )}    
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