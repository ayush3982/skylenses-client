import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import CouponDash from './pages/CouponDash'
import HomePage from './pages/HomePage';
import ReturnPolicy from './pages/ReturnPolicy'
import Terms from './pages/T&C'
import PrivacyPolicy from './pages/PrivacyPolicy'
import How from './pages/How'
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Product from './pages/Product';
import CategoryProducts from './pages/CategoryProducts';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import CarouselCreate from './pages/admin/product/CarouselCreate'
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage'
import UpdateCouponPage from './pages/admin/coupon/UpdateCouponPage'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import {currentUser} from './functions/auth'


const App = () => {

  const dispatch = useDispatch()

  // to check firebase with auth statuses

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user)
        currentUser(idTokenResult.token)
        .then((res) => {
       
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    coupons: res.data.couponsAvailable,
                    _id: res.data._id,
                }
            })
        })
        .catch(err => console.log(err))
      }
    })
    // clean up 
    return () => unsubscribe();
  }, [dispatch])

  return (
   <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route exact path = "/homepage" component = {HomePage}/>
        <Route exact path = "/shop" component = {Shop}/>
        <Route exact path = "/cart" component = {Cart}/>
        <UserRoute exact path = "/payment" component = {Payment}/>
        <Route exact path = "/checkout" component = {Checkout}/>
        <Route exact path = "/product/:slug" component = {Product}/>
        <Route exact path = "/category/:slug" component = {CategoryProducts}/>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/register" component = {Register}/>
        <Route exact path = "/returnpolicy" component = {ReturnPolicy}/>
        <Route exact path = "/privacypolicy" component = {PrivacyPolicy}/>
        <Route exact path = "/howtouse" component = {How}/>
        <Route exact path = "/tandc" component = {Terms}/>
        <Route exact path = "/register/complete" component = {RegisterComplete}/>
        <Route exact path = "/forgot/password" component = {ForgotPassword}/>
        <Route exact path = "/coupon/dashboard" component = {CouponDash}/>
        <UserRoute exact path = "/user/history" component = {History}/>
        <UserRoute exact path = "/user/password" component = {Password}/>
        <UserRoute exact path = "/user/wishlist" component = {Wishlist}/>
        <AdminRoute exact path = "/admin/dashboard" component = {AdminDashboard}/>
        <AdminRoute exact path = "/admin/category" component = {CategoryCreate}/>
        <AdminRoute exact path = "/admin/category/:slug" component = {CategoryUpdate}/>
        <AdminRoute exact path = "/admin/sub/" component = {SubCreate}/>
        <AdminRoute exact path = "/admin/sub/:slug" component = {SubUpdate}/>
        <AdminRoute exact path = "/admin/product" component = {ProductCreate}/>
        <AdminRoute exact path = "/admin/carousel" component = {CarouselCreate}/>
        <AdminRoute exact path = "/admin/products" component = {AllProducts}/>
        <AdminRoute exact path = "/admin/product/:slug" component = {ProductUpdate}/>
        <AdminRoute exact path = "/admin/coupon" component = {CreateCouponPage}/>
        <AdminRoute exact path = "/admin/coupon/:name" component = {UpdateCouponPage}/>
      </Switch>
   </>
  );
};

export default App;
   