import axios from 'axios';

export const getCoupons = async () => 
    await axios.get(`${process.env.REACT_APP_API}/coupons`)

export const removeCoupon = async (couponId, authtoken) => 
    await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            authtoken
        },
    })

export const singleCoupon = async (couponName) => 
    await axios.get(`${process.env.REACT_APP_API}/coupon/${couponName}`)

export const createCoupon = async (coupon, authtoken) => 
    await axios.post(`${process.env.REACT_APP_API}/coupon`, 
    { coupon },
    {
        headers: {
            authtoken  
        },
    })

export const updateCoupon = async (couponName, coupon, authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/coupon/${couponName}`,
    { coupon },
    {
        headers: {
            authtoken 
        }
    }
    ) 

export const addCoupon = async (couponName) => 
    await axios.put(`${process.env.REACT_APP_API}/coupon/add/user/${couponName}`)