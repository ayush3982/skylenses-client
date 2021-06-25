import React, {useEffect, useState} from 'react'
import AdminNav from '../../components/nav/AdminNav'
import AdminProductCard from '../../components/cards/AdminProductCard';
import {getProducts} from '../../functions/product';

const AdminDashboard = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    const loadAllProducts = () => {
        setLoading(true)
        getProducts()
        .then((res) => {
            setProducts(res.data)
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
            console.error(err)
        })
    }

    useEffect(() => {
        loadAllProducts();
    }, [])

    

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;