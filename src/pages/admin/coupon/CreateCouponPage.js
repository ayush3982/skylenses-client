import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon'
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import { Checkbox } from 'antd';

const CreateCouponPage = () => {


    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [couponType, setCouponType] = useState('')
    const [perUser, setPerUser] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState()

    const {user} = useSelector((state) => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault()//
        setLoading(true)
        console.log(couponType)
        createCoupon({name, expiry, discount, couponType, perUser, isVisible}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setExpiry('')
            setDiscount('')
            setCouponType('')
            setPerUser('')
            setIsVisible(false)
            toast.success(`${res.data.name} successfully created`)
            console.log(res.data._id)
        }).catch(err => console.log(err))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-6">
                    <h4>Create Coupon</h4>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={e => setName(e.target.value)} 
                                value = {name} 
                                autoFocus 
                                required/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Coupon Type</label>
                            <select
                                name = "couponType"
                                className = "form-control"
                                onChange = {e => setCouponType(e.target.value)}
                                value = {couponType}
                            >
                                <option>Select</option>
                                <option>Flat</option>
                                <option>Percentage</option>
                            </select>

                        </div>
                        <div className="form-group">
                            <label className="text-muted">Discount</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={e => setDiscount(e.target.value)} 
                                value = {discount} 
                                required/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Expiry Date</label> <br />
                            <DatePicker 
                                className="form-control" 
                                selected = {new Date()}
                                value = {expiry}
                                onChange = {(date) => setExpiry(date)}
                                required
                            />    
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Limit per use</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                onChange={e => setPerUser(e.target.value)} 
                                value = {perUser} 
                                min="0"
                                required/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Visible to Users? </label>
                            <select
                                name = "couponType"
                                type = "boolean"
                                className = "form-control"
                                onChange = {e => setIsVisible(e.target.value)}
                            >   
                                <option>Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage