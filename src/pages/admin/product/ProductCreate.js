import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    sub: '',
    shipping: '',
    quantity: '',
    images: [],
    color: '',
    choosePowers: ["Choose Power","0"],
    choosePower6s: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    choosePowerLefts: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    choosePowerRights: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
    packFormats: ["Vial", "Blister"],
    material: '',
    diameter: '',
    choosePower: '',
    choosePower6: '',
    choosePowerLeft: '',
    choosePowerRight: '',
    packFormat: '',
}

const ProductCreate = () => {

    const [values, setValues] = useState(initialState)

    const {title, description, price, categories, category, subs, sub, shipping, quantity, images, color, material, diameter, choosePower, choosePower6, choosePowerLeft, choosePowerRight, packFormat} = values

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        //
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                    <h4>Create Product</h4>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    className = "form-control" 
                                    value = {title}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input 
                                    type="text" 
                                    name="description" 
                                    className = "form-control" 
                                    value = {description}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    className = "form-control" 
                                    value = {price}
                                    onChange = {handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Shipping</label>
                                <input 
                                    type="text" 
                                    name="description" 
                                    className = "form-control" 
                                    value = {description}
                                    onChange = {handleChange}
                                />
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate