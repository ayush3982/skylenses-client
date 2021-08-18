import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const AdminNav = () => {

  let dispatch = useDispatch();
  let {user, cart} = useSelector((state) => ({...state}));
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    history.push('/login')
  }

  return (
    <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Create a Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category Management
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub-category Management
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Update Password
        </Link>
      </li>
      <li className="nav-item">
        <Link onClick={logout} className="nav-link">
          Logout
        </Link>
      </li>
    </ul>
  </nav>
  )
};

export default AdminNav;
