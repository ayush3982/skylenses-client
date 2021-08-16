import React, { useState, useEffect } from 'react'
import ModalImage from 'react-modal-image'
import defaultImage from "../../images/image.jpg"
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify'
import _ from "lodash"
import {CloseOutlined} from "@ant-design/icons";
import '../../styles/cart.css'

const ProductCardInCheckout = ({p}) => {

    const [extraCart, setExtraCart] = useState([]);

    useEffect(() => {
        let newCart = [];
        if(typeof window !== "undefined") {
            if(localStorage.getItem("cart")) {
                newCart = JSON.parse(localStorage.getItem("cart"))
                setExtraCart(newCart);
            }
        }
    }, [])

    const dispatch = useDispatch()

    const handleQuantityChange = (e) => {
        // console.log("available quantity", p.quantity);
        let count = e.target.value < 1 ? 1 : e.target.value;
    
        if (count > 5) {
          toast.error(`You can only order 5 each`);
          return;
        }
    
        let cart = [];
    
        if (typeof window !== "undefined") {
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
    
          cart.map((extraCart, i) => {
            if (extraCart.choosePowerLeft === p.choosePowerLeft && extraCart.choosePowerRight === p.choosePowerRight && extraCart.choosePower === p.choosePower) {
                cart[i].count = count;
            console.log("yes")
            }
          });
    
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch({
            type: "ADD_TO_CART",
            payload: cart,
          });
        }
      };

      const handleRemove = () => {
        // console.log(p._id, "to remove");
        let cart = [];
    
        if (typeof window !== "undefined") {
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          // [1,2,3,4,5]
          cart.map((product, i) => {
            if (product._id === p._id) {
              cart.splice(i, 1);
            }
          });
    
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch({
            type: "ADD_TO_CART",
            payload: cart,
          });
        }
      };

    return (
        // <tbody>
        //     <tr>
        //         <td>
        //             <div style = {{width: '200px', height: '200px', alignItems: 'center', justifyContent: 'center'}}>
        //                 {p.images.length ? (<ModalImage small = {p.images[0].url} large = {p.images[0].url} />) : (<ModalImage small = {defaultImage} large = {defaultImage} />)}
        //             </div>
        //         </td>
        //         <td>{p.title}</td>
        //         {p.isCustomized ? (
        //            <>
        //             <td>
        //                 Left Power: {p.choosePowerLeft} <br />
        //                 Right Power: {p.choosePowerRight}
        //             </td> 
        //            </>
        //         ) : (
        //             <td>{p.choosePower}</td>
        //         )}
        //         <td>{p.category.name}</td>
        //         <td className = "text-center">
        //             <input type="number" className = "form-control" value = {p.count} onChange={handleQuantityChange}/>
        //         </td>
        //         <td>INR {p.price}</td>
        //         <td className="text-center">
        //         <CloseOutlined
        //             onClick={handleRemove}
        //             className="text-danger pointer"
        //         />
        // </td>
        //     </tr>
        // </tbody>
        <>
          <div className="cart-card">
              <div className="col-md small-card" style = {{
                background: `linear-gradient(to top, ${p.hexCodeDark}, ${p.hexCodeLight})`,
              }}>
                <img className="image-cart" src = {p.images[0].url} />
              </div>
              <div className="col-md small-card diff">
                  <CloseOutlined
                     onClick={handleRemove}
                     className="text-danger pointer text-right"
                 />
                <div>{p.title}</div>
                <hr />
                {p.isCustomized ? (
                    <>
                     <td>
                         Left Power: {p.choosePowerLeft} <br />
                         Right Power: {p.choosePowerRight}
                     </td> 
                    </>
                 ) : (
                     <td>Power: {p.choosePower}</td>
                 )}
                 <p>{p.category.name}</p>
                 <p>
                     Quanity<input type="number" className = "form-control" value = {p.count} onChange={handleQuantityChange}/>
                 </p>
                 <td>Price: INR {p.price}</td>
                 
              </div>
          </div>
        </>   
    )
}

export default ProductCardInCheckout