import React, {useState, useEffect} from 'react';
import UserNav from '../../components/nav/UserNav'
import {getUserOrders} from '../../functions/user'
import {useSelector, useDispatch} from 'react-redux'
import {cancelOrder} from '../../functions/user'
import {toast} from 'react-toastify'
import '../../styles/history.css' 
import Button from '@material-ui/core/Button';

const History = () => {

    const [orders, setOrders] = useState([])
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => getUserOrders(user.token).then(res => {
        console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
    })

    const cancelBilled = (shippingID) => {
        cancelOrder(shippingID, user.token)
        .then((response) => {
            console.log(response.data)
        })
    }

    const generateOrderDate = () => {
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        if (month < 10) {
          month = "0" + String(month);
        }
        if (day < 10) {
          day = "0" + String(day);
        }
        month = String(month);
        day = String(day);
        year = String(year);
        var finalDate = `${year}-${month}-${day}`;
        //console.log(finalDate);
        return finalDate;
    };
      

    const allowCancel = (orderDate) => {
        const date1 = new Date(orderDate)
        const date2 = new Date(generateOrderDate())
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 0) return false;
        else return true;
    }

    return (
        <div className="background-history">
            <div className="history-big-box row">
                <div className="col-md small-box">
                    <h1>Order History</h1>
                    {orders.map(order => (
                        <div className="order-box">
                            <div className="col-md partition">
                                <p>Order ID: <b>{order.skyId}</b></p>
                                <p>Total Amount: INR <b>{order.cartTotal}</b></p>
                                <p>Order Date: <b>{order.orderDate}</b></p>
                            </div>
                            <div className="col-md partition">
                                <p>You Ordered</p>
                                {order.products.map(product => (
                                    <b><p>{product.name} x {product.units}</p></b>
                                ))}
                                {order.orderStatus !== "Cancelled" && (
                                     <div>
                                        <a href = 'https://sky.shiprocket.co/'><button className="button-margin">Track Order</button></a>
                                        {allowCancel(order.orderDate) === true && (
                                            <button onClick = {() => cancelBilled(order.skyId)} className="button-margin">Cancel Order</button>
                                        )}
                                    </div>
                                )}
                                {order.orderStatus === "Cancelled" && (
                                    <h6 className="text-danger">Order Cancelled</h6>
                                )} 
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md small-box">
                    
                </div>
            </div>
        </div>
    )
}    

export default History;

// Order ID: <b>{order.skyId}</b>
//                             Total Amount: INR <b>{order.cartTotal}</b>
//                             Order Date: <b>{order.orderDate}</b>
//                             You Ordered
//                             {order.products.map(product => (
//                                 <p>{product.name} x {product.units}</p>
//                             ))}