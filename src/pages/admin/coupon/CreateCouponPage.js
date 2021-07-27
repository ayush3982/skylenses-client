import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import DatePicker from 'react-datepicker'
import { getCoupons, removeCoupon, createCoupon, addCoupon } from '../../../functions/coupon'
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import { Checkbox } from 'antd';
import {Link} from "react-router-dom"

const CreateCouponPage = () => {

    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState(0)
    const [couponType, setCouponType] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [loading, setLoading] = useState()
    const [coupons, setCoupons] = useState([])
    const [minCartValue, setMinCartValue] = useState(0)


    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        getCoupons().then(res => setCoupons(res.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()//
        setLoading(true)
        console.log(couponType)
        createCoupon({name, expiry, discount, couponType, isVisible, isActive, minCartValue}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setExpiry()
            setDiscount(0)
            setCouponType('')
            setIsVisible(false)
            setIsActive(false)
            setMinCartValue()
            toast.success(`${res.data.name} successfully created`)
            console.log(res.data._id)
            getCoupons().then(res => setCoupons(res.data))
        }).catch(err => console.log(err))
    }

    const handleRemove = couponId => {
        if(window.confirm('Are you sure you want to remove this coupon')) {
            removeCoupon(couponId, user.token).then(res => {
                getCoupons().then(res => setCoupons(res.data))
                toast.error(`${res.data.name} deleted` )
            }).catch(err => console.log(err))
        }
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
                                selected = {expiry}
                                value = {expiry}
                                onChange = {(date) => setExpiry(date)}
                                required
                            />    
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Visible to Users? </label>
                            <select
                                name = "isVisible"
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
                                name = "isActive"
                                type = "boolean"
                                className = "form-control"
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
                    <br />
                    <hr />
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Minimum Cart Value</th>
                                <th scope="col">Type</th>
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
                                    <td>{c.minCartValue}</td>
                                    <td>{c.couponType}</td>
                                    <td>{JSON.stringify(c.isVisible)}</td>
                                    <td>{JSON.stringify(c.isActive)}</td>
                                    <td>
                                    <Link to={`/admin/coupon/${c.name}`}>
                                        <span>
                                            <p className="btn btn-outline">Update</p> 
                                        </span>
                                    </Link>
                                    </td>
                                    <td><DeleteOutlined onClick = {() => handleRemove(c._id)} className = "text-danger pointer"/></td>
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