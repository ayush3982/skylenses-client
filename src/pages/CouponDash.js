import React, {useEffect, useState} from 'react';
import './../styles/coupondash.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";



const CouponDash = () => {

    const [couponName, setCouponName] = useState('');
    const [orderData, setOrderData] = useState([]);

    const findOrders = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API}/coupons/orders/${couponName}`);
        setOrderData(res.data);
        console.log(res.data);
    }

    return (
        <>
            <div className = "dash-container">
                <div className = "dash-heading ">Coupons Dashboard</div>
                <p className = "branding-text dash-text">Welcome to Sky Cosmetic Lenses coupon  dashboard, enter your coupon name (in all caps), to find how many sales your coupon has generated</p>
                <form noValidate>
                    <TextField className = "dash-field" id="filled-basic" label="Coupon Code" value = {couponName} onChange={e => setCouponName(e.target.value)}/>
                </form>
                <Button variant="contained" color="primary" onClick = {findOrders}>
                    Find Data
                </Button>
    
                <div className = "table-dash">
                    <div className = "dash-table-heading">
                        <div className = "col-md dash-col">ID</div>
                        <div className = "col-md dash-col">Date</div>
                        <div className = "col-md dash-col">Razorpay</div>
                    </div>
                    {orderData.map((order) => (
                        <div className = "dash-table-body">
                            <div className = "col-md dash-col">{order.skyId}</div>
                            <div className = "col-md dash-col">{order.orderDate}</div>
                            <div className = "col-md dash-col">{order.rpayId}</div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CouponDash;