import React, {useState, useEffect} from 'react';
import UserNav from '../../components/nav/UserNav'
import {getUserOrders} from '../../functions/user'
import {useSelector, useDispatch} from 'react-redux'
import {cancelOrder} from '../../functions/user'
import {toast} from 'react-toastify'
import '../../styles/history.css' 
import Button from '@material-ui/core/Button';
import firebase from 'firebase'
import {useHistory} from 'react-router-dom'
import { Link } from "react-router-dom";


const History = () => {

    const [orders, setOrders] = useState([])
    const {user} = useSelector((state) => ({...state}))
    let dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        loadUserOrders()
    }, [])

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
          type: "LOGOUT",
          payload: null
        })
        history.push('/login')
      }

    const loadUserOrders = () => getUserOrders(user.token).then(res => {
        console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
    })

    const cancelBilled = (shippingID) => {
      const answer = window.confirm("Cancel Order?");
      if (answer) {
        cancelOrder(shippingID, user.token)
        .then((response) => {
            console.log(response.data)
            loadUserOrders()
        })
      }
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
        console.log(diffTime);
        if(diffDays > 0) return false;
        else return true;
    }

    return (
        <div>
            <div className="background-history">
            <div className="history-big-box row">
                <div className="col-md small-box">
                    <h1 className="mt-5">Order History</h1>
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
                <Link onClick={logout} className="nav-link float-right" style = {{marginTop: "-790px"}}>
                    Logout
                </Link>
                </div>
            </div>
        </div><div className="footer-container">
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

export default History;

// Order ID: <b>{order.skyId}</b>
//                             Total Amount: INR <b>{order.cartTotal}</b>
//                             Order Date: <b>{order.orderDate}</b>
//                             You Ordered
//                             {order.products.map(product => (
//                                 <p>{product.name} x {product.units}</p>
//                             ))}