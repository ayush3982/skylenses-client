import React, {useEffect, useState} from 'react'
import {getCategory} from '../functions/category'
import '../styles/category.css'

const CategoryProducts = ({match}) => {

    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const {slug} = match.params;

    useEffect(() => {
        setLoading(true)
        getCategory(slug).then((res) => {
            console.log(res.data.products)
            setCategory(res.data.category);
            setProducts(res.data.products)
            setLoading(false)
        });
    }, [])

    let backgroundStyles = {
        width: '100%',
        background: `linear-gradient(to top, ${category.hexCodeDark}, ${category.hexCodeLight})`,
        display: 'flex',
        justifyContent: 'center',
    }

    let gradientStyles = {
        width: '90%',
        background: `linear-gradient(to top, ${category.hexCodeDark}, ${category.hexCodeLight})`,
    }

    return (
        <>
            <div className="big-bag" style={backgroundStyles}>
                <div className="products-container">
                    <div className="heading">
                        {category.name}
                    </div>
                    <div className="row row-one">
                        {products.map((product) => {
                            return (
                                <a href = {`/product/${product.slug}`} >
                                <div className = "product-card col-md- 3">
                                    <div style = {{
                                        width: '90%',
                                        background: `linear-gradient(to top, ${product.hexCodeDark}, ${product.hexCodeLight})`,
                                        height: '80%',
                                        marginTop: '20px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}>
                                        <img className = "image-full" src = {product.images[0].url} />
                                    </div>
                                    <div className = "name-box">
                                        {product.title}
                                    </div>
                                    <div className = "price-box">
                                        INR  <b>{product.price}/-</b>
                                    </div>
                                </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryProducts