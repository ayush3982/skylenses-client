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
    const [isVisible, setIsVisible] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [update, setUpdate] = useState(false)
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
        createCoupon({name, expiry, discount, couponType, isVisible, isActive}, user.token)
        .then(res => {
            setLoading(false)
            setName('')
            setExpiry('')
            setDiscount('')
            setCouponType('')
            setIsVisible(false)
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

    const handleUpdate = couponId => {
        console.log(user.token)
        console.log(update)
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
                                selected = {new Date()}
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
                                    <td>{JSON.stringify(c.isVisible)}</td>
                                    <td>{JSON.stringify(c.isActive)}</td>
                                    <td>
                                    <div className="form-group">
                                        <label className="text-muted">Activate Coupon</label>
                                        <select
                                            name = "isActive"
                                            type = "boolean"
                                            className = "form-control"
                                            onChange = {e => setUpdate(e.target.value)}
                                        >   
                                            <option>Select</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                        <button onClick={() => handleUpdate(c._id)} className = "btn btn-outline btn-primary mt-2">Update Status</button>
                                    </div>
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