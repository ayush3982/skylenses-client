import { Loading3QuartersOutlined } from '@ant-design/icons';
import React, {useEffect, useState} from 'react'
import {getProduct} from "../functions/product"

const Product = ({match}) => {
    const [product, setProduct] = useState({})
    const {slug} = match.params;

    useEffect(() => {
        loadSingleProduct()
        console.log(product)
    }, [slug])

    const loadSingleProduct = () => getProduct(slug).then(res => setProduct(res.data))

    return (
        <div>Single Product</div>
    )
}

export default Product