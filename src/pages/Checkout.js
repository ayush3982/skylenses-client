import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import {getUserCart, saveUserAddress, getUser, applyCoupon, applyCoins, addCoins, removeCoins, addSolution, createOrder, createOrderCOD, emptyUserCart, setInternational} from "../functions/user"
import {countryData} from "../helpers/countries"
import './../styles/checkout.css'
import TextField from '@material-ui/core/TextField';       
import MenuItem from '@material-ui/core/MenuItem'; 
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import 'boxicons'


import axios from "axios";
 
const Checkout = ({history}) => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [internationalTotal, setInternationalTotal] = useState(0)
    const [couponApplied, setCouponApplied] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')
    const [fullData, setFullData] = useState('')
    const [coins, setCoins] = useState('');
    const [usingCoins, setUsingCoins] = useState(false);
    const [coinsNumber, setCoinsNumber] = useState(0)
    const [coinsSuccess, setCoinsSuccess] = useState(false);
    const [totalAfterCoins, setTotalAfterCoins] = useState('')
    const [liquid, setLiquid] = useState(false);
    const [coinError, setCoinError] = useState(false);
    const [availableCoupons, setAvailableCoupons] = useState([])
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [email, setEmail] = useState('')
    const [userData, setUserData] = useState('')
    const [cartId, setCartId] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const [payment, setPayment] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [signature, setSignature] = useState('')

    useEffect(() => {
        getUserCart(user.token).then((res) => {
          console.log("user cart res", JSON.stringify(res.data, null, 4));
          setProducts(res.data.products);
          setFullData(res.data)
          setTotal(res.data.cartTotal);
          setInternationalTotal(res.data.internationCartTotal)
          console.log(total)
          console.log(internationalTotal)
          setCartId(res.data._id);
          console.log(cartId)       
        });
        getUser(user.token, user.email).then((res) => {
            console.log(res.data)
            setAvailableCoupons(res.data.couponsAvailable)
            setUserData(res.data)
            setAddress(res.data.billing_address)
            setPhone(res.data.billing_phone)
            setCustomerName(res.data.billing_customer_name)
            setCity(res.data.billing_city)
            setState(res.data.billing_state)
            setPincode(res.data.billing_pincode)
            setCountry(res.data.billing_country)
            setEmail(res.data.billing_email)
            setCoins(res.data.coins);
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
            <div className="indian-box">
                <div className="shipping-indian">Rs 50 shipping if applicable</div>
                <p className="shipping-indian-price">Total: INR <b>{total}</b></p>
                {totalAfterDiscount > 0 && (
                    <div className="indian-box">
                        <p className = "shipping-indian-price">Coupon Applied</p>
                        <b><p className = "shipping-indian-price">Total Payable: INR {totalAfterDiscount} </p></b>
                    </div>
                )}
                {coinsSuccess && (
                    <div className="indian-box">
                        <p className = "shipping-indian-price">Coins Redeemed</p>
                        <b><p className = "shipping-indian-price">Total Payable: {totalAfterCoins} works</p></b>
                    </div>
                )}
            </div>
        )
    }

    const InternationalShippingBox = () => {
        return (
            <div className="indian-box">
                <p className="shipping-indian-price">Seems like you are shipping to {country}, international shipping will be applied under orders less than 4999</p>
                {total < 4999 ? (<div>Total : <b>INR {internationalTotal}</b></div>) : (<div> total : <b>INR {total}</b></div>)}
            </div>
        )
    }

    const applyDiscountCoupon = () => {
        applyCoupon(user.token, couponApplied)
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

    const applyDiscountCoin = async () => {
        if(coinsNumber > 200 || coinsNumber < 50) {
            setCoinError(true);
        }
        else {
            let discount = (coinsNumber * 0.25);
            console.log(discount)
            let newTotal = total - discount
            await setTotalAfterCoins(newTotal)
            console.log(totalAfterCoins)
            setCoinsSuccess(true)
            applyCoins(user.token, cartId, discount) 
            .then(res => {
                alert('does something')
            })
        }
    }

    const removeCoupon = () => {
        setCouponApplied('');
        setTotalAfterDiscount(0)
        setCoinsNumber(0);
    }

    const showApplyCoupon = () => (
        <>
          <input   
            onChange={(e) => {
              setCouponApplied(e.target.value);
              setDiscountError("");  
            }}
            value={couponApplied}
            type="text"
            className="form-control"
          />
          <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
            Apply
          </button>
          <button onClick={removeCoupon} disabled = {!couponApplied} className="btn btn-danger mt-2">Remove Coupon</button>

        </>
    );

    const showApplyCoins = () => (
        <>
            {coinError === true && (
              <p className="text-danger">You can only apply minimum 50 and maximum 200 coins</p>
          ) }
          <input   
            onChange={(e) => {
                setCoinsNumber(e.target.value);
                setDiscountError(""); 
                setCoinError(false); 
            }}
            value={coinsNumber}
            type="number"
            min="50" max="200"
            className="form-control"
          />
          <button onClick={applyDiscountCoin} className="btn btn-primary mt-2">
            Apply
          </button>
          <p className="text-success">You have {coins} coins</p>
          <button onClick={coinsFalse} className="btn btn-danger mt-2">Use Coupons instead?</button>
        </>
    );

    const addressBox = () => (
        <div className = "col-md-5 address-box">
                        <div className = "heading">Shipping Address</div>
                        <form className = "address-form">
                            <div className = "field-container">
                                <TextField className = "address-field" onChange = {(e) => setCustomerName(e.target.value)} required value = {customerName} id="outlined-basic" label="Your Name" />
                            </div>
                            <div className = "field-container">
                                <TextField value = {address} multiline className = "address-field" onChange = {(e) => setAddress(e.target.value)} label = "Address" required/>
                            </div>
                            <div className = "field-container">
                                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                <Select name = "sub" onChange = {handleCountryChange} value = {country} required>
                                    <MenuItem>Select Country</MenuItem>
                                    {countryData.length > 0 && countryData.map((c) => (
                                        <MenuItem value={c.name}  key={c._id} data = {c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className = "field-container">
                                <TextField value = {state}  className = "address-field" onChange = {(e) => setState(e.target.value)} label = "State" required/>
                            </div>
                            <div className = "field-container">
                                <TextField value = {city}  className = "address-field" onChange = {(e) => setCity(e.target.value)} label = "City" required/>
                            </div>
                            <div className = "field-container">
                                <TextField value = {pincode}  className = "address-field" onChange = {(e) => setPincode(e.target.value)} label = "Pincode" required/>
                            </div>
                            <div className = "field-container">
                                <TextField value = {email} type = "email"  className = "address-field" onChange = {(e) => setEmail(e.target.value)} label = "Email" required/>
                            </div>
                            <div className = "field-container">
                                <TextField value = {phone} type = "number" className = "address-field" onChange = {(e) => setPhone(e.target.value)} label = "Phone" required/>
                            </div>
                        </form>
                            <Button className = "address-button" variant="outlined" color="primary" onClick={saveAddressToDb} disabled = {country === "Select Country"}>Confirm Address</Button >
                            <br />
                    </div>
    )

    const buttons = () => {
        return (
            <div>
                {(country === "India" || total >= 4999) && (couponApplied === '') && (coinsSuccess === false) && (
                    <Button variant="outlined" color="rimary" onClick={() => buyNow(cartId)} className="mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Pay Now</Button>
                )}
                {(country === "India" || total >= 4999) && (couponApplied !== '') && (coinsSuccess === false) && (  
                    <Button onClick={() => buyNowCoupon(cartId)} className="btn btn-primary mt-2" variant="outlined" color="primary" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Dis</Button>
                )}
                {(country === "India" || total >= 4999) && (couponApplied === '') && (coinsSuccess === true) && (
                    <Button onClick={() => buyNowCoins(cartId)} className="btn btn-primary mt-2" variant="outlined" color="primary" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Coin</Button>
                )}
                {(country !== "India" && total < 4999) && (
                    <Button onClick={() => buyNowInternational(cartId)} className="btn btn-primary mt-2" variant="outlined" color="primary" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Int</Button>
                )}
                <br />
                {(country === "India") && (couponApplied === '' && coinsSuccess === false)  && (
                    <Button variant="outlined" color="primary" onClick={() => buyNowCOD()} className="mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Cash on Delivery</Button>
                )}
            </div>
        )
    }

    const handleCoins = () => {    
        setUsingCoins(true);
        setCouponApplied('');
        setTotalAfterDiscount(0)
    }

    const coinsFalse = () => {
        setUsingCoins(false);
        setCoinsSuccess(false);
    }

    const buyNowCOD = () => {
        const sendId = "NULL NULL"
        createOrderCOD(sendId, user.token)
        .then(res => {
            if(res.data.ok) {
                // empty cart from local storage
                if(typeof window.localStorage !== 'undefined') localStorage.removeItem("cart")
                setPayment(true)
                // empty cart from redux
                dispatch({
                    type: 'ADD_TO_CART',
                        payload: [],
                })
                // empty cart from database
                    emptyUserCart(user.token)
                }
        })
    }

    const buyNow = async (cartID) => {
        getUserCart(user.token).then((res) => {
            console.log("user cart res", JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setFullData(res.data)
            setTotal(res.data.cartTotal);
            setInternationalTotal(res.data.internationCartTotal)
            console.log(total)
            console.log(internationalTotal)
            setCartId(res.data._id);
            console.log(cartId)       
          });
        const res = await axios.get(`${process.env.REACT_APP_API}/order/${cartID}`)
        console.log(res);
        if(res.status === 200) {
            const options = {
                "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Sky Cosmetic Lenses",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    setOrderId(response.razorpay_order_id)
                    setPaymentId(response.razorpay_payment_id)
                    setSignature(response.razorpay_signature)
                    setPayment(true)
                    const sendId = response.razorpay_payment_id
                        createOrder(sendId, user.token)
                        .then(res => {
                            if(res.data.ok) {
                                // empty cart from local storage
                                if(typeof window.localStorage !== 'undefined') localStorage.removeItem("cart")
                                // empty cart from redux
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: [],
                                })
                                // empty cart from database
                                emptyUserCart(user.token)
                            }
                        })
                },
                "prefill": {
                    "name": customerName,
                    "email": email,
                    "contact": phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            });
            if(fullData.cartTotal >= 1499) {
                const addMore = 200;
                console.log(fullData.cartTotal);
                addCoins(user.token, user.email, addMore) 
            }
            if(fullData.cartTotal >= 999) {
                setLiquid(true)
                addSolution(user.token, fullData._id, true)
            }
        }
    }

    const buyNowInternational = async (cartID) => {
        const res = await axios.get(`${process.env.REACT_APP_API}/order/international/${cartID}`)
        console.log(res);
        if(res.status === 200) {
            const options = {
                "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Sky Cosmetic Lenses",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    setOrderId(response.razorpay_order_id)
                    setPaymentId(response.razorpay_payment_id)
                    setSignature(response.razorpay_signature)
                    setPayment(true)
                    setInternational(fullData._id, user.token)
                    const sendId = response.razorpay_payment_id
                        createOrder(sendId, user.token)
                        .then(res => {
                            if(res.data.ok) {
                                // empty cart from local storage
                                if(typeof window.localStorage !== 'undefined') localStorage.removeItem("cart")
                                // empty cart from redux
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: [],
                                })
                                // empty cart from database
                                emptyUserCart(user.token)
                            }
                        })
                },
                "prefill": {
                    "name": customerName,
                    "email": email,
                    "contact": phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            });
        }
    }

    const buyNowCoupon = async (cartID) => {
        const res = await axios.get(`${process.env.REACT_APP_API}/order/coupon/${cartID}`)
        console.log(res);
        if(res.status === 200) {
            const options = {
                "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Sky Cosmetic Lenses",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    setOrderId(response.razorpay_order_id)
                    setPaymentId(response.razorpay_payment_id)
                    setSignature(response.razorpay_signature)
                    setPayment(true)
                    const sendId = response.razorpay_payment_id
                        createOrder(sendId, user.token)
                        .then(res => {
                            if(res.data.ok) {
                                // empty cart from local storage
                                if(typeof window.localStorage !== 'undefined') localStorage.removeItem("cart")
                                // empty cart from redux
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: [],
                                })
                                // empty cart from database
                                emptyUserCart(user.token)
                            }
                        })
                },
                "prefill": {
                    "name": customerName,
                    "email": email,
                    "contact": phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            });
            if(fullData.cartTotal >= 1499) {
                const addMore = 200;
                console.log(fullData.cartTotal);
                addCoins(user.token, user.email, addMore)  
            }
            
        }
    }

    const buyNowCoins = async (cartID) => {
        const res = await axios.get(`${process.env.REACT_APP_API}/order/coin/${cartID}`)
        console.log(res);
        if(res.status === 200) {
            const options = {
                "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Sky Cosmetic Lenses",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature)
                    setOrderId(response.razorpay_order_id)
                    setPaymentId(response.razorpay_payment_id)
                    setSignature(response.razorpay_signature)
                    setPayment(true)
                    const sendId = response.razorpay_payment_id
                        createOrder(sendId, user.token)
                        .then(res => {
                            if(res.data.ok) {
                                // empty cart from local storage
                                if(typeof window.localStorage !== 'undefined') localStorage.removeItem("cart")
                                // empty cart from redux
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: [],
                                })
                                // empty cart from database
                                emptyUserCart(user.token)
                            }
                        })
                },
                "prefill": {
                    "name": customerName,
                    "email": email,
                    "contact": phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
            });
            removeCoins(user.token, user.email, coinsNumber);
            if(fullData.cartTotal >= 1499) {
                const addMore = 200;
                console.log(fullData.cartTotal);
                addCoins(user.token, user.email, addMore)  
            }
        }
    }

    // // return (
    //     <div>
    //         {payment === true && (
    //             <div>
    //                 <p>Payment Success</p>
    //                 {fullData.cartTotal >= 1499 && (
    //                     <p className="text-success">You got 200 coins!</p>
    //                 )}
    //             </div>
    //         )}
    //         {payment === false && (
    //             <div className = "row"> 
    //             <div className = "col-md-6">
    //                 <h4>Delivery Address</h4>  
    //                 <br />
    //                 {JSON.stringify(userData.coins)}
    //                 <form className = "ml-2 mr-5">
    //                     <div className = "form-group">
    //                         <label>Customer Name</label>
    //                         <input value = {customerName} className = "form-control" type = "text" onChange = {(e) => setCustomerName(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>Address</label>
    //                         <textarea value = {address} className = "form-control" type = "text" onChange = {(e) => setAddress(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>Country</label>
    //                         <select name="sub" className="form-control" type = "text" onChange={handleCountryChange} value = {country} required>
    //                             <option>Select Country</option>
    //                                 {countryData.length > 0 && countryData.map((c) => (
    //                                     <option value={c.name}  key={c._id} data = {c.id}>
    //                                         {c.name}
    //                                     </option>
    //                                 ))}
    //                         </select>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>State</label>
    //                         <input value = {state} className = "form-control" type = "text" onChange = {(e) => setState(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>City</label>
    //                         <input value = {city}  className = "form-control" type = "text" onChange = {(e) => setCity(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>Pincode/ZIP Code</label>
    //                         <input value = {pincode} className = "form-control" type = "number" inputmode="numeric" onChange = {(e) => setPincode(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>Email</label>
    //                         <input value = {email} className = "form-control" type = "email" onChange = {(e) => setEmail(e.target.value)} required/>
    //                     </div>
    //                     <div className = "form-group">
    //                         <label>Phone Number</label>
    //                         <input value = {phone} className = "form-control" type = "number" onChange = {(e) => setPhone(e.target.value)} required/>
    //                     </div>
    //                 </form>
    //                 <button className="btn btn-primary mt-2" onClick={saveAddressToDb} disabled = {country === "Select Country"}>Confirm Address</button>
    //                 <hr />
    
    //             </div>
    //             <div className="col-md-6">
    //                 <h4>Order Summary</h4>
    //                 <hr />
    //                 <p>Products: {products.length}</p>
    //                 <hr />
    //                 {products.map((p,i) => (
    //                     <div key = {i}>
    //                         <p>{p.product.title} x {p.count} = {p.price*p.count}</p>
    //                     </div>
    //                 ))} 
    //                 <hr />   
    //                 {country === "India" ? (
    //                     <>{IndianShippingBox()}</>
    //                 ) : (
    //                     <>{InternationalShippingBox()}</>
    //                 )}
    //                 <div className = "row">
    //                     {(country === "India" || total >= 4999) && (couponApplied === '') && (coinsSuccess === false) && (
    //                         <div className = "col-md-6">
    //                             <button onClick={() => buyNow(cartId)} className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order</button>
    //                         </div>
    //                     )}
    //                     {(country === "India" || total >= 4999) && (couponApplied !== '') && (coinsSuccess === false) && (  
    //                         <div className = "col-md-6">
    //                             <button onClick={() => buyNowCoupon(cartId)} className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Dis</button>
    //                         </div>
    //                     )}
    //                     {(country === "India" || total >= 4999) && (couponApplied === '') && (coinsSuccess === true) && (
    //                         <div className = "col-md-6">
    //                             <button onClick={() => buyNowCoins(cartId)} className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Coin</button>
    //                         </div>
    //                     )}
    //                     {(country !== "India" && total < 4999) && (
    //                         <div className = "col-md-6">
    //                             <button onClick={() => buyNowInternational(cartId)} className="btn btn-primary mt-2" disabled = {!addressSaved || !products.length || country === "Select Country"}>Place Order Int</button>
    //                         </div>
    //                     )} 
                        
    //                 </div>
    //                 {discountError && <p className = "text-danger p-2">{discountError}</p>}
    //                 {(country === "Select Country" || country === "India") && (total >= 999) && (usingCoins === false) &&(  
    //                     <>
    //                         <div>
    //                             {showApplyCoupon()}
    //                         </div>
    //                         <div>
    //                             <button className="btn btn-secondary mt-3" onClick={handleCoins}>Use Coins Instead?</button>
    //                         </div>
    //                     </>
    //                 )}
    //                 {(country === "Select Country" || country === "India") && (total >= 999) && (usingCoins === true) &&(  
    //                     <>
    //                         <div>
    //                             {showApplyCoins()}
    //                         </div>
    //                     </>
    //                 )}
    
    //                 <div>
    //                     {JSON.stringify(coinsNumber)}
    //                     {payment && (
    //                         <div>
    //                             <p>Payment Id: {paymentId}</p>
    //                             <p>Order Id: {orderId}</p>
    //                             <p>Signature: {signature}</p>
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //         )}
    //     </div>
    // // )

    return (
        <div>
            <div>
            {payment === true && (
                 <div className="payment-background">
                     <div className="container-payment">
                         <h2 className="payment-heading"><span className="payment-span">Order Accepted!</span> Thanks for shopping with us!</h2>
                         {fullData.cartTotal >= 1499 && (
                            <h3 className = "mt-5">You got <span className="payment-coin">200 coins!</span> for shopping over ₹ 1499</h3>
                        )}
                        <Link className="payment-continue mt-5" to = "/">Continue Shopping</Link>
                     </div>
                     
                 </div>
            )}
            {payment === false && (
                <div className="full-container">
                <div className = "row full-box">
                    {addressBox()}
                    <div className = "col-md-5 payment-box">
                        <div className = "payment-box-order">
                            <div className = "order-title">Order Summary</div>
                                <div className = "order-details">
                                    <hr />
                                    {products.map((p,i) => (
                                        <div key = {i}>
                                            <p>{p.product.title} x {p.count} = INR <b>{p.price*p.count}</b></p>
                                        </div>
                                    ))} 
                                    <hr />
                                    {country === "India" ? (
                                        <>{IndianShippingBox()}</>
                                    ) : (
                                        <>{InternationalShippingBox()}</>
                                    )}
                                        {buttons()}
                                </div>
                        </div> 
                        {total > 999 && country === "India" && (
                            <div className="discount-box">
                                <p className = "text-success margin-30">If you don't apply any Coupon or Coins, you'll get solution free</p>
                                {discountError && <p className = "text-danger p-2">{discountError}</p>}
                                {(country === "Select Country" || country === "India") && (total >= 999) && (usingCoins === false) &&(  
                                    <>
                                        <div>
                                            {showApplyCoupon()}
                                        </div>
                                        <div>
                                            <button className="btn btn-secondary mt-3" onClick={handleCoins}>Use Coins Instead?</button> <hr />
                                        </div>
                                    </>
                                )}
                                {/* {(country === "Select Country" || country === "India") && (total >= 999) && (usingCoins === true) &&(  
                                    <>
                                        <div>
                                            {showApplyCoins()}
                                        </div>
                                    </> 
                                )} */}
                                
                            </div>
                        )}
                        </div>
                 </div>
            </div>
            )}
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

export default Checkout       