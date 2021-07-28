import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify';
import {getUserCart, saveUserAddress, getUser, applyCoupon} from "../functions/user"
import {countryData} from "../helpers/countries"
 
const Checkout = ({history}) => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [internationalTotal, setInternationalTotal] = useState(0)
    const [coupon, setCoupon] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')
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
          setTotal(res.data.cartTotal);
          setInternationalTotal(res.data.internationCartTotal)
          console.log(total)
          console.log(internationalTotal)
        });
        getUser(user.token, user.email).then((res) => {
            console.log(res)
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
    }

    const IndianShippingBox = () => {
        return (
            <div>
                Rs 50 shipping if applicable
                <p>Total: {total}</p>
                {totalAfterDiscount > 0 && (
                    <div>
                        <p className = "text-success">Coupon Applied</p>
                        <b><p>Total Payable: {totalAfterDiscount} </p></b>
                    </div>
                )}
            </div>
        )
    }

    const InternationalShippingBox = () => {
        return (
            <div>
                <p>Seems like you are shipping to {country}, international shipping will be applied under orders less than 4999</p>
                {total < 4999 ? (<div>total : {internationalTotal}</div>) : (<div> total : {total}</div>)}
            </div>
        )
    }

    const applyDiscountCoupon = () => {
        applyCoupon(user.token, coupon)
        .then(res => {
            console.log('RES ON COUPON', res.data)
            if(res.data) {
                setTotalAfterDiscount(res.data)
                console.log(totalAfterDiscount)
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                });
            }
            if(res.data.err) {
                setDiscountError(res.data.err)
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                  });
            }
        })
    }

    const removeCoupon = () => {
        setCoupon('');
        setTotalAfterDiscount(0)
    }

    const showApplyCoupon = () => (
        <>
          <input   
            onChange={(e) => {
              setCoupon(e.target.value);
              setDiscountError("");
            }}
            value={coupon}
            type="text"
            className="form-control"
          />
          <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
            Apply
          </button>
          <button onClick={removeCoupon} disabled = {!coupon} className="btn btn-danger mt-2">Remove Coupon</button>
        </>
    );

    return (
        <div className = "row"> 
            <div className = "col-md-6">
                <h4>Delivery Address</h4>  
                {JSON.stringify(userData)}
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
                <hr />   
                {country === "India" ? (
                    <>{IndianShippingBox()}</>
                ) : (
                    <>{InternationalShippingBox()}</>
                )}
                <div className = "row">
                    <div className = "col-md-6">
                        <button onClick={() => history.push('/payment')} className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order</button>
                    </div>
                </div>
                {discountError && <p className = "text-danger p-2">{discountError}</p>}
                {(country === "Select Country" || country === "India") && (
                    <div>
                        {showApplyCoupon()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Checkout   