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
          <div>
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
        </div> 
        <div className="notice">
          Hold On! We are revamping our website to provide you the best experience 😉
        </div>
        {width >= 674 && (
          <>
            <div className="nav-container">
            <div className="brand-container">
              <div className="brand-text">
                <Link className="brand-text" to="/">
                  <a><img className="brand-image" src = 'https://res.cloudinary.com/skylenses/image/upload/v1629289694/sky_logo_qacvga.png'></img></a>
                </Link>
              </div>
            </div>
            <div className="button-container-responsive">
              {!user && (
                <div className="user-button button-box">
                  <Link className="user-button button-box" to="/login"><box-icon name='user' color='#ffffff' ></box-icon></Link>
                </div>
              )}
              {user && user.role === 'subscriber' && (
                <Link className="user-button button-box" to="/user/history"><box-icon name='user' color='#ffffff' ></box-icon></Link>
              )}

              {user && user.role === 'admin' && (
                <Link className="user-button button-box" to="/admin/dashboard"><box-icon name='user' color='#ffffff' ></box-icon></Link>
              )}
              <div className="cart-button button-box">
              <Badge count={cart.length} offset={[9,0]}>
                <Link to="/cart"><box-icon name='cart-alt' color='#ffffff' ></box-icon></Link>
              </Badge> 
              </div>
            </div>
          </div>
          </>
        )}
        {width <= 674 && (
          <>
            <div className = "nav-container-responsive">
      
              <div className = "brand-container-responsive">
                <div className="brand-text-responsive">
                  <Link className="brand-text-responsive" to="/">
                    <a><img className="brand-image" src = 'https://res.cloudinary.com/skylenses/image/upload/v1629289694/sky_logo_qacvga.png'></img></a>
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

