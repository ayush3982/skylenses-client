import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon, singleCoupon, updateCoupon } from '../../../functions/coupon'
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import { Checkbox } from 'antd';
import {Link} from "react-router-dom"

const UpdateCouponPage = ({match}) => {

    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState(0)
    const [couponType, setCouponType] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState()
    const [coupon, setCoupon] = useState('')
    const [minCartValue, setMinCartValue] = useState(0)

    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        singleCoupon(match.params.name).then(res => {
            setCoupon(res.data)
            setName(res.data.name)
            setExpiry(res.data.expiry) 
            setCouponType(res.data.couponType)
            setDiscount(res.data.discount)
            setIsVisible(res.data.isVisible)
            setIsActive(res.data.isActive)
            setMinCartValue(res.data.minCartValue)
        })
        
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()//
        setLoading(true)
        console.log(couponType)
        updateCoupon(match.params.name, {name, expiry, discount, couponType, isVisible, isActive, minCartValue}, user.token)
        .then(res => {
            setLoading(false)
            toast.success(`${res.data.name} successfully updated`)
            console.log(res.data._id)
        }).catch(err => console.log(err))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                    <h4>Update Coupon:</h4>
                    {JSON.stringify(coupon)}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={e => setName(e.target.value)} 
                                value = {name} 
                                autoFocus 
                                required
                                disabled/>
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
                                <option>Permanent</option>
                                <option>Single Use</option>
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
                                value = {expiry}
                                onChange = {(date) => setExpiry(date)}
                                required
                                disabled
                            />    
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Visible to Users? </label>
                            <select
                                name = "isVisible"
                                type = "boolean"
                                value = {isVisible}
                                className = "form-control"
                                onChange = {e => setIsVisible(e.target.value)}
                            >   
                                <option>Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Activate Coupon</label>
                            <select
                                name = "isActive"
                                type = "boolean"
                                className = "form-control"
                                value = {isActive} 
                                onChange = {e => setIsActive(e.target.value)}
                            >   
                                <option>Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Minimum Cart Value</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={e => setMinCartValue(e.target.value)} 
                                value = {minCartValue} 
                                required/>
                        </div>
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateCouponPage