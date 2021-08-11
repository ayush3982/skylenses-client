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
            setCategory(res.data.category);
            setProducts(res.data.products)
            setLoading(false)
        });
    }, [])

    let backgroundStyles = {
        width: '100%',
        height: '110vh',
        background: `linear-gradient(to top, ${category.hexCodeDark}, ${category.hexCodeLight})`,
        display: 'flex',
        justifyContent: 'center',
    }


    return (
        <>
            {loading ? (<div>Loading</div>) : (
                <div style={backgroundStyles}>
                    <div className="products-container">
                        <div className="heading">
                            {category.name}
                        </div>
                        <div className="row-one">  
                            {products.map(product => (
                                <div key={product._id} className="product-card">
                                    <div className="product-image-container" style={
                                        {
                                            width: '90%',
                                            height: '75%',
                                            background: `linear-gradient(to top, ${product.hexCodeDark}, ${product.hexCodeLight})`,
                                            marginTop: '20px',
                                            borderRadius: '10%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            overflow: 'hidden',

                                        }}>
                                            <img className="product-image" src={product.images[0].url} alt={product.title} />
                                    </div>
                                    <div className="name-box">
                                        {product.title}
                                    </div>
                                    <div className="price-box">
                                        I N R <b>{product.price}</b>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CategoryProducts