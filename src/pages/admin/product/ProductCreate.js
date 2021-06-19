import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createProduct} from '../../../functions/product'

const ProductCreate = () => {

    const [values, setValues] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        sub: '',
        shipping: '',
        quantity: '',
        images: [],
        color: '',
        choosePower: ["Choose Power","0"],
        choosePower6: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
        choosePowerLeft: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
        choosePowerRight: ["Choose Power","0","-1.00","-1.25","-1.50","-1.75","-2.00","-2.25","-2.50","-2.75","-3.00","-3.25","-3.50","-3.75","-4.00","-4.25","-4.50","-4.75","-5.00","-5.50","-6.00","-6.50","-7.00"],
        packFormat: ["Vial", "Blister"],
        material: [],
        diameter: ''


    })

    const productForm = () => {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {productForm}
                </div>
            </div>
        </div>
    )
}

export default ProductCreate