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
    const [perUse, setPerUse] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState()
    const [coupons, setCoupons] = useState([])

    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        getCoupons().then(res => setCoupons(res.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()//
        setLoading(true)
        console.log(couponType)
        createCoupon({name, expiry, discount, couponType, perUse, isVisible, isActive}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setExpiry('')
            setDiscount('')
            setCouponType('')
            setPerUse(0)
            setIsVisible(false)
            toast.success(`${res.data.name} successfully created`)
            console.log(res.data._id)
            getCoupons().then(res => setCoupons(res.data))
        }).catch(err => console.log(err))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-8">
                    <h4>Create Coupon</h4>
                    {JSON.stringify(coupons)}
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
                                onChange={e => setPerUse(e.target.value)} 
                                value = {perUse} 
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
                        <div className="form-group">
                            <label className="text-muted">Activate Coupon</label>
                            <select
                                name = "couponType"
                                type = "boolean"
                                className = "form-control"
                                onChange = {e => setIsActive(e.target.value)}
                            >   
                                <option>Select</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                    <br />
                    <hr />
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Per User</th>
                                <th scope="col">Visibility</th>
                                <th scope="col">Active Status</th>
                                <th scope="col">Change Status</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c) => (
                                <tr key = {c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}</td>
                                    <td>{c.couponType}</td>
                                    <td>{c.perUse}</td>
                                    <td>{JSON.stringify(c.isVisible)}</td>
                                    <td>{JSON.stringify(c.isActive)}</td>
                                    <td>Update Box</td>
                                    <td><DeleteOutlined /></td>
                                </tr>
                            ))}
                        </tbody>  
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage