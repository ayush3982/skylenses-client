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
            <div className="footer-container">
          <div className="footer-box row">
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-image">
                  <img className="image-real" src = "https://i.im.ge/2021/08/12/jjUpM.png"/>
                </div>
                  <div className="app-heading margin-top">
                    Marketed By
                  </div>
                  <p className = "branding-text">VYOMAN CLAIRE PVT LTD.</p>
                  <p className = "branding-text">GSTIN: 07AAHCV4657N1ZM</p>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
                <div className="app-heading">Get Our App</div>
                <div className="app-image">
                <a className = "app-image-container" href="https://apps.apple.com/in/app/sky-cosmetic-lenses/id1537659278"><img className="image-real" src = "https://i.im.ge/2021/08/12/j57rF.png"/></a>
                    <a className = "app-image-container" href = "https://play.google.com/store/apps/details?id=com.skycosmeticlenses.lenses"><img className="image-real" src = "https://i.im.ge/2021/08/12/j5sV6.png"/></a>
                </div>
              </div>
            </div>
            <div className="footer-section col-md- 3">
              <div className="get-app-container">
              <div className="app-heading">Shop Our Range</div>
                <a href = "/category/6-months" style = {{color: 'white'}}><p className = "branding-text mt-2">6 &nbsp; Months</p></a>
                <a href = "/category/3-months" style = {{color: 'white'}}><p className = "branding-text mt-2">3 &nbsp; Months</p></a>
                <a href = "/category/1-month" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Month</p></a>
                <a href = "/category/1-day" style = {{color: 'white'}}><p className = "branding-text mt-2">1 &nbsp; Day</p></a>
              </div>
            </div>
            <div className="footer-section col-md- 3">
            <div className="get-app-container">
              <div className="app-heading">Our Policies</div>
                <a href = "/privacypolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Privacy and Policy</p></a>
                <a href = "/returnpolicy" style = {{color: 'white'}}><p className = "branding-text mt-2">Return Policy</p></a>
                <a href = "/tandc" style = {{color: 'white'}}><p className = "branding-text mt-2">Terms & Conditions</p></a>
              </div>
            </div>
            <p className = "copyright">© skycosmeticlenses.com All Rights Reserved.</p>
          </div>
        </div>
        </>
    )
}

export default CategoryProducts