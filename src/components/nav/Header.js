  
import React, {useState} from 'react'
import { Menu, Badge } from 'antd';
import {AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Search from '../forms/Search'
import '../../styles/navbar.css'
import '../../styles/hamburgers.css'
import 'boxicons'
import { useWindowSize } from "react-use";

const {SubMenu, Item} = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home')   //State Management

    let dispatch = useDispatch();
    let {user, cart} = useSelector((state) => ({...state}));

    let history = useHistory();

    const { width, height } = useWindowSize();
    const [collapseState, setCollapseState] = useState(false);

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type: "LOGOUT",
        payload: null
      })
      history.push('/login')
    }


    const menu = () => {
      return (
        <div className="menu-container-box">
          <div className="menu-item-responsive-container">
            <a href = "/category/6-months" className="responsive-menu-item">
              <div className="hover-boi"  >6 Months Lenses</div>
            </a>
            <a href = "/category/3-months" className="responsive-menu-item">
              <div className="hover-boi" >3 Months Lenses</div>
            </a>
            <a href = "/category/1-month" className="responsive-menu-item">
              <div className="hover-boi" >1 Month Lenses</div>
            </a>
            <a href = "/category/1-day" className="responsive-menu-item">
              <div className="hover-boi" >1 Day Lenses</div>
            </a>
          </div>
        </div>
      )
    }

    const collapseFunc = (e) => {
      e.preventDefault()
      setCollapseState(true);
    }

    const collapseFuncR = (e) => {
      e.preventDefault()
      setCollapseState(false);
    }

    return (
        <>
          {/* <div>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            
            <Item key="home" icon={<AppstoreOutlined />}>
              <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
              <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">
                <Badge count={cart.length} offset={[9,0]}>
                  Cart
                </Badge>
              </Link>
            </Item>

            {!user && (
              <Item key="Register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
              </Item>
            )}

            {!user && (
              <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
              </Item>
            )}

            {user && (
              <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right"> 

              {user && user.role === 'subscriber' && (
                <Item><Link to="/user/history">Dashboard</Link></Item>
              )}

              {user && user.role === 'admin' && (
                <Item><Link to="/admin/dashboard">Dashboard</Link></Item>
              )}

                <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
              </SubMenu>
            )}

            <span className="float-right"> <Search /> </span>
          
          </Menu>
          <div className="new-nav">
        
          </div>
        </div>  */}
        <div className="notice">
          Sky Cosmetic Lenses App now availabe for Android & iOS
        </div>
        {width >= 674 && (
          <>
            <div className="nav-container">
            <div className="brand-container">
              <div className="brand-text">
                <Link className="brand-text" to="/">
                  <img className="image-brand" src = "https://i.im.ge/2021/08/12/jjUpM.png" />
                </Link>
              </div>
            </div>
            <div className="menu-container">
              <a style = {{color: 'white'}} href = "/category/6-months">
                <div className="menu-item">
                    6 Months Lenses
                </div>
              </a>
              <a style = {{color: 'white'}} href = "/category/3-months">
                <div className="menu-item">
                    3 Months Lenses
                </div>
              </a>
              <a style = {{color: 'white'}} href = "/category/1-month">
                <div className="menu-item">
                    1 Month Lenses
                </div>
              </a>
              <a style = {{color: 'white'}} href = "/category/1-day">
                <div className="menu-item">
                    1 Day Lenses
                </div>
              </a>
            </div>
            <div className="button-container-responsive">
              {!user && (
                <div className="user-button button-box">
                  <Link className="user-button button-box" to="/login"><box-icon name='user' color='#FFFFFF' ></box-icon></Link>
                </div>
              )}
              {user && user.role === 'subscriber' && (
                <Link className="user-button button-box" to="/user/history"><box-icon name='user' color='#FFFFFF' ></box-icon></Link>
              )}

              {user && user.role === 'admin' && (
                <Link className="user-button button-box" to="/admin/dashboard"><box-icon name='user' color='#FFFFFF' ></box-icon></Link>
              )}
              <div className="cart-button button-box">
              <Badge count={cart.length} offset={[9,0]}>
                <Link to="/cart"><box-icon name='cart-alt' color='#FFFFFF' ></box-icon></Link>
              </Badge> 
              </div>
            </div>
          </div>
          </>
        )}
        {width <= 674 && (
          <>
            <div className = "nav-container-responsive">
              <div className = "toggle-container">
              {collapseState === false && (
                <button onClick={(e) => collapseFunc(e)} className = "hamburger hamburger--squeeze" type="button">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              )}
              {collapseState === true && (
                <button onClick={(e) => collapseFuncR(e)} className = "hamburger hamburger--squeeze is-active" type="button">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
                </button>
              )}
              </div>
              <div className = "brand-container-responsive">
                <div className="brand-text-responsive">
                  <Link className="brand-text-responsive" to="/">
                    <img className="image-brand-responsive" src = "https://i.im.ge/2021/08/12/jjUpM.png" />
                  </Link>
                </div>
              </div>
              <div className="button-container-responsive">
              {!user && (
                <div className="user-button-responsive button-box-responsive">
                  <Link className="user-button-responsive button-box-responsive" to="/login"><box-icon name='user' color='#ffffff' ></box-icon></Link>
                </div>
              )}
              {user && user.role === 'subscriber' && (
                <Link className="user-button-responsive button-box-responsive" to="/user/history"><box-icon name='user' color='#ffffff' ></box-icon></Link>
              )}

              {user && user.role === 'admin' && (
                <Link className="user-button-responsive button-box-responsive" to="/admin/dashboard"><box-icon name='user' color='#ffffff' ></box-icon></Link>
              )}
              <div className="cart-button-responsive button-box-responsive">
              <Badge count={cart.length} offset={[9,0]}>
                <Link to="/cart"><box-icon name='cart-alt' color='#ffffff' ></box-icon></Link>
              </Badge> 
              </div>
            </div>
            </div>
            {collapseState === true && width <= 674 && (
              <div>
                {menu()}
              </div>
            )}
          </>
        )}
  
        </>
    )
    
}

export default Header
